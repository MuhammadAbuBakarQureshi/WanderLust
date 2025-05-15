const Listing = require("./models/listing.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError");

const isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {    

        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to perform this action");
        return res.redirect("/login");
  }
  
  req.session.redirectUrl = req.originalUrl;

  next();
};

const saveRedirectUrl = (req, res, next) => {

    if(req.session.redirectUrl){

        res.locals.redirectUrl = req.session.redirectUrl;        
    }
    next();
}

const isOwner = async (req, res, next) => {

    let { id } = req.params;

    let listing = await Listing.findById(id);
    

    if(!listing.owner.equals(res.locals.user._id)){

      req.flash("error", "You are not the owner of this listing");
      return res.redirect(`/listings/${id}`);
    }

    next();
}


const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
}; 


const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

module.exports = {

    validateListing,
    validateReview,
    isLoggedIn,
    saveRedirectUrl,
    isOwner
}