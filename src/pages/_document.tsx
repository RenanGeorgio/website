import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document?.getInitialProps(ctx)

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Indie+Flower:wght@400&display=swap"
            rel="stylesheet"
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-css-tags */}
            <link href="/styles/aos-noscript.css" rel="stylesheet" />
          </noscript>
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
          <div id="drawer" />
        </body>
      </Html>
    );
  }
}

export default CustomDocument
