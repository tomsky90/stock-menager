const jwt = require("jsonwebtoken");
const User = require('../models/userModel');


const requireAdminAuth = async (req, res, next) => {
  //verify admin
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  
    const {_id} = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({_id})
    if(!user || !user.admin) {
      return res.status(403).send({error: { status:403, message:'Access denied.'}});
    }
   next()
};

module.exports =  requireAdminAuth
