const WishlistMovies = require("../models/wishlistMovies.model");
const ApiError = require("../exceptions/api.error");
const CashedMovieService = require("./cachedMovie.service");

exports.getMovieFromWishlist = async (userID, movieID) => {
  return await WishlistMovies.findOne({ user: userID, movieID });
};

exports.getWishlist = async (userID) => {
  return await WishlistMovies.find({ user: userID });
};

exports.addToWishlist = async (userID, movieID) => {
  const movies = await WishlistMovies.find({ user: userID });
  const movieToAdd = movies.find((movie) => movie.movieID == movieID);
  if (movieToAdd) {
    throw ApiError.BadRequest("Movie is already in wishlist");
  }
  const movieTitle = (await CashedMovieService.getMovie(movieID)).title;
  return await WishlistMovies.create({ user: userID, movieID, movieTitle });
};

exports.deleteFromWishlist = async (userID, movieID) => {
  return await WishlistMovies.findOneAndDelete({
    user: userID,
    movieID,
  });
};

exports.changeMovieStatus = async (userID, movieID) => {
  const movieToChange = await WishlistMovies.findOne({ user: userID, movieID });
  return await WishlistMovies.findOneAndUpdate(
    {
      user: userID,
      movieID,
    },
    { isWatched: !movieToChange.isWatched },
    { new: true, lean: true }
  );
};

exports.deleteWishlist = async (userID) => {
  return await WishlistMovies.deleteMany({ user: userID });
};
