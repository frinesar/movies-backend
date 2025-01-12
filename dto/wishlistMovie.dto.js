module.exports = class WishlistMovieDto {
  movieID;
  title;
  releaseDate;
  runtime;
  addedAt;
  isWatched;

  constructor(movie) {
    this.movieID = movie.id;
    this.title = movie.title;
    this.releaseDate = movie.release_date;
    this.runtime = movie.runtime;
    this.addedAt = movie.addedAt;
    this.isWatched = movie.isWatched;
  }
};
