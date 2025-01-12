module.exports = class WatchedMovieDto {
  movieID;
  title;
  releaseDate;
  runtime;
  watchedAt;

  constructor(movie) {
    this.movieID = movie.id;
    this.title = movie.title;
    this.releaseDate = movie.release_date;
    this.runtime = movie.runtime;
    this.watchedAt = movie.watchedAt;
  }
};
