// src/Components/CardDesigns/How.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../lib/api";

const How = ({ onOpenHowModal, onBlogClick }) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/api/blogs");
        // newest first
        setBlogs(res.data.slice().reverse());
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
      }
    };
    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    if (onBlogClick) {
      onBlogClick(blog);
    } else {
      // fallback if not provided
      navigate(`/blog/${blog.slug}`, { state: { background: location } });
    }
  };

  return (
    <div className="bg-white w-full h-full rounded-xl p-4 sm:p-6 flex flex-col min-h-0 overflow-hidden">
      <h2 className="text-black font-bold mb-4 text-2xl sm:text-2xl lg:text-3xl">
        How we do it?
      </h2>

      <div className="flex-1 h-0 overflow-y-auto space-y-3 pr-2">
        {blogs.map((blog) => (
          <button
            type="button"
            key={blog._id}
            onClick={() => handleBlogClick(blog)}
            className="block text-left w-full bg-[#fdf0e5] rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <h3 className="text-base sm:text-lg font-semibold text-black leading-snug">
              {blog.title}
            </h3>
          </button>
        ))}
      </div>

      <button
        onClick={onOpenHowModal}
        className="mt-4 self-start bg-black text-white text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        See All Blogs
      </button>
    </div>
  );
};

export default How;