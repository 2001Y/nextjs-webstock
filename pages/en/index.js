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
        <meta key="ogp" property="og:image" content="https://2001y.me/blog/tmb/.jpeg" />
        
        <meta name="lang" content="en" />
        <link rel="canonical" href="https://webstock.dev" />
        <link rel="alternate" href="https://webstock.dev" hrefLang="ja" />
        <link rel="alternate" href="https://webstock.dev/en" hrefLang="en" />
      </Head>
      <header>
        <h1><a href="https://webstock.dev">webstock.dev/en/index</a></h1>
        <div id="lang">
          <a href="/">JA</a>/<span>EN</span>
        </div>
      </header>
      <main id="index">
        <div id="welcome">
          <h2>webstock.dev</h2>
          <p>
            <b>webstock.dev</b> uses <a href="https://gist.github.com" target="_blank" rel="noopener noreferrer">Gist</a> as its database.<br />
            You can stock your favorite web sites with thumbnails.
          </p>
        </div>
        <h3>How</h3>
        <ol>
          <li>
            <h4>
              Create a <a href="https://gist.github.com" target="_blank" rel="noopener noreferrer">Gist</a>
            </h4>
            <p>
              The file name is <code>webstock.json</code> and the content is <code>[]</code>.
            </p>
          </li>
          <li>
            <h4>Go to webstock.dev</h4>
            <p>
              Access webstock.dev by specifying your Github username.<br/>
              DEMO:<a href="/2001y" target="_blank" rel="noopener noreferrer">webstock.dev/2001y</a>
            </p>
          </li>
          <li>
            <h4>Registering AccessToken</h4>
            <p>
              Click on <code>nologin</code> on webstock.dev and register your AccessToken.<br />
              This will allow you to register/delete sites.
            </p>
          </li>
        </ol>
        <h3>Share</h3>
        <p>
          <a href="https://twitter.com/intent/tweet?text=Hello%20world%0D%0A&url=https://webstock.dev&hashtags=webstockdev&in_reply_to=1399050634251276291" target="_blank" rel="nofollow noopener noreferrer">Tweet</a>/<a href="https://techfeed.io/intent/share?url=https://webstock.dev" target="_blank" rel="noopener noreferrer">TechFeed</a>
        </p>
      </main>
    </>
  );
}