import { serialize } from 'cookie';

import USER from '../data/user';

const TOKEN = "abcd1234";
const CSRF_TOKEN = "4321dcba";

const AUTH_COOKIE_NAME = "auth";
const AUTH_COOKIE_PARAMS = {
  path: "/",
  httpOnly: true,
  sameSite: true
};

export const generateAuthToken = (username) => {
  return TOKEN;
};

export const credentialsAreValid = (username, password) => {
  if (USER.password === password) {
    return true;
  } else {
    return false;
  }
};

export const setAuthCookie = (res, token) => {
  res.setHeader("Set-Cookie", [
    serialize(AUTH_COOKIE_NAME, token, {
      ...AUTH_COOKIE_PARAMS,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 8)
    }),
    serialize("csrf", CSRF_TOKEN, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 8)
    })
  ]);
};

export const clearAuthCookie = (res) => {
  res.setHeader("Set-Cookie", serialize(AUTH_COOKIE_NAME, "", AUTH_COOKIE_PARAMS))
}

export const requireAuth = handler => (req, res) => {
  const validAuth = authTokenIsValid(req.cookies.auth);
  const validCsrf = csrfTokenIsValid(req.headers['x-csrf-token'], req.cookies.auth)
  if (validAuth && validCsrf) {
    return handler(req, res);
  } else {
    res.status(401).send({ err: "Unauthorized" });
  }
};

const csrfTokenIsValid = (csrfToken, authToken) => {
  return csrfToken === CSRF_TOKEN;
}

const authTokenIsValid = (token) => {
  return token === TOKEN;
};
