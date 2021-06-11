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

        <meta key="url" property="og:url" content="https://webstock.dev/setting" />
        <meta name="description" content="Stock a website on your gist." />
        <meta
          key="ogp"
          property="og:image"
          content="https://webstock.dev/ogp/setting"
        />
        <link rel="preload" as="image" href="https://webstock.dev/ogp/setting"></link>
        <link rel="prefetch" as="image" href="https://webstock.dev/ogp/setting"></link>

        <meta name="lang" content="ja" />
      </Head>
      <header>
        <h1>
          <Link href="/">
            <a>webstock.dev/setting</a>
          </Link>
        </h1>
        <div id="lang">
          <span>JA</span>/<a href="/en">EN</a>
        </div>
      </header>
      <main id="index">
        <h2>Setting</h2>
        {session && (
          <>
            <h3>Gist Login</h3>
            <p>
            <button className="loginButton" onClick={() => signOut()}>
              Sign out
            </button>
            </p>
          </>
        )}
        <h3>All reset</h3>
        <p>
        <button className="loginButton" onClick={() => allReset()}>All reset</button>
        </p>
      </main>
    </>
  );
};

export default Page;

function allReset() {
  localStorage.clear();
}