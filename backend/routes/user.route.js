const express = require("express");
const userController = require("../controllers/user.controller.js");
const userRouter = express.Router();



userRouter.post("/users", userController.addUser);
userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:id", userController.getSingleUser);
userRouter.patch("/users/:id", userController.updateUser);
userRouter.delete("/users/:id", userController.deleteUser);


module.exports = userRouter;
