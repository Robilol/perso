import React, { createContext, useEffect, useState, useCallback } from 'react';

interface ReCaptchaContextValue {
  executeRecaptcha: ((action?: string) => Promise<string>) | undefined;
}

export const ReCaptchaContext = createContext<ReCaptchaContextValue>({
  executeRecaptcha: undefined,
});

interface ReCaptchaProviderProps {
  reCaptchaKey: string;
  language?: string;
  children: React.ReactNode;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const ReCaptchaProvider: React.FC<ReCaptchaProviderProps> = ({
  reCaptchaKey,
  language = 'fr',
  children,
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Vérifier si le script est déjà chargé
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        setIsReady(true);
      });
      return;
    }

    // Charger le script reCAPTCHA
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${reCaptchaKey}&hl=${language}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsReady(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      // Nettoyer le script lors du démontage
      const scriptElement = document.querySelector(`script[src^="https://www.google.com/recaptcha/api.js"]`);
      if (scriptElement) {
        scriptElement.remove();
      }

      // Nettoyer les éléments du badge reCAPTCHA
      const badge = document.querySelector('.grecaptcha-badge');
      if (badge && badge.parentNode) {
        badge.parentNode.removeChild(badge);
      }
    };
  }, [reCaptchaKey, language]);

  const executeRecaptcha = useCallback(
    async (action: string = 'submit'): Promise<string> => {
      if (!isReady) {
        throw new Error('reCAPTCHA not ready yet');
      }

      try {
        const token = await window.grecaptcha.execute(reCaptchaKey, { action });
        return token;
      } catch (error) {
        console.error('Error executing reCAPTCHA:', error);
        throw error;
      }
    },
    [isReady, reCaptchaKey]
  );

  return (
    <ReCaptchaContext.Provider value={{ executeRecaptcha: isReady ? executeRecaptcha : undefined }}>
      {children}
    </ReCaptchaContext.Provider>
  );
};
