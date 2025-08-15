const sequelize = require("../config/db.config.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
   
  },
  { tableName: "users" , timestamps: true }
);

module.exports = User;
