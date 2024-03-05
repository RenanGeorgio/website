import {  VALID_DISPLAY_VALUES } from '@assets/constants';
import { Obj } from '../';
import { ptContent } from './queries.d';
import { ProductProp, listingPhoto } from './product.d';

type ModuleParams = {
  _type: 'grid' | 'hero' | 'marquee' | 'dividerPhoto' | 'productHero' | 'collectionGrid' | undefined;
  _key: string | number;
}

export interface HeroProps extends ModuleParams {
  content?: ptContent[];
  bgType?: 'video' | 'photo' | undefined;
  photos?: {
      mobilePhoto?: listingPhoto;
      desktopPhoto?: listingPhoto;
  };
  video?: {
      id: string | number;
      title?: string;
  }
};

type MarqueePhotoType = {
  _type: 'simple' | 'photo' | 'product' | undefined;
  photo?: listingPhoto;
}

type MarqueeSimpleType = {
  _type: 'simple' | 'photo' | 'product' | undefined;
  text?: string;
}

type MarqueeProductType = {
  _type: 'simple' | 'photo' | 'product' | undefined;
  _id: number | string;
  product?: ProductProp;
}

export interface MarqueeProps extends ModuleParams {
  items?: {
    [_type: "simple"]: MarqueeSimpleType |
    [_type: "photo"]: MarqueePhotoType |
    [_type: "product"]: MarqueeProductType |
    undefined
  }[];
  speed?: any;
  reverse?: boolean;
  pausable?: boolean;
};

export interface DividerPhotoProps extends ModuleParams {
  photo?: listingPhoto;
}

export type ProductHeroProps = ModuleParams;

export interface CollectionGridProps extends ModuleParams {
  title?: string;
  paginationLimit?: any;
  filter?: {
    isActive: boolean;
    groups?: {
      id: string | number;
      title?: string;
      slug?: string;
      display?: typeof VALID_DISPLAY_VALUES;
      options?: {
        type?: any;
        title?: string;
        slug?: string;
        color?: any;
      }[];
    }[];
  };
  sort?: {
    isActive: boolean;
    options?: {
      slug?: any;
      title?: any;
    }[];
  };
  noFilterResults?: ptContent[];
};

type GridSizeProps = {
  breakpoint?: string | number;
  size?: string | number[];
  justify?: boolean;
  align?: boolean;
  start?: boolean;
}

type GridColumn = {
  sizes?: GridSizeProps[];
  blocks?: Obj[];
}

export interface GridProps extends ModuleParams {
  size?: string | number[];
  columns?: GridColumn[];
  children?: React.ReactNode;
}

export type ModulesProps = {
  [_type: "grid"]: GridProps |
  [_type: "hero"]: HeroProps |
  [_type: "marquee"]: MarqueeProps |
  [_type: "dividerPhoto"]: DividerPhotoProps |
  [_type: "productHero"]: ProductHeroProps |
  [_type: "collectionGrid"]: CollectionGridProps |
  undefined
}