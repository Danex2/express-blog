# A blog app made with express/react
Tech Stack 🔨  
React  
Express  
Postgres  
Redux  

Live link: https://express-blogger.herokuapp.com/login (there are still things I need to fix :P)

## Routes

Users | Type | Description
----- | ---- | -----------
/api/users/all | GET | Gets all users
/api/users/register | POST | Register a user
/api/users/login | POST | Authenticate a user

Posts | Type | Description
----- | ---- | -----------
/api/posts/all | GET | Get all posts
/api/post | POST | Make a new post
/api/post/:id | GET | View a single post

## Clone
``git clone https://github.com/Danex2/express-blog.git``  
``yarn`` then ``nodemon index.js``

## For the database
Be sure to make a file called ``db.js`` in the root of the express-blog folder and paste this in. Also make sure to replace <dbnamehere> <dbusername> <dbpassword> with your database name and credentials from postgres  

```javascript
const Sequelize = require("sequelize");
const UserModel = require("./models/User");
const PostModel = require("./models/Post");

// Creating the connection to the database [dbname, user, password]
const sequelize = new Sequelize("<dbnamehere>", "<dbusername>", "<dbpassword>", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
Post.belongsTo(User); 

sequelize.sync({ force: true }).then(() => {
  console.log(`Database created.`);
});

module.exports = {
  User,
  Post
};
```
