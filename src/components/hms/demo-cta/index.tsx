import React from 'react';
import cn from 'classnames';
import * as Dialog from '@radix-ui/react-dialog';
import { CrossIcon } from '@100mslive/react-icons';
import useClickOutside from '@lib/hooks/use-click-outside';
import InfoIcon from '@components/icons/icon-info';
import DemoModal from '../demo-modal';

import styles from './index.module.css';

const DemoButton = () => {
  React.useEffect(() => {
    setTimeout(() => {
      const el = document.getElementById('cta-btn');
      el?.classList.add('show-overlay');
      const tooltip = document.getElementById('cta-tooltip');
      tooltip?.classList.add('fade-in');
    }, 3000);
  }, []);
  const ctaRef = React.useRef(null);
  const clickedOutside = () => {
    const el = document.getElementById('cta-btn');
    const tooltip = document.getElementById('cta-tooltip');
    tooltip?.remove();
    el?.classList.remove('show-overlay');
  };
  useClickOutside(ctaRef, clickedOutside);
  return (
    <Dialog.Root>
      <Dialog.Overlay className={cn(styles['overlay'])} />
      <Dialog.Trigger asChild>
        <button ref={ctaRef} id="cta-btn" className={cn(styles['cta-btn'])}>
          Agendar
        </button>
      </Dialog.Trigger>
      <div id="cta-tooltip" className={cn(styles['tooltip'])}>
        <InfoIcon />
        Entre em contato ainda hoje com a nossa equipe
      </div>
      <Dialog.Content className={cn(styles['content'], 'dialog-animation')}>
        <Dialog.Close asChild className={cn(styles['close-btn'])}>
          <button>
            <CrossIcon />
          </button>
        </Dialog.Close>
        <DemoModal />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DemoButton;