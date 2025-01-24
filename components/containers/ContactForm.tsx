import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { settings } from '../../settings/settings';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { BiLoaderAlt } from 'react-icons/bi';

interface FormData {
  from_name: string
  subject: string
  reply_to: string
  message: string
}

const ContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const [serverSuccess, setServerSuccess] = useState<boolean | string>(false)
  const [serverError, setServerError] = useState<boolean | string>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available')
      return
    }

    const token = await executeRecaptcha()

    return token
    // Do whatever you want with the token
  }, [executeRecaptcha])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    const token = await handleReCaptchaVerify()

    if (!token) {
      setServerError('Une erreur est survenue avec le captcha')
      return
    }

    emailjs
      .send(
        settings.emailjs_serviceid,
        settings.emailjs_templateid,
        data as any,
        settings.emailjs_publickey
      )
      .then(
        (result) => {
          if (result.status === 200 && result.text) {
            setServerError(false)
            setServerSuccess('Email envoyé avec succès !')
          }
          setLoading(false)
        },
        (error) => {
          setServerSuccess(false)
          console.log(error)
          setServerError('Une erreur est survenue pendant l\'envoi du message!')
          setLoading(false)
        }
      )
  }

  return (
    <form
      className="card -mt-1.5  space-y-4 p-4 md:p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="inputbox">
        <label htmlFor="from_name">Nom</label>
        <input
          type="text"
          placeholder="Votre nom"
          id="from_name"
          {...register('from_name', { required: true })}
        />
        {errors.from_name && (
          <>
            {errors.from_name.type === 'required' && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Le nom est obligatoire
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="reply_to">Email</label>
        <input
          type="email"
          placeholder="Votre email"
          id="reply_to"
          {...register('reply_to', {
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        {errors.reply_to && (
          <>
            {errors.reply_to.type === 'required' && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                L'email est obligatoire
              </p>
            )}
            {errors.reply_to.type === 'pattern' && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Adresse email incorrecte
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="subject">Sujet</label>
        <input
          type="text"
          placeholder="Votre sujet"
          id="subject"
          {...register('subject', { required: true })}
        />
        {errors.subject && (
          <>
            {errors.subject.type === 'required' && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Le sujet est obligatoire
              </p>
            )}
          </>
        )}
      </div>
      <div className="inputbox">
        <label htmlFor="message">Message</label>
        <textarea
          placeholder="Votre message"
          cols={1}
          rows={5}
          id="message"
          {...register('message', { required: true })}
        />
        {errors.message && (
          <>
            {errors.message.type === 'required' && (
              <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                Le message est obligatoire
              </p>
            )}
          </>
        )}
      </div>
      {!serverSuccess && serverError && (
        <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
          {serverError}
        </p>
      )}
      {!serverError && serverSuccess && (
        <p className="bg-green-500 bg-opacity-5 text-center text-sm text-green-500">
          {serverSuccess}
        </p>
      )}
      <button type="submit" className="btn flex flex-row items-center gap-2 transition-all disabled:pointer-events-none"
              disabled={loading}>
        {loading && (
          <BiLoaderAlt className="w-5 h-5 animate-spin"/>
        )}
        <span>Envoyer</span>
      </button>
    </form>
  )
}

export default ContactForm
