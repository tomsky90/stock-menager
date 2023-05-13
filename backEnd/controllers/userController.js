const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id, admin, office) => {
  return jwt.sign({ _id, admin, office }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //create token
    const admin = user.admin;
    const office = user.office;
    const token = createToken(user._id);
    res.status(200).json({ email, token, admin, office });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const createUser = async (req, res) => {
  const { email, password, office } = req.body.newUser;
  try {
    const user = await User.createUser(email, password, office);
    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all users without password
const getUsers = async (req, res) => {
  const users = await User.find({});
  const usersNoPassword = [];
  users.filter(user => !user.admin).forEach((user) => {
    user.toObject();
    newUser = {
      name: user.email,
      _id: user._id,
    };
    usersNoPassword.push(newUser)
  });
  try {
    res.status(200).json({ usersNoPassword });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  console.log(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Can't find user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json({ error: "Can't find user" });
  }

  return res.status(200).json(user.email);
};

module.exports = { loginUser, createUser, getUsers, deleteUser };
