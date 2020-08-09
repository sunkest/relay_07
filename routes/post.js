const express = require("express");

const router = express.Router();

const postController = require("../controllers/post");
const authMiddleware = require("../middleware/is-auth");


router.get("/posts",authMiddleware.isAuth, postController.getPosts);

router.get("/add-post", authMiddleware.isAuth, postController.getAddPost);

router.post("/add-post", authMiddleware.isAuth, postController.postAddPost);

router.get("/post/:postId", authMiddleware.isAuth, postController.getPost);

module.exports = router;
