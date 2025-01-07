const { stack } = require("sequelize/lib/utils");
const AppError = require("../utils/appError");

const sendErrorDev = (error, res) => {
	const statusCode = error.statusCode || 500;
	const status = error.status || "error";
	const message = error.message;
	const stack = error.stack;

	res.status(statusCode).json({
		status,
		message,
		stack,
	});
};
const sendErrorProd = (error, res) => {
	const statusCode = error.statusCode || 500;
	const status = error.status || "error";
	const message = error.message;
	const stack = error.stack;

	if (error.isOperational) {
		return res.status(statusCode).json({
			status,
			message,
		});
	}

	console.error(error.name, error.message, stack);
	return res.status(500).json({
		status: "error",
		message: "Something went wrong",
	});
};

const globalErrorHandler = (err, req, res, next) => {
	console.error(
		"Error caught in globalErrorHandler:",
		err.name,
		err.message,
		err.stack
	);

	if (err.name === "SequelizeValidationError") {
		err = new AppError("Cannot be null", 400);
	}
	// Obsługa błędu unikalności w Sequelize
	if (err.name === "SequelizeUniqueConstraintError") {
		err = new AppError(
			"Email already exists. Please use a different value",
			400
		);
	}

	if (process.env.NODE_ENV === "development") {
		return sendErrorDev(err, res);
	}

	sendErrorProd(err, res);
};

module.exports = globalErrorHandler;
