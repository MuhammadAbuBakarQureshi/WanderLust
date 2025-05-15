const Listing = require("../models/listing");
const Review = require("../models/review");

const createReview = async (req, res) => {

    let { id } = req.params;

    let listing = await Listing.findById(id);
    let review = new Review(req.body.review);
    review.author = req.user._id;

    listing.reviews.push(review);

    review.save();
    listing.save();

    req.flash("success", "Review added successfully!");

    res.redirect(`/listings/${id}`);
}

const destroyReview = async (req, res) => {

    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");

    res.redirect(`/listings/${id}`);
}

module.exports = {

    createReview,
    destroyReview
}