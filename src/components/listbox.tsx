import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import cx from 'classnames';
import RadioGroup from '@components/radio-group';
import RadioItem from '@components/radio-item';
import { Obj } from '@typograph/types';

interface Props {
  id?: string | number;
  name?: string;
  label?: string;
  before?: any;
  after?: any;
  options: Obj[] | Obj;
  activeOption: string;
  onChange: (values?: Obj[]) => void;
};

const Listbox = ({
  id,
  name,
  label,
  before,
  after,
  options,
  activeOption,
  onChange = () => {},
}: Props) => {
  const groupRef = useRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // @ts-ignore
  const { 0: defaultOption } = options;
  const currentOption = options.find((option: Obj) => option?.slug === activeOption) || defaultOption

  const handleOnChange = (value?: any) => {
    onChange([{ name, value }]);
    setIsOpen(false);
  }

  const onOutsideClick = (e: Obj) => {
    // @ts-ignore
    if (groupRef?.current?.contains(e?.target)) {
      return;
    }

    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    let flag = false

    switch (e.code) {
      case 'Escape': {
        setIsOpen(false)
        flag = true
        break
      }

      default:
        break
    }

    if (flag) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', onOutsideClick);

    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // @ts-ignore
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      // @ts-ignore
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  return (
    // @ts-ignore 
    <div ref={groupRef as React.MutableRefObject<HTMLDivElement>} className="listbox">
      <span id={`${id}-label`} className="sr-only">
        {label}
      </span>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cx('listbox--btn', { 'is-open': isOpen })}
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label`}
      >
        {before}
        {currentOption?.title}
        {after}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <FocusTrap
            focusTrapOptions={{
              clickOutsideDeactivates: true,
              preventScroll: true,
            }}
          >
            <div className="listbox--content">
              <m.div
                initial="hide"
                animate="show"
                exit="hide"
                variants={{
                  show: {
                    y: '0%',
                  },
                  hide: {
                    y: '-120%',
                  },
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="listbox--dropdown"
              >
                <RadioGroup
                  value={currentOption.slug}
                  onChange={(value?: any) => handleOnChange(value)}
                  role="listbox"
                  className="listbox--options is-inverted"
                >
                  {options.map((option: Obj, key: string | number) => {
                    return (
                      <RadioItem
                        key={key}
                        value={option?.slug}
                        role="option"
                        aria-selected={
                          option?.slug === currentOption?.slug ? 'true' : 'false'
                        }
                        className={cx('listbox--item', {
                          'is-active': option.slug === currentOption.slug,
                        })}
                      >
                        {option?.title}
                      </RadioItem>
                    )
                  })}
                </RadioGroup>
              </m.div>
            </div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Listbox
