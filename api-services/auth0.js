import { initAuth0 } from "@auth0/nextjs-auth0";

const {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_COOKIE_SECRET
} = process.env;

const auth0 = initAuth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  clientSecret: AUTH0_CLIENT_SECRET,
  scope: "openid profile",
  redirectUri: "http://localhost:3000/api/callback",
  postLogoutRedirectUri: "http://localhost:3000/",
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: AUTH0_COOKIE_SECRET,
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
    // Store the id_token in the session. Defaults to false.
    storeIdToken: false,
    // Store the access_token in the session. Defaults to false.
    storeAccessToken: false,
    // Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: false
  },
  oidcClient: {
    // Optionally configure the timeout in milliseconds for HTTP requests to Auth0.
    httpTimeout: 2500,
    // Optionally configure the clock tolerance in milliseconds, if the time on your server is running behind.
    clockTolerance: 10000
  }
});

export default auth0;

export const checkUser = fn => {
 
  return async (req, res) => {
    try {
      const { user } = await auth0.getSession(req);
      req.user = user;
      return fn(req, res);
    } catch (e) {
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 401;
      res.end("unathenticated");
    }
  };
};
