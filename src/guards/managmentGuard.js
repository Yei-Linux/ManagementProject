import { haveToken } from "../helpers/AuthHelper";

export const requireSignIn = (to, from, next) => {
  if (haveToken()) {
    next();
  }
  next.redirect("/");
};

export const notLogin = (to, from, next) => {
  if ( to['match']['path'] == '/confirm/:data' || !haveToken()) {
    next();
  }
  next.redirect("/home");
};