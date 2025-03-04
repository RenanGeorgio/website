import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useInView } from 'react-cool-inview';
import { useRect } from '@reach/rect';
import cn from 'classnames';
import { Button, Link as ChakraLink } from '@chakra-ui/react';
import { NAVIGATION } from '@assets/constants';
import { IconCompany } from '@components/icons';
import { SiteParams } from '@interfaces';

import styles from './header.module.css';

interface Props {
  data?: SiteParams["header"];
  isTransparent?: boolean;
  onSetup?: (height?: any) => void;
  hero?: React.ReactNode;
  isLive?: boolean;
  description?: React.ReactNode;
};

const Header: React.FC<any> = ({ onSetup, hero, description, isLive = false }: Props) => {
  const router = useRouter();
  const activeRoute = router.asPath;
  const disableCta = ['/schedule', '/speakers', '/expo', '/jobs'];

  const [headerHeight, setHeaderHeight] = useState<string | number | undefined>(undefined);

  const { observe, inView: observerIsVisible } = useInView();

  const headerRef: React.MutableRefObject<HTMLDivElement | undefined> = useRef<HTMLDivElement | undefined>(undefined);
  const headerRect: any = useRect(headerRef);

  useEffect(() => {
    if (headerRect) {
      setHeaderHeight(headerRect?.height);
    }
  }, [headerRect]);

  useEffect(() => {
    if (onSetup != undefined) {
      onSetup({ height: headerHeight });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerHeight]);

  return (
    <>
      <header className={cn(styles.header)}>
        <div className={styles['header-logos']}>
          {router.pathname === '/' ? (
            <button
              className={styles.logo}
              aria-label="Go Home"
              onClick={() => window.scrollTo(0, 0)}
            >
              <IconCompany />
            </button>
          ) : (
            <Link href="/" className="hover:underline" scroll={false}>
              {/* eslint-disable-next-line */}
              <a className={styles.logo} aria-label="Go Home">
                <IconCompany />
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

        {!disableCta.includes(activeRoute) || activeRoute === '/' ? (
          <div className={cn(styles['header-right'])}>
            <Button
              as={ChakraLink}
              href="mailto:contato@diamondbigger.com"
              colorScheme="yellow"
              variant="outline"
              fontWeight={700}
            >
              Entrar em contato
            </Button>
            {/*{activeRoute === '/' ? <DemoButton /> : <RoomCta />}*/}
          </div>
        ) : (
          <div />
        )}
      </header>

      <span ref={observe} className="header--observer" />
    </>
  );
}

export default Header