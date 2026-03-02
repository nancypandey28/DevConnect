const express = require("express");
const router = express.Router();
const { createPost, getPosts,toggleLike, addComments, getUserPosts } = require("../controllers/postController");
const {protect}  = require("../middleware/authmiddleware");

router.post("/", protect, createPost);  
router.get("/", protect, getPosts);     
router.put("/:id/like", protect , toggleLike);
router.post("/:id/comment", protect, addComments);
router.get("/user/:id", protect, getUserPosts);
module.exports = router;

