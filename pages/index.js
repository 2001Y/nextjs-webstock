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
        <h1><a href="https://webstock.dev">webstock.dev/index</a></h1>
      </header>
      <main id="index">
        <h2>webstock.dev</h2>
        <p>
          <b>webstock.dev</b>は<a href="https://gist.github.com" target="_blank" rel="noopener noreferrer">Gist</a>をデータベースに、<br />
          ブックマークのようにWebサイトをストックすることができます。
        </p>
        <h3>How</h3>
        <ol>
          <li>
            <p>
              Gistにwebstock.jsonを作成。
            </p>
            <pre>
              ["https://2001y.me"]
            </pre>
          </li>
          <li>
            <p>
              Githubのユーザー名を指定するだけで、webstockを表示。<br />
              Demo:<a href="/2001y" target="_blank" rel="noopener noreferrer">webstock.dev/2001y</a>
            </p>
          </li>
        </ol>

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