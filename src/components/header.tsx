import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useInView } from 'react-cool-inview';
import { useRect } from '@reach/rect';
import { Flex, HStack, Box, IconButton, Button, Link as ChakraLink, useDisclosure } from '@chakra-ui/react';
import cn from 'classnames';
import { isBrowser } from '@lib/helpers';
import { NAVIGATION } from '@assets/constants';
import { HamburgerIcon, IconCompany } from '@components/icons';
import DemoButton from './hms/demo-cta';
import RoomCta from './hms/demo-cta/room-cta';
import { hmsConfig } from './hms/config';
import { SiteParams } from '@interfaces';

import styles from './header.module.css';
import { CloseIcon } from '@assets/icons';
import { MobileMenu } from './common/Header/MobileMenu';

interface Props {
  data?: SiteParams["header"];
  isTransparent?: boolean;
  onSetup?: (height?: any) => void;
  hero?: React.ReactNode;
  isLive?: boolean;
  description?: React.ReactNode;
};

const Header: React.FC<any> = ({ data , isTransparent, onSetup, hero, description, isLive = false }: Props) => {
  const router = useRouter();
  const activeRoute = router.asPath;
  const disableCta = ['/schedule', '/speakers', '/expo', '/jobs'];

  const [headerHeight, setHeaderHeight] = useState<string | number | undefined>(undefined);

  const { observe, inView: observerIsVisible } = useInView();
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isMobileMenuOpen, onToggle: onMobileMenuToggle } = useDisclosure();

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
    <Flex pos="relative" zIndex={10} w="full">
      <header className={cn(styles.header)}>
        <div ref={headerRef as React.MutableRefObject<HTMLDivElement>} className="header--outer">
          <HStack
            as="header"
            aria-label="Main navigation"
            maxW="7xl"
            w="full"
            mx="auto"
            px={{ base: '6', md: '8' }}
            py="4"
            justify="space-between"
          >
            <div className={styles['header-logos']}>
              <Flex
                align="center"
                justify="space-between"
                className="nav-content__mobile"
              >
                {router.pathname === '/' ? (
                  <button
                    className="logo--link"
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
              </Flex>
              <Box display={['block', 'block', 'none']}>
                <IconButton
                  aria-label={'Open menu'}
                  icon={
                    isMobileMenuOpen ? (
                      <CloseIcon boxSize="20px" />
                    ) : (
                      <HamburgerIcon boxSize="20px" />
                    )
                  }
                  variant="ghost"
                  colorScheme="gray"
                  onClick={onMobileMenuToggle}
                />
                <MobileMenu isOpen={isMobileMenuOpen} />
              </Box>
            </div>
            <div className={styles.tabs}>
              <HStack as="nav" spacing={4} display={['none', 'none', 'flex']}>
                {NAVIGATION?.map(({ name, route }) => (
                  <Button
                    as={ChakraLink}
                    href={route}
                    className={cn(styles.tab, {[styles['tab-active']]: activeRoute.startsWith(route)})}
                  >
                    {name}
                  </Button>
                ))}
              </HStack>
            </div>

            {(hmsConfig.hmsIntegration && isLive && !disableCta.includes(activeRoute)) ||
              activeRoute === '/' ? (
                <div className={cn(styles['header-right'])}>
                  {activeRoute === '/' ? <DemoButton /> : <RoomCta />}
                </div>
            ) : (
              <div />
            )}
          </HStack>
        </div>
      </header>

      <span ref={observe} className="header--observer" />
    </Flex>
  );
}

export default Header