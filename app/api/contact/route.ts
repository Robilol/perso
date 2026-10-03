import {
  parseContactMessage,
  RECAPTCHA_ACTION,
  type ContactError,
  type ContactMessage,
} from '@/lib/contact'
import { getSiteProfile } from '@/lib/seo'

/** Score reCAPTCHA v3 minimal : 0 = robot, 1 = humain */
const MIN_RECAPTCHA_SCORE = 0.5

/**
 * Formulaire de contact : vérifie le jeton reCAPTCHA v3 puis envoie le message avec Resend.
 * Variables : RESEND_API_KEY (obligatoire), RECAPTCHA_SECRET_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 * Tant que RESEND_API_KEY manque, la route répond `not_configured` et le formulaire passe par EmailJS.
 */
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return error('not_configured', 503)

  const body: unknown = await request.json().catch(() => null)
  const message = parseContactMessage(body)
  if (!message) return error('invalid', 400)

  const { website, token } = body as { website?: unknown; token?: unknown }
  // Pot de miel rempli : robot probable, on répond comme si l'envoi avait réussi
  if (website) return Response.json({ ok: true })

  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (secret) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const human = await verifyRecaptcha(secret, typeof token === 'string' ? token : '', ip)
    if (!human) return error('captcha', 403)
  } else {
    console.warn('[contact] RECAPTCHA_SECRET_KEY manquant : message envoyé sans vérification')
  }

  const to = process.env.CONTACT_TO_EMAIL || (await getSiteProfile())?.email
  if (!to) return error('not_configured', 503)

  const sent = await sendWithResend(apiKey, {
    from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
    to,
    message,
  })
  return sent ? Response.json({ ok: true }) : error('send', 502)
}

function error(code: ContactError, status: number) {
  return Response.json({ error: code }, { status })
}

async function verifyRecaptcha(secret: string, token: string, ip?: string) {
  if (!token) return false
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
      cache: 'no-store',
    })
    const result = (await response.json()) as {
      success: boolean
      score?: number
      action?: string
      'error-codes'?: string[]
    }
    if (!result.success) console.warn('[contact] reCAPTCHA refusé', result['error-codes'])
    return (
      result.success &&
      result.action === RECAPTCHA_ACTION &&
      (result.score ?? 0) >= MIN_RECAPTCHA_SCORE
    )
  } catch (cause) {
    console.error('[contact] reCAPTCHA injoignable', cause)
    return false
  }
}

async function sendWithResend(
  apiKey: string,
  { from, to, message }: { from: string; to: string; message: ContactMessage },
) {
  const { name, email, subject } = message
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: singleLine(`Contact portfolio : ${subject} — ${name}`),
        text: [`Nom : ${name}`, `Email : ${email}`, `Sujet : ${subject}`, '', message.message].join(
          '\n',
        ),
        html: emailHtml(message),
      }),
      cache: 'no-store',
    })
    if (!response.ok) {
      console.error('[contact] Resend', response.status, await response.text())
      return false
    }
    return true
  } catch (cause) {
    console.error('[contact] Resend injoignable', cause)
    return false
  }
}

function singleLine(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function emailHtml({ name, email, subject, message }: ContactMessage) {
  const rows = [
    ['Nom', escapeHtml(name)],
    ['Email', `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`],
    ['Sujet', escapeHtml(subject)],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#57534e">${label}</td><td style="padding:4px 0;font-weight:600">${value}</td></tr>`,
    )
    .join('')
  return `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.55;color:#141414">
<p style="margin:0 0 16px;font-size:18px;font-weight:700">Nouveau message depuis le portfolio</p>
<table style="border-collapse:collapse;margin:0 0 20px">${rows}</table>
<div style="padding:16px 20px;border:2px solid #141414;border-radius:12px;background:#faf7f0;white-space:pre-wrap">${escapeHtml(message)}</div>
<p style="margin:16px 0 0;color:#57534e;font-size:13px">Répondez directement à cet e-mail pour écrire à ${escapeHtml(name)}.</p>
</div>`
}
