import Head from 'next/head';
import { useEffect } from 'react';

export async function getServerSideProps(context) {
  const {user} = context.query;
  return {
    props: {
      keyword: user,
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
  })

  async function getGistList(user) {
    Htitleurl.classList.replace("done", "loading");
    if (localStorage.getItem(user+"_id")){
      getGist(localStorage.getItem(user+"_id"),user);
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
              getGist(url_id,user);
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
  async function getGist(id,user) {
    Htitleurl.classList.replace("done", "loading");
    await (await fetch("https://api.github.com/gists/" + id, { cache: "reload" })).json()
      .then(data => {
        const array = JSON.parse(data.files["webstock.json"].content);
        view(array,user);
        Htitleurl.classList.replace("loading", "done");
      })
      .catch(err => {
        Htitleurl.classList.replace("loading", "err");
      });
  }
  async function setGist(content, user) {
    console.log("setGist");
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
  function setToken(user) {
    localStorage.setItem(user + "_token", Htoken.value);
    nologinCheck.checked = false;
    if (localStorage.getItem(user + "_token")) {
      document.body.classList.replace("nologin", "login");
    } else {
      document.body.classList.replace("login", "nologin");
    }
  }
  function addGist(user) {
    let content = JSON.parse(localStorage.getItem(user + "_webstock"));
    content.unshift(document.getElementById("add_url").value);
    document.getElementById("add_url").value = "";
    view(content, user);
    setGist(content,user);
    setTimeout(function () {
      view(content,user);
    }, 10000);
  }

  let viewState = 0;
  function view(content, user) {
    console.log("view");
    
    document.querySelectorAll(".delete").forEach((elm, i) => {
      // console.log("d"+i);
      elm.removeEventListener("click", {
        handleEvent: click,
        i: i, user: user
      });
    });
      
    let stockList = "";
    content.forEach(function(value) {
      stockList += '<a href="'+value+'" target="_blank" rel="noopener noreferrer"><li class=site><div class=delete>×</div><img decoding="async" loading="lazy" src="https://s.wordpress.com/mshots/v1/'+value+'"></li></a>';
    });
    Hstock.innerHTML = stockList;

    localStorage.setItem(user + "_webstock", JSON.stringify(content));
  
    document.querySelectorAll(".delete").forEach((elm, i) => {
      // console.log("a"+i);
      elm.addEventListener("click", {
        handleEvent: click,
        i: i, user: user
      });
    });
  }

  function click() {
    let content = JSON.parse(localStorage.getItem(this.user + "_webstock"));
    content.splice(this.i, 1);
    view(content,this.user);
  }

  let editState = false;
  function editF(user) {
    editState = !editState;
    document.body.classList.toggle("noedit");
    if (editState) {
      edit.innerHTML = "done";
    } else {
      edit.innerHTML = "edit";
      let content = JSON.parse(localStorage.getItem(user + "_webstock"));
      setGist(content,user);
    }
  }

  return (
    <>
      <Head>
        <title key="title">webstock.dev/{props.keyword} | Stock a website on your gist.</title>
        <meta key="meta_title" property="og:title" content={"https://webstock.dev/" + props.keyword + " | Stock a website on your gist."}/>
        <meta key="url" property="og:url" content={"https://webstock.dev/" + props.keyword}/>
        <meta key="ogp" property="og:image" content={"https://webstock.dev/ogp/" + props.keyword + ".png"}/>
      </Head>

      <header>
        <h1><a href="/" id="Htitleurl" className="loading">webstock.dev/{props.keyword}</a></h1>
        <input type="checkbox" id="nologinCheck"/>
        <label htmlFor="nologinCheck" id="login"></label>
        <label htmlFor="nologinCheck" id="tokenWinBg">
          <label htmlFor="no" id="tokenWin">
            <h3>Gist Access Token</h3>
            <p>
              Get <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer">Access tokens</a> on Github. <a href="/about" target="_blank" rel="noopener noreferrer">>more</a>
            </p>
            <form target="sendPhoto" onSubmit={()=>setToken(props.keyword)} >
              <input type="text" id="Htoken"/>
              <input type="submit" value="save" id="test" />
            </form>
          </label>
        </label>
        <form target="sendPhoto" id="add" onSubmit={()=>addGist(props.keyword)}>
          <div id="edit" onClick={() => editF(props.keyword)}>edit</div>・
          <input type="text" id="add_url" autoFocus/>
          <input type="submit" value="add"/>
        </form>
        <iframe name="sendPhoto" style={{ width: "0", height: "0" }}></iframe>
      </header>
      <main>
        <ul id="Hstock"></ul>
      </main>
    </>
  );
}