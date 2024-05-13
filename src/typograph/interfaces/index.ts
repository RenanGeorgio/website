import { Field, ImageField, LinkField, SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import { CookieConsent, Crop, GTMParams, ImageElementProps, MenuProp, Obj, Promo, Url, VariantBase, galleryPhotos, listingPhotos, mimeTypeObj } from '@types';

interface VariantsParams extends VariantBase {
  variant: {
    id: number | string;
    title?: string;
    price?: number | string;
    comparePrice?: number | string;
    inStock?: boolean;
    lowStock?: boolean;
    options?: {
        name?: string;
        position?: any;
        value?: any; 
    }[];
    seo?: any;
  } 
};

export interface SiteParams extends SiteInfo { 
  title?: string;
  rootDomain?: any;
  shop?: {
    storeURL?: Url | string;
    cartMessage?: string;
  };
  productCounts?: {
    slug?: string;
    count?: number;
  };
  cookieConsent?: CookieConsent;
  header?: {
    promo?: Promo;
    menuDesktopLeft?: MenuProp;
    menuDesktopRight?: MenuProp;
    menuMobilePrimary?: MenuProp;
    menuMobileSecondary?: MenuProp;
  };
  footer?: {
    blocks: Obj[];
  }
  seo?: any;
  gtmID?: GTMParams;
};

export interface ProductProp {
  publishDate?: any;
  slug: string;
  id: string | number;
  title: string;
  price?: number | string;
  comparePrice?: number | string;
  description: any[];
  photos: {
    main: galleryPhotos[];
    listing: listingPhotos[];
  };
  inStock: boolean;
  lowStock: boolean;
  useGallery: boolean;
  surfaceOption: boolean;
  options: {
    name: string;
    position: any;
    values: any[]
  }[];
  optionSettings: {
    forOption: string;
    color: any;
  }[];
  variants?: VariantsParams[];
  klaviyoAccountID?: any | undefined;
  filters?: {
    slug: string;
    forOption?: string;
  }[];
};

export interface PhotoL extends ImageElementProps {
  alt: string;
  asset?: string[] | Obj;
  crop?: Crop;
  customRatio?: number;
  hotspot?: boolean;
  type: mimeTypeObj | string;
  aspectRatio: number;
  lqip: Url | string;
};

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
};

export interface StaticRequire {
  default: StaticImageData;
};

interface ImageType {
  width?: number;
  height?: number;
  src: string;
  layout?: string;
  className: string;
  alt: string;
};

export interface ImageInterface {
  data: ImageData;
  className?: string;
  pictureClassName?: string;
  fadeInDuration?: number;
  intersectionTreshold?: number;
  intersectionThreshold?: number;
  intersectionMargin?: string;
  lazyLoad?: boolean;
  style?: React.CSSProperties;
  type?: ImageType;
  pictureStyle?: React.CSSProperties;
  explicitWidth?: boolean;
};

export interface Fields {
  Image: ImageField & ImageInterface;
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
};

export interface PhotoProps {
  params?: Obj;
  fields?: Fields | Fields[];
  children?: React.ReactNode;
};