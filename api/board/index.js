const board = require("express").Router();
const boardCtrl = require('./board.ctrl')
const { asyncError } = require('lib/error.handler')
const authCheck = require('helpers/middleware/authCheck')

board.get('/demo', asyncError(boardCtrl.getDemo))

board.use(authCheck);
board.get('/:bid', asyncError(boardCtrl.getBoard))
board.put('/:bid', asyncError(boardCtrl.updateBoard))
board.delete('/:bid', asyncError(boardCtrl.removeBoard))
board.post("/", asyncError(boardCtrl.addBoard));


module.exports = board;
