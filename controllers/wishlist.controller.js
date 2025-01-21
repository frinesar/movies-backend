const WishlistService = require("../services/wishlist.service");
const TMDBservice = require("../services/TMDB.service");
const WishlistMovieDto = require("../dto/wishlist.dto");
const CachedMovieService = require("../services/cachedMovie.service");

exports.getWishlist = async (req, res, next) => {
  const userID = req.userID;
  try {
    const wishlist = await WishlistService.getWishlist(userID);

    res.status(200).json(wishlist.map((movie) => new WishlistMovieDto(movie)));
  } catch (error) {
    next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    const addingToWishlist = await WishlistService.addToWishlist(
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
    await WishlistService.deleteFromWishlist(userID, movieID);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    const response = await WishlistService.changeMovieStatus(userID, movieID);
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
    const response = await WishlistService.getMovieFromWishlist(
      userID,
      movieID
    );
    res.status(200).json({ exists: response ? true : false });
  } catch (error) {
    next(error);
  }
};
