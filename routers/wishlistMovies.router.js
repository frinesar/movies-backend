const { Router } = require("express");
const WishlistController = require("../controllers/wishlistMovies.controller");
const tokenValidator = require("../middleware/token-validator");

const router = new Router();

router.get("/", WishlistController.getWishlist);
router.get("/:movieID", WishlistController.checkMovieInWishlist);
router.post("/:movieID", WishlistController.addToWishlist);
router.put("/:movieID", WishlistController.changeStatus);
router.delete("/:movieID", WishlistController.deleteFromWishlist);

module.exports = router;
