import type { Metadata } from 'next';
import { SeoProps, ImageMetaProps } from './queries.d';
import { Obj } from '../';

type VariantBase = Array<[string, string][]>;

export interface VariantsParams extends VariantBase {
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
    seo?: SeoProps & Metadata;
  }
};

export type galleryPhotos = {
  forOption: string;
  photos: (ImageMetaProps & PhotoType)[]
}

export type listingPhoto = ImageMetaProps & PhotoType

type listingPhotoHover = ImageMetaProps

type listingPhotos = {
  forOption: string;
  default: listingPhoto;
  hover: listingPhotoHover;
}

export type ProductProp = {
  publishDate?: any;
  slug: string;
  id: string | number;
  title: string;
  price?: number | string;
  comparePrice?: number | string;
  description: ptContent[];
  photos: {
    main: galleryPhotos[];
    listing: listingPhotos[];
  };
  inStock: boolean;
  lowStock: boolean;
  useGallery: boolean;
  surfaceOption: any;
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
}
