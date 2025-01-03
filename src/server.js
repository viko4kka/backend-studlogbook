require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const authRoute = require("./routes/authRoute");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "Rest api are working",
	});
});

//all routes will be here

app.use("/api/auth", authRoute);

app.use("*", (req, res, next) => {
	res.json(404).json({
		status: "fail",
		message: "Page not found",
	});
});

const PORT = process.env.APP_PORT || 3002;

app.listen(process.env.APP_PORT, () => {
	console.log("Server up and running ", PORT);
});
