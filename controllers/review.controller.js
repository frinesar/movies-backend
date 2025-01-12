const ApiError = require("../exceptions/api.error");
const ReviewService = require("../services/review.service");
const TMDBservice = require("../services/TMDB.service");

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewService.getAllReviews();
    const reviewsMovies = await Promise.all(
      reviews.map(async (review) => {
        const info = await TMDBservice.getMovie(review.movieID);
        return {
          id: review._id,
          movieID: review.movieID,
          movieTitle: info.title,
          text: review.text,
          updatedAt: review.updatedAt,
          personalRating: review.personalRating,
        };
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
    res.status(201).json({ movieID, addedAt: newReview.createdAt });
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
    res.status(201).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

// exports.getUsersReviews = async (req, res, next) => {
//   const { userID } = req.userID;
//   const
// }
