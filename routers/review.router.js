const { Router } = require("express");
const ReviewController = require("../controllers/review.controller");
const tokenValidator = require("../middleware/token-validator");

const router = new Router();

router.get("/:reviewID", ReviewController.getReviewByID);
router.get("/", ReviewController.getUsersReviews);
router.post("/", ReviewController.createReview);
router.put("/:reviewID", ReviewController.updateReview);
router.delete("/:reviewID", ReviewController.deleteReview);

module.exports = router;
