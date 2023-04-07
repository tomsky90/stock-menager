const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
})

// static create user method
userSchema.static.createUser = async (email, password) => {
  const exists = this.findOne({email})

  if(exists) {
    throw Error('Email already in use')
  }
}

module.exports = mongoose.model('User', userSchema)