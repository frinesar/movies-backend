module.exports = class WishlistMovieDto {
  movieID;
  movieTitle;
  addedAt;
  isWatched;

  constructor(movie) {
    this.movieID = movie.movieID;
    this.movieTitle = movie.movieTitle;
    this.addedAt = movie.addedAt;
    this.isWatched = movie.isWatched;
  }
};
