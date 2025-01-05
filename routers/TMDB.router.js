const { Router } = require("express");
const TMDBapi = require("../controllers/TMDB.controller");

const router = new Router();

router.get("/search/:query", TMDBapi.findMovie);

module.exports = router;
