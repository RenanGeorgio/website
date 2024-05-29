import { useState, useRef, useEffect } from 'react';
import { m } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { useInView } from 'react-cool-inview';
import { useRect } from '@reach/rect';
import cx from 'classnames';
import { isBrowser } from '@lib/helpers';
import { useSiteContext, useToggleMegaNav } from '@lib/context';
import { Menu } from '@components/menu';
import { MegaNavigation } from '@components/menu';
import { SiteParams } from '@interfaces';

import styles from './header.module.css';
import { MenuProp } from '@types';

interface Props {
  data?: SiteParams["header"];
  isTransparent?: boolean;
  onSetup?: (height?: any) => void;
  hero?: React.ReactNode;
  description?: React.ReactNode;
};

type MenuType = {
  menuDesktopLeft?: MenuProp; 
  menuDesktopRight?: MenuProp;
  menuMobilePrimary?: MenuProp; 
  menuMobileSecondary?: MenuProp;
}

const Header: React.FC<any> = ({ data , isTransparent, onSetup, hero, description }: Props) => {
  // setup states
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<string | number | undefined>(undefined);
  const [menuData, setMenuData] = useState<MenuType | undefined>(undefined);

  const { observe, inView: observerIsVisible } = useInView();

  const headerRef: React.MutableRefObject<HTMLDivElement | undefined> = useRef<HTMLDivElement | undefined>(undefined);
  const headerRect: any = useRect(headerRef);

  // setup menu toggle event
  const toggleMobileNav = (state: boolean) => {
    setMobileNavOpen(state);

    if (isBrowser) {
      document.body.classList.toggle('overflow-hidden', state);
    }
  }

  // context helpers
  const { meganav } = useSiteContext();
  const toggleMegaNav = useToggleMegaNav();

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

  useEffect(() => {
    if (data != undefined) {
      setMenuData({
        menuDesktopLeft: data?.menuDesktopLeft ? data?.menuDesktopLeft : undefined,
        menuDesktopRight: data?.menuDesktopRight ? data?.menuDesktopRight : undefined,
        menuMobilePrimary: data?.menuMobilePrimary ? data?.menuMobilePrimary : undefined, 
        menuMobileSecondary: data?.menuMobileSecondary ? data?.menuMobileSecondary : undefined
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      <header
        className={cx('header', {
          'is-overlay': isTransparent,
          'is-white': isTransparent && !meganav.isOpen && observerIsVisible,
          'has-bg': !observerIsVisible,
        })}
      >
        <h1 className={styles.hero}>{hero}</h1>
        <p className={styles.description}>{description}</p>
        <div ref={headerRef as React.MutableRefObject<HTMLDivElement>}>
          <div>
            <div>
              <nav role="navigation">
                {/* Mobile Header Menu */}
                <FocusTrap active={isMobileNavOpen}>
                  <div>
                    <button
                      onClick={() => toggleMobileNav(!isMobileNavOpen)}
                      className={cx('menu-toggle', {
                        'is-open': isMobileNavOpen,
                      })}
                      aria-expanded={isMobileNavOpen}
                      aria-controls="mobile-nav"
                      aria-label="Toggle Menu"
                    >
                      <span className="hamburger">
                        <span className="hamburger--icon"></span>
                      </span>
                    </button>
                    <m.div
                      initial="hide"
                      animate={isMobileNavOpen ? 'show' : 'hide'}
                      variants={{
                        show: {
                          x: '0%',
                        },
                        hide: {
                          x: '-100%',
                        },
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="menu-mobile"
                    >
                      <div className="menu-mobile--inner">
                        <div className="menu-mobile--primary">
                          {menuData?.menuMobilePrimary?.items && (
                            <Menu
                              items={menuData?.menuMobilePrimary.items}
                              onClick={() => toggleMobileNav(false)}
                            />
                          )}
                        </div>

                        <div className="menu-mobile--secondary">
                          {menuData?.menuMobileSecondary?.items && (
                            <Menu
                              items={menuData?.menuMobileSecondary.items}
                              onClick={() => toggleMobileNav(false)}
                            />
                          )}
                        </div>
                      </div>
                    </m.div>

                    <div
                      className={cx('menu-mobile--backdrop', {
                        'is-active': isMobileNavOpen,
                      })}
                      onClick={() => toggleMobileNav(false)}
                    />
                  </div>
                </FocusTrap>

                {/* Desktop Header Menu */}
                <div className="main-navigation--desktop">
                  <div className="menu-left">
                    {menuData?.menuDesktopLeft?.items && (
                      <Menu
                        items={menuData?.menuDesktopLeft.items}
                        onClick={() => toggleMegaNav(false)}
                        useMegaNav
                      />
                    )}
                  </div>

                  <div className="menu-right">
                    {menuData?.menuDesktopRight?.items && (
                      <Menu
                        items={menuData?.menuDesktopRight.items}
                        onClick={() => toggleMegaNav(false)}
                        useMegaNav
                      />
                    )}
                  </div>
                </div>
              </nav>
            </div>

            <div
              className={cx('header--border', {
                'is-hidden': meganav.isOpen,
              })}
            />
          </div>

          <MegaNavigation
            items={[
              ...(menuData?.menuDesktopLeft?.items || []),
              ...(menuData?.menuDesktopRight?.items || []),
            ]}
            // @ts-ignore
            headerHeight={isTransparent && observerIsVisible ? headerHeight : undefined}
          />
        </div>
      </header>

      <span ref={observe} className="header--observer" />
    </>
  )
}

export default Header