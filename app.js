const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");

const Listing = require("./models/listing");
const Review = require("./models/review");

const listings = require("./routes/listing.js")

const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");
const schema = require("./schema");

const port = 8080;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// Starts server

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


// root

// app.get(
//   "/",
//   wrapAsync(async (req, res) => {
//     let listings = await Listing.find();

//     res.render("listings/root.ejs", { listings });
//   })
// );


app.use("/listings", listings);


// For all requests

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

////////////// Middlewares

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;

  res.status(status).render("listings/errors.ejs", { message });
});