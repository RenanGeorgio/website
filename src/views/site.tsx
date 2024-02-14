import { useEffect, useMemo } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { isBrowser, useScrollRestoration } from '@lib/helpers';
import { pageTransitionSpeed } from '@lib/animate';
import { useSiteContext, useTogglePageTransition } from '@lib/context';
import Cart from '@components/cart';
import { Obj } from '@typograph/types';


if (isBrowser) {
  console.groupCollapsed(
    '%c💀 Site Credits',
    'display:block;padding:0.125em 1em;font-family:courier;font-size:14px;font-weight:bold;line-height:2;text-transform:uppercase;background:black;color:white;'
  )
  console.log(
    '%cDesign by Nick DiMatteo \n– https://nickdimatteo.com',
    'display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;'
  )
  console.log(
    '%cDevelopment by Nick DiMatteo \n– https://nickdimatteo.com',
    'display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;'
  )
  console.groupEnd()
}


const Site: React.FC<AppProps> = ({ Component, pageProps, router }: AppProps) => {
  const AnyComponent = Component as any;

  const togglePageTransition = useTogglePageTransition();
  const { isPageTransition } = useSiteContext();

  const { data }: Obj = pageProps;

  // Handle scroll position on history change
  useScrollRestoration(router, pageTransitionSpeed);

  // Trigger our loading class
  useEffect(() => {
    if (isBrowser) {
      document.documentElement.classList.toggle('is-loading', isPageTransition)
    }
  }, [isPageTransition]);

  // Setup page transition loading states
  useEffect(() => {
    Router.events.on('routeChangeStart', (_, { shallow }) => {
      // Bail if we're just changing URL parameters
      if (shallow) return

      // Otherwise, start loading
      togglePageTransition(true)
    })

    Router.events.on('routeChangeComplete', () => {
      setTimeout(() => togglePageTransition(false), pageTransitionSpeed)
    })

    Router.events.on('routeChangeError', () => {
      togglePageTransition(false)
    })
  }, []);

  // intelligently add focus states if keyboard is used
  const handleFirstTab = (event) => {
    if (event.keyCode === 9) {
      if (isBrowser) {
        document.body.classList.add('is-tabbing')
        window.removeEventListener('keydown', handleFirstTab)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab)
    return () => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, []);

  const pageID = useMemo(() => data?.page?.id, [data]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          document.body.classList.remove('overflow-hidden')
        }}
      >
        <AnyComponent key={pageID} {...pageProps} />
      </AnimatePresence>

      <Cart data={{ ...data?.site }} />
    </LazyMotion>
  )
}

export default Site