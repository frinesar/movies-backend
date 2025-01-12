module.exports = class ReviewDto {
  id;
  movieID;
  movieTitle;
  text;
  personalRating;
  updatedAt;
  createdAt;

  constructor(review) {
    this.id = review._id;
    this.movieID = review.id;
    this.movieTitle = review.movieTitle;
    this.text = review.text;
    this.personalRating = review.personalRating;
    this.updatedAt = review.updatedAt;
    this.createdAt = review.createdAt;
  }
};
