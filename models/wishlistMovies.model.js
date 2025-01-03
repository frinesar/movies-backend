const { Schema, model } = require("mongoose");

const WishlistMoviesSchema = new Schema({
  movieID: { type: Number, required: true },
  isWatched: { type: Boolean, default: false },
  addedAt: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, required: true, ref: "User" },
});

module.exports = model(
  "WishlistMovies",
  WishlistMoviesSchema,
  "WishlistMovies"
);
