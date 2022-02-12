const { Router } = require("express");
const { isSignedIn } = require("../controllers/auth");
const { uploadDoc, createDoc, populateUserId } = require("../controllers/doc");
const router = Router();

router.post("/create", isSignedIn, populateUserId, uploadDoc, createDoc);

// router.get("/all", isSignedIn, getAllUsers);

module.exports = router;
