// src/pages/EditBlog.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import api from '../lib/api';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeOldImage, setRemoveOldImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const token = sessionStorage.getItem('token');
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    let cancelled = false;
    setLoading(true);

    api
      .get(`/api/blogs/${id}`, { headers: authHeader })
      .then((res) => {
        if (cancelled) return;
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
        setExistingImage(blog.image || '');
        setImagePreview(blog.image ? `${import.meta.env.VITE_API_BASE_URL}${blog.image}` : null);
      })
      .catch((err) => {
        console.error('Error loading blog:', err);
        alert(err.response?.data?.message || 'Failed to load blog');
        navigate('/dashboard');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, navigate, token]);

  const handleEditorChange = (newContent) => setContent(newContent);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoveOldImage(true);
    }
  };

  const handleRemoveImage = () => {
    if (window.confirm('Are you sure you want to remove the current image?')) {
      setRemoveOldImage(true);
      setImageFile(null);
      setExistingImage('');
      setImagePreview(null);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content cannot be empty.');
      return;
    }

    setSubmitting(true);
    try {
      let finalImage = existingImage;

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadRes = await api.post('/api/upload', formData, {
          headers: {
            ...authHeader,
            'Content-Type': 'multipart/form-data',
          },
        });

        finalImage = uploadRes.data.url;
      }

      await api.put(`/api/blogs/${id}`, {
        title: title.trim(),
        content,
        image: removeOldImage ? finalImage : existingImage,
      }, {
        headers: authHeader,
      });

      alert('Blog updated successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      alert(`Failed to update blog: ${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 mb-2 w-full rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="mb-2"
      />

      {imagePreview && (
        <div className="mb-4">
          <img src={imagePreview} alt="Preview" className="h-40 rounded mb-2" />
          <button
            onClick={handleRemoveImage}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Remove Image
          </button>
        </div>
      )}

      <Editor
        apiKey="8z1r0kk5m4bpykowluriy8qoccrf018iywegu0lka81bzq4b"
        value={content}
        onEditorChange={handleEditorChange}
        init={{
          height: 400,
          menubar: false,
          plugins: ['link', 'lists'],
          toolbar:
            'undo redo | blocks fontselect fontsizeselect | bold italic underline | link | bullist numlist | removeformat',
          fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />

      <button
        onClick={handleUpdate}
        disabled={submitting}
        className={`${
          submitting ? 'opacity-60 cursor-not-allowed' : ''
        } bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4`}
      >
        {submitting ? 'Updating...' : 'Update Blog'}
      </button>
    </div>
  );
};

export default EditBlog;
