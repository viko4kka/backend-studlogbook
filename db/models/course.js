"use strict";

const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const AppError = require("../../src/utils/appError");

module.exports = sequelize.define(
	"course",
	{
		id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		courseName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		endDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		teacherId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updateAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		paranoid: true, //wlaczenie soft delete
		freezeTableName: true,
		modelName: "course",
	}
);
