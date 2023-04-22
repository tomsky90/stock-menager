const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
  admin: {
    type: Boolean,
    default: false,
  },
  office: {
    type: Boolean,
    default: false,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }
})

// static create user method
userSchema.statics.createUser = async function(email, password, isAdmin = false, isOffice = false) {

  //validation
  if(!email || !password) {
    throw Error('All fields must be field')
  }

  if(!validator.isEmail(email)) {
    throw Error('Email is not valid ')
  }

  if(!validator.isStrongPassword(password)){
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({email})
  if(exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create(({email, password: hash, isAdmin, isOffice}));

  return user
}

//static login method
userSchema.statics.login = async function(email, password) {
  
  //validation
  if(!email || !password) {
    throw Error('All fields must be field')
  }

  const user = await this.findOne({email})
  if(!user) {
    throw Error('Incorect user name')
  }
  const match = await bcrypt.compare(password, user.password)
  if(!match) {
    throw Error('Incorect password')
  }
  return user
}

module.exports = mongoose.model('User', userSchema)