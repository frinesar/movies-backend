const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const tokenValidator = require("../middleware/token-validator");

const router = new Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);
router.delete("/", tokenValidator, UserController.deleteUser);

module.exports = router;
