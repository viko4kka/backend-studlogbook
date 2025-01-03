const user = require("../../db/models/user");

const register = async (req, res, next) => {
	const body = req.body;

	const newUser = await user.create({
		userName: body.userName,
		email: body.email,
		password: body.password,
	});

	if (!newUser) {
		return res.status(400).json({
			status: "fail",
			message: "Failed to create the user",
		});
	}

	return res.status(201).json({
		status: "success",
		message: "User created successfully",
		data: newUser,
	});
};

module.exports = {
	register,
};
