const { createCourse } = require("../controller/courseController");

const router = require("express").Router();

router.route("/create").post(createCourse);

module.exports = router;
