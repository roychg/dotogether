const list = require("express").Router();
const listCtrl = require('./list.ctrl')
const { asyncError } = require('lib/error.handler')

list.post("/", asyncError(listCtrl.addList));
list.put("/:listId", asyncError(listCtrl.updateList));

module.exports = list;
