import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  getMe,
  postGithubLogin,
  googleLogin,
  postGoogleLogin,
  naverLogin,
  postNaverLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.me, getMe);

// Github
globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
  routes.gitHubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);
//

//Google
globalRouter.get(routes.google, googleLogin);

globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: "/login" }),
  postGoogleLogin
);
//

//Naver
globalRouter.get(routes.naver, naverLogin);

globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", { failureRedirect: "/login" }),
  postNaverLogin
);
//
export default globalRouter;
