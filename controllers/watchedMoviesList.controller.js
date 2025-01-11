const WatchedMoviesList = require("../services/watchedMoviesList.service");
const TMDBservice = require("../services/TMDB.service");

exports.getWatchedMoviesList = async (req, res, next) => {
  const userID = req.userID;
  try {
    const watchedMoviesList = await WatchedMoviesList.getWatchedMoviesList(
      userID
    );

    const watchedMoviesListMovies = await Promise.all(
      watchedMoviesList.map(async (movie) => {
        const info = await TMDBservice.getMovie(movie.movieID);
        return {
          title: info.title,
          releaseDate: info.release_date,
          runtime: info.runtime,
          movieID: movie.movieID,
          watchedAt: movie.watchedAt,
        };
      })
    );

    res.status(200).json(watchedMoviesListMovies);
  } catch (error) {
    next(error);
  }
};

exports.addToWatchedMoviesList = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    const addingToWatchedMoviesList = await WatchedMoviesList.addToWatchedlist(
      userID,
      movieID
    );
    res.status(201).json({
      movieID,
      watchedAt: addingToWatchedMoviesList.watchedAt,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFromWatchedMoviesList = async (req, res, next) => {
  const userID = req.userID;
  const { movieID } = req.params;
  try {
    await WatchedMoviesList.deleteFromWatchedlist(userID, movieID);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
