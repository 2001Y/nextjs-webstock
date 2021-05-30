import Head from 'next/head';
import { useEffect } from 'react';

export async function getServerSideProps(context) {
  const {user} = context.query;
  return {
    props: {
      keyword: user,                 //検索キーワード
    }
  }
}


export default function Result(props) {
  useEffect(() => {

    const user = props.keyword;
    getGistList(user);
    if (localStorage.getItem(user + "_token")) {
      Htoken.value = localStorage.getItem(user + "_token");
      document.body.classList.replace("nologin", "login");
    }
    
    function view(content) {  
      localStorage.setItem(user + "_webstock", JSON.stringify(content));
      var stockList = "";
      content.forEach(function(value) {
        stockList += '<li class=site><div class=delete>×</div><img decoding="async" loading="lazy" src="https://s.wordpress.com/mshots/v1/'+value+'"></li>';
      });
      Hstock.innerHTML = stockList;
    
      document.querySelectorAll(".delete").forEach((elm,i) => {
        elm.addEventListener("click", () => {
          let webstock = JSON.parse(localStorage.getItem(user + "_webstock"));
          webstock.splice(i, 1);
          view(webstock);
          setGist(webstock);
        });
      });
    }
    
    async function getGistList() {
      Htitleurl.classList.replace("done", "loading");
      if (localStorage.getItem(user+"_id")){
        getGist(localStorage.getItem(user+"_id"));
        console.log("id > view");
      } else {
        await (await fetch("https://api.github.com/users/" + user + "/gists", { cache: "reload" })).json()
          .then(data => {
            let state = 0;
            data.forEach(function (value) {
              if (value.files["webstock.json"]) {
                let url = new URL(value.files["webstock.json"].raw_url);
                let url_id = url.pathname.split("/")[2];
                localStorage.setItem(user + "_id", url_id);
                getGist(url_id);
                console.log("userName > id > view");
                state = 1;
              }
            }); 
            if (state == 0) {
              Htitleurl.classList.replace("loading", "warning");
              Hstock.innerHTML = "ERROR: not found webstock.json on your gist.";
            }
          })
          .catch(err => {
            Htitleurl.classList.replace("loading", "err");
          });
      }
    }
    
    async function getGist(id) {
      Htitleurl.classList.replace("done", "loading");
      await (await fetch("https://api.github.com/gists/" + id, { cache: "reload" })).json()
        .then(data => {
          const array = JSON.parse(data.files["webstock.json"].content);
          view(array);
          Htitleurl.classList.replace("loading", "done");
        })
        .catch(err => {
          Htitleurl.classList.replace("loading", "err");
        });
    }
    
    async function setGist(content) {
      Htitleurl.classList.replace("done", "loading");
      let token = localStorage.getItem(user + "_token");
      await fetch("https://api.github.com/gists/" + localStorage.getItem(user + "_id"), {
        method: "PATCH",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: "token " + token,
        },
        body: JSON.stringify({
          description: "Updated at " + new Date().toLocaleString(),
          files: {
            "webstock.json": {
              content: JSON.stringify(content),
            },
          },
        }),
        cache: "reload"
      }).then(data => {
        console.log("DONE:setGist");
        Htitleurl.classList.replace("loading", "done");
      })
        .catch(err => {
          Htitleurl.classList.replace("loading", "err");
        });
    }
    
    function addGist() {
      add_url.value = "";
      let content = JSON.parse(localStorage.getItem(user + "_webstock"));
      content.unshift(add_url.value);
      view(content);
      setGist(content);
      setTimeout(function () {
        Hstock.innerHTML = "";
        view(JSON.parse(localStorage.getItem(user + "_webstock")));
      }, 10000);
    }
  })
  function setToken(user) {
    localStorage.setItem(user + "_token", Htoken.value);
    nologinCheck.checked = false;
    if (localStorage.getItem(user + "_token")) {
      document.body.classList.replace("nologin", "login");
    } else {
      document.body.classList.replace("login", "nologin");
    }
  }
  return (
    <>
      <Head>
        <title key="title">webstock.dev/{props.keyword} | Stock a website on your gist.</title>
        <meta key="meta_title" property="og:title" content={"https://webstock.dev/",props.keyword," | Stock a website on your gist."}/>
        
        <meta key="url" property="og:url" content={"https://webstock.dev/",props.keyword}/>
        <meta name="description" content="Stock a website on your gist."/>
        <meta key="ogp" property="og:image" content="https://2001y.me/blog/tmb/.jpeg"/>
      </Head>

      <header>
        <h1><a href="https://webstock.dev" id="Htitleurl" className="loading">webstock.dev/{props.keyword}</a></h1>
        <input type="checkbox" id="nologinCheck"/>
        <label htmlFor="nologinCheck" id="login"></label>
        <label htmlFor="nologinCheck" id="tokenWinBg">
          <label htmlFor="no" id="tokenWin">
            <h3>Gist Access Token</h3>
            <form target="sendPhoto" >
              <input type="text" id="Htoken"/>
              <input type="submit" value="save" id="test" onClick={()=>setToken(props.keyword)} />
            </form>
          </label>
        </label>
        <form target="sendPhoto" id="add">
          <button onClick='document.body.classList.toggle("noedit");'>edit</button>・
          <input type="text" id="add_url" autoFocus/>
          <input type="submit" value="add" onClick={()=>addGist()}/>
        </form>
        <iframe name="sendPhoto" style={{ width: "0", height: "0" }}></iframe>
      </header>
      <main>
        <ul id="Hstock"></ul>
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