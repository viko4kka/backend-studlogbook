const { register, login } = require("../controller/authController");

const router = require("express").Router();

router.route("/register").post(register);

router.route("/login").post(login);

module.exports = router;
