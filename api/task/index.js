const task = require("express").Router();
const taskCtrl = require('./task.ctrl')
const { asyncError } = require('lib/error.handler')
const authCheck = require("helpers/middleware/authCheck");

task.use(authCheck);
task.post("/", asyncError(taskCtrl.addTask));
task.put("/:taskId", asyncError(taskCtrl.updateTask));

module.exports = task;
