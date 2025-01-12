const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
	"course",
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		title: {
			type: Sequelize.STRING,
		},
		description: {
			type: Sequelize.STRING,
		},
		startDate: {
			type: Sequelize.DATE,
		},
		endDate: {
			type: Sequelize.DATE,
		},
		teacherId: {
			type: Sequelize.INTEGER,
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
		modelName: "course",
	}
);
