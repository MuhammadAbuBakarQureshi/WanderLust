const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");


const index = async (req, res) => {

    let listings = await Listing.find();

    res.render("listings/index.ejs", { listings });
}

const renderNewForm = (req, res) => {

    res.render("listings/new.ejs");
};

const showListing = async (req, res) => {

    let { id } = req.params;

    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author"
        },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing not found 😢");
      return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
}

const createListing = async (req, res, next) => {

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    let savedNewListing = await newListing.save();

    req.flash("success", "New Listing is added successfully!");

    res.redirect(`/listings/${savedNewListing._id}`);
}

const renderEditForm = async (req, res) => {
   
    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found 😢");
      return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
}

const updateListing = async (req, res) => {

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

    req.flash("success", "Listing updated successfully!");

    res.redirect(`/listings/${id}`);
}

const destroyListing = async (req, res) => {

    let { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing is deleted successfully!");

  res.redirect("/listings");
};

module.exports = {
  
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  destroyListing
};