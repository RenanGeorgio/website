import {
  ImageField,
  Field,
  LinkField
} from '@sitecore-jss/sitecore-jss-nextjs';

export interface ImageType {
  width?: number;
  height?: number;
  src: string;
  layout?: string;
  className: string;
  alt: string;
};

export interface ImageData {
  aspectRatio: number;
  base64?: string;
  height?: number;
  width: number;
  sizes?: string;
  src?: string;
  srcSet?: string;
  webpSrcSet?: string;
  bgColor?: string;
  alt?: string;
  title?: string;
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