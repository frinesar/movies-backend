const ApiError = require("../exceptions/api.error");
const TMDB_API = process.env.TMDB_API;
const TMDB_URL = process.env.TMDB_URL;

exports.getMovie = async (movieID) => {
  return (
    await fetch(`${TMDB_URL}/movie/${movieID}?api_key=${TMDB_API}`)
  ).json();
};

exports.findMovie = async (query) => {
  return (
    await fetch(
      `${process.env.TMDB_URL}/search/movie?query=${query}&api_key=${process.env.TMDB_API}`
    )
  ).json();
};
