const { Router } = require("express");
const TMDBapi = require("../controllers/TMDB.controller");

const router = new Router();

router.get("/search/:query", TMDBapi.findMovie);
router.get("/:movieID", TMDBapi.getMovieByID);

module.exports = router;
