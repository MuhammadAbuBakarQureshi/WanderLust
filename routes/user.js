const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userControllers = require("../Controllers/users");

const router = express.Router();


// signup requests

router
  .route("/signup")
  .get(userControllers.renderSignupForm)
  .post(wrapAsync(userControllers.signup));


// login requests

router
  .route("/login")
  .get(userControllers.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userControllers.login)
  );


// logout requests

router.get("/logout", userControllers.logout);

module.exports = router;
