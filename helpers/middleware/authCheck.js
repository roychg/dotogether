const authCheck = (req,res,next) => {
  // console.log('checking ', req.isAuthenticated())
  if(!req.isAuthenticated()){
    return res.status(401).json({ success: false })
  }
  next();
}

module.exports = authCheck