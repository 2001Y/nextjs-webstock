import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8"/>
          <meta name="robots" content="index,follow,archive"/>
          
          <link rel="stylesheet" href="reset.css"/>
          <link rel="stylesheet" href="style.css"/>
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          
          <title key="title">webstock.dev | Stock a website on your gist.</title>
          <meta key="meta_title" property="og:title" content="webstock.dev | Stock a website on your gist." />

          <meta name="description" content="Stock a website on your gist." />
          <meta key="ogp" property="og:image" content="https://2001y.me/blog/tmb/.jpeg"/>
          <meta key="url" property="og:url" content="https://webstock.dev" />
          <meta name="twitter:creator" content="@y20010920t"/>
          
          <meta name="twitter:card" content="summary_large_image"/>
          <meta property="og:type" content="website"/>
        </Head>
        <body className="nologin noedit">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument