const { createTask, updateTask } = require("helpers/query/Task");

exports.addTask = async (req, res) => {
  const added = await createTask(req.body);
  // console.log(added);
  return res.status(200).json({ added });
};

exports.updateTask = async (req, res) => {
  const updated = await updateTask(req.params.taskId, req.body);
  // console.log(updated);
  return res.status(200).json({ updated });
};