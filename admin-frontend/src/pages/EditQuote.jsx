import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';

const MAX_CHARS = 190;

const EditQuote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  useEffect(() => {
    api.get(`/api/quotes/${id}`)
      .then(res => setText(res.data?.text || ''))
      .catch(() => alert('Failed to load quote.'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/quotes/${id}`, { text: text.trim() });
      navigate('/quotes');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to update quote.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Quote</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={MAX_CHARS}
          rows={5}
          className="w-full border p-2 rounded"
          required
        />
        <div className="text-sm text-gray-500">
          {text.length} / {MAX_CHARS} characters
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditQuote;
