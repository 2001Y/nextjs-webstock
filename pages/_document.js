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
        <link
        rel="prefetch"
        href={"https://www.googletagmanager.com/gtag/js?id=" + process.env.NEXT_PUBLIC_ga}
        as="script"
      />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ga}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${process.env.NEXT_PUBLIC_ga}');
          `,
        }}
      />
        </Head>
        <body className="nologin noedit">
          <Main />
          <footer>
            <div>
              <a href="/" target="_blank">
                ©︎webstock.dev
              </a>{" "}
              <a href="https://2001y.me" target="_blank">
                by<span>2001Y</span>
              </a>
            </div>
          </footer>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument