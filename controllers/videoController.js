export const home = (req, res) => res.render("home", { pageName: "Home" });
export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageName: "Search", searchingBy });
};
export const videos = (req, res) =>
  res.render("videos", { pageName: "Videos" });
export const upload = (req, res) =>
  res.render("upload", { pageName: "Upload" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageName: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageName: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageName: "DeleteVideo" });
