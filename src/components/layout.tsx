import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import { SkipNavContent } from '@reach/skip-nav';
import { NAVIGATION } from '@assets/constants';
import Logo from './icons/icon-logo';
//import MobileMenu from './mobile-menu';
import Footer from './footer';
import DemoButton from './hms/demo-cta';
import RoomCta from './hms/demo-cta/room-cta';
import { hmsConfig } from './hms/config';

import styles from './layout.module.css';
import { SiteParams } from '@interfaces';

type Props = {
  site: SiteParams;
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
  isLive?: boolean;
};

export default function Layout({
  site,
  children,
  className,
  hideNav,
  layoutStyles,
  isLive = false
}: Props) {
  const router = useRouter();
  const activeRoute = router.asPath;
  const disableCta = ['/schedule', '/speakers', '/expo', '/jobs'];
  return (
    <>
      <div className={styles.background}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles['header-logos']}>
              {router.pathname === '/' ? (
                <button
                  className="logo--link"
                  aria-label="Go Home"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <Logo />
                </button>
              ) : (
                <Link href="/" className="hover:underline" scroll={false}>
                  {/* eslint-disable-next-line */}
                  <a className={styles.logo} aria-label="Go Home">
                    <Logo />
                  </a>
                </Link>
              )}
            </div>
            <div className={styles.tabs}>
              {NAVIGATION?.map(({ name, route }) => (
                <a
                  key={name}
                  href={route}
                  className={cn(styles.tab, {
                    [styles['tab-active']]: activeRoute.startsWith(route)
                  })}
                >
                  {name}
                </a>
              ))}
            </div>

            {(hmsConfig.hmsIntegration && isLive && !disableCta.includes(activeRoute)) ||
            activeRoute === '/' ? (
              <div className={cn(styles['header-right'])}>
                {activeRoute === '/' ? <DemoButton /> : <RoomCta />}
              </div>
            ) : (
              <div />
            )}
          </header>
        )}
        <div className={styles.page}>
          <main className={styles.main} style={layoutStyles}>
            <SkipNavContent />
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          <Footer data={site?.footer} />
        </div>
      </div>
    </>
  );
}