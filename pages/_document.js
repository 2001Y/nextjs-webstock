import Document, { Html, Head, Main, NextScript } from "next/document";

class HeadProduction extends Head {
  render() {
    const { head } = this.context._documentProps;
    const children = this.props.children;
    return (
      <head {...this.props}>
        {children}
        {head}
        {this.getCssLinks()}
      </head>
    );
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const isDev = process.env.NODE_ENV === "development";
    return (
      <Html>
        {isDev ? <Head /> : <HeadProduction />}
        <body>
          <Main />
          {isDev && <NextScript />}
        </body>
      </Html>
    );
  }
}

export default MyDocument;