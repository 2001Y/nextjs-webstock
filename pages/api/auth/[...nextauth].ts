import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { GenericObject } from "next-auth/_utils";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      scope: "gist",
    }),
    // ...add more providers here
  ],
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    async signIn(_user, _account, _profile) {
      console.log("signIn!");
      return true;
    },
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect(url, baseUrl) {
      console.log("redirect!");
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt(token, _user, account, _profile, _isNewUser) {
      console.log("jwt!");
      // newPage(_user, token);
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      newPage(_user.name, account.accessToken);
      return token;
    },
    /**
     * @param  {object} session      Session object
     * @param  {object} token        User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    async session(session, token) {
      console.log("session!");
      // Add property to session, like an access_token from a provider.
      session.accessToken = (token as GenericObject).accessToken;
      // newPage(session.user.name, session.accessToken);
      return session;
    },
  },
});

function newPage(e1: any,e2: any) {
  fetch("https://api.github.com/users/" + e1 + "/gists", {
    cache: "reload",
  })
    .then((response) => response.json())
    .then((data) => {
      let state = 0;
      data.forEach((value:any) => {
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
}