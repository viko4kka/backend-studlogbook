"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
	"user",
	{
		userName: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		deletedAt: {
			type: Sequelize.DATE,
		},
	},
	{
		paranoid: true,
		freezeTableName: true,
		modelName: "user",
	}
);
