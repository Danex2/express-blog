const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// Routes
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("blog-front/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "blog-front", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Running on Port: ${port}`);
});
