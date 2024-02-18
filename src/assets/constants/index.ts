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