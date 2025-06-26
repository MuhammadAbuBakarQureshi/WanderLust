const mongoose = require("mongoose");
const listingdata = require("./data");
const Listing = require("../models/listing");
const { listingSchema } = require("../schema");

const initDB = async  () => {

    await Listing.deleteMany({});
    
    listingdata.data = listingdata.data.map((obj) => ({
      ...obj,
      owner: "685bb83ca6d4bb7f88783335", // change this ID if you want to change the user of all this dummy data

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