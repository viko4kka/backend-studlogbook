const {
	createCourse,
	getAllCourses,
	getCourseById,
	updateCourse,
	deleteCourse,
	getAllStudent,
	removeStudentFromCourse,
	addStudentToCourse,
} = require("../controller/courseController");

const router = require("express").Router();

router.route("/create").post(createCourse);

router.route("/all-courses").get(getAllCourses);

router.route("/:id").get(getCourseById);

router.route("/:id").put(updateCourse);

router.route("/:id").delete(deleteCourse);

router.route("/all/students").get(getAllStudent);

router.route("/student/add").post(addStudentToCourse);

// router.route("/student/delete").delete(removeStudentFromCourse);s

module.exports = router;
