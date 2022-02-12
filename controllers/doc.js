const Doc = require("../models/doc");
const { uploadS3 } = require("./aws_s3");

const populateUserId = (req, res) => {
  const userId = req.params;
  if (!userId) {
    res.status(400).send("Invalid User");
  }
  req.userId = userId;
};

const uploadDoc = uploadS3.fields([{ name: "doc", maxCount: 1 }]);

const createDoc = async (req, res) => {
  console.log("third");
  for (const fieldName in req.files) {
    const file = req.files[fieldName][0];
    req.body[fieldName] = file.location;
  }
  res.send("createDoc working");
};

const getDoc = async (req, res) => {
  const { docId } = req.params;
  try {
    const result = await Doc.findById(docId);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//     const result = await User.find();
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

// const populateUser = async (req, res, next, userId) => {
//   try {
//     const result = await User.findById(userId);
//     req.user = result;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

// const updateUser = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const result = await User.findByIdAndUpdate(userId, req.body, {
//       new: true,
//     });
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

// const deleteUser = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     await User.findByIdAndDelete(userId);
//     res.json({ msg: "Deletion Successful" });
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

module.exports = {
  populateUserId,
  createDoc,
  getDoc,
  uploadDoc,
};
