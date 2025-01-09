const WatchedMoviesList = require("../models/watchedMoviesList.model");

exports.getWatchedMoviesList = async (userID) => {
  const movies = await WatchedMoviesList.find({ user: userID });
  return movies;
};

exports.addToWatchedlist = async (userID, movieID) => {
  const movies = await WatchedMoviesList.find({ user: userID });
  const movieToAdd = movies.find((movie) => movie.movieID == movieID);
  if (movieToAdd) {
    throw ApiError.BadRequest("Movie is already in watchedlist");
  }
  return await WatchedMoviesList.create({ user: userID, movieID });
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
