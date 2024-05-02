import { useMemo } from 'react';
import { AppProps } from 'next/app';
import Cart from '@components/cart';
import StoreComponent from '@components/shop/store';
import { Obj } from '@typograph/types';


const Shop: React.FC<AppProps> = ({ pageProps }: AppProps) => {
  const { data }: Obj = pageProps;

  const pageID = useMemo(() => data?.page?.id, [data]);

  return (
    <>
      <StoreComponent key={pageID} {...pageProps} />
      <Cart data={{ ...data?.site }} />
    </>
  );
}

export default Shop;