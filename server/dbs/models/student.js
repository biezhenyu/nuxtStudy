const mongoose = require('mongoose');
const Schema = mongoose.Schema

// user模型
const StudentSchema = new Schema({
  parentId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    unique: true,
    require: true
  },
  photo: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    require: true
  },
  className: {
    type: String,
    required: true
  },
  ino: {
    type: String,
    require: true
  },
  upDate: {
    type: Date,
    require: true
  }
})

module.exports = mongoose.model('Student', StudentSchema)