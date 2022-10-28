import {useCallback, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import emailjs from "@emailjs/browser";
import {settings} from "../../settings/settings";
import {GoogleReCaptcha, GoogleReCaptchaProvider, useGoogleReCaptcha} from "react-google-recaptcha-v3";

const ContactForm = () => {
  const currentForm = useRef();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [serverSuccess, setServerSuccess] = useState<boolean | string>(false);
  const [serverError, setServerError] = useState<boolean | string>(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();


  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha();

    return token
    // Do whatever you want with the token
  }, [executeRecaptcha]);


  const onSubmit = async (data) => {
    const token = await handleReCaptchaVerify()

    if (!token) {
      setServerError("Une erreur est survenue avec le captcha");
      return
    }

    emailjs
      .sendForm(
        settings.emailjs_serviceid,
        settings.emailjs_templateid,
        currentForm.current,
        settings.emailjs_publickey
      )
      .then(
        (result) => {
          if (result.status === 200 && result.text) {
            setServerError(false);
            setServerSuccess("Email envoyé avec succès !");
          }
        },
        (error) => {
          setServerSuccess(false);
          setServerError("Une erreur est survenue pendant l'envoi du message!");
        }
      );
  };

  return (
      <form
        ref={currentForm}
        className="card -mt-1.5  space-y-4 p-4 md:p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="inputbox">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            placeholder="Votre nom"
            id="name"
            {...register("name", {required: true})}
          />
          {errors.name && (
            <>
              {errors.name.type === "required" && (
                <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                  Le nom est obligatoire
                </p>
              )}
            </>
          )}
        </div>
        <div className="inputbox">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Votre email"
            id="email"
            {...register("email", {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
          />
          {errors.email && (
            <>
              {errors.email.type === "required" && (
                <p className="bg-red-500 bg-opacity-5 text-center text-sm text-red-500">
                  L'email est obligatoire
                </p>
              )}
              {errors.email.type === "pattern" && (
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
            {...register("subject", {required: true})}
          />
          {errors.subject && (
            <>
              {errors.subject.type === "required" && (
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
            {...register("message", {required: true})}
          />
          {errors.message && (
            <>
              {errors.message.type === "required" && (
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
        <button type="submit" className="btn">
          <span>Envoyer</span>
        </button>
      </form>
  );
};

export default ContactForm;
