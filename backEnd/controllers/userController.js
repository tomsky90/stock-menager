const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id, admin, office) => {
  return jwt.sign({_id, admin, office}, process.env.SECRET, {expiresIn: '3d'})
}


//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await User.login(email, password)
    //create token
    const admin = user.admin
    const office = user.office
    const token = createToken(user._id)
    res.status(200).json({email, token, admin, office})
  } catch( error ) {
    res.status(400).json({error: error.message})
  }
}

//signup user
const signupUser = async (req, res) => {
  const { email, password, admin, office } = req.body
  try{
    const user = await User.createUser(email, password, admin, office)
    res.status(200).json({email})
  } catch( error ) {
    res.status(400).json({error: error.message})
  }
 
}

module.exports = {loginUser, signupUser}