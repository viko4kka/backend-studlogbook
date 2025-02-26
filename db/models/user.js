"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../../config/database");
const AppError = require("../../src/utils/appError");

module.exports = sequelize.define(
	"user",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Username cannot be null",
				},
				notEmpty: {
					msg: "Username cannot be empty",
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Email cannot be null",
				},
				notEmpty: {
					msg: "Email cannot be empty",
				},
				isEmail: {
					msg: "Invalid email id",
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Password cannot be null",
				},
				notEmpty: {
					msg: "Password cannot be empty",
				},
			},
		},
		confirmPassword: {
			type: DataTypes.VIRTUAL,
			set(value) {
				if (this.password.length < 7) {
					throw new AppError(
						"Password must be at least 7 characters long",
						400
					);
				}
				if (value === this.password) {
					const hashPassword = bcrypt.hashSync(value, 10);
					this.setDataValue("password", hashPassword);
				} else {
					throw new AppError(
						"Password and confirm password does not match",
						400
					);
				}
			},
		},
		role: {
			type: DataTypes.ENUM("student", "teacher" ),
			allowNull: false,
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		deletedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		paranoid: true,
		freezeTableName: true,
		modelName: "user",
	}
);
