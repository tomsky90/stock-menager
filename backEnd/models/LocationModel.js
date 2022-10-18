const mongoose = require('mongoose');

const Schema = mongoose.Schema

const locationSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    title: String,
    qty: Number,
    exp: String
  }]
}, {timestamps: true})

module.exports = mongoose.model('Location', locationSchema)