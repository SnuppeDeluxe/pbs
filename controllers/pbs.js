exports.getDashboard = (req, res, next) => {
  res.render("dashboard", {
    docTitle: "Dashboard",
    path: "dashboard",
  });
};
