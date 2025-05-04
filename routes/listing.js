const express = require("express");

const Listing = require("../models/listing");
const Review = require("../models/review");

const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const schema = require("../schema");

const router = express.Router();



const validateListing = (req, res, next) => {
  let { error } = schema.listingSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {

    let {error} = schema.reviewSchema.validate(req.body);

    if(error){

        throw new ExpressError(400, error);
    }else{

        next();
    }
}



router.get(
  "/",
  wrapAsync(async (req, res) => {
    let listings = await Listing.find();

    res.render("listings/index.ejs", { listings });
  })
);

router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id).populate("reviews");

    res.render("listings/show.ejs", { listing });
  })
);

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    let listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });
  })
);

// POST requests

router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    let newListing = new Listing(req.body.listing);
    let savedNewListing = await newListing.save();

    res.redirect(`/listings/${savedNewListing._id}`);
  })
);

router.post(
  "/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let review = new Review(req.body.review);

    listing.reviews.push(review);

    review.save();
    listing.save();

    res.redirect(`/listings/${id}`);
  })
);

// PUT requests

router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    if (!req.body) {
      throw new ExpressError(400, "Send valid data");
    }

    let { id } = req.params;

    await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      {
        runValidators: true,
      }
    );

    res.redirect(`/listings/${id}`);
  })
);

// DELETE requests

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
  })
);

router.delete("/:id/reviews/:reviewId", wrapAsync(async (req, res) => {

  let {id, reviewId} = req.params;

  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listings/${id}`);
}));

module.exports = router;