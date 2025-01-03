const { Router } = require("express");
const WatchedMoviesListController = require("../controllers/watchedMoviesList.controller");

const router = new Router();

router.get("/", WatchedMoviesListController.getWatchedMoviesList);
router.post("/", WatchedMoviesListController.addToWatchedMoviesList);
router.delete("/", WatchedMoviesListController.deleteFromWatchedMoviesList);

module.exports = router;
