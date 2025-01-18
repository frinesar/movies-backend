module.exports = class WatchedMovieDto {
  movieID;
  movieTitle;
  watchedAt;

  constructor(movie) {
    this.movieID = movie.movieID;
    this.movieTitle = movie.movieTitle;
    this.watchedAt = movie.watchedAt;
  }
};
