import { useRef, useEffect } from 'react';
import { wrap } from '@lib/helpers';
import { useRadioGroupContext, useRadioItemContext } from '@components/radio-group';

interface Props {
  key?: string | number;
  title?: string; 
  role?: string;
  'aria-selected'?: 'true' | 'false';
  className?: string;
  value: string | number; 
  children?: React.ReactNode;
}

const RadioItem: React.FC<any> = ({ title, value, children, ...rest }: Props) => {
  const groupContext = useRadioGroupContext();
  const itemContext = useRadioItemContext();

  const isChecked: boolean = groupContext.value === value;
  const itemRef = useRef();
  const isInitialMount = useRef<boolean>(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if ((isChecked) && (itemRef.current != undefined)) {
      // @ts-ignore
      itemRef.current?.focus({ preventScroll: true });
    }
  }, [isChecked]);

  function handleClick() {
    groupContext?.onChange(value)
  }

  function handleKeyDown(ev: React.KeyboardEvent) {
    const { items, onChange } = groupContext;
    const index = itemContext;

    let flag = false

    // listen for one of our key presses
    switch (ev.code) {
      case 'Space':
      case 'Enter': {
        onChange(value);
        flag = true;
        break;
      }

      case 'ArrowUp':
      case 'ArrowLeft': {
        onChange(items[wrap(index - 1, items.length)].props.value);
        flag = true;
        break;
      }

      case 'ArrowDown':
      case 'ArrowRight': {
        onChange(items[wrap(index + 1, items.length)].props.value);
        flag = true;
        break;
      }

      default:
        break;
    }

    // if one of our keys were pressed (flagged), prevent default behavior
    if (flag) {
      ev?.stopPropagation();
      ev?.preventDefault();
    }
  }

  return (
    <button
      // @ts-ignore
      ref={itemRef}
      role="radio"
      title={title}
      tabIndex={isChecked ? 0 : -1}
      aria-checked={isChecked}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </button>
  )
}

export default RadioItem;