const { Router } = require("express");
const TMDBapi = require("../controllers/TMDB.controller");

const router = new Router();

router.get("/*", TMDBapi.proxyTMDB);

module.exports = router;
