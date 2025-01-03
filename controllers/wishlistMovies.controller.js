const WishlistMovies = require("../services/wishlistMovies.service");

exports.getWishlist = async (req, res, next) => {
  const userID = req.userID;
  try {
    const wishlist = await WishlistMovies.getWishlist(userID);
    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.body;
  try {
    const addingToWishlist = await WishlistMovies.addToWishlist(
      userID,
      movieID
    );
    res.status(201).json(addingToWishlist);
  } catch (error) {
    next(error);
  }
};

exports.deleteFromWishlist = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.body;
  try {
    await WishlistMovies.deleteFromWishlist(userID, movieID);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.body;
  try {
    await WishlistMovies.changeMovieStatus(userID, movieID);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
