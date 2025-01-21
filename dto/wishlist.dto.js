module.exports = class WishlistMovieDto {
  movieID;
  title;
  addedAt;
  isWatched;

  constructor(movie) {
    this.movieID = movie.movieID;
    this.title = movie.title;
    this.addedAt = movie.addedAt;
    this.isWatched = movie.isWatched;
  }
};
