const express = require("express");
const router = express.Router({mergeParams: true});

const Listing = require("../models/listing");
const Review = require("../models/review");

const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const {reviewSchema} = require("../schema");


const validateReview = (req, res, next) => {

    let {error} = reviewSchema.validate(req.body);

    if(error){

        throw new ExpressError(400, error);
    }else{

        next();
    }
};

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    console.log(id);
    console.log(req.body.review);

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

  console.log(id);
  console.log(reviewId);

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted successfully!");

  res.redirect(`/listings/${id}`);
}));

module.exports = router;