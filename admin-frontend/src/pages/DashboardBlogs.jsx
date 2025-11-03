import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DashboardBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  // ✅ Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        alert("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [token]);

  // ✅ Delete Blog
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete blog");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading blogs...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex items-center justify-between border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition"
            style={{ height: "120px" }}
          >
            <div className="flex items-center gap-4 w-3/4">
              <div className="w-28 h-20 rounded overflow-hidden bg-gray-100">
                {blog.image ? (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}${blog.image}`}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-semibold truncate">{blog.title}</h2>
            </div>

            <div className="flex gap-2">
              <Link to={`edit/${blog._id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardBlogs;
