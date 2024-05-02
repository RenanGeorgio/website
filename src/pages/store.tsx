import { useEffect } from 'react';
import { AppProps } from 'next/app';
import type { AppInitialProps } from 'next/app';
import { ShopContextProvider } from '@lib/context';
import Shop from '@views/shop';
import { getStaticShopPage } from '@data/cms-api';
import { queries } from '@lib/cms-providers/dato';
import { Obj } from '@typograph/types';

interface Props extends AppProps {
  site: Obj;
  page: Obj;
  children?: React.ReactNode;
}

const Store: React.FC<Props> = ({ Component, router, pageProps, site, page }: Props): any => {
  // @ts-ignore
  const { data }: AppProps<AppInitialProps> = pageProps as any;

  useEffect(() => {
    pageProps['data'] = data;
  },[data, pageProps]);

  useEffect(() => {
    if (data != undefined) {
      data['site'] = site;
      data['page'] = page;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <ShopContextProvider data={{ ...data?.site }}>
      <Shop Component={Component} router={router} pageProps={pageProps} />
    </ShopContextProvider>
  );
}

export async function getStaticProps({ preview, previewData }: any) {
  const pageData: any = await getStaticShopPage(
    `
    *[_type == "page" && _id == ${queries.homeID}] | order(_updatedAt desc)[0]{
      "id": _id,
      hasTransparentHeader,
      modules[]{
        defined(_ref) => { ...@->content[0] {
          ${queries.modules}
        }},
        !defined(_ref) => {
          ${queries.modules},
        }
      },
      title,
      seo
    }
  `,
    {
      active: preview,
      token: previewData?.token,
    }
  )

  return {
    props: {
      data: pageData,
    },
  }
}

export default Store