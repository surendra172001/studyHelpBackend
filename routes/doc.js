const { Router } = require("express");
const { isSignedIn } = require("../controllers/auth");
const { uploadS3 } = require("../controllers/aws_s3");
const { uploadDoc, createDoc, populateUserId } = require("../controllers/doc");
const router = Router();

router.post(
  "/create/:userId",
  isSignedIn,
  populateUserId,
  uploadS3.fields([{ name: "doc", maxCount: 1 }]),
  createDoc
);

// router.get("/all", isSignedIn, getAllUsers);

module.exports = router;
