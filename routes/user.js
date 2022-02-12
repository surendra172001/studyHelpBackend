const { Router } = require("express");
const { isSignedIn, isAuthorized } = require("../controllers/auth");
const { getUser, populateUser, updateUser } = require("../controllers/user");
const router = Router();

router.param("userId", populateUser);

router.get("/one/:userId", isSignedIn, isAuthorized, getUser);

router.put("/:userId", isSignedIn, isAuthorized, updateUser);

// router.get("/two/:userId", (req, res) => {
//   console.log(req.user);
//   console.log("params working");
//   res.send("ok");
// });

// router.get("/all", isSignedIn, getAllUsers);

module.exports = router;
