const express = require("express");
const router = express.Router({mergeParams: true});

const Listing = require("../models/listing");
const Review = require("../models/review");

const wrapAsync = require("../utils/wrapAsync");

const {validateReview} = require("../middleware.js");

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);
    let review = new Review(req.body.review);

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