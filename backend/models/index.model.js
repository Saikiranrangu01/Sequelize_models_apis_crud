const User = require("./user.model.js");
const Lead = require("./lead.model.js");
const Task = require("./task.model.js");




const models = {
    User,
    Lead,
    Task
};

// Define associations
User.hasMany(Lead, {
  foreignKey: "owner_id",
  as: "leads",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});
Lead.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

User.hasMany(Task, {
  foreignKey: "owner_id",
  as: "tasks",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});
Task.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
  onDelete: "CASCADE", // deletes all associated tasks
  onUpdate: "RESTRICT", //prevent update if referenced by tasks
});

Lead.hasMany(Task, {
  foreignKey: "lead_id",
  as: "tasks",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});
Task.belongsTo(Lead, {
  foreignKey: "lead_id",
  as: "lead",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});

module.exports = models;
