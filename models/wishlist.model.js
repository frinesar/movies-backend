const { Schema, model } = require("mongoose");

const WishlistSchema = new Schema({
  movieID: { type: Number, required: true },
  title: { type: String, required: true },
  isWatched: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, required: true, ref: "User" },
});

module.exports = model("Wishlist", WishlistSchema, "Wishlist");
