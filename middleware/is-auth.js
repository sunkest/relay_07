exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/");
  }
  next();
};

exports.isLogin = (req, res, next) => {
  if (req.user) {
    return res.redirect("/posts");
  }
  next();
};
