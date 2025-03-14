const Review = require("../models/review.model");
const ApiError = require("../exceptions/api.error");

exports.getUsersReviews = async (userID) => {
  return await Review.find({ user: userID }).sort({ createdAt: -1 });
};

exports.getReviewsForMovie = async (movieID, userID) => {
  return await Review.find({ movieID, user: userID });
};

exports.getReviewByID = async (reviewID) => {
  return await Review.findById(reviewID);
};

exports.createReview = async (userID, review) => {
  return await Review.create({ user: userID, ...review });
};

exports.deleteReview = async (reviewID) => {
  return await Review.findOneAndDelete({ _id: reviewID });
};

exports.updateReview = async (review) => {
  const reviewToUpdate = await Review.findOneAndUpdate(
    { _id: review.id },
    { ...review },
    { new: true }
  );
  if (!reviewToUpdate) {
    throw ApiError.BadRequest("No such review to update");
  }
  return reviewToUpdate;
};
