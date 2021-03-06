import { signIn, signOut, useSession } from "next-auth/client";

import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

const Page = () => {
  const [session, loading] = useSession();

  // useEffect(() => {
  //   if (session) {
  //     newPage(session.user.name, session.accessToken)
  //   }
  // }, []);

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
          content="https://webstock.dev/ogp/index"
        />
        <link rel="preload" as="image" href="https://webstock.dev/ogp/index"></link>
        <link rel="prefetch" as="image" href="https://webstock.dev/ogp/index"></link>

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
          <span>JA</span>/<a href="/en">EN</a>
        </div>
      </header>
      <main id="index">
        <div id="welcome">
          <h2>webstock.dev</h2>
          <p>
            <b>webstock.dev</b>はあなたの
            <a
              href="https://gist.github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gist
            </a>
            をデータベースに、
            <br />
            お気に入りのWebサイトをコメントと共にストックすることができます。
          </p>
        </div>

        {session && (
          <>
            <p id="jump">ページを作成中...</p>
            <button className="loginButton" onClick={() => signOut()}>
              Sign out
            </button>
            {/* {localStorage.setItem(session.user.name + "_token", session.accessToken)} */}
            {newPage(session.user.name, session.accessToken)}
            {/* {window.location.href = "/" + session.user.name} */}
          </>
        )}

        {!session && (
          <>
            <button className="loginButton" onClick={() => signIn()}>
              Signin with GitHub
            </button>
            <p>
              Demo:
              <Link href="/2001y">
                <a>webstock.dev/2001Y</a>
              </Link>
            </p>
          </>
        )}

        {/* <button className="loginButton" onClick={() => signIn()}>
          Signin with GitHub
        </button> */}

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
    </>
  );
};

export default Page;

function newPage(e1, e2) {
  useEffect(() => {
    if (!localStorage.getItem(e1 + "_token", e2)) {
      let token = localStorage.setItem(e1 + "_token", e2);
      fetch("https://api.github.com/users/" + e1 + "/gists?login", {
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
                jump.innerHTML =  "あなたのwebstockを作成しました！<br/><a href='/" + e1 + "' >webstock.dev/" + e1 + "</a>";
                window.location.href = "/" + e1;
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      jump.innerHTML =  "あなたのwebstockを作成しました！<br/><a href='/" + e1 + "' >webstock.dev/" + e1 + "</a>";
    }
    
    }, []);
  }