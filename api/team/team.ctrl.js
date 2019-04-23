const { createTeam, updateTeam, removeTeam } = require("helpers/query/Team");

exports.addTeam = async (req,res) => {
  // console.log('body ', req.body)
  // console.log(req.user)
  if(req.user.id === req.body.creator){
    // console.log('true ', req.body)
    const added = await createTeam(req.user.id, req.body)
    return res.status(200).json({ added })
  }
  return res.status(503).json({ error: 'Not valid' });
}

exports.updateTeam = async (req,res) => {
  const updated = await updateTeam(req.params.teamId, req.body)
  return res.status(200).json({ updated })
}

exports.removeTeam = async (req,res) => {
  const removed = await removeTeam(req.params.teamId);
  return res.status(200).json({ removed })
}