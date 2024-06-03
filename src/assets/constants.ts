export const EXAMPLE_PATH = "";
export const CMS_NAME = "Markdown";
export const HOME_OG_IMAGE_URL = "https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg";
export const SITE_URL = 'https://www.diamondbigger.com';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'diamondbigger';
export const BRAND_NAME = 'DiamondBigger';
export const SITE_NAME_MULTILINE = ['DiamondBigger', 'Supply Chain'];
export const SITE_NAME = 'Grupo DiamondBigger Supply Chain';
export const META_DESCRIPTION = 'Website do grupo DiamondBigger Supply Chain - A revolução da logística e supply chain começa aqui.';
export const SITE_DESCRIPTION = 'Produto certo, no local e hora certa, com o melhor preço!';
export const DATE = '01 January 2022';
export const SHORT_DATE = 'Jan 1 - 9:00am PST';
export const FULL_DATE = 'Jan 1st 9am Pacific Time (GMT-7)';
export const TWEET_TEXT = META_DESCRIPTION;
export const COOKIE = 'user-id';

export const INSTAGRAM_PAGE = 'https://www.instagram.com/diamondbigger_';
export const FACEBOOK_PAGE = 'https://www.facebook.com/DiamondBigger';
export const LINKEDING_PAGE = 'https://www.linkedin.com/company/diamondbigger';

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const TERMS_URL = process.env.NEXT_PUBLIC_SERVICE_TERMS_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;
export const HOME_TWITTER_IMAGE_URL = ''

export const GET_HOME_VIDEO = ''

export const CODE_OF_CONDUCT = 'https://supplyfy.notion.site/C-digo-de-Conduta-17744c84406c459fb9cdd1acc6de7f1a';
export const REPO = '';
export const SAMPLE_TICKET_NUMBER = 1234;
export const NAVIGATION = [
  /*{
    name: 'Agenda',
    route: '/schedule'
  },
  {
    name: 'Serviços',
    route: '/speakers'
  },
  {
    name: 'Blog',
    route: '/blog'
  }*/
];

export type TicketGenerationState = 'default' | 'loading';

const AVIF = 'image/avif';
const WEBP = 'image/webp';
const PNG = 'image/png';
const JPEG = 'image/jpeg';
const GIF = 'image/gif';
const SVG = 'image/svg+xml';
const ICO = 'image/x-icon';

const CACHE_VERSION = 3;
const BLUR_IMG_SIZE = 8;
const BLUR_QUALITY = 70;

export const VALID_LOADING_VALUES = ['lazy', 'eager', undefined] as const

export const VALID_LOADERS = [
  'default',
  'imgix',
  'cloudinary',
  'akamai',
  'custom',
] as const

export const VALID_LAYOUT_VALUES = [
  'fill',
  'fixed',
  'intrinsic',
  'responsive',
  undefined,
] as const

export const VALID_DISPLAY_VALUES = [
  'block',
  'inline',
  'inline-block',
  'flex',
  'inline-flex',
  'grid',
  'inline-grid',
  'flow-root',
  'none',
  'contents',
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
  'table',
  'table-row',
  'list-item',
  'block flow',
  'inline flow',
  'inline flow-root',
  'block flex',
  'inline flex',
  'block grid',
  'inline grid',
  'block flow-root',
  undefined
] as const

export const imageExtMimeTypeMap = {
  jpeg: JPEG,
  png: PNG,
  ico: ICO,
  svg: SVG,
  avif: AVIF,
  webp: WEBP,
  gif: GIF
} as const
  
export const enum PAGE_TYPES {
  PAGES = 'pages',
  ROOT = 'root',
  APP = 'app',
}

export const ANIMATABLE_TYPES = [WEBP, PNG, GIF];
export const VECTOR_TYPES = [SVG];

const REGEX_LOCALHOST_HOSTNAME =
  /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/

export const ALLOWED_PAGE_PROPS = ['params', 'searchParams'];
export const ALLOWED_LAYOUT_PROPS = ['params', 'children'];

export const ALLOWED_EXPORTS = [
  'config',
  'generateStaticParams',
  'metadata',
  'generateMetadata',
  'viewport',
  'generateViewport',
];

export type XCacheHeader = 'MISS' | 'HIT' | 'STALE';