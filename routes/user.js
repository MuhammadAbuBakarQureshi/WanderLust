const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userControllers = require("../Controllers/users");


const router = express.Router();


// signup requests

router.get("/signup", userControllers.renderSignupForm);

router.post("/signup", wrapAsync(userControllers.signup));

// login requests

router.get("/login", userControllers.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(userControllers.login)
);


// logout requests

router.get("/logout", userControllers.logout)

module.exports = router;
  