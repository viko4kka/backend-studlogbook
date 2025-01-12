require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const courseRoute = require("./routes/courseRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();

app.use(express.json());
app.use(cors());

//all routes will be here

app.use("/api/auth", authRoute);
app.use("/api/course", courseRoute);

app.use(
	"*",
	catchAsync(async (req, res, next) => {
		throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
	})
);

app.use(globalErrorHandler);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

const PORT = process.env.APP_PORT || 3002;

app.listen(process.env.APP_PORT, () => {
	console.log("Server up and running ", PORT);
});
