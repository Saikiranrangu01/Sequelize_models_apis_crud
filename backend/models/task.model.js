const sequelize = require("../config/db.config.js");
const { DataTypes } = require("sequelize");
const Lead = require("./lead.model.js");
const User = require("./user.model.js");

const Task = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Unique identifier for each task
      autoIncrement: true, // Automatically increment the ID for each new task, when inserted database generate next value,id deleted count doesnt reset
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" }, //checks for empty string and empty string with spaces "", " "
        len: { args: [2, 100], msg: "Name must be between 2 and 100 characters" }, //checks length of string
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true, //can skip value when inserting , allow to have null value
    },
    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false, //should have value
      references: {   //  reference- column should reference another table
        model: Lead,
        key: "id",
      },
      validate: {
        notNull: { msg: "Lead ID cannot be empty" },//checks for null value, works only when allowNull=false
        isInt: { msg: "Lead ID must be an integer" },
      },
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { tableName: "tasks", timestamps: true }
);

module.exports = Task;
