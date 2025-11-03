const BlogPost = require("../models/BlogPost");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");

const generateUniqueSlug = async (title) => {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (await BlogPost.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  return slug;
};

// ✅ Create post
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags = [], category = "", image = "" } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const slug = await generateUniqueSlug(title);

    const newPost = await BlogPost.create({
      title,
      content,
      tags,
      category,
      image,
      slug,
      author: req.user._id,
    });

    return res.status(201).json({ message: "Blog created successfully", post: newPost });
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Server error while creating post" });
  }
};

// ✅ Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// ✅ Get post by slug
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug }).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Blog not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

// ✅ Get post by id
exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("Get post by ID error:", err);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

// ✅ Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const { title, content, image } = req.body;

    // Delete old image if replaced
    if (post.image && post.image !== image && post.image.startsWith("/uploads/")) {
      const imagePath = path.resolve(__dirname, `../${post.image}`);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Error deleting image:", err);
        });
      }
    }

    post.title = title;
    post.content = content;
    post.image = image || "";
    await post.save();

    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    console.error("Update post error:", err);
    res.status(500).json({ message: "Server error while updating post" });
  }
};

// ✅ Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog not found" });

    // Delete image if exists
    if (post.image && post.image.startsWith("/uploads/")) {
      const imagePath = path.resolve(__dirname, `../${post.image}`);
      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Error deleting image:", err);
        });
      }
    }

    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ message: "Server error while deleting post" });
  }
};
