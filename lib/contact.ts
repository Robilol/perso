// Clés publiques EmailJS et reCAPTCHA (surchargées par les variables d'environnement si besoin)
export const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_1rri71q',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_asi2pl8',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'vQEcWA00nuHecM3b5',
}

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LettL8iAAAAAAUJYd0V9xH_ggkmTqKGS6-sFj1O'

export const CONTACT_SUBJECTS = [
  'Création d’une application web',
  'Évolution d’une application existante',
  'Application mobile',
  'Renfort d’équipe / mission freelance',
  'Autre demande',
]

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

let recaptchaLoader: Promise<void> | undefined

/** Charge reCAPTCHA v3 à la première interaction avec le formulaire, pas au chargement de la page */
export function loadRecaptcha() {
  recaptchaLoader ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}&hl=fr`
    script.async = true
    script.onload = () => window.grecaptcha?.ready(() => resolve())
    script.onerror = () => {
      recaptchaLoader = undefined
      reject(new Error('reCAPTCHA indisponible'))
    }
    document.head.appendChild(script)
  })
  return recaptchaLoader
}

/** Jeton reCAPTCHA transmis à EmailJS ; `undefined` si le script est bloqué (l'envoi n'est pas empêché) */
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  const timeout = new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 5000))
  const token = loadRecaptcha().then(() =>
    window.grecaptcha?.execute(RECAPTCHA_SITE_KEY, { action }),
  )
  return Promise.race([token, timeout]).catch(() => undefined)
}
