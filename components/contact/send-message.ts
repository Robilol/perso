import type { ContactError, ContactMessage } from '@/lib/contact'

// Envoi de secours : clés publiques EmailJS (surchargées par les variables d'environnement si besoin)
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_1rri71q',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_asi2pl8',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'vQEcWA00nuHecM3b5',
}

export type SendResult = 'sent' | 'captcha' | 'failed'

/**
 * Envoie le message par la route /api/contact (reCAPTCHA vérifié côté serveur, envoi Resend).
 * Tant que Resend n'est pas configuré sur le serveur, EmailJS prend le relais depuis le navigateur.
 */
export async function sendContactMessage(
  message: ContactMessage,
  token?: string,
): Promise<SendResult> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...message, token }),
  }).catch(() => null)
  if (!response) return 'failed'
  if (response.ok) return 'sent'

  const { error } = ((await response.json().catch(() => ({}))) ?? {}) as { error?: ContactError }
  if (error === 'captcha') return 'captcha'
  if (error !== 'not_configured') return 'failed'

  try {
    await sendWithEmailJs(message, token)
    return 'sent'
  } catch {
    return 'failed'
  }
}

async function sendWithEmailJs(message: ContactMessage, token?: string) {
  const { send } = await import('@emailjs/browser')
  // Noms des variables attendues par le modèle EmailJS
  await send(
    EMAILJS.serviceId,
    EMAILJS.templateId,
    {
      from_name: message.name,
      reply_to: message.email,
      subject: message.subject,
      message: message.message,
      ...(token ? { 'g-recaptcha-response': token } : {}),
    },
    { publicKey: EMAILJS.publicKey },
  )
}
