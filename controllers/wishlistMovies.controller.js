const WishlistMoviesService = require("../services/wishlistMovies.service");
const TMDBservice = require("../services/TMDB.service");
const WishlistMovieDto = require("../dto/wishlistMovie.dto");
const CachedMovieService = require("../services/cachedMovie.service");

exports.getWishlist = async (req, res, next) => {
  const userID = req.userID;
  try {
    const wishlist = await WishlistMoviesService.getWishlist(userID);

    res.status(200).json(wishlist.map((movie) => new WishlistMovieDto(movie)));
  } catch (error) {
    next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    const addingToWishlist = await WishlistMoviesService.addToWishlist(
      userID,
      movieID
    );
    res.status(201).json(new WishlistMovieDto(addingToWishlist));
  } catch (error) {
    next(error);
  }
};

exports.deleteFromWishlist = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    await WishlistMoviesService.deleteFromWishlist(userID, movieID);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    const response = await WishlistMoviesService.changeMovieStatus(
      userID,
      movieID
    );
    res.status(201).json({
      movieID,
      isWatched: response.isWatched,
      addedAt: response.addedAt,
    });
  } catch (error) {
    next(error);
  }
};

exports.checkMovieInWishlist = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    const response = await WishlistMoviesService.getMovieFromWishlist(
      userID,
      movieID
    );
    res.status(200).json({ exists: response ? true : false });
  } catch (error) {
    next(error);
  }
};
