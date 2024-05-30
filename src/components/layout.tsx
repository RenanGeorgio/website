import React from 'react';
import cn from 'classnames';
import { SkipNavContent } from '@reach/skip-nav';
import Footer from './footer';
import { SiteParams } from '@interfaces';

import styles from './layout.module.css';

type Props = {
  site?: SiteParams;
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
  
  return (
    <>
      <div className={styles.background}>
        {!hideNav && (
          
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