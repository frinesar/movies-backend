const ApiError = require("../exceptions/api.error");
const TMDBService = require("../services/TMDB.service");
const CachedMovieService = require("../services/cachedMovie.service");

exports.findMovie = async (req, res, next) => {
  const { query } = req.params;
  try {
    const response = await TMDBService.findMovie(query);
    res.status(200).json(response);
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};

exports.getMovieByID = async (req, res, next) => {
  const { movieID } = req.params;
  try {
    const response = await CachedMovieService.getMovie(movieID);
    res.status(200).json({ ...response, _id: undefined, __v: undefined });
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};

exports.getCredits = async (req, res, next) => {
  const { movieID } = req.params;

  try {
    const response = await TMDBService.getCredits();
    res.status(200).json(response);
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};

exports.getTrendingMovies = async (req, res, next) => {
  const { query: timeWindow } = req.params;
  try {
    const response = await TMDBService.getTrendingMovies(timeWindow);
    res.status(200).json(response);
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};
