const sequelize = require("../config/db.config.js");
const { DataTypes } = require("sequelize");
const User = require("./user.model.js");

const Lead = sequelize.define(
  "lead",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
        len: { args: [2, 100], msg: "Name must be between 2 and 100 characters" },
      },
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Number cannot be empty" },
        isNumeric: { msg: "Number must be a valid number" },
        len: { args: [10, 15], msg: "Number must be between 10 and 15 digits" },
      },
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      // foreignKey refers to the User
    },
  },
  { tableName: "leads", timestamps: true }
);

module.exports = Lead;
