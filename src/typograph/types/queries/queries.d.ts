import { Obj, Url } from '../';
import { Crop } from '../urils.d';

type mimeTypeObj = {
  [mimeType: string]: string[]
}

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
}

export interface Link {
  url: Url;
  isButton?: boolean;
  styles?: any;
  page?: any;
};

export type ptContent = {
  markDefs: {
      [_type: "link"]: Link;
  }[];
  [_type: "photo"]: ImageMetaProps;
}

export interface SeoProps {
  metaTitle?: string;
  metaDesc?: string;
  shareTitle?: string;
  shareDesc?: string;
  shareGraphic?: Obj;
  favicon?: Url | string;
  faviconLegacy?: Url | string;
  touchIcon?: any;
};