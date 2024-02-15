import { AnimatePresence, m } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { useHasMounted } from '@lib/helpers';
import CustomLink from '@components/link';
import { useAcceptCookies } from '@hooks';
import type { UrlObject } from 'url';
import { Obj } from '@typograph/types';

type Url = UrlObject | string;

interface Props extends Obj {
  enabled: boolean;
  message: string;
  link: Url;
}

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

const CookieBar = React.memo(({ data = {} }: Props) => {
  const { enabled, message, link } = data;

  if (!enabled) return null

  const hasMounted = useHasMounted();
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
                  {message.split('\n').map((text, i) => {
                    // using React.fragment to parse line breaks
                    return (
                      <React.Fragment key={i}>
                        {text}
                        {message.split('\n')[i + 1] && <br />}
                      </React.Fragment>
                    )
                  })}
                </p>
              </div>

              <div className="cookie-bar--actions">
                {link && (
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