const User = require("../models/user");
const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const users = await User.findAll();

    const posts = await Post.findAll();

    posts.forEach((post) => {
      post.creator = users.find((user) => +user.id === +post.userId).name;
    });

    res.render("post/posts", {
      user: req.user,
      isLogin: req.user,
      posts,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAddPost = (req, res, next) => {
  res.render("post/add-post", {
    isLogin: res.user,
  });
};

exports.postAddPost = async (req, res, next) => {
  const { title, content } = req.body;
  const user = req.user;

  try {
    await user.createPost({ title, content });

    res.redirect("/posts");
  } catch (err) {
    console.log(err);
  }
};

exports.getPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId);
    const creator = await User.findByPk(post.userId);

    res.render("post/post", { post, creator,isLogin: req.user });
  } catch (err) {
    console.log(err);
  }
};
