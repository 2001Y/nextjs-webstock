import { Provider } from "next-auth/client";
import { AppProps } from "next/app";

import '../styles/reset.css'
import '../styles/style.scss'

import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
          <meta charSet="utf-8"/>
          <meta name="robots" content="index,follow,archive" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
          
          {/* <link rel="stylesheet" href="reset.css"/>
          <link rel="stylesheet" href="style.css"/> */}
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
      <Component {...pageProps} />
    </Provider>
  );
}
