import { useEffect, useMemo } from 'react';
//import { SSRProvider, OverlayProvider } from 'react-aria';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import { SiteContextProvider } from '@lib/context';
import { isBrowser, useScrollRestoration } from '@lib/helpers';
import { pageTransitionSpeed } from '@lib/animate';
import { useSiteContext, useTogglePageTransition } from '@lib/context';
import NProgress from '@components/nprogress';
import ResizeHandler from '@components/resize-handler';
import { Obj } from '@types';

import '@styles/global.css';
import '@styles/nprogress.css';
import '@styles/chrome-bug.css';
//import "../styles/index.css";

//import '@styles/tailwind.css';
//import '@styles/app.css';

if (isBrowser) {
  console.groupCollapsed(
    '%c?? Site Credits',
    'display:block;padding:0.125em 1em;font-family:courier;font-size:14px;font-weight:bold;line-height:2;text-transform:uppercase;background:black;color:white;'
  )
  console.log(
    '%cDesign by Nick DiMatteo \n��https://nickdimatteo.com',
    'display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;'
  )
  console.log(
    '%cDevelopment by Nick DiMatteo \n��https://nickdimatteo.com',
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
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(() => togglePageTransition(false), pageTransitionSpeed)
    })

    Router.events.on('routeChangeError', () => {
      togglePageTransition(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // intelligently add focus states if keyboard is used
  const handleFirstTab = (event: React.KeyboardEvent<any>) => {
    if (event?.keyCode === 9) {
      if (isBrowser) {
        document.body.classList.add('is-tabbing');

        // @ts-ignore
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
  }

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('keydown', handleFirstTab);
    return () => {
      // @ts-ignore
      window.removeEventListener('keydown', handleFirstTab);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageID = useMemo(() => data?.page?.id, [data]);

  return (
    <SiteContextProvider>
      <LazyMotion features={domAnimation}>
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            document.body.classList.remove('overflow-hidden')
          }}
        >
          <AnyComponent key={pageID} {...pageProps} />
        </AnimatePresence>
      </LazyMotion>
    </SiteContextProvider>
  );
}

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <ThemeProvider enableSystem={false} disableTransitionOnChange>
      {/* @ts-ignore */}
      <HMSRoomProvider>
        <Site Component={Component} router={router} pageProps={pageProps} />
        <ResizeHandler />
        <NProgress />
      </HMSRoomProvider>
    </ThemeProvider>
  );
}