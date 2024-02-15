import { DictionaryPhrases, ComponentPropsCollection, LayoutServiceData, SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';

export type SitecorePageProps = {
  site: SiteInfo;
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  layoutData: LayoutServiceData;
};


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

export type LinkAppearances = "primary" | "secondary" | "default";

export type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
}) => (Obj | any);

export type LinkGroupType = (options?: {
  overrides?: Partial<ArrayField>;
  appearances?: LinkAppearances[] | false;
}) => (Obj | any);

export type CMSLinkType = {
  type?: "custom" | "reference";
  url?: string;
  newTab?: boolean;
  reference?: {
    value: string | Page;
    relationTo: "pages";
  };
  label?: string;
  appearance?: "default" | "primary" | "secondary";
  children?: React.ReactNode;
  className?: string;
};

export type ScriptEmbed = {
  html?: string | null;
  height?: string | number | null;
  width?: string | number | null;
  children?: React.ReactElement | React.ReactElement[];
  dataNtpc?: string;
}

export type LayoutHtmlProp = 'intrinsic' | 'fixed' | 'responsive' | 'fill' | 'original';

export type Photo = {
  photo,
  width?: string | number | null;
  height?: string | number | null;
  srcSizes: number[];
  sizes: string;
  layout: LayoutHtmlProp;
  quality: number;
  hasPlaceholder: boolean;
  forceLoad,
  onLoad,
  className: string;
}