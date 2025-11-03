import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api"; // ✅ Use shared axios instance

const PublicBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="border-b py-4">
            {/* Blog Title */}
            <Link to={`/blogs/${blog._id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {blog.title}
              </h2>
            </Link>

            {/* Blog Image */}
            {blog.image && (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${blog.image}`}
                alt={blog.title}
                className="mt-2 rounded-md max-h-64 w-full object-cover"
              />
            )}

            {/* Blog Content Preview */}
            <p
              className="text-gray-600 mt-2"
              dangerouslySetInnerHTML={{
                __html:
                  (blog.content?.length > 150
                    ? blog.content.substring(0, 150) + "..."
                    : blog.content) || "",
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default PublicBlogs;
