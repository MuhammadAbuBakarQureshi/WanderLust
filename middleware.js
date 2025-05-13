const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to perform this action");
    return res.redirect("/login");
  }

  next();
};

module.exports = {

    isLoggedIn
}