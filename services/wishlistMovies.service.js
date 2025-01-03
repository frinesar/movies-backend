const WishlistMovies = require("../models/wishlistMovies.model");
const ApiError = require("../exceptions/api.error");

exports.getWishlist = async (userID) => {
  const movies = await WishlistMovies.find({ user: userID });
  return movies;
};

exports.addToWishlist = async (userID, movieID) => {
  const movies = await WishlistMovies.find({ user: userID });
  const movieToAdd = movies.find((movie) => movie.movieID == movieID);
  if (movieToAdd) {
    throw ApiError.BadRequest("Movie is already in wishlist");
  }
  return await WishlistMovies.create({ user: userID, movieID });
};

exports.deleteFromWishlist = async (userID, movieID) => {
  return await WishlistMovies.findOneAndDelete({
    user: userID,
    movieID,
  });
};

exports.changeMovieStatus = async (userID, movieID) => {
  const movieToChange = await WishlistMovies.findOne({ user: userID, movieID });
  return await WishlistMovies.updateOne(
    {
      user: userID,
      movieID,
    },
    { isWatched: !movieToChange.isWatched }
  );
};
