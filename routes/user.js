const express = require("express");
const router = express.Router();

const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

const User = require("../models/user.js");
const passport = require("passport");


// signup requests

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;

      let newUser = new User({
        username: username,
        email: email,
      });

      let registeredUser = await User.register(newUser, password);

      req.flash("success", "Welcome to Wander Lust!");

      res.redirect("/listings");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  })
);

// login requests

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(async (req, res) => {

    req.flash("success", "You are logged in!");
    res.redirect("/listings");
  })
);


// logout requests

router.get("/logout", (req, res, next) => {

    req.logout((err) => {

        if(err){

            return next(err);
        }

        req.flash("success", "You are logged out");
        res.redirect("/listings");
    })
})

module.exports = router;
