const Wishlist = require("../models/wishlist.model");
const ApiError = require("../exceptions/api.error");
const CashedMovieService = require("./cachedMovie.service");

exports.getMovieFromWishlist = async (userID, movieID) => {
  return await Wishlist.findOne({ user: userID, movieID });
};

exports.getWishlist = async (userID) => {
  return await Wishlist.find({ user: userID });
};

exports.addToWishlist = async (userID, movieID) => {
  const movies = await Wishlist.find({ user: userID });
  const movieToAdd = movies.find((movie) => movie.movieID == movieID);
  if (movieToAdd) {
    throw ApiError.BadRequest("Movie is already in wishlist");
  }
  const title = (await CashedMovieService.getMovie(movieID)).title;
  return await Wishlist.create({ user: userID, movieID, title });
};

exports.deleteFromWishlist = async (userID, movieID) => {
  return await Wishlist.findOneAndDelete({
    user: userID,
    movieID,
  });
};

exports.changeMovieStatus = async (userID, movieID) => {
  const movieToChange = await Wishlist.findOne({ user: userID, movieID });
  return await Wishlist.findOneAndUpdate(
    {
      user: userID,
      movieID,
    },
    { isWatched: !movieToChange.isWatched },
    { new: true, lean: true }
  );
};

exports.deleteWishlist = async (userID) => {
  return await Wishlist.deleteMany({ user: userID });
};
