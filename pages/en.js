import Head from 'next/head';
import { useEffect } from 'react';

export default function Result(props) {
  
  return (
    <>
      <Head>
        <title key="title">webstock.dev | Stock a website on your gist.</title>
        <meta key="meta_title" property="og:title" content="webstock.dev | Stock a website on your gist." />
        
        <meta key="url" property="og:url" content="https://webstock.dev"/>
        <meta name="description" content="Stock a website on your gist."/>
        <meta key="ogp" property="og:image" content="https://2001y.me/blog/tmb/.jpeg"/>
      </Head>
      <header>
        <h1><a href="https://webstock.dev">webstock.dev</a></h1>
      </header>
      <main id="index">
        <h2>webstock.dev</h2>
        <p>Stock a website on your gist.</p>
      </main>
      <footer>
        <div>
          <a href="https://webstock.dev" target="_blank">
            ©︎webstock.dev
          </a>
          <a href="https://2001y.me" target="_blank">
            by<span>2001Y</span>
          </a>
        </div>
      </footer>
    </>
  );
}