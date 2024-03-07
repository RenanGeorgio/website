import { DictionaryPhrases, ComponentPropsCollection, LayoutServiceData, SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import type { UrlObject } from 'url';
import { ImageElementProps, ImgProps, ImageProps } from './image.d';
import { Crop, FieldArrayHelpers } from './utils.d';
import { PhotoProps } from '../interfaces';

export type LayoutHtmlProp = 'intrinsic' | 'fixed' | 'responsive' | 'fill' | 'original';

export type LinkAppearances = 'primary' | 'secondary' | 'default';

export type Url = (URL & UrlObject) | string;

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
    url: Url;
  };
  content: string;
};

export type Obj = {
  [key: string]: any;
};

export type LinkProps = React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>

export type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
}) => (Obj | any);

export type LinkGroupType = (options?: {
  overrides?: Partial<FieldArrayHelpers>;
  appearances?: LinkAppearances[] | false;
}) => (Obj | any);

export type CMSLinkType = {
  type?: "custom" | "reference";
  url?: Url;
  newTab?: boolean;
  reference?: {
    value: string | any;
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
};

type mimeTypeObj = {
  [mimeType: string]: string[]
}

interface PhotoL extends ImageElementProps {
  alt: string;
  asset?: string[] | Obj;
  crop?: Crop;
  customRatio?: number;
  hotspot?: boolean;
  type: mimeTypeObj | string;
  aspectRatio: number;
  lqip: Url | string;
};

export type PhotoType = {
  photo: PhotoL & PhotoProps;
  width?: string | number | null;
  height?: string | number | null;
  srcSizes?: number[];
  sizes?: string;
  layout?: LayoutHtmlProp;
  quality?: number;
  hasPlaceholder?: boolean;
  forceLoad?: boolean;
  onLoad?: (e: any) => (any | Promise<any>);
  className?: string;
}