const { Router } = require("express");
const { isSignedIn } = require("../controllers/auth");
const { getUser, getAllUsers, populateUser } = require("../controllers/user");
const router = Router();

router.param("userId", populateUser);

router.get("/one/:userId", isSignedIn, getUser);

// router.get("/two/:userId", (req, res) => {
//   console.log(req.user);
//   console.log("params working");
//   res.send("ok");
// });

router.get("/all", isSignedIn, getAllUsers);

module.exports = router;
