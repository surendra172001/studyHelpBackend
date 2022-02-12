const { Router } = require("express");
const { isSignedIn } = require("../controllers/auth");
// const { uploadS3 } = require("../controllers/aws_s3");
const { uploadDoc, createDoc, populateUserId } = require("../controllers/doc");
const router = Router();

router.post(
  "/create/:userId",
  isSignedIn,
  populateUserId,
  uploadDoc,
  createDoc
);

// router.get("/all", isSignedIn, getAllUsers);

module.exports = router;
