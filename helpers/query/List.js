const List = require("model/List");
const { lookupPipe } = require("../query");

exports.createList = async listData => {
  const added = await List.createList(listData);
  return added;
};

exports.updateList = async (listId, listData) => {
  const updated = await List.findOneAndUpdate({ sid: listId }, { $set:{...listData} }, { new:true })
  // console.log(updated)
  return updated
}