const { Router } = require("express");
const WatchedMoviesListController = require("../controllers/watchedMoviesList.controller");

const router = new Router();

router.get("/", WatchedMoviesListController.getWatchedMoviesList);
router.post("/:movieID", WatchedMoviesListController.addToWatchedMoviesList);
router.delete(
  "/:movieID",
  WatchedMoviesListController.deleteFromWatchedMoviesList
);

module.exports = router;
