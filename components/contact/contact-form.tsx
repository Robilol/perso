'use client'

import { useId, useState, type ReactNode } from 'react'
import { useForm, type FieldError } from 'react-hook-form'
import {
  RiArrowDownSLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiLoader4Line,
  RiSendPlaneLine,
} from 'react-icons/ri'
import { sendContactMessage } from '@/components/contact/send-message'
import { buttonClasses } from '@/components/ui/button'
import {
  CONTACT_LIMITS,
  CONTACT_SUBJECTS,
  EMAIL_PATTERN,
  RECAPTCHA_ACTION,
  type ContactMessage,
} from '@/lib/contact'
import { cx } from '@/lib/cx'
import { getRecaptchaToken, loadRecaptcha } from '@/lib/recaptcha'

type FormValues = ContactMessage & {
  /** Pot de miel : invisible pour les humains, rempli par les robots */
  website: string
}

const fieldClasses =
  'w-full rounded-xl border-2 border-ink bg-white px-4 py-3 text-base shadow-brutal-sm transition-[background-color,box-shadow] placeholder:text-muted/70 focus:bg-mint-light focus:shadow-brutal focus-visible:outline-none aria-[invalid=true]:border-[#c2410c] aria-[invalid=true]:bg-[#fff4ed]'

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'captcha'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: { subject: '' } })

  const onSubmit = async ({ website, ...values }: FormValues) => {
    setStatus('idle')
    if (website) {
      // Robot probable : on simule un envoi réussi sans rien transmettre
      setStatus('success')
      return
    }

    const token = await getRecaptchaToken(RECAPTCHA_ACTION)
    const result = await sendContactMessage(values, token)
    if (result === 'sent') reset()
    setStatus(result === 'sent' ? 'success' : result === 'captcha' ? 'captcha' : 'error')
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-start rounded-2xl border-2 border-ink bg-white p-6 shadow-brutal-lg sm:p-8"
      >
        <span
          aria-hidden
          className="grid size-12 place-items-center rounded-full border-2 border-ink bg-mint text-2xl"
        >
          <RiCheckLine />
        </span>
        <p className="mt-5 font-heading text-2xl">Message envoyé, merci !</p>
        <p className="mt-2 text-muted">Je reviens vers vous rapidement à l’adresse indiquée.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={buttonClasses({ variant: 'secondary', className: 'mt-6' })}
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onFocus={() => void loadRecaptcha().catch(() => undefined)}
      className="relative rounded-2xl border-2 border-ink bg-white p-5 shadow-brutal-lg sm:p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" error={errors.name}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              placeholder="Votre nom"
              className={fieldClasses}
              {...register('name', {
                required: 'Indiquez votre nom',
                maxLength: { value: CONTACT_LIMITS.name, message: 'Ce nom est un peu long' },
              })}
            />
          )}
        </Field>
        <Field label="Email" error={errors.email}>
          {(props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              placeholder="vous@entreprise.fr"
              className={fieldClasses}
              {...register('email', {
                required: 'Indiquez votre adresse email',
                pattern: { value: EMAIL_PATTERN, message: 'Cette adresse email semble incorrecte' },
                maxLength: {
                  value: CONTACT_LIMITS.email,
                  message: 'Cette adresse est trop longue',
                },
              })}
            />
          )}
        </Field>
      </div>

      <Field label="Votre besoin" error={errors.subject} className="mt-5">
        {(props) => (
          <div className="relative">
            <select
              {...props}
              className={cx(fieldClasses, 'appearance-none pr-11')}
              {...register('subject', { required: 'Choisissez un sujet' })}
            >
              <option value="" disabled>
                Choisissez un sujet
              </option>
              {CONTACT_SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <RiArrowDownSLine
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xl"
            />
          </div>
        )}
      </Field>

      <Field label="Message" error={errors.message} className="mt-5">
        {(props) => (
          <textarea
            {...props}
            rows={5}
            placeholder="Contexte, objectifs, délais…"
            className={cx(fieldClasses, 'resize-y')}
            {...register('message', {
              required: 'Décrivez votre projet en quelques mots',
              minLength: {
                value: CONTACT_LIMITS.messageMin,
                message: `Quelques mots de plus ? (${CONTACT_LIMITS.messageMin} caractères minimum)`,
              },
              maxLength: {
                value: CONTACT_LIMITS.messageMax,
                message: `Votre message dépasse ${CONTACT_LIMITS.messageMax} caractères`,
              },
            })}
          />
        )}
      </Field>

      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Ne pas remplir ce champ
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      {(status === 'error' || status === 'captcha') && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-xl border-2 border-ink bg-rose px-4 py-3 text-sm"
        >
          <RiErrorWarningLine aria-hidden className="mt-0.5 shrink-0 text-lg" />
          <span>
            {status === 'captcha'
              ? 'La vérification anti-spam n’a pas abouti (un bloqueur de contenu peut en être la cause).'
              : 'L’envoi a échoué.'}{' '}
            Réessayez ou écrivez-moi directement à{' '}
            <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">
              {email}
            </a>
            .
          </span>
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClasses({ variant: 'dark', size: 'lg' })}
        >
          {isSubmitting ? (
            <RiLoader4Line aria-hidden className="animate-spin text-lg" />
          ) : (
            <RiSendPlaneLine aria-hidden className="text-lg" />
          )}
          {isSubmitting ? 'Envoi…' : 'Envoyer le message'}
        </button>
        <p className="text-xs text-muted sm:max-w-56">
          Protégé par reCAPTCHA (
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            confidentialité
          </a>
          ,{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            conditions
          </a>{' '}
          de Google).
        </p>
      </div>
    </form>
  )
}

type FieldControlProps = { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string
  error?: FieldError
  className?: string
  children: (props: FieldControlProps) => ReactNode
}) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-semibold">
        {label}
      </label>
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
      })}
      {error?.message && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-[#c2410c]">
          {error.message}
        </p>
      )}
    </div>
  )
}
