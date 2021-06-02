import Head from 'next/head';
import Link from 'next/link';
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
        
        <meta name="lang" content="ja" />
        <link rel="canonical" href="https://webstock.dev" />
        <link rel="alternate" href="https://webstock.dev" hrefLang="ja" />
        <link rel="alternate" href="https://webstock.dev/en" hrefLang="en" />
      </Head>
      <header>
        <h1><Link href="/"><a>webstock.dev/index</a></Link></h1>
        <div id="lang">
          <span>JA</span>/<a href="/en">EN</a>
        </div>
      </header>
      <main id="index">
        <div id="welcome">
          <h2>webstock.dev</h2>
          <p>
            <b>webstock.dev</b>は<a href="https://gist.github.com" target="_blank" rel="noopener noreferrer">Gist</a>をデータベースに、<br />
            お気に入りのWebサイトをコメントと共にストックすることができます。
          </p>
        </div>
        <h3>How<small><Link href="/how"><a>»more</a></Link></small></h3>
        <ol>
          <li>
            <h4>
              <a href="https://gist.github.com" target="_blank" rel="noopener noreferrer">Gist</a>を作成
            </h4>
            <p>
              ファイル名は<code>webstock.json</code>、コンテンツには<code>[]</code>。
            </p>
          </li>
          <li>
            <h4>webstock.devにアクセス</h4>
            <p>
              Githubのユーザー名を指定して、webstock.devにアクセス。<br/>
              DEMO:<a href="/2001y" target="_blank" rel="noopener noreferrer">webstock.dev/2001y</a>
            </p>
          </li>
          <li>
            <h4>AccessTokenの登録</h4>
            <p>
              webstock.dev上の<code>nologin</code>をクリックして、AccessTokenを登録。<br />
              これでサイトの登録/削除ができるようになります。
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