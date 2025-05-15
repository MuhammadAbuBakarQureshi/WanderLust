const express = require("express");
const router = express.Router({mergeParams: true});

const Listing = require("../models/listing");
const Review = require("../models/review");

const wrapAsync = require("../utils/wrapAsync");

const {validateReview, isLoggedIn} = require("../middleware.js");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);
    let review = new Review(req.body.review);
    review.author = req.user._id;

    listing.reviews.push(review);

    review.save();
    listing.save();

    req.flash("success", "Review added successfully!");

    res.redirect(`/listings/${id}`);
  })
);

router.delete("/:reviewId", wrapAsync(async (req, res) => {

  let {id, reviewId} = req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted successfully!");

  res.redirect(`/listings/${id}`);
}));

module.exports = router;