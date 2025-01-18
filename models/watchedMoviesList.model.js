const { Schema, model } = require("mongoose");

const WatchedMoviesListSchema = new Schema({
  movieID: { type: Number, required: true },
  movieTitle: { type: String, required: true },
  watchedAt: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, required: true, ref: "User" },
});

module.exports = model(
  "WatchedMoviesList",
  WatchedMoviesListSchema,
  "WatchedMoviesList"
);
