const { text } = require("express");
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: false,
  },
  status: {
    type: String,
    require: false,
  },
  birthdate: {
    type: Date,
    require: false,
  },
  characteristic: {
    type: String,
    require: false,
  },
  food: {
    type: String,
    require: false,
  },

  bio: {
    type: String,
    require: false,
  },
  quantity: {
    type: Number,
    required: false,
  },

})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  pets: [petSchema],
})


const User = mongoose.model('User', userSchema);

module.exports = User;
