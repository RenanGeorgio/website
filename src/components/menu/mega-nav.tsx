/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import { m } from 'framer-motion';
import { useRect } from '@reach/rect';
import cx from 'classnames';
import { isBrowser } from '@lib/helpers';
import { swipeAnim } from '@lib/animate';
import { useSiteContext, useToggleMegaNav } from '@lib/context';
import Menu from './menu';
import { Obj } from '@types';

interface Props {
  items: Obj[] | [];
  headerHeight?: number;
}

const MegaNavigation = ({ items, headerHeight }: Props) => {
  const dropdowns = items.filter((item) => {
    return 'dropdownItems' in item
  });

  if (!dropdowns.length) {
    return null;
  }

  const toggleMegaNav = useToggleMegaNav();
  const { meganav } = useSiteContext();
  const activeNav = useRef();
  const activeNavRect = useRect(activeNav, { observe: true });
  const [hasFocus, setHasFocus] = useState(false);

  const handleKeyDown = (e: Obj) => {
    if (e?.which === 27) {
      toggleMegaNav(false);
    }
  }

  useEffect(() => {
    if (isBrowser) {
      document.body.classList.toggle('overflow-hidden', meganav?.isOpen)
    }
  }, [meganav?.isOpen]);

  return (
    <>
      <FocusTrap
        active={meganav.isOpen && hasFocus}
        focusTrapOptions={{ allowOutsideClick: true }}
      >
        {/* @ts-ignore */}
        <div ref={!meganav.isOpen ? activeNav : null} className="mega-nav" onKeyDown={(e) => handleKeyDown(e)}>
          {dropdowns?.map((dropdown, key) => {
            const isActive =meganav.isOpen && meganav.activeID === dropdown._key
            return (
              // @ts-ignore
              <div key={key} ref={isActive ? (ref) => (activeNav.current = ref) : null} id={`meganav-${dropdown._key}`} className={cx('mega-item', {'is-active': isActive})}>
                <div className="mega-item--outer">
                  <div className="mega-item--inner">
                    <m.div
                      initial="hide"
                      animate={isActive ? 'show' : 'hide'}
                      onAnimationComplete={(v) => setHasFocus(v === 'show')}
                      variants={swipeAnim}
                      className="mega-item--content"
                    >
                      <Menu
                        items={dropdown.dropdownItems}
                        hasFocus={hasFocus && isActive}
                        onClick={() => toggleMegaNav(false)}
                      />

                      {dropdown.featured && (
                        <div className="mega-item--featured">
                          <div className="mega-item--featured-title">
                            <span>Featured</span>
                          </div>
                        </div>
                      )}
                    </m.div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </FocusTrap>
      {/* @ts-ignore */}
      <div className={cx('mega-nav--bg')} style={{'--h': meganav.isOpen ? activeNavRect?.height + headerHeight : 0,'--hpx': `${meganav.isOpen ? activeNavRect?.height + headerHeight : 0}px`}}/>
      <div className="mega-nav--border" />
      <div
        className={cx('mega-nav--backdrop', {
          'is-active': meganav.isOpen,
        })}
        onClick={() => toggleMegaNav(false)}
      />
    </>
  );
}

export default MegaNavigation