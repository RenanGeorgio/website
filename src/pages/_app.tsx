import { AppProps } from 'next/app';
import type { AppInitialProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SiteContextProvider } from '@lib/context';
import Site from '@views/site';
import { Obj } from '@typograph/types';

import '@styles/index.css';
import '@styles/tailwind.css';
import '@styles/app.css';


const App: React.FC<AppProps> = ({ Component, router, pageProps }: AppProps) => {
  const { data }: AppProps<Obj extends AppInitialProps> = pageProps as Obj;

  return (
    <ThemeProvider enableSystem={false} disableTransitionOnChange>
      <SiteContextProvider data={{ ...data?.site }}>
        <Site Component={Component} router={router} pageProps={...pageProps} />
      </SiteContextProvider>
    </ThemeProvider>
  )
}

export default App