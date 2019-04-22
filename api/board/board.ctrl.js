const guestData = require("helpers/mock");
const { createBoard, getBoard, updateBoard,removeBoard } = require("helpers/query/Board");

exports.addBoard = async(req,res) => {
  const added = await createBoard(req.body);
  // console.log(added)
  return res.status(200).json({ added })
}

exports.getBoard = async(req,res) => {
  const board = await getBoard(req.params.bid)
  // console.log(board)
  return res.status(200).json({ board });
}

exports.updateBoard = async(req, res) => {
  const updated = await updateBoard(req.params.bid, req.body)
  // console.log(updated)
  return res.status(200).json({ updated })
}

exports.getDemo = async(req,res) => {
  // console.log('demo')
  return res.status(200).json({ board: guestData.demoData });
}

exports.removeBoard = async(req,res) => {
  // console.log('remove board')
  const removed = await removeBoard(req.params.bid)
  return res.status(200).json({ removed: removed.sid }); 
}