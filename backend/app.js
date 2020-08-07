var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const createError = require("http-errors");
const sequelize = require("./util/database");
const User = require("./models/user");
const School = require("./models/school");
const Post = require("./models/post");
const api = require("./controller");
var app = express();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

app.use("/", indexRouter);
app.use("/users", usersRouter);

User.belongsTo(School);
School.hasMany(User);
Post.belongsTo(User);
User.hasMany(Post);
sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        return console.log(err);
    });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;
