import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ParallaxProvider } from 'react-scroll-parallax';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Analytics } from '@vercel/analytics/react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import 'normalize.css';
import 'nprogress/nprogress.css';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/globals.scss';

NProgress.configure({ showSpinner: true });
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp ({
  Component,
  pageProps
}: AppProps) {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GoogleReCaptchaProvider
          reCaptchaKey="6LettL8iAAAAAAUJYd0V9xH_ggkmTqKGS6-sFj1O"
          language="fr"
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1 maximum-scale=1"
            />
            <meta
              name="description"
              content="Développeur Full Stack passionné par la création de produits, je combine expertise technique React.js et vision stratégique pour transformer vos idées en solutions concrètes. Actuellement disponible pour de nouveaux projets."
            />
            <meta name="robots" content="index, follow"/>
            <meta
              name="keywords"
              content="Robin Regis développeur full-stack full stack front end developper frontend freelance react next typescript node"
            />
            <meta name="author" content="Robin Regis"/>
            <meta name="theme-color" content="#72E2AE"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <link rel="manifest" href="/manifest.json"/>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <title>Robin Regis - Développeur full-stack React.js / Next.js / Node.js / Typescript</title>
          </Head>
          <ParallaxProvider>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </HydrationBoundary>
          </ParallaxProvider>
        </GoogleReCaptchaProvider>
      </QueryClientProvider>
      <Analytics/>
    </>
  )
}
