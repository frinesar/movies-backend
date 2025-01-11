const WishlistMovies = require("../services/wishlistMovies.service");
const TMDBservice = require("../services/TMDB.service");

exports.getWishlist = async (req, res, next) => {
  const userID = req.userID;
  try {
    const wishlist = await WishlistMovies.getWishlist(userID);
    const wishlistMovies = await Promise.all(
      wishlist.map(async (movie) => {
        const info = await TMDBservice.getMovie(movie.movieID);
        return {
          movieID: movie.movieID,
          title: info.title,
          releaseDate: info.release_date,
          runtime: info.runtime,
          addedAt: movie.addedAt,
          isWatched: movie.isWatched,
        };
      })
    );
    res.status(200).json(wishlistMovies);
  } catch (error) {
    next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    const addingToWishlist = await WishlistMovies.addToWishlist(
      userID,
      movieID
    );
    res.status(201).json({ movieID, addedAt: addingToWishlist.addedAt });
  } catch (error) {
    next(error);
  }
};

exports.deleteFromWishlist = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    await WishlistMovies.deleteFromWishlist(userID, movieID);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    const response = await WishlistMovies.changeMovieStatus(userID, movieID);
    res.status(201).json({
      movieID,
      isWatched: response.isWatched,
    });
  } catch (error) {
    next(error);
  }
};
