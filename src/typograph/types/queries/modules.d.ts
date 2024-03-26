import {  VALID_DISPLAY_VALUES } from '@assets/constants';
import { Obj } from '../';
import { ptContent } from './queries.d';
import { ProductProp, listingPhoto } from './product.d';

type ModuleParams = {
  _key: string | number;
}

export interface HeroProps extends ModuleParams {
  _type: 'hero';
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

type MarqueePropsItem = MarqueeSimpleType | MarqueePhotoType | MarqueeProductType;

export interface MarqueeProps extends ModuleParams {
  _type: 'marquee';
  speed?: any;
  reverse?: boolean;
  pausable?: boolean;
  items:  MarqueePropsItem[];
};

export interface DividerPhotoProps extends ModuleParams {
  _type: 'dividerPhoto';
  photo?: listingPhoto;
}

export interface ProductHeroProps extends ModuleParams {
  _type: 'productHero';
}

export interface CollectionGridProps extends ModuleParams {
  _type: 'collectionGrid';
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

export type GridColumn = {
  sizes?: GridSizeProps[];
  blocks?: Obj[];
}

export interface GridProps extends ModuleParams {
  _type: 'grid';
  size?: string | number[];
  columns?: GridColumn[];
  children?: React.ReactNode;
}

export type ModulesProps = GridProps | HeroProps | MarqueeProps | DividerPhotoProps | ProductHeroProps | CollectionGridProps | undefined;