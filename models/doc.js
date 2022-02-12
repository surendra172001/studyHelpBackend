const mongoose = require("mongoose");
const { Schema } = mongoose;
// const { ROLES } = require("../constants");

const docSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  link: {
    required: true,
    type: Boolean,
  },
  file_link: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
    maxlength: 300,
  },
  coins_required: {
    type: Number,
    default: 50,
    min: 0,
  },
  subject: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60,
  },
  branch: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60,
  },
  type: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 60,
  },
  tags: {
    type: Array(String),
    default: [],
  },
});

module.exports = mongoose.model("Doc", docSchema);
