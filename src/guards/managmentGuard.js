import { haveToken } from "../helpers/AuthHelper";

export const requireSignIn = (to, from, next) => {
  if (haveToken()) {
    next();
  }
  next.redirect("/");
};

export const notLogin = (to, from, next) => {
  if (!haveToken()) {
    next();
  }
  next.redirect("/home");
};