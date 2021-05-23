user = window.location.href.split('/').pop();
Htitleurl.innerHTML = "webstock.dev?" + user;
Htitleurl.href = "https://webstock.dev?" + user;
getGistList(user);
if (localStorage.getItem(user + "_token")) {
  Htoken.value = localStorage.getItem(user + "_token");
  login.classList.replace("nologin", "login");
  add.classList.replace("close", "open");
}


async function view(content) {  
  localStorage.setItem(user + "_webstock", JSON.stringify(content));
  var stockList = '';
  content.forEach(function(value) {
    stockList += '<li><img class=site src="https://s.wordpress.com/mshots/v1/'+value+'"></li>';
  });
  Hstock.innerHTML = stockList;

  document.querySelectorAll(".site").forEach((elm,i) => {
    elm.addEventListener("click", () => {
      var webstock = JSON.parse(localStorage.getItem(user + "_webstock"));
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
        var state = 0;
        data.forEach(function (value) {
          if (value.files["webstock.json"]) {
            var url = new URL(value.files["webstock.json"].raw_url);
            var url_id = url.pathname.split('/')[2];
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
        console.log(err);
      });
  }
}

async function getGist(id) {
  Htitleurl.classList.replace("done", "loading");
  await (
    await fetch("https://api.github.com/gists/" + id, { cache: "reload" })
  )
    .json()
    .then((data) => {
      const array = JSON.parse(data.files["webstock.json"].content);
      view(array);
      Htitleurl.classList.replace("loading", "done");
    })
    .catch((err) => {
      Htitleurl.classList.replace("loading", "err");
      console.log(err);
    });
}

async function setGist(content) {
  Htitleurl.classList.replace("done", "loading");
  var token = localStorage.getItem(user + "_token");
  await fetch(
    "https://api.github.com/gists/" + localStorage.getItem(user + "_id"),
    {
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
      cache: "reload",
    }
  )
    .then((data) => {
      console.log("DONE:setGist");
      Htitleurl.classList.replace("loading", "done");
    })
    .catch((err) => {
      Htitleurl.classList.replace("loading", "err");
      console.log(err);
    });
}

function setToken() {
  localStorage.setItem(user + "_token", Htoken.value);
  nologinCheck.checked = false;
  if (localStorage.getItem(user + "_token")) {
    login.classList.replace("nologin", "login");
    add.classList.replace("close", "open");
  } else {
    login.classList.replace("login", "nologin");
    add.classList.replace("open", "close");
  }
}

function addGist(e) {
  var content = JSON.parse(localStorage.getItem(user + "_webstock"));
  content.unshift(e);
  view(content);
  setGist(content);
  setTimeout(function () {
    Hstock.innerHTML = "";
    view(JSON.parse(localStorage.getItem(user + "_webstock")));
  }, 10000);
}