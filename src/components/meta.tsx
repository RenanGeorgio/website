import Head from 'next/head';
import { useRouter } from 'next/router';
import { CMS_NAME, SITE_URL, HOME_OG_IMAGE_URL, HOME_TWITTER_IMAGE_URL, TWITTER_USER_NAME } from '@assets/constants';
import { Obj } from '@types';

interface Props {
  site: Obj;
  page: Obj;
  schema?: any;
  children?: React.ReactNode;
};

function replaceTemplateTags(value: string, templateTags: Obj[] = []) {
  let newString = value;

  templateTags.map((v) => {
    newString = newString?.replace(new RegExp(v.tag, 'g'), v.value)
  });

  return newString;
}

const Meta = ({ site, page, schema }: Props) => {
  const router = useRouter();
  const url = `${SITE_URL}${router.asPath}`;

  const siteTitle = site?.title;

  const siteFavicon = site?.seo?.favicon || '/favicon/safari-pinned-tab.svg';
  const siteFaviconLegacy = site?.seo?.faviconLegacy || '/favicon/favicon.ico';
  const siteTouchIcon = site?.seo?.touchIcon;

  const templateTags = [
    {
      tag: '{{page_title}}',
      value: page?.title,
    },
    {
      tag: '{{site_title}}',
      value: siteTitle,
    },
  ]

  const metaTitle = replaceTemplateTags(
    page?.seo?.metaTitle || site?.seo?.metaTitle,
    templateTags
  );

  const metaDesc = page?.seo?.metaDesc || site?.seo?.metaDesc;
  const fullMetaDesc = `${metaDesc}: A statically generated blog example using Next.js and ${CMS_NAME}.`;

  const shareTitle = replaceTemplateTags(
    page?.seo?.shareTitle || site?.seo?.shareTitle,
    templateTags
  );

  const shareDesc = page?.seo?.shareDesc || site?.seo?.shareDesc;
  const shareGraphic = page?.seo?.shareGraphic?.asset || site?.seo?.shareGraphic?.asset;

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="format-detection" content="telephone=no" />
      <title>{metaTitle}</title>

      <link rel="manifest" href="/manifest.json" />

      <link rel="icon" href={siteFaviconLegacy} sizes="any" />
      {/* @ts-ignore */}
      <link preload="true" rel="icon" type="image/svg+xml" href={siteFavicon} />
      {/* @ts-ignore */}
      <link preload="true" rel="mask-icon" href={siteFavicon} color="#000000" />
      {/* @ts-ignore */}
      <link preload="true" rel="shortcut icon" href={siteFaviconLegacy} />
      {siteTouchIcon && (
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
      )}

      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />

      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <link rel="preconnect" href="https://hull-demo.myshopify.com" />
      <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />

      {metaDesc && <meta name="description" content={fullMetaDesc} />}
      <meta property="og:url" content={url} />

      {shareTitle && (
        <>
          <meta property="og:title" content={shareTitle} />
          <meta name="twitter:title" content={shareTitle} />
        </>
      )}

      {shareDesc && ( 
        <>
          <meta property="og:description" content={shareDesc} />
          <meta name="twitter:description" content={shareDesc} />
        </>
      )}

      {shareGraphic && (
        <>
          <meta property="og:image" content={HOME_OG_IMAGE_URL} />
          <meta name="twitter:image" content={HOME_TWITTER_IMAGE_URL} />
        </>
      )}

      <meta property="og:type" content="website" />
      <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
      <meta name="twitter:card" content="summary_large_image" />

      {siteTitle && <meta property="og:site_name" content={siteTitle} />}

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  );
};

export default Meta;