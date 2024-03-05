import type { Metadata } from 'next';
import { SiteInfo } from '@sitecore-jss/sitecore-jss-nextjs';
import {  VALID_DISPLAY_VALUES } from '@assets/constants';
import { Obj, Url, SitecorePageProps } from '../';
import { SeoProps, Link } from './queries.d';
import { ProductProp } from './product.d';

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
  cookieConsent?: {
    enabled?: boolean;
    message?: string;
    link?: Link | string;
  };
  header?: {
    promo?: {
      enabled?: boolean;
      display?: typeof VALID_DISPLAY_VALUES;
      text?: string;
      link?: Link | string;
    };
    menuDesktopLeft?: {
      items?: {
        link?: Link | string;
        dropdownItems?: Link[];
        featured?: ProductProp[];
      }[];
    };
    menuDesktopRight?: {
      items?: {
        link?: Link | string;
        dropdownItems?: Link[];
        featured?: ProductProp[];
      }[];
    };
    menuMobilePrimary?: {
      items?: {
        link?: Link | string;
        dropdownItems?: Link[];
      }[];
    };
    menuMobileSecondary?: {
      items?: {
        link?: Link | string;
        dropdownItems?: Link[];
      }[];
    };
    [key: string]: Obj[];
  };
  footer?: {
    blocks?: Obj[];
  }
  seo?: SeoProps & Metadata;
  gtmID?: GTMParams;
};

export type SiteProps = Omit<SitecorePageProps, 'site'> & {
  site: SiteParams;
  children?: React.ReactNode;
}