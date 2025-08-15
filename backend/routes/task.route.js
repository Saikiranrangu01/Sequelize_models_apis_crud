const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/task.controller.js");






// Define routes for task operations
taskRouter.get("/tasks/:id", taskController.getSingleTask);
taskRouter.get("/tasks", taskController.getAllTasks);
taskRouter.post("/tasks", taskController.addTask);
taskRouter.get("/tasks/lead_id/:lead_id", taskController.getTasksByLead);
taskRouter.patch("/tasks/:id", taskController.updateTask);
taskRouter.delete("/tasks/:id", taskController.deleteTask); // Assuming deleteTask is defined in taskController

module.exports = taskRouter;
