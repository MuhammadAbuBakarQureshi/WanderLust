const User = require("../models/user.js");

const renderSignupForm = (req, res) => {
  
    res.render("users/signup.ejs");
};

const signup = async (req, res) => {
 
    try {
    let { username, email, password } = req.body;

    let newUser = new User({
      username: username,
      email: email,
    });

    let registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "Welcome to Wander Lust!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

const renderLoginForm = (req, res) => {
  
    res.render("users/login.ejs");
};


const login = async (req, res) => {
  
    const redirectUrl = res.locals.redirectUrl || "/listings";

    req.flash("success", "You are logged in!");
    res.redirect(redirectUrl);
};


const logout = (req, res, next) => {
  
    req.logout((err) => {
        if (err) {
        return next(err);
        }

        req.flash("success", "You are logged out");
        res.redirect("/listings");
    });
};

module.exports = {

    renderSignupForm,
    signup,
    renderLoginForm,
    login,
    logout
}