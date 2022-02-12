const { Router } = require("express");
const router = Router();
const { checkSchema, body } = require("express-validator");

const { handleSignup, handleSignin } = require("../controllers/auth");

// router.get("/signup", (req, res) => {
//   res.send("signup working");
// });

const userValidationSchema = {
  uname: {
    notEmpty: {
      errorMessage: "Username should be at least 5 chars long",
    },
    isLength: {
      errorMessage: "Username should be at least 5 chars long",
      options: { min: 5, max: 50 },
    },
  },
  email: {
    errorMessage: "Invalid email",
    isEmail: true,
  },
  password: {
    isLength: {
      errorMessage: "Password should be at least 7 chars long",
      options: { min: 7, max: 50 },
    },
  },
  college_name: {
    isLength: {
      errorMessage: "College name should be at least 5 chars long",
      options: { min: 5, max: 50 },
    },
  },
  branch: {
    isLength: {
      errorMessage: "Branch name should be at least 5 chars long",
      options: { min: 5, max: 50 },
    },
  },
  summary: {
    isLength: {
      errorMessage: "Too long summary",
      options: { max: 50 },
    },
  },
};

router.post("/signup", checkSchema(userValidationSchema), handleSignup);

router.post("/signin", body("email", "Invalid Email").isEmail(), handleSignin);

module.exports = router;
