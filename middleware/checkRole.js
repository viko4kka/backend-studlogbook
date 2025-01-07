

//middleware do sprawdzenia roli usera

const AppError = require("../src/utils/appError");

const checkRole = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			return next(
				new AppError(`Lack of eligibility. Required role: ${role}`, 403)
			);
		}
		next();
	};
};

module.exports = checkRole;
