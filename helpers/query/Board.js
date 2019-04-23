const Board = require("model/Board");
const { lookupPipe } = require("../query");

exports.createBoard = async (boardData) => {
  const added = await Board.createBoard(boardData);
  return added
}

exports.getBoard = async boardId => {
  const match = { $match: { sid: boardId } };
  const listPipe = [
    { $match: { $expr: { $eq: ["$bid", "$$boardId"] } } },
    { $sort: { pos : 1 } }
  ];
  const boardLists = lookupPipe('lists', { boardId: boardId }, listPipe, 'lists')
  const taskPipe = [
    { $match: { $expr: { $eq: ["$bid", "$$boardId"] } } },
    { $sort: { pos: 1 } }
  ];
  const boardTasks = lookupPipe('tasks', { boardId: boardId }, taskPipe, 'tasks')

  const board = await Board.aggregate([
    match,
    boardLists,
    boardTasks
  ]);

  return board
}

exports.updateBoard = async (boardId, boardData) => {
  const updated = await Board.findOneAndUpdate({ sid: boardId }, { $set:{...boardData} }, { new:true })
  // console.log(updated)
  return updated
}

exports.removeBoard = async (boardId) => {
  const removed = await Board.findOneAndRemove({ sid: boardId })
  return removed;
}