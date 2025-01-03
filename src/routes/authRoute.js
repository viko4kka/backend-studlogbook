const { register } = require("../controller/authController");

const router = require("express").Router();

router.route("/register").post(register);

module.exports = router;
