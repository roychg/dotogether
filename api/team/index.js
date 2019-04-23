const team = require("express").Router();
const teamCtrl = require("./team.ctrl");
const { asyncError } = require('lib/error.handler')

team.post("/", asyncError(teamCtrl.addTeam));
team.put("/:teamId", asyncError(teamCtrl.updateTeam));
team.delete("/:teamId", asyncError(teamCtrl.removeTeam));

module.exports = team;
