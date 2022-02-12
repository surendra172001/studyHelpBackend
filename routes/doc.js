const { Router } = require("express");
const { isSignedIn, isAuthorized } = require("../controllers/auth");
// const { uploadS3 } = require("../controllers/aws_s3");
const {
  uploadDoc,
  createDoc,
  populateUserId,
  getAllDocs,
  getDoc,
  updateDoc,
  populateDoc,
  deleteDoc,
  getAllDocsOfUser,
} = require("../controllers/doc");
const router = Router();

router.param("docId", populateDoc);

router.post(
  "/create/:userId",
  isSignedIn,
  populateUserId,
  uploadDoc,
  createDoc
);

router.get("/one/:userId/:docId", isSignedIn, getDoc);

router.get("/all/:userId/", isSignedIn, getAllDocsOfUser);

router.get("/alldocs", isSignedIn, getAllDocs);

router.put("/:userId/:docId", isSignedIn, isAuthorized, updateDoc);

router.delete("/:userId/:docId", isSignedIn, isAuthorized, deleteDoc);

module.exports = router;
