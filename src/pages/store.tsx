import * as React from "react";
import { AppProps } from 'next/app';
import type { AppInitialProps } from 'next/app';
import { ShopContextProvider } from '@lib/context';
import Site from '@views/site';

const Store: React.FC<AppProps> = ({ Component, router, pageProps }: AppProps): any => {
  // @ts-ignore
  const { data }: AppProps<AppInitialProps> = pageProps as any;

  return (
    <ShopContextProvider data={{ ...data?.site }}>
      <Site Component={Component} router={router} pageProps={pageProps} />
    </ShopContextProvider>
  );
}

export default Store