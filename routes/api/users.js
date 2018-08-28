const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/secret");

//Bring in the login/register validation
const registerValidation = require("../../validation/user-validation");
const loginValidation = require("../../validation/login-validation");

//Bring in the user model
const { User } = require("../../db");

// Test route
router.get("/test", (req, res) => res.json({ msg: "This is a test route" }));

/* ROUTE: /api/users/register 
   TYPE: POST
   DESC: Register a user
*/

router.post("/register", (req, res) => {
  const { errors, isValid } = registerValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ where: { user: req.body.user } }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ Error: "Someone with that username already exists" });
    } else {
      // This is just a test, rework this later to store encrypted passwords
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          req.body.password = hash;
          User.create(req.body)
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/* ROUTE: /api/users/login
   TYPE: POST
   DESC: Logs in a user
*/

router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const login = {
    user: req.body.user,
    password: req.body.password
  };

  User.findOne({ where: { user: login.user } }).then(user => {
    if (!user) {
      return res
        .status(400)
        .json({ Error: "No user with that username found." });
    }
    bcrypt.compare(login.password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        /*return res.json({
          success: true,
          msg: "User logged in successfully."
        });*/
        const payload = { id: user.id, name: user.user }; //Create jwt payload
        // Sign the token
        console.log(payload);
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ Error: "Username or password is incorrect." });
      }
    });
  });
});

/* ROUTE: /api/users/all
   TYPE: GET
   DESC: Get a list of all registered users
*/
//attritbutes takes an array of columns

router.get("/all", (req, res) => {
  User.findAll({ attributes: ["id", "user"] }).then(user => {
    return res.json(user);
  });
});

module.exports = router;
