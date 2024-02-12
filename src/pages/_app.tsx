import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SiteContextProvider } from '@lib/context';
import Site from '@views/site';

import '@styles/index.css';
import '@styles/tailwind.css';
import '@styles/app.css';


const App: React.FC<AppProps> = ({ Component, router, pageProps }: AppProps) => {
  const AnyComponent = Component as any;
  const { data } = pageProps;

  return (
    <ThemeProvider enableSystem={false} disableTransitionOnChange>
      <SiteContextProvider data={{ ...data?.site }}>
        <Site Component={AnyComponent} router={router} pageProps={...pageProps} />
      </SiteContextProvider>
    </ThemeProvider>
  )
}

export default App