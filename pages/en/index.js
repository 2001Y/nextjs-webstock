import { signIn, signOut, useSession } from "next-auth/client";

import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

const Page = () => {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title key="title">webstock.dev | Stock a website on your gist.</title>
        <meta
          key="meta_title"
          property="og:title"
          content="webstock.dev | Stock a website on your gist."
        />

        <meta key="url" property="og:url" content="https://webstock.dev" />
        <meta name="description" content="Stock a website on your gist." />
        <meta
          key="ogp"
          property="og:image"
          content="https://2001y.me/blog/tmb/.jpeg"
        />

        <meta name="lang" content="ja" />
        <link rel="canonical" href="https://webstock.dev" />
        <link rel="alternate" href="https://webstock.dev" hrefLang="ja" />
        <link rel="alternate" href="https://webstock.dev/en" hrefLang="en" />
      </Head>
      <header>
        <h1>
          <Link href="/">
            <a>webstock.dev/index</a>
          </Link>
        </h1>
        <div id="lang">
          <a href="/">JA</a>/<span>EN</span>
        </div>
      </header>
      <main id="index">
        <div id="welcome">
          <h2>webstock.dev</h2>
          <p>
            <b>webstock.dev</b> uses{" "}
            <a
              href="https://gist.github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gist
            </a>{" "}
            as its database.
            <br />
            You can stock your favorite web sites with thumbnails.
          </p>
        </div>

        {/* <form
          action="http://localhost:3000/api/auth/signin/github"
          method="POST"
        >
          <input
            type="hidden"
            name="csrfToken"
            value="1b960ebac0700c3349103e0f207b0516f030af673f2c2c7d6abc502f1ee6e0a6"
          />
          <input
            type="hidden"
            name="callbackUrl"
            value="http://localhost:3000/"
          />
          <button className="loginButton" onClick={() => signIn()}>Signin with GitHub</button>
        </form> */}

        <p>
          Demo:
          <Link href="/2001y">
            <a>webstock.dev/2001y</a>
          </Link>
        </p>
        
            <form target="sendPhoto" onSubmit={() => newPage()}>
              <input type="text" id="Huser" placeholder="Username" />
              <input type="text" id="Htoken" placeholder="Token" />
              <input type="submit" value="start" />
            </form>
            <iframe name="sendPhoto"></iframe>

        {/* <h3>How to get Token</h3>
            <a
              href="https://github.com/settings/tokens/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Access tokens
            </a>
            <ol>
              <li>
                <h4>
                  <a
                    href="https://gist.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gist
                  </a>
                  を作成
                </h4>
                <p>
                  ファイル名は<code>webstock.json</code>、コンテンツには
                  <code>[]</code>。
                </p>
              </li>
              <li>
                <h4>webstock.devにアクセス</h4>
                <p>
                  Githubのユーザー名を指定して、webstock.devにアクセス。
                  <br />
                  DEMO:
                  <a href="/2001y" target="_blank" rel="noopener noreferrer">
                    webstock.dev/2001y
                  </a>
                </p>
              </li>
              <li>
                <h4>AccessTokenの登録</h4>
                <p>
                  webstock.dev上の<code>nologin</code>
                  をクリックして、AccessTokenを登録。
                  <br />
                  これでサイトの登録/削除ができるようになります。
                </p>
              </li>
            </ol> */}
        <h3>Share</h3>
        <p>
          <a
            href="https://twitter.com/intent/tweet?text=Hello%20world%0D%0A&url=https://webstock.dev&hashtags=webstockdev&in_reply_to=1399050634251276291"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Tweet
          </a>
          /
          <a
            href="https://techfeed.io/intent/share?url=https://webstock.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            TechFeed
          </a>
        </p>
      </main>

      {/* {!session && (
        <>
          
        </>
      )}
      {session && newPage(session.user.name, session.accessToken) && (
        <>
          　{session.user.name} <br />
          AccessToken : {session.accessToken} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )} */}
    </>
  );
};

export default Page;

function newPage() {
  let e1 = Huser.value,
    e2 = Htoken.value;
    let token = localStorage.setItem(e1 + "_token", e2);
    fetch("https://api.github.com/users/" + e1 + "/gists", {
      cache: "reload",
    })
      .then((response) => response.json())
      .then((data) => {
        let state = 0;
        data.forEach((value) => {
          if (value.files["webstock.json"]) {
            state = 1;
          }
        });
        console.log(state);
        if (state == 0) {
          alert("tt");
          fetch("https://api.github.com/gists", {
            method: "POST",
            headers: {
              Accept: "application/vnd.github.v3+json",
              Authorization: "token " + e2,
            },
            body: JSON.stringify({
              public: true,
              description: "Updated at " + new Date().toLocaleString(),
              files: {
                "webstock.json": {
                  content: JSON.stringify([]),
                },
              },
            }),
          })
            .then((data) => {
              console.log(data);
              // window.location.href = "/" + e1;
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }