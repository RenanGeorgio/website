/** @type {import('next').NextConfig} */

// @ts-nocheck
/* tslint:disable */
module.exports = {
  images: {
    domains: [
      'i.vimeocdn.com', 
      'img.youtube.com',
      'www.datocms-assets.com',
      'a.storyblok.com',
      'images.ctfassets.net',
      'images.prismic.io',
      'cdn.aglty.io',
      'localhost'
    ],
    deviceSizes: [
      400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800,
      3000, 3200, 3400,
    ],
    imageSizes: [
      20, 30, 40, 50, 60, 80, 100, 120, 140, 180, 220, 260, 300, 340, 380, 390,
    ],
  },
  reactStrictMode: true,
  env: {
    DATOCMS_READ_ONLY_API_TOKEN: process.env.DATOCMS_READ_ONLY_API_TOKEN,
    PUBLIC_URL: process.env.PUBLIC_URL,
    URL: process.env.URL
  },
  outputFileTracing: true,
  async headers() {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "connect-src 'self';",
          },
        ],
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'access-control-allow-credentials', value: 'true' },
          { key: 'access-control-allow-origin', value: '*' },
          { key: 'access-control-allow-methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'access-control-allow-headers', value: 'origin, content-type, accept, authorization, X-CSRF-Token, X-Requested-With, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version' },
        ]
      }
    ]
  }
};
