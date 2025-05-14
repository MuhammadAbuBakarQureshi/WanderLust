const mongoose = require("mongoose");

const Review = require("./review");

const Schema = mongoose.Schema;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main(){

    await mongoose.connect(MONGO_URL);
}

main().then((res) => {

    console.log(`Connection Successful`);
}).catch((err) => {

    console.log(`Error while connecting to database: ${err}`);
})


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1744970018496-c003c2e66163?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1744970018496-c003c2e66163?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
  },

  price: {

    type: Number,
    default: 1,
    set: (v) => v == "" ? undefined : v,
  },

  location: String,
  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],

  owner: {

    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

listingSchema.post("findOneAndDelete", async (listing, next) => {

    if(listing.reviews.length){

        await Review.deleteMany({ _id: {$in: listing.reviews}});
    }

    next();
});


const Listing = new mongoose.model("Listing", listingSchema);

module.exports = Listing;