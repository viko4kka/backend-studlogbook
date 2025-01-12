const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const user = require("../../db/models/user");

const generateToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const register = catchAsync(async (req, res, next) => {
	const body = req.body;

	const newUser = await user.create({
		userName: body.userName,
		email: body.email,
		password: body.password,
		confirmPassword: body.confirmPassword,
		role: body.role,
	});

	if (!["teacher", "student"].includes(body.role)) {
		return next(new AppError("Role must be either teacher or student", 400));
	}

	if (!newUser) {
		return next(new AppError("Failed to create the user", 400));
	}

	const result = newUser.toJSON();

	delete result.password;
	delete result.deletedAt;

	result.token = generateToken({
		id: result.id,
		role: result.role,
	});

	return res.status(201).json({
		status: "success",
		message: "User created successfully",
		data: result,
	});
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError("Please provide email and password", 400));
	}

	const result = await user.findOne({ where: { email } });
	if (!result || !(await bcrypt.compare(password, result.password))) {
		return next(new AppError("Incorrect email or password", 401));
	}

	const token = generateToken({
		id: result.id,
		role: result.role,
	});

	return res.json({
		status: "success",
		token,
		message: "Login successfully",
	});
});

const getUser = catchAsync(async (req, res, next) => {
	const token = req.body.token;
	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

	if (!token) {
		return next(new AppError("Token not found", 401));
	}
	// try {
	// } catch (err) {
	// 	return next(new AppError("Invalid token", 401));
	// }

	const userData = await user.findOne({ where: { id: decoded.id } });

	console.log(userData);

	return res.json({
		status: "success",
		data: userData,
	});
});

module.exports = {
	register,
	login,
	getUser,
};
