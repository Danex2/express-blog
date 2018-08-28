const express = require("express");
const router = express.Router();
const passport = require("passport");

//Bring in the user model
const { Post } = require("../../db");

//Validation
const postValidation = require("../../validation/post-validation");

/* ROUTE: /api/posts/all
   TYPE: GET
   DESC: Get all blog posts
*/

router.get("/all", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "text", "name", "createdAt"]
  }).then(posts => {
    return res.json(posts);
  });
});

/* ROUTE: /api/posts/post
   TYPE: POST
   DESC: Make a blog post
   PROTECTED: true
*/

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = postValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const postData = {
      title: req.body.title,
      text: req.body.text,
      userId: req.user.id,
      name: req.user.user
    };
    console.log(req.user.user);
    Post.create(postData).then(post => {
      res.json(post);
    });
  }
);

/* ROUTE: /api/posts/post/:id
   TYPE: GET
   DESC: View a single post
   PROTECTED: false
*/

router.get("/post/:id", (req, res) => {
  Post.findById(req.params.id, {
    attributes: ["title", "text", "createdAt"]
  }).then(post => {
    res.json(post);
  });
});

module.exports = router;
