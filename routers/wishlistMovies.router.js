const { Router } = require("express");
const WishlistController = require("../controllers/wishlistMovies.controller");

const router = new Router();

router.get("/", WishlistController.getWishlist);
router.post("/", WishlistController.addToWishlist);
router.put("/", WishlistController.changeStatus);
router.delete("/", WishlistController.deleteFromWishlist);

module.exports = router;
