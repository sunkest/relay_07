const crypto = require("crypto");

const bcrypt = require("bcryptjs");

const School = require("../models/school");
const User = require("../models/user");
const { Console } = require("console");

exports.getHome = (req, res, next) => {
  res.render("auth/home", {
    isLogin: false,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  // email 존재 x
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      res.redirect("/");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = user;
      return req.session.save((err) => {
        console.log(err);
        res.redirect("/posts");
      });
    }
    cossole.log("fuckedup");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.postSignup = async (req, res, next) => {
  const { name, email, password, schoolName } = req.body;

  try {
    let school = await School.findOne({
      where: {
        name: schoolName,
      },
    });

    if (!school) {
      school = new School({
        name: schoolName,
      });
      await school.save();
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await school.createUser({
      name,
      email,
      password: hashedPassword,
      score: 10,
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
