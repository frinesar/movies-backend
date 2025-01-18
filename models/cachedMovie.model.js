const { Schema, model } = require("mongoose");

const CashedMovieSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  tagline: { type: String },
  backdrop_path: { type: String },
  poster_path: { type: String },
  release_date: { type: Date },
  budget: { type: Number },
  revenue: { type: Number },
  runtime: { type: Number },
  vote_average: { type: Number },
  vote_count: { type: Number },
  updatedAt: { type: Date },
  genres: [{ name: String }],
  crew: {
    director: [
      {
        id: { type: Number },
        name: { type: String },
        profile_path: { type: String },
      },
    ],
    novel: [
      {
        id: { type: Number },
        name: { type: String },
        profile_path: { type: String },
      },
    ],
    screenplay: [
      {
        id: { type: Number },
        name: { type: String },
        profile_path: { type: String },
      },
    ],
  },
  cast: [
    {
      id: { type: Number },
      name: { type: String },
      profile_path: { type: String },
      character: { type: String },
    },
  ],
});

module.exports = model("CashedMovie", CashedMovieSchema, "CashedMovies");
