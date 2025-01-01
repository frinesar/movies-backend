const { Schema, model } = require("mongoose");

const MovieToWatchSchema = new Schema({
  movieID: { type: Number, required: true },
  isWatched: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now },
});

const WishlistSchema = new Schema({
  moviesToWatch: [MovieToWatchSchema],
  user: { type: Schema.ObjectId, required: true, ref: "User" },
});

module.exports = model("Wishlist", WishlistSchema, "Wishlists");
