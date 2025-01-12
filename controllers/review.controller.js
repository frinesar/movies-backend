const ApiError = require("../exceptions/api.error");
const ReviewService = require("../services/review.service");
const TMDBservice = require("../services/TMDB.service");
const ReviewDto = require("../dto/review.dto");
const UserDto = require("../dto/user.dto");

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewService.getAllReviews();
    const reviewsMovies = await Promise.all(
      reviews.map(async (review) => {
        const info = await TMDBservice.getMovie(review.movieID);
        return new ReviewDto({ movieTitle: info.title, ...review.toObject() });
      })
    );
    res.status(200).json(reviewsMovies);
  } catch (error) {
    next(error);
  }
};

exports.getUsersReviews = async (req, res, next) => {
  const { userID } = req.userID;
  try {
    const reviews = await ReviewService.getUsersReviews(userID);
    const reviewsMovies = await Promise.all(
      reviews.map(async (review) => {
        const info = await TMDBservice.getMovie(review.movieID);
        return new ReviewDto({ movieTitle: info.title, ...review.toObject() });
      })
    );
    res.status(200).json(reviewsMovies);
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  const userID = req.userID;
  const { text, personalRating, movieID } = req.body;
  try {
    const newReview = await ReviewService.createReview(userID, {
      text,
      personalRating,
      movieID,
    });
    res
      .status(201)
      .json({ ...new ReviewDto({ movieID, ...newReview.toObject() }) });
  } catch (error) {
    next(error);
  }
};

exports.getReviewsForMovie = async (req, res, next) => {
  const { movieID } = req.params;
  try {
    const reviews = await ReviewService.getReviewsForMovie(movieID);
    const reviewsMovies = await Promise.all(
      reviews.map(async (review) => {
        const info = await TMDBservice.getMovie(review.movieID);
        return new ReviewDto({ movieTitle: info.title, ...review.toObject() });
      })
    );
    res.status(200).json(reviewsMovies);
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  const userID = req.userID;
  const { reviewID } = req.params;
  const { text, personalRating } = req.body;
  try {
    const reviewInDB = await ReviewService.getReviewByID(reviewID);

    if (reviewInDB.user.toString() !== userID) {
      throw ApiError.Forbidden("No rights on this review");
    }
    const updatedReview = await ReviewService.updateReview({
      id: reviewID,
      text,
      personalRating,
      updatedAt: Date.now(),
    });
    res.status(201).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  const userID = req.userID;
  const { reviewID } = req.params;
  try {
    const reviewInDB = await ReviewService.getReviewByID(reviewID);
    if (reviewInDB.user.toString() !== userID) {
      throw ApiError.Forbidden("No rights on this review");
    }
    await ReviewService.deleteReview(reviewID);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
