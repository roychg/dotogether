const Team = require("model/Team");

exports.createTeam = async (creator, teamData) => {
  // console.log(teamData);
  const added = await Team.createTeam(creator, teamData);
  return added;
};

exports.updateTeam = async (teamId, teamData) => {
  // console.log(teamData);
  const updated = await Team.findOneAndUpdate({ sid: teamId }, { $set:{...teamData} }, { new:true })
  // console.log(updated)
  return updated
}

exports.removeTeam = async (teamId) => {
  const removed = await Team.findOneAndRemove({ sid: teamId })
  // console.log(removed)
  return removed
}