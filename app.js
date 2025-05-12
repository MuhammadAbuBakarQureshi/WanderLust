const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");

const Listing = require("./models/listing");

const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");

const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");


const port = 8080;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const sessionOptions = {

  secret: "secretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {

    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.use(session(sessionOptions));
app.use(flash());

// root

app.get(
  "/",
  wrapAsync(async (req, res) => {
    let listings = await Listing.find();

    res.render("listings/root.ejs", { listings });
  })
);

app.use((req, res, next) => {

  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
})

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


// For all requests

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

////////////// Middlewares

app.use((err, req, res, next) => {
  
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("listings/errors.ejs", { message });
});

// Starts server

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});