import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { m } from 'framer-motion';
import cn from 'classnames';
import { isBrowser, isMobileSafari, useWindowSize } from '@lib/helpers';
import { pageTransitionSpeed } from '@lib/animate';
import CookieBar from './cookie-bar'
import Header from './header'
import Alert from './alert';
import Footer from './footer';
import Meta from './meta';
import { Obj, CookieConsent } from '@types';
import { SiteParams } from '@interfaces';

interface Props {
  site: SiteParams;
  page: Obj;
  schema?: any;
  preview?: boolean;
  children?: React.ReactNode;
  fullViewport?: boolean;
};

const pageTransitionAnim = {
  show: {
    opacity: 1,
    transition: {
      duration: pageTransitionSpeed / 1000,
      delay: 0.2,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: pageTransitionSpeed / 1000,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
}

const Page: React.FC<any> = ({ site, page, schema, preview, children, fullViewport = false }: Props): JSX.Element => {
  const { height: windowHeight } = useWindowSize();
  const [lockHeight, setLockHeight] = useState<boolean>(false);
  const hasChin: boolean | undefined = isMobileSafari();

  // set header height
  const [headerHeight, setHeaderHeight] = useState<number | string | null>(null);

  useEffect(() => {
    if ((isBrowser && !lockHeight) || !hasChin) {
      document.body.style.setProperty('--vh', `${windowHeight * 0.01}px`);

      if (hasChin != undefined) {
        setLockHeight(hasChin);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowHeight, hasChin]);

  return (
    <div className={cn('page-container', { full: fullViewport })}>
      <Meta site={site} page={page} schema={schema} />
      {site?.gtmID && (
        <Script
          id="gtm"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${site?.gtmID}');`,
          }}
        />
      )}
      <m.div 
        className="min-h-screen"
        key={page?.id}
        initial="hide"
        animate="show"
        exit="hide"
        variants={pageTransitionAnim}
        // @ts-ignore
        style={headerHeight ? { '--headerHeight': `${headerHeight}px` } : null}
      >
        <Alert preview={preview} />
        {/*@ts-ignore*/}
        <CookieBar data={site?.cookieConsent as CookieConsent} />
        <Header
          data={site?.header}
          isTransparent={page?.hasTransparentHeader}
          onSetup={(height: number | string) => setHeaderHeight(height)}
        />
        <main id="content">{children}</main>
      </m.div>
      <Footer data={site?.footer} />
    </div>
  );
};

export default Page;