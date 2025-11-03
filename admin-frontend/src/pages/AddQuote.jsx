import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const MAX_CHARS = 190;

export default function AddQuote() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = text.trim();
    if (!payload) return alert('Quote cannot be empty.');

    try {
      await api.post('/api/quotes', { text: payload });
      navigate('/quotes');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to add quote.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Quote</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={MAX_CHARS}
          rows={4}
          className="w-full border p-2 rounded"
          placeholder="Enter your quote…"
          required
        />
        <div className="text-sm text-gray-500">
          {text.length} / {MAX_CHARS} characters
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
