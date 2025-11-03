import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api'; // adjust path if necessary

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get('/api/blogs')
      .then(res => {
        const found = res.data.find(b => b._id === id);
        setBlog(found || null);
      })
      .catch(err => {
        console.error('Failed to load blog list:', err);
        setBlog(null);
      });
  }, [id]);

  if (!blog) return <p className="text-center mt-8">Loading...</p>;

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      {blog.image && (
        <img src={`${baseURL}${blog.image}`} alt={blog.title} />
      )}
      <div
        className="prose prose-a:text-blue-600 hover:prose-a:text-blue-800 max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogDetails;
