const Task = require("model/Task");

exports.createTask = async taskData => {
  const added = await Task.createTask(taskData);
  console.log(added)
  return added;
};

exports.updateTask = async (taskId, taskData) => {
  // console.log(taskData)
  const updated = await Task.findOneAndUpdate({ sid: taskId }, { $set:{...taskData} }, { new:true })
  // console.log(updated)
  return updated
}