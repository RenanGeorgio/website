import { ImageLoaderProps } from 'next/image';
import { VALID_LOADING_VALUES, VALID_LOADERS, VALID_LAYOUT_VALUES } from '@assets/constants';
import { StaticRequire, StaticImageData } from '../interfaces';

export type ImageLoader = (resolverProps: ImageLoaderProps) => string

type ImageLoaderPropsWithConfig = ImageLoaderProps & {config: Readonly<ImageConfig>}

type ImageLoaderWithConfig = (resolverProps: ImageLoaderPropsWithConfig) => string

export type LoadingValue = (typeof VALID_LOADING_VALUES)[number]

export type LoaderValue = (typeof VALID_LOADERS)[number]

export type LayoutValue = (typeof VALID_LAYOUT_VALUES)[number]

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

export type RemotePattern = {
    protocol?: 'http' | 'https';
    hostname: string;
    port?: string | null;
    pathname?: string;
}
  
export type StaticImport = StaticRequire | StaticImageData

export type SafeNumber = number | `${number}`

export type GenImgAttrsResult = {
    src: string;
    srcSet: string | undefined;
    sizes: string | undefined;
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

export type ImgElementWithDataProp = HTMLImageElement & {
    'data-loaded-src': string | undefined
}

export type ImgElementStyle = NonNullable<JSX.IntrinsicElements['img']['style']>

export type OnLoadingComplete = (img: HTMLImageElement) => void

export type ImageStateStrategy = {
    lazyLoad: boolean;
    isSsr: boolean;
    isIntersectionObserverAvailable: boolean;
    inView?: boolean;
    loaded: boolean;
}

export type ImageConfig = Partial<ImageConfigComplete> & {
    allSizes: number[]
    output?: 'standalone' | 'export'
}

export type ImageFormat = 'image/avif' | 'image/webp'

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
  fill?: boolean;
  layout?: LayoutValue | undefined;
  style?: React.CSSProperties;
  objectFit?: ImgElementStyle['objectFit'] | undefined;
  objectPosition?: ImgElementStyle['objectPosition'] | undefined;
  lazyBoundary?: string | null | undefined;
  lazyRoot?: React.RefObject<HTMLElement> | null;
}

export type ImgProps = Omit<ImageProps, 'src' | 'alt' | 'loader'> & {
    loading: LoadingValue;
    width: number | undefined;
    height: number | undefined;
    style: NonNullable<JSX.IntrinsicElements['img']['style']>;
    sizes: string | undefined;
    srcSet: string | undefined;
    src: string;
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