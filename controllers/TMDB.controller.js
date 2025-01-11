const ApiError = require("../exceptions/api.error");
const TMDBService = require("../services/TMDB.service");

exports.findMovie = async (req, res, next) => {
  const { query } = req.params;
  try {
    const response = await TMDBService.findMovie(query);
    res.status(200).json(
      response.results.map((movie) => {
        return {
          movieID: movie.id,
          title: movie.title,
          posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
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
    const response = await TMDBService.getMovie(movieID);
    res.status(200).json({
      id: response.id,
      title: response.title,
      tagline: response.tagline,
      imagePath: `https://image.tmdb.org/t/p/original${response.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/w500${response.poster_path}`,
      overview: response.overview,
      releaseDate: response.release_date,
      budget: response.budget,
      revenue: response.revenue,
      runtime: response.runtime,
      voteAverage: response.vote_average,
      voteCount: response.vote_count,
      genres: response.genres,
    });
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};

exports.getCredits = async (req, res, next) => {
  const { movieID } = req.params;

  try {
    const response = await TMDBService.getCredits(movieID);
    const director = response.crew.filter(
      (member) => member.job === "Director"
    );
    const novelist = response.crew.filter((member) => member.job === "Novel");
    const screenplay = response.crew.filter(
      (member) => member.job === "Screenplay"
    );
    console.log(director, novelist, screenplay);

    res.status(200).json({
      director: director.map((member) => {
        return {
          name: member.name,
          profilePath: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
        };
      }),
      novelist: novelist.map((member) => {
        return {
          name: member.name,
          profilePath: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
        };
      }),
      screenplay: screenplay.map((member) => {
        return {
          name: member.name,
          profilePath: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
        };
      }),
    });
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
          profilePath: member.profile_path,
          character: member.character,
        };
      })
    );
  } catch (error) {
    next(ApiError.BadRequest(error));
  }
};
