const School = require("../models/school");
const User = require("../models/user");

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

    if (+user.password !== +password) {
      res.redirect("/");
    }
    console.log('here')
    req.user = user;
    res.redirect("/posts");
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

    await school.createUser({
      name,
      email,
      password,
      score: 10,
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.postLogout = (req, res, next) => {
  
  req.user = null;
  
  res.redirect("/");
};
