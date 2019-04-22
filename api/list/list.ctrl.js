const { createList, updateList } = require("helpers/query/List");

exports.addList = async (req, res) => {
  const added = await createList(req.body)
  // console.log(added)
  return res.status(200).json({ added })
};

exports.updateList = async (req, res) => {
  const updated = await updateList(req.params.listId, req.body);
  // console.log(updated);
  return res.status(200).json({ updated });
};
