const { Schema, model } = require("mongoose");

const BelongsToCollectionSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  poster_path: { type: String },
  backdrop_path: { type: String },
});

const GenreSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const ProductionCompanySchema = new Schema({
  id: { type: Number, required: true },
  logo_path: { type: String },
  name: { type: String, required: true },
  origin_country: { type: String, required: true },
});

const ProductionCountrySchema = new Schema({
  iso_3166_1: { type: String, required: true },
  name: { type: String, required: true },
});

const SpokenLanguageSchema = new Schema({
  english_name: { type: String, required: true },
  iso_639_1: { type: String, required: true },
  name: { type: String, required: true },
});

const CachedMovieSchema = new Schema({
  adult: { type: Boolean, required: true },
  backdrop_path: { type: String },
  belongs_to_collection: BelongsToCollectionSchema,
  budget: { type: Number, required: true },
  genres: [GenreSchema],
  homepage: { type: String },
  id: { type: Number, required: true, unique: true },
  imdb_id: { type: String },
  origin_country: [{ type: String }],
  original_language: { type: String, required: true },
  original_title: { type: String, required: true },
  overview: { type: String },
  popularity: { type: Number, required: true },
  poster_path: { type: String },
  production_companies: [ProductionCompanySchema],
  production_countries: [ProductionCountrySchema],
  release_date: { type: Date, required: true },
  revenue: { type: Number, required: true },
  runtime: { type: Number },
  spoken_languages: [SpokenLanguageSchema],
  status: { type: String, required: true },
  tagline: { type: String },
  title: { type: String, required: true },
  video: { type: Boolean, required: true },
  vote_average: { type: Number, required: true },
  vote_count: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("CachedMovie", CachedMovieSchema, "CachedMovies");
