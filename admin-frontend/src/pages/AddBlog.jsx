import { useState } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState('');
  const token = sessionStorage.getItem('token');

  const handleEditorChange = (newContent) => setContent(newContent);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (window.confirm('Remove selected image?')) {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const createPost = async () => {
    if (!title.trim() || !content.trim()) {
      return alert('Please enter both title and content.');
    }
    if (!token) return alert('You must be logged in to create a blog');

    try {
      let uploadedImageUrl = '';

      // ✅ Upload image first if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadRes = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        uploadedImageUrl = uploadRes.data.url;
      }

      // ✅ Create blog
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs`,
        {
          title,
          content,
          image: uploadedImageUrl,
          tags: [],
          category: '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('✅ Blog created successfully');
      setTitle('');
      setContent('');
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Blog creation error:', err.response?.data || err.message);
      alert(`❌ Failed to create blog: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Blog</h1>

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
        onClick={createPost}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
      >
        Create Blog
      </button>
    </div>
  );
};

export default AddBlog;
