import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useRef } from 'react'
import { AppProvider } from '../context/appContext'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ParallaxProvider } from 'react-scroll-parallax'
import 'normalize.css'
import 'nprogress/nprogress.css'
import 'swiper/css'
import 'swiper/css/navigation'
import '../styles/globals.scss'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { Analytics } from '@vercel/analytics/react'

NProgress.configure({ showSpinner: true })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp ({
  Component,
  pageProps
}) {
  const queryClientRef = useRef()

  if (!queryClientRef.current) {
    // @ts-ignore
    queryClientRef.current = new QueryClient()
  }

  return (
    <>
      <QueryClientProvider client={queryClientRef.current}>
        <AppProvider>
          <GoogleReCaptchaProvider reCaptchaKey="6LettL8iAAAAAAUJYd0V9xH_ggkmTqKGS6-sFj1O" language="fr">
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1 maximum-scale=1"
              />
              <meta name="description"
                    content="Ancien développeur Back-end j'ai décidé de passer de l'invisible au visible en me spécialisant dans le développement frontend plus particulièrement sur React.js"/>
              <meta name="robots" content="index, follow"/>
              <meta name="keywords"
                    content="Robin Regis développeur front-end developper frontend freelance react next typescript"/>
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
              <title>Robin Regis - Développeur Front-end React.js / Next.js / Typescript</title>
            </Head>
            <ParallaxProvider>
              <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
              </Hydrate>
            </ParallaxProvider>
          </GoogleReCaptchaProvider>
        </AppProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
      <Analytics/>
    </>
  )
}

export default MyApp
