// reCAPTCHA v3 côté navigateur : le jeton est vérifié par la route /api/contact

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LettL8iAAAAAAUJYd0V9xH_ggkmTqKGS6-sFj1O'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

let recaptchaLoader: Promise<void> | undefined

/** Charge reCAPTCHA à la première interaction avec le formulaire, pas au chargement de la page */
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

/** Jeton reCAPTCHA, ou `undefined` si le script est bloqué ou ne répond pas */
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  const timeout = new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 5000))
  const token = loadRecaptcha().then(() =>
    window.grecaptcha?.execute(RECAPTCHA_SITE_KEY, { action }),
  )
  return Promise.race([token, timeout]).catch(() => undefined)
}
