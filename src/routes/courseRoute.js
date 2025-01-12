const {
	createCourse,
	getAllCourses,
	getCourseById,
	updateCourse,
    deleteCourse,
} = require("../controller/courseController");

const router = require("express").Router();

router.route("/create").post(createCourse);

router.route("/all-courses").get(getAllCourses);

router.route("/:id").get(getCourseById);

router.route("/:id").put(updateCourse);

router.route("/:id").delete(deleteCourse);

module.exports = router;
