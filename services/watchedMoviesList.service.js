const WatchedMoviesList = require("../models/watchedMoviesList.model");
const CashedMovieService = require("./cachedMovie.service");
const ApiError = require("../exceptions/api.error");

exports.getWatchedMoviesList = async (userID) => {
  return await WatchedMoviesList.find({ user: userID });
};

exports.addToWatchedlist = async (userID, movieID) => {
  const movies = await WatchedMoviesList.find({ user: userID });
  const movieToAdd = movies.find((movie) => movie.movieID == movieID);
  if (movieToAdd) {
    throw ApiError.BadRequest("Movie is already in watchedlist");
  }
  const movieTitle = (await CashedMovieService.getMovie(movieID)).title;
  return await WatchedMoviesList.create({
    user: userID,
    movieID,
    movieTitle,
  });
};

exports.deleteFromWatchedlist = async (userID, movieID) => {
  return await WatchedMoviesList.findOneAndDelete({
    user: userID,
    movieID,
  });
};

exports.deleteWatchedList = async (userID) => {
  return await WatchedMoviesList.deleteMany({ user: userID });
};
