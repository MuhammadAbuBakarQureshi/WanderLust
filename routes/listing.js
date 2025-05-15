const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../Controllers/listings");

const router = express.Router();

// GET requests

router.get("/", wrapAsync(listingController.index));

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/:id", wrapAsync(listingController.showListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// POST requests

router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing)
);

// PUT requests

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.updateListing)
);

// DELETE requests

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
