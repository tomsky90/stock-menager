const mongoose = require('mongoose');

const Schema = mongoose.Schema

const SettingsSchema =  new Schema({
  title: {
   type: String,
  },
  qty: {
    type: Number,
    default: 50
  }

}, {timestamps: true})

module.exports = mongoose.model('Settings', SettingsSchema )