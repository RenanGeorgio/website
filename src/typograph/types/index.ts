import { VALID_DISPLAY_VALUES, VALID_LAYOUT_VALUES, VALID_LOADERS, VALID_LOADING_VALUES } from '@assets/constants';
import { PhotoL, PhotoProps, ProductProp, StaticImageData, StaticRequire } from '@interfaces';
import { ImageLoader, ImageLoaderProps } from 'next/image';
import type { UrlObject } from 'url';

type ImageLoaderPropsWithConfig = ImageLoaderProps & {config: Readonly<ImageConfig>}

type ImageLoaderWithConfig = (resolverProps: ImageLoaderPropsWithConfig) => string

export type mimeTypeObj = {
  [mimeType: string]: string[]
};

export type MenuProp = {
  items?: MenuHeader[];
};

export type LoadingValue = (typeof VALID_LOADING_VALUES)[number]

export type LoaderValue = (typeof VALID_LOADERS)[number]

export type LayoutValue = (typeof VALID_LAYOUT_VALUES)[number]

export type ImgElementStyle = NonNullable<JSX.IntrinsicElements['img']['style']>

export type ImgElementWithDataProp = HTMLImageElement & {
  'data-loaded-src': string | undefined
}

export type OnLoadingComplete = (img: HTMLImageElement) => void

export type ImageFormat = 'image/avif' | 'image/webp'

export type LayoutHtmlProp = 'intrinsic' | 'fixed' | 'responsive' | 'fill' | 'original';

export type Crop = {
  x: number | string;
  y: number | string; 
  width: number | string;
  height: number | string;
};

export type ImageMetaProps = {
  alt: string;
  asset?: string[] | Obj;
  crop?: Crop;
  customRatio?: number;
  hotspot?: boolean;
  id: number | string;
  type: mimeTypeObj | string;
  aspectRatio: number;
  lqip: Url | string;
};

export type RemotePattern = {
  protocol?: 'http' | 'https';
  hostname: string;
  port?: string | null;
  pathname?: string;
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

export type Image = {
  url: string;
  blurDataURL?: string;
};

export type Speaker = {
  name: string;
  bio: string;
  title: string;
  slug: string;
  twitter: string;
  github: string;
  company: string;
  talk: Talk;
  image: Image;
  imageSquare: Image;
};

export type Stage = {
  name: string;
  slug: string;
  stream: string;
  discord: string;
  schedule: Talk[];
  isLive: boolean;
  roomId: string;
  stagePeers: string[];
  backstagePeers: string[];
};

export type Talk = {
  title: string;
  description: string;
  start: string;
  end: string;
  speaker: Speaker[];
};

export type Url = (URL & UrlObject) | string;

export type Sponsor = {
  name: string;
  description: string;
  slug: string;
  website: string;
  callToAction: string;
  callToActionLink: string;
  links: SponsorLink[];
  discord: string;
  tier: string;
  cardImage: Image;
  logo: Image;
  youtubeSlug: string;
};

export type SponsorLink = {
  text: string;
  url: string;
};

export type Job = {
  id: string;
  companyName: string;
  title: string;
  description: string;
  discord: string;
  link: string;
  rank: number;
};

export type ConfUser = {
  id?: string;
  email?: string;
  ticketNumber?: number | null;
  name?: string | null;
  username?: string | null;
  createdAt?: number | null;
};

export type GitHubOAuthData =
  | {
      type: 'token';
      token: string;
    }
  | {
      type: 'user';
      name: string;
      login: string;
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
};

export type Link = {
  url: Url | string;
  isButton?: boolean;
  styles?: any;
  page?: any;
};

export type CookieConsent = {
  enabled?: boolean;
  message?: string;
  link?: Link | string;
};

export type GTMParams = {
  gtmId: string;
  dataLayer?: string[];
  dataLayerName?: string;
  auth?: string;
  preview?: string;
};

export type Promo = {
  enabled?: boolean;
  display?: typeof VALID_DISPLAY_VALUES;
  text?: string;
  link?: Link | string;
};

export type VariantBase = Array<[string, string][]>;

export type MenuHeader = {
  link?: Link | string;
  dropdownItems?: Link[];
  featured?: ProductProp[];
};

type listingPhoto = ImageMetaProps & PhotoType

type listingPhotoHover = ImageMetaProps

type StaticImport = StaticRequire | StaticImageData

export type SafeNumber = number | `${number}`

export type ImageConfig = Partial<ImageConfigComplete> & {
  allSizes: number[]
  output?: 'standalone' | 'export'
}

export type GenImgAttrsResult = {
  src: string;
  srcSet: string | undefined;
  sizes: string | undefined;
}

export type ImageConfigComplete = {
  deviceSizes: number[];
  imageSizes: number[];
  loader: LoaderValue;
  path: string;
  loaderFile: string;
  domains?: string[] | undefined; 
  disableStaticImages: boolean;
  minimumCacheTTL: number;
  formats: ImageFormat[];
  dangerouslyAllowSVG: boolean; 
  contentSecurityPolicy: string; 
  contentDispositionType: 'inline' | 'attachment';  
  remotePatterns: RemotePattern[]; 
  unoptimized: boolean;
}

export type GenImgAttrsData = {
  config: ImageConfig;
  src: string;
  unoptimized: boolean;
  layout?: LayoutValue;
  loader: ImageLoaderWithConfig;
  width?: number;
  quality?: number;
  sizes?: string;
}

export type PlaceholderValue = 'blur' | 'empty' | `data:image/${string}`

export type OnLoad = React.ReactEventHandler<HTMLImageElement> | undefined

export type listingPhotos = {
  forOption: string;
  default: listingPhoto;
  hover: listingPhotoHover;
};

export type galleryPhotos = {
  forOption: string;
  photos: (ImageMetaProps & PhotoType)[]
};

export type ImageProps = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'alt' | 'width' | 'height' | 'loading'
> & {
  src: string | StaticImport;
  alt: string;
  width?: SafeNumber;
  height?: SafeNumber;
  fill?: boolean;
  loader?: ImageLoader;
  quality?: SafeNumber;
  priority?: boolean;
  loading?: LoadingValue;
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  unoptimized?: boolean;
  onLoad?: OnLoad;
  onLoadingComplete?: OnLoadingComplete | undefined;
  layout?: LayoutValue | undefined;
  style?: React.CSSProperties;
  objectFit?: ImgElementStyle['objectFit'] | undefined;
  objectPosition?: ImgElementStyle['objectPosition'] | undefined;
  lazyBoundary?: string | null | undefined;
  lazyRoot?: React.RefObject<HTMLElement> | null;
}

export type ImageElementProps = Omit<ImageProps, 'src' | 'loader'> & {
  img?: ImgElementWithDataProp;
  srcString: string;
  className?: string;
  imgAttributes: GenImgAttrsResult;
  heightInt: number | undefined;
  widthInt: number | undefined;
  qualityInt: number | undefined;
  sizes?: string | undefined;
  layout: LayoutValue;
  sizesInput?: string | undefined;
  imgStyle: ImgElementStyle;
  blurStyle: ImgElementStyle;
  isLazy: boolean;
  decoding?: string;
  loading: LoadingValue;
  config: ImageConfig;
  unoptimized: boolean;
  loader: ImageLoaderWithConfig;
  placeholder: PlaceholderValue;
  fetchPriority?: string;
  onLoad?: OnLoad;
  onLoadRef?: React.MutableRefObject<OnLoad | undefined>;
  onLoadingCompleteRef: React.MutableRefObject<OnLoadingComplete | undefined>;
  setBlurComplete: (b: boolean) => void;
  setShowAltText?: (b: boolean) => void;
  setIntersection?: (img: HTMLImageElement | null) => void;
  isVisible: boolean;
  noscriptSizes: string | undefined;
  onError?: () => void;
}