const { Router } = require("express");
const UserController = require("../controllers/user.controller");

const router = new Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logout);

module.exports = router;
