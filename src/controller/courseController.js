const course = require("../../db/models/course");
const AppError = require("../utils/appError");

//do tworzenia kursu

const createCourse = async (req, res, next) => {
	const { title, description, startDate, endDate, teacherId } = req.body;

	const newCourse = await course.create({
		title: title,
		description: description,
		startDate: startDate,
		endDate: endDate,
		teacherId: teacherId,
	});

	if (!newCourse) {
		return next(new AppError("Failed to create the course", 400));
	}

	return res.status(201).json({
		status: "success",
		data: newCourse.toJSON(),
	});
};

//zobaczyc wszystkie kursy

const getAllCourses = async (req, res, next) => {
	const courses = await course.findAll();

	if (!courses) {
		return next(new AppError("Failed to fetch courses", 400));
	}

	return res.status(200).json({
		status: "success",
		data: courses, //wazne, trzeba zapamietac, gdy uzywasz findAll to on zwraca tablice, wiec .toJSON() nie zadziala
		message: "All courses fetched successfully",
	});
};

const getCourseById = async (req, res, next) => {
	const courseData = await course.findOne({ where: { id: req.params.id } });

	if (!courseData) {
		return next(new AppError(`Failed to get course with id ${id}`, 400));
	}

	return res.status(200).json({
		status: "success",
		data: courseData.toJSON(),
	});
};
const updateCourse = async (req, res, next) => {
	const { id } = req.params;
	const { title, description, startDate, endDate, teacherId } = req.body;

	const findCourse = await course.findOne({
		where: {
			id,
		},
	});

	if (!findCourse) {
		return next(new AppError(`Failed to get course with id ${id}`, 400));
	}

	const updateData = {};
	if (title) updateData.title = title;
	if (description) updateData.description = description;
	if (startDate) updateData.startDate = startDate;
	if (endDate) updateData.endDate = endDate;
	if (teacherId) updateData.teacherId = teacherId;

	const updatedRows = await course.update(updateData, {
		where: { id },
	});

	if (!updatedRows) {
		return next(new AppError("Failed to update the course", 400));
	}

	//ponownie ladujemy edytowany kurs, aby zwrocic go w odpowiedzi
	const updatedCourse = await course.findOne({
		where: { id },
	});

	return res.status(200).json({
		status: "success",
		data: updatedCourse,
		message: "Course updated successfully",
	});
};

const deleteCourse = async (req, res, next) => {
	const { id } = req.params;

	const deletedCourse = await course.destroy({
		where: {
			id,
		},
	});

	if (!deletedCourse) {
		return next(new AppError(`Failed to delete course with id ${id}`, 400));
	}

	return res.status(200).json({
		status: "success",
		data: deletedCourse,
		message: "Course deleted successfully",
	});
};

module.exports = {
	createCourse,
	getAllCourses,
	getCourseById,
	updateCourse,
	deleteCourse
};
