const WatchedMoviesListService = require("../services/watchedMoviesList.service");
const WatchedMovieDto = require("../dto/watchedMovie.dto");

exports.getWatchedMoviesList = async (req, res, next) => {
  const userID = req.userID;
  try {
    const watchedMoviesList =
      await WatchedMoviesListService.getWatchedMoviesList(userID);

    res
      .status(200)
      .json(watchedMoviesList.map((movie) => new WatchedMovieDto(movie)));
  } catch (error) {
    next(error);
  }
};

exports.addToWatchedMoviesList = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    const addingToWatchedMoviesList =
      await WatchedMoviesListService.addToWatchedlist(userID, movieID);

    res.status(201).json(new WatchedMovieDto(addingToWatchedMoviesList));
  } catch (error) {
    next(error);
  }
};

exports.deleteFromWatchedMoviesList = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    await WatchedMoviesListService.deleteFromWatchedlist(userID, movieID);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
