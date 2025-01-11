const { Router } = require("express");
const WishlistController = require("../controllers/wishlistMovies.controller");

const router = new Router();

router.get("/", WishlistController.getWishlist);
router.post("/:movieID", WishlistController.addToWishlist);
router.put("/:movieID", WishlistController.changeStatus);
router.delete("/:movieID", WishlistController.deleteFromWishlist);

module.exports = router;
