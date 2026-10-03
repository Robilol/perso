// Règles du formulaire de contact, partagées entre le formulaire et la route /api/contact

export const CONTACT_SUBJECTS = [
  'Création d’une application web',
  'Évolution d’une application existante',
  'Application mobile',
  'Renfort d’équipe / mission freelance',
  'Autre demande',
]

export const CONTACT_LIMITS = { name: 100, email: 254, messageMin: 20, messageMax: 5000 }

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Action reCAPTCHA v3, vérifiée côté serveur */
export const RECAPTCHA_ACTION = 'contact'

export type ContactMessage = {
  name: string
  email: string
  subject: string
  message: string
}

/** Erreurs renvoyées par /api/contact */
export type ContactError = 'invalid' | 'captcha' | 'send' | 'not_configured'

/** Valide le corps de la requête ; `null` si un champ est absent ou invalide */
export function parseContactMessage(input: unknown): ContactMessage | null {
  if (!input || typeof input !== 'object') return null
  const { name, email, subject, message } = input as Record<string, unknown>
  if (typeof name !== 'string' || typeof email !== 'string') return null
  if (typeof subject !== 'string' || typeof message !== 'string') return null

  const parsed = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  }
  const valid =
    parsed.name.length > 0 &&
    parsed.name.length <= CONTACT_LIMITS.name &&
    parsed.email.length <= CONTACT_LIMITS.email &&
    EMAIL_PATTERN.test(parsed.email) &&
    CONTACT_SUBJECTS.includes(parsed.subject) &&
    parsed.message.length >= CONTACT_LIMITS.messageMin &&
    parsed.message.length <= CONTACT_LIMITS.messageMax
  return valid ? parsed : null
}
