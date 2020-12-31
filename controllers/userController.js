/* eslint-disable consistent-return */
import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log in" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github", {
  scope: ["user:email"],
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, email, avatar_url: avatarUrl, name },
  } = profile;
  console.log(profile);
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.name = name;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub: id, name, email, picture: avatarUrl },
  } = profile;
  console.log(profile);
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("Google user");
      user.googleId = id;
      user.avatarUrl = avatarUrl;
      user.name = name;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      googleId: id,
      name,
      email,
      avatarUrl,
    });
    console.log("Google New user");
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};

export const naverLogin = passport.authenticate("naver");

export const naverLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, email, nickname: name, profile_image: avatarUrl },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.naverId = id;
      user.name = name;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      id,
      email,
      name,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
