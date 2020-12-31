import passport from "passport";
import GitHubStrategy from "passport-github";
import GoogleStrategy from "passport-google-oauth20";
import NaverStrategy from "passport-naver";
import User from "./models/User";
import {
  githubLoginCallback,
  googleLoginCallback,
  naverLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.gitHubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `http://localhost:4000${routes.googleCallback}`,
    },
    googleLoginCallback
  )
);

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: `http://localhost:4000${routes.naverCallback}`,
    },
    naverLoginCallback
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
