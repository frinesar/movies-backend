const { Router } = require("express");
const TMDBapi = require("../controllers/TMDB.controller");

const router = new Router();

router.get("/search/:query", TMDBapi.findMovie);
router.get("/trending/:timeWindow", TMDBapi.getTrendingMovies);
router.get("/:movieID", TMDBapi.getMovieByID);
router.get("/crew/:movieID", TMDBapi.getCrew);
router.get("/cast/:movieID", TMDBapi.getCast);

module.exports = router;
