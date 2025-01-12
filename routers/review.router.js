const { Router } = require("express");
const ReviewController = require("../controllers/review.controller");
const tokenValidator = require("../middleware/token-validator");

const router = new Router();

router.get("/all", ReviewController.getAllReviews);
router.post("/", tokenValidator, ReviewController.createReview);
router.put("/:reviewID", tokenValidator, ReviewController.updateReview);
router.delete("/:reviewID", tokenValidator, ReviewController.deleteReview);

module.exports = router;
