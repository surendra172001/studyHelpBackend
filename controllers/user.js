const User = require("../models/user");

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.findById(userId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const populateUser = async (req, res, next, userId) => {
  try {
    const result = await User.findById(userId);
    req.user = result;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// TODO:
// const updateUser

// TODO:
// const deleteUser

module.exports = {
  getUser,
  getAllUsers,
  populateUser,
};
