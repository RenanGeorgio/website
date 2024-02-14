//import {
//  DictionaryPhrases,
//  ComponentPropsCollection,
//  LayoutServiceData,
//  SiteInfo,
//} from "@sitecore-jss/sitecore-jss-nextjs";

/**
 * Sitecore page props
 */
/*export type SitecorePageProps = {
  site: SiteInfo;
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  layoutData: LayoutServiceData;
};*/


export type Author = {
    name: string;
    picture: string;
};

export type PostType = {
    slug: string;
    title: string;
    date: string;
    coverImage: string;
    author: Author;
    excerpt: string;
    ogImage: {
      url: string;
    };
    content: string;
};

export type Obj = {
  [key: string]: any;
} 