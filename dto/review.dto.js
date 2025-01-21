module.exports = class ReviewDto {
  reviewID;
  movieID;
  movieTitle;
  text;
  personalRating;
  updatedAt;
  createdAt;

  constructor(review) {
    this.reviewID = review._id;
    this.movieID = review.movieID;
    this.title = review.title;
    this.text = review.text;
    this.personalRating = review.personalRating;
    this.updatedAt = review.updatedAt;
    this.createdAt = review.createdAt;
  }
};
