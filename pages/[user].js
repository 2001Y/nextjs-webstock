
export async function getServerSideProps(context) {
  const {user} = context.query;
  return {
    props: {
      keyword: user,                 //検索キーワード
    }
  }
}

export default function Result(props) {
  return (
    <>
      <link rel="stylesheet" href="reset.css"/>
      <link rel="stylesheet" href="style.css"/>
      <script defer type="module" src="/script.js"></script>
      <header>
      <h1><a href="https://webstock.dev" id="Htitleurl" className="loading">webstock.dev/{props.keyword}</a></h1>
      <input type="checkbox" id="nologinCheck"></input>
      <label htmlFor="nologinCheck" id="login" className="nologin"></label>
      <label htmlFor="nologinCheck" id="tokenWin" className="close">
        <div>
          <h3>Gist Access Token</h3>
          <form target="sendPhoto">
            <input type="text" id="Htoken"></input>
            <input type="submit" value="save" onClick='setToken();'></input>
          </form>
        </div>
      </label>
      <form target="sendPhoto" id="add" className="close">
        <input type="text" id="add_url"></input>
        <input type="submit" value="add" onClick='addGist(add_url.value);add_url.value="";'></input>
      </form>
        <iframe name="sendPhoto" style={{ width: "0", height: "0", border: "0" }}></iframe>
    </header>
    <main>
      <ul id="Hstock"></ul>
    </main>
    <footer>
      ©︎webstock.dev <a href="https://2001y.me" target ="_blank"> by <span>2001Y</span></a>
    </footer>
    </>
  )
}