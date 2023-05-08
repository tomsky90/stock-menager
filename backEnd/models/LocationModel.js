const mongoose = require('mongoose');

const Schema = mongoose.Schema

const locationSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    title: {
      type: String,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    exp: {
      type: String
    },
    description: {
      type: String,
    }
  }]
}, {timestamps: true})

module.exports = mongoose.model('Location', locationSchema)