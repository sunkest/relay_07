const path = require("path");

const express = require("express");
const sequelize = require("./util/database");

const app = express();

// error 404 controller
const errorController = require("./controllers/error");

// model
const User = require("./models/user");
const Post = require("./models/post");
const School = require("./models/school");

// template engine setting ~ ejs
app.set("view engine", "ejs");
// view base directory setting ~ views
app.set("views", "views");

// file loader
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// locals
app.use((req, res, next) => {
  res.locals.pageTitle = "Relay 07 I Love School";
  next();
});

// router
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

// db relation
// user:school = M:1
User.belongsTo(School);
School.hasMany(User);
// user:post = 1:M
Post.belongsTo(User);
User.hasMany(Post);

app.use(async (req, res, next) => {
  const user = await User.findByPk(1);
  req.user = user;
  res.locals.user = user;
  next();
});

// routing
app.use(authRoutes);
app.use(postRoutes);

// error 404 route
app.use(errorController.get404);

sequelize
  // .sync({ force: true })
  .sync()
  // .then(async () => {
  //   const user = await User.findByPk(1);

  //   if (!user) {
  //     const sample = new User({
  //       name: "홍눅수",
  //       email: "hongnux@connect.com",
  //       password: "1q2w3e4r",
  //       score: 10,
  //     });
  //     await sample.save();
  //   }
  // })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
