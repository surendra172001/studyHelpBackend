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

const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.json({ msg: "Deletion Successful" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getUser,
  getAllUsers,
  populateUser,
  updateUser,
  deleteUser,
};
