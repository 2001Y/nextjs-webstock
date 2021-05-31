import '../styles/globals.css'

import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <meta charSet="utf-8"/>
          <meta name="robots" content="index,follow,archive" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          
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
      <Component {...pageProps} />
    </>
  )
}

export default MyApp