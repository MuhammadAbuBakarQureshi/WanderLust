const mongoose = require("mongoose");
const listingdata = require("./data");
const Listing = require("../models/listing");
const { listingSchema } = require("../schema");

const initDB = async  () => {

    await Listing.deleteMany({});
    
    listingdata.data = listingdata.data.map((obj) => ({
      ...obj,
      owner: "68234d72d5553b3eaa969d1e",
    }));

    await Listing.insertMany(listingdata.data)
    .then((res) => {
        console.log("Data stored successful!");
    })
    .catch((err) => {
        console.log(`Error while storing data\n ${err}`);
    });
}

initDB();