export const join = (req, res) => res.render("join");
export const login = (req, res) => res.render("login");
export const logout = (req, res) => res.render("logout");
export const users = (req, res) => res.render("users", { pageName: "Users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageName: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageName: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageName: "Change Password" });