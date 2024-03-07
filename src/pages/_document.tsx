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
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="drawer" />
        </body>
      </Html>
    );
  }
}

export default CustomDocument
