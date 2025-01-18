module.exports = class MovieDto {
  movieID;
  movieTitle;
  tagline;
  imagePath;
  posterPath;
  overview;
  releaseDate;
  budget;
  revenue;
  runtime;
  voteAverage;
  voteCount;
  genres;
  cast;
  crew;

  constructor(movie) {
    this.movieID = movie.id;
    this.movieTitle = movie.title;
    this.tagline = movie.tagline;
    this.imagePath = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    this.posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.overview = movie.overview;
    this.releaseDate = movie.release_date;
    this.budget = movie.budget;
    this.revenue = movie.revenue;
    this.runtime = movie.runtime;
    this.voteAverage = movie.vote_average;
    this.voteCount = movie.vote_count;
    this.genres = movie.genres;
    this.cast = movie.cast.map((member) => {
      return {
        id: member.id,
        name: member.name,
        character: member.character,
        profilePath: `https://image.tmdb.org/t/p/w300${member.profile_path}`,
      };
    });
    this.crew = (function () {
      const result = {};
      for (const role in movie.crew.toObject()) {
        result[role] = movie.crew[role].map((member) => {
          return {
            id: member.id,
            name: member.name,
            profilePath: `https://image.tmdb.org/t/p/w300${member.profile_path}`,
          };
        });
      }
      return result;
    })();
  }
};
