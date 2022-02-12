const Doc = require("../models/doc");
const { uploadS3 } = require("./aws_s3");
const mongoose = require("mongoose");

const populateUserId = (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send("Invalid User");
  }
  req.userId = userId;
  next();
};

const uploadDoc = uploadS3.fields([{ name: "doc", maxCount: 1 }]);

const createDoc = async (req, res) => {
  try {
    for (const fieldName in req.files) {
      const file = req.files[fieldName][0];
      req.body[fieldName] = file.location;
    }
    if (!req.body.doc) {
      req.body.file_link = req.body.doc_link;
    }
    req.body.userId = req.params.userId;
    req.body.type = req.type;
    req.body.file_name = req.file_name;
    req.body.file_link = req.body.doc;
    req.body.is_link = !req.body.doc;
    delete req.body["doc_link"];
    delete req.body["doc"];
    console.log(req.body);
    const newDoc = new Doc(req.body);
    const savedDoc = await newDoc.save();
    res.json(savedDoc);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
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

const getAllDocsOfUser = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.userId);
  console.log(userId);
  try {
    const result = await Doc.find({ userId });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getAllDocs = async (req, res) => {
  try {
    const result = await Doc.find();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const populateDoc = async (req, res, next, docId) => {
  try {
    const result = await Doc.findById(docId);
    req.doc = result;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const updateDoc = async (req, res) => {
  const { docId } = req.params;
  try {
    const result = await Doc.findByIdAndUpdate(docId, req.body, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteDoc = async (req, res) => {
  const { docId } = req.params;
  try {
    await Doc.findByIdAndDelete(docId);
    res.json({ msg: "Deletion Successful" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

module.exports = {
  populateUserId,
  createDoc,
  getDoc,
  uploadDoc,
  getAllDocs,
  populateDoc,
  updateDoc,
  deleteDoc,
  getAllDocsOfUser,
};
