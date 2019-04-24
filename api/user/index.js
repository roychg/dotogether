const user = require("express").Router();
const userCtrl = require("./user.ctrl");
const { asyncError } = require("lib/error.handler");
const authCheck = require('helpers/middleware/authCheck')

user.post("/logout", asyncError(userCtrl.logout));
user.use(authCheck)
user.get("/:uid", asyncError(userCtrl.getData));
user.post("/validate", asyncError(userCtrl.validate));


module.exports = user;
