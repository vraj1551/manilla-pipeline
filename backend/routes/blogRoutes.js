const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createPost,
  getAllPosts,
  getPostBySlug,
  getPostById,
  updatePost,
  deletePost
} = require("../controllers/blogController");

// ✅ Get all blogs (Public) / Create blog (Protected)
router.route("/")
  .get(getAllPosts)
  .post(protect, createPost);

// ✅ Get blog by slug (Public)
router.get("/slug/:slug", getPostBySlug);

// ✅ Get blog by id (Protected for admin dashboard)
router.get("/:id", protect, getPostById);

// ✅ Update/Delete blog by id (Protected)
router.route("/:id")
  .put(protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
