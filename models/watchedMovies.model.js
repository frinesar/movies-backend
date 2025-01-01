const { Schema, model } = require("mongoose");

const WatchedMovieSchema = new Schema({
  movieID: { type: Number, required: true },
  watchedAt: { type: Date, default: Date.now },
});

const WatchedMoviesSchema = new Schema({
  moviesToWatch: [WatchedMovieSchema],
  user: { type: Schema.ObjectId, required: true, ref: "User" },
});

module.exports = model("WatchedMovies", WatchedMoviesSchema, "WatchedMovies");
