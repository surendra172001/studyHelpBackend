const expressJwt = require("express-jwt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { ROLES, SIGNUP_COINS } = require("../constants");

const User = require("../models/user");

const handleSignup = async (req, res) => {
  //   console.log(req.body);
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json({ errors: err.mapped() });
  }

  try {
    const salt_rounds = 10;
    const encry_password = await bcrypt.hash(req.body["password"], salt_rounds);
    delete req.body["password"];
    req.body["encry_password"] = encry_password;
    req.body["role"] = ROLES.USER;
    req.body["coins"] = SIGNUP_COINS;
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const handleSignin = async (req, res) => {
  //   console.log(req.body);
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json({ errors: err.mapped() });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.json({ errors: { msg: "user doesn't exists" } });
    } else if (!(await bcrypt.compare(password, user.encry_password))) {
      res.json({ errors: { msg: "Invalid password" } });
    } else {
      // create a token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      const oneDay = 1000 * 60 * 60 * 24;

      res.cookie("token", token, {
        maxAge: oneDay,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
      });

      const { _id, uname, email, role } = user;

      res.json({ token, user: { _id, uname, email, role } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const isSignedIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "user",
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.cookies["token"]) {
      return req.cookies["token"];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
});

// TODO:
// const handleSignout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ messasge: "User signout successfull" });
// };

module.exports = {
  handleSignup,
  handleSignin,
  isSignedIn,
};
