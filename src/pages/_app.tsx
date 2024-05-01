import * as React from "react";
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SiteContextProvider } from '@lib/context';
import Site from '@views/site';

import '@styles/index.css';
import '@styles/app.css';

const App: React.FC<AppProps> = ({ Component, router, pageProps }: AppProps): any => {
  
  return (
    <ThemeProvider enableSystem={false} disableTransitionOnChange>
      <SiteContextProvider>
        <Site Component={Component} router={router} pageProps={pageProps} />
      </SiteContextProvider>
    </ThemeProvider>
  );
}

export default App