const { Router } = require("express");
const TMDBapi = require("../controllers/TMDB.controller");

const router = new Router();

router.get("/search/:query", TMDBapi.findMovie);
router.get("/:movieID", TMDBapi.getMovieByID);
router.get("/credits/:movieID", TMDBapi.getCredits);
router.get("/trending/:timeWindow", TMDBapi.getTrendingMovies);

module.exports = router;
