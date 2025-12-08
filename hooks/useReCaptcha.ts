import { useContext } from 'react';
import { ReCaptchaContext } from '../contexts/ReCaptchaContext';

export const useReCaptcha = () => {
  const context = useContext(ReCaptchaContext);

  if (context === undefined) {
    throw new Error('useReCaptcha must be used within a ReCaptchaProvider');
  }

  return context;
};
