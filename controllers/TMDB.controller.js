const ApiError = require("../exceptions/api.error");
const TMDBService = require("../services/TMDB.service");
const CachedMovieService = require("../services/cachedMovie.service");

exports.proxyTMDB = async (req, res, next) => {
  try {
    const data = await TMDBService.proxyTMDBRequest(req.params[0], req.query);
    res.status(200).json(data);
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};
