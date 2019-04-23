const User = require('model/User')
const { lookupPipe } = require('../query')

exports.getUserData = async userId => {
  // console.log('get user data')
  const match = { $match : { sid: userId }}
  const teamPipe = [
      { $match: { $expr: { $in: [{ id: '$$userId' }, '$members'] } } },
      { $sort : { 'createdAt' : -1 }}
  ]
  const userTeams = lookupPipe('teams', { userId: userId }, teamPipe, 'teams')
  const unwindTeams = { $unwind: { path:"$teams", preserveNullAndEmptyArrays: true } }
  const boardPipe = [
      { $match: { $expr: { $or: [{ $eq: ["$teamId", "$$teamId"] }, { $eq: ["$owner", "$$userId"] }] } } }
  ]
  const findBoards = lookupPipe('boards', { teamId: '$teams.sid', userId: userId }, boardPipe, 'boards')
  const group = {
    $group: {
      _id: "$sid",
      teams: { $addToSet: "$teams" },
      boards: { $max: "$boards" }
    }
  }  
  
  const userData = await User.aggregate([
    match, userTeams, unwindTeams, findBoards, group
  ])
  return userData
}