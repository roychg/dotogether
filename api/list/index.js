const list = require("express").Router();
const listCtrl = require('./list.ctrl')
const { asyncError } = require('lib/error.handler')
const authCheck = require("helpers/middleware/authCheck");

list.use(authCheck)
list.post("/", asyncError(listCtrl.addList));
list.put("/:listId", asyncError(listCtrl.updateList));

module.exports = list;
