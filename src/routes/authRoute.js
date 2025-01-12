const checkRole = require("../../middleware/checkRole");
const { register, login, getUser } = require("../controller/authController");

const router = require("express").Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/retrive-user").post(getUser);

//dostep tylko dla teacher
router.route("/teacher").get(checkRole("teacher"));

//dostep tylko dla student
router.route("/student").get(checkRole("student"));

module.exports = router;
