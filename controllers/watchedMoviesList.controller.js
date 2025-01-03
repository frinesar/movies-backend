const WatchedMoviesList = require("../services/watchedMoviesList.service");

exports.getWatchedMoviesList = async (req, res, next) => {
  const userID = req.userID;
  try {
    const watchedMoviesList = await WatchedMoviesList.getWatchedMoviesList(
      userID
    );
    res.status(200).json(watchedMoviesList);
  } catch (error) {
    next(error);
  }
};

exports.addToWatchedMoviesList = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.body;
  try {
    const addingToWatchedMoviesList = await WatchedMoviesList.addToWatchedlist(
      userID,
      movieID
    );
    res.status(201).json(addingToWatchedMoviesList);
  } catch (error) {
    next(error);
  }
};

exports.deleteFromWatchedMoviesList = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.body;
  try {
    await WatchedMoviesList.deleteFromWatchedMoviesList(userID, movieID);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
