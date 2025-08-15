const express = require('express');
const indexRouter = express.Router();
const taskRouter = require('./task.route.js');
const leadRouter = require('./lead.route.js');
const userRouter = require('./user.route.js');

indexRouter.use("/api/v1", taskRouter);
indexRouter.use("/api/v1", leadRouter);
indexRouter.use("/api/v1", userRouter);


module.exports = indexRouter;
