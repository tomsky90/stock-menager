const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

const requireAdminAuthorization = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try{
    const {_id} = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({_id}).select('_id')
    const admin = await req.user.admin
    if(admin === false) {
      return res.status(401).json({error: 'Only Admin'})
    }
  } catch(error) {
    return res.status(401).json({error: 'Request is not authorized'})
  }
  next()
};

module.exports =  requireAdminAuthorization;
