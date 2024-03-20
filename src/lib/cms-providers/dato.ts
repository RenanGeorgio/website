import { gql, GraphQLClient } from 'graphql-request';
import * as queries from '@data/queries';
import { Obj } from '@typograph/types';
import { Page } from '@typograph/interfaces';
import { ProductProp, CollectionGridProps } from '@typograph/types/queries';
import { fetchCmsEntityAPI } from './entity/twins';

const API_URL = 'https://graphql.datocms.com/';

async function fetchCmsAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DATOCMS_READ_ONLY_API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllDocSlugsSchema(doc: string): Promise<any[]> {
  const query: string = gql`
  {
    *[_type == "${doc}" && !(_id in [${queries.homeID}, ${queries.shopID}, ${queries.errorID}]) && wasDeleted != true && isDraft != true] {
      "slug": slug.current
    }
   }
  `
  const fetchApi: Obj = fetchCmsEntityAPI();
  // @ts-ignore
  const { allDocsModels }: any[] = await fetchApi?.request(query);
  
  return allDocsModels;  
}

export async function getAllRedirectsSchema(): Promise<any> {
  const data = await fetchCmsAPI(`
    {
      redirect {
        from
        to
      }
    }
  `);

  return data.allRedirects;
}

export async function getStaticPageSchema(pageData: any, preview: Obj): Promise<any> {
  const query: string = gql`
  {
    "page": ${pageData},
    ${queries.site}
  }
  `
  const fetchApi: Obj = fetchCmsEntityAPI();
  // @ts-ignore
  const { staticPage }: any = await fetchApi?.request(query);
  
  return staticPage;
}

export async function getPageSchema(slug: any, preview: any): Promise<Page> {
  const slugs = JSON.stringify([slug, `/${slug}`, `/${slug}/`]);

  const query: string = gql`
  {
    "page": *[_type == "page" && slug.current in ${slugs}] | order(_updatedAt desc)[0]{
      id,
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
    ${queries.site}
  }
  `
  const fetchApi: Obj = fetchCmsEntityAPI();
  // @ts-ignore
  const { page }: Page = await fetchApi?.request(query);
  
  return page;
}

export async function getProductSchema(slug: any, preview: any): Promise<ProductProp> {
  const query: string = gql`
  {
    "page": *[_type == "product" && slug.current == "${slug}" && wasDeleted != true && isDraft != true] | order(_updatedAt desc)[0]{
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
      "product": ${queries.product},
      title,
      seo
    },
    ${queries.site}
   }
  `
  
  const fetchApi: Obj = fetchCmsEntityAPI();
  // @ts-ignore
  const { product }: ProductProp = await fetchApi?.request(query);
  
  return product;
}

export async function getCollectionSchema(slug: any, preview: any): Promise<CollectionGridProps> {
  const query: string = gql`
  {
    "page": *[_type == "collection" && slug.current == "${slug}"] | order(_updatedAt desc)[0]{
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
      products[wasDeleted != true && isDraft != true]->${queries.product},
      title,
      seo
    },
    ${queries.site}
  }
  `
  const fetchApi: Obj = fetchCmsEntityAPI();
  // @ts-ignore
  const { collection }: CollectionGridProps = await fetchApi?.request(query);
  
  return collection;
}