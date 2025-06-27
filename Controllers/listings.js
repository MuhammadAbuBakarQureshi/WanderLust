const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");


const index = async (req, res) => {

    const listingName = req.query.listingName;

    let listings;

    if(listingName){

      listings = await Listing.find({title: listingName});
    }else{

      listings = await Listing.find();
    }

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

    let url = req.file.path;
    let filename = req.file.filename;
    

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

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

    listing.image.url = listing.image.url.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { listing });
}

const updateListing = async (req, res) => {

    console.log(req.body, "\t", req.file);
    

    if (!req.body) {
      throw new ExpressError(400, "Send valid data");
    }

    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
    );


    if(typeof req.file !== "undefined"){

        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }

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