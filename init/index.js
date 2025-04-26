const mongoose = require("mongoose");
const listingdata = require("./data");
const Listing = require("../models/listing");

const initDB = async  () => {

    await Listing.deleteMany({});
        
    await Listing.insertMany(listingdata.data)
    .then((res) => {
        console.log("Data stored successful!");
    })
    .catch((err) => {
        console.log(`Error while storing data\n ${err}`);
    });
}

initDB();