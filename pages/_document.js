import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="nologin noedit">
          <Main />
          <footer>
            <div>
              <a href="https://webstock.dev" target="_blank">©︎webstock.dev</a> <a href="https://2001y.me" target="_blank">by<span>2001Y</span></a>
            </div>
          </footer>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument