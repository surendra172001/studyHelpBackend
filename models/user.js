const mongoose = require("mongoose");
const { ROLES } = require("../constants");

const userSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(v);
      },
      message: (props) => `${props.value} is not a valid email Id!`,
    },
  },
  encry_password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
    enum: [Object.values(ROLES)],
  },
  college_name: {
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
  summary: {
    type: String,
    required: true,
    maxlength: 300,
  },
  coins: {
    type: Number,
    default: 50,
    min: 0,
  },
});
// , , branch, summary

module.exports = mongoose.model("User", userSchema);
