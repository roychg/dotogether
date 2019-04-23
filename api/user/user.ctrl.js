const User = require('model/User')
const { getUserData } = require('helpers/query/User')

exports.getData = async(req,res) => {
  const userData = await getUserData(req.params.uid)
  // console.log(userData)
  return res.status(200).json({ init: userData })
}

exports.validate = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

exports.logout = async (req, res) => {
  // console.log("user before logout ", req.session);
  await req.logout();
  await req.session.destroy();
  return res.status(200).json({ success: true });
};