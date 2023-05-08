const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ItemsListSchema =  new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  qty: {
    type: Number,
    default: 0,
  }
}, {timestamps: true})

module.exports = mongoose.model('Item', ItemsListSchema)