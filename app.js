const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");

const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");
const listingSchema = require("./schema");

const port = 8080;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);


const validateListing = (req, res, next) => {

    let {error} = listingSchema.validate(req.body);
    
    if (error) {
        
        throw new ExpressError(400, error);
    }else{

        next();
    }
}


// Starts server

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// GET requests

app.get("/", (req, res) => {

    const images = [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",

        "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",

        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
    ];

    res.render("listings/root.ejs", {images});
});

app.get("/listings", wrapAsync( async (req, res) => {
  
    let listings = await Listing.find();

    res.render("listings/index.ejs", { listings });
}))

app.get("/listings/new", (req, res) => {
  
    res.render("listings/new.ejs");
});

app.get("/listings/:id", wrapAsync( async (req, res) => {
  
    let { id } = req.params;
  
    const listing = await Listing.findById(id);

    res.render("listings/show.ejs", { listing });
}));

app.get("/listings/:id/edit", wrapAsync( async (req, res) => {
  
    let { id } = req.params;

    let listing = await Listing.findById(id);

    res.render("listings/edit.ejs", { listing });
}));

// POST requests

app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {

    let newListing = new Listing(req.body.listing);
    let savedNewListing = await newListing.save();

    res.redirect(`/listings/${savedNewListing._id}`);
  })
);

// PUT requests

app.put("/listings/:id", wrapAsync( async (req, res) => {
  
    if(!req.body){

        throw new ExpressError(400, "Send valid data");
    }

    let { id } = req.params;
  
    await Listing.findByIdAndUpdate(
    id,
        { ...req.body.listing },
        {
            runValidators: true,
        }
        ) ;

    res.redirect(`/listings/${id}`);
}));

// DELETE requests

app.delete("/listings/:id", wrapAsync( async (req, res) => {
    
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
}));

// For all requests

app.use((req, res, next) => {

    next(new ExpressError(404, "Page not found"));
})


////////////// Middlewares

app.use((err, req, res, next) => {

  let { status = 500, message = "Something went wrong"} = err;

//   res.status(status).send(message);

    res.status(status).render("listings/errors.ejs", {message});
});

// app.get("/test-listing", (req, res) => {

//     let sampleListing = new Listing({

//         title: "House",
//         description: "This is my new beautiful house",
//         price: 10000,
//         location: "Service Road North, I-11/2, Islamabad",
//         country: "Pakistan"
//     })

//     sampleListing.save();

//     res.send(`Warning: Sample data is stored DON'T REFRESH BEFORE CHANGING SAMPLE DATA`);
// })
