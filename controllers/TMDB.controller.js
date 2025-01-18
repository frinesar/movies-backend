const ApiError = require("../exceptions/api.error");
const TMDBService = require("../services/TMDB.service");
const CachedMovieService = require("../services/cachedMovie.service");
const MovieDto = require("../dto/movie.dto");

exports.findMovie = async (req, res, next) => {
  const { query } = req.params;
  try {
    const response = await TMDBService.findMovie(query);
    res.status(200).json(
      response.results.map((movie) => {
        return {
          movieID: movie.id,
          title: movie.title,
          posterPath: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
          originalLanguage: movie.original_language,
          releaseDate: movie.release_date,
        };
      })
    );
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};

exports.getMovieByID = async (req, res, next) => {
  const { movieID } = req.params;
  try {
    const movieInCache = await CachedMovieService.getMovie(movieID);
    res.status(200).json(new MovieDto(movieInCache));
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};

exports.getCrew = async (req, res, next) => {
  const { movieID } = req.params;

  try {
    const response = (await CachedMovieService.getMovie(movieID)).crew;
    const result = {};
    for (const role in response.toObject()) {
      result[role] = response[role].map((member) => {
        return {
          id: member.id,
          name: member.name,
          profilePath: `https://image.tmdb.org/t/p/w300${member.profile_path}`,
        };
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};

exports.getCast = async (req, res, next) => {
  const { movieID } = req.params;

  try {
    const response = (await TMDBService.getCredits(movieID)).cast;
    res.status(200).json(
      response.map((member) => {
        return {
          id: member.id,
          name: member.name,
          profilePath: `https://image.tmdb.org/t/p/w300/${member.profile_path}`,
          character: member.character,
        };
      })
    );
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};
