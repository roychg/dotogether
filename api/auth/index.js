const auth = require("express").Router();
const authCtrl = require('./auth.ctrl')
const { asyncError } = require('lib/error.handler')

auth.get("/:provider(google)", authCtrl.socialLogin);
auth.get("/:provider(google)/callback", asyncError(authCtrl.socialCallback));

module.exports = auth;
