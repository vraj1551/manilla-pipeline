// src/Components/Modal/HowModal.jsx
import React, { useEffect, useState } from "react";
import api from "../../lib/api";

const placeholderImage = "https://via.placeholder.com/300x160?text=No+Image";

const stripHTML = (html) => {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

function HowModal({ onBlogClick }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/api/blogs");
        setBlogs(res.data.slice().reverse());
      } catch (err) {
        console.error("Error loading blogs in modal:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Blogs</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <button
            type="button"
            key={blog._id}
            onClick={() => onBlogClick(blog)}
            className="bg-[#fdf0e5] rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow text-left"
          >
            <img
              src={
                blog.image
                  ? `${import.meta.env.VITE_API_BASE_URL}${blog.image}`
                  : placeholderImage
              }
              alt={blog.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-semibold text-black">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-700">
                {stripHTML(blog.content)?.slice(0, 80)}...
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default HowModal;