import { signIn, signOut, useSession } from "next-auth/client";

import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

const Page = () => {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          
        </>
      )}
      {session && newPage(session.user.name, session.accessToken) && (
        <>
          　{session.user.name} <br />
          AccessToken : {session.accessToken} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
};

export default Page;

function newPage(e1,e2) {
    localStorage.setItem(e1 + "_token", e2);
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
  