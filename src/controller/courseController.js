const course = require("../../db/models/course");
const AppError = require("../utils/appError");

const createCourse = async (req, res, next) => {
	const { title, description, startDate, endDate, teacherId } = req.body;

	const newCourse = await course.create({
		title: body.title,
		description: body.description,
		startDate: body.startDate,
		endDate: body.endDate,
		teacherId: body.teacherId,
	});

	if (!newCourse) {
		return next(new AppError("Failed to create the course", 400));
	}

	return res.status(201).json({
		status: "success",
		data: newCourse.toJSON(),
	});
};

module.exports = {
	createCourse,
};
