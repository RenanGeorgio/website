import type { OutgoingHttpHeaders } from 'http';

export interface LayoutProps {
    title?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    image?: string;
    children: React.ReactNode;
    loadTwitterWidget?: boolean;
};

export interface CustomTransitionOptions {
    shallow?: boolean;
    locale?: string | false;
    scroll?: boolean;
    unstable_skipClientCache?: boolean;
};

export interface CustomFetchDataOutput {
  dataHref: string;
  json: Record<string, any> | null;
  response: Response;
  text: string;
  cacheKey: string;
};
  
export interface CustomFetchNextDataParams {
  dataHref: string;
  isServerRender: boolean;
  parseJSON: boolean | undefined;
  hasMiddleware?: boolean;
  inflightCache: CustomNextDataCache;
  persistCache: boolean;
  isPrefetch: boolean;
  isBackground?: boolean;
  unstable_skipClientCache?: boolean;
};

export interface CustomNextDataCache {
    [asPath: string]: Promise<CustomFetchDataOutput>;
};

export interface ImageParamsResult {
  href: string;
  isAbsolute: boolean;
  isStatic: boolean;
  width: number;
  quality: number;
  mimeType: string;
  sizes: number[];
  minimumCacheTTL: number;
};
  
export interface ImageUpstream {
  buffer: Buffer;
  contentType: string | null | undefined;
  cacheControl: string | null | undefined;
};
  
export interface Options {
  base?: string | URL;
  headers?: OutgoingHttpHeaders;
  forceLocale?: boolean;
  nextConfig?: {
    basePath?: string;
    i18n?: any;
    trailingSlash?: boolean;
  };
  i18nProvider?: any;
};