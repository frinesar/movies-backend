const ApiError = require("../exceptions/api.error");
const TMDBService = require("../services/TMDB.service");

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
    const response = await TMDBService.getMovie(movieID);
    res.status(200).json({
      title: response.title,
      imagePath: `https://image.tmdb.org/t/p/w500${response.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
      overview: response.overview,
      releaseDate: response.release_date,
    });
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};
