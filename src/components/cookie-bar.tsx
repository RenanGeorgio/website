import { memo, Fragment } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { useHasMounted } from '@lib/helpers';
import CustomLink from '@components/link';
import { useAcceptCookies } from '@hooks/use-accept-cookies';
import { CookieConsent } from '@types';

const barAnim = {
  show: {
    y: '0%',
    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hide: {
    y: '100%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const CookieBar = memo((data: CookieConsent) => {
  const { enabled, message, link } = data;

  if (!enabled) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hasMounted = useHasMounted();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  if (!hasMounted || !message) return null

  return (
    <AnimatePresence>
      {!acceptedCookies && (
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
          <m.div
            initial="hide"
            animate="show"
            exit="hide"
            variants={barAnim}
            role="dialog"
            aria-live="polite"
            className="cookie-bar"
          >
            <div className="cookie-bar--content is-inverted">
              <div className="cookie-bar--message">
                <p>
                  {message.split('\n')?.map((text: string, i: number) => {
                    // using React.fragment to parse line breaks
                    return (
                      <Fragment key={i}>
                        {text}
                        {message.split('\n')[i + 1] && <br />}
                      </Fragment>
                    )
                  })}
                </p>
              </div>

              <div className="cookie-bar--actions">
                {link && (
                  // @ts-ignore
                  <CustomLink
                    className="btn is-text"
                    link={{ ...{ page: link }, ...{ title: 'Learn More' } }}
                  />
                )}
                <button
                  onClick={() => onAcceptCookies()}
                  className="btn is-primary"
                >
                  Accept
                </button>
              </div>
            </div>
          </m.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  )
})

export default CookieBar;