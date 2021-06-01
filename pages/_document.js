import Document, { Html, Head, Main, NextScript } from 'next/document';
const GA_TRACKING_ID = "G-J7D3KNB4MW";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body className="nologin noedit">
          <Main />
          <footer>
            <div>
              <a href="https://webstock.dev" target="_blank">
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