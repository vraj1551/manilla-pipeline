import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

const DashboardQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const fetchQuotes = () => {
    api.get('/api/quotes')
      .then(res => setQuotes(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchQuotes();

    const fetchCurrent = () => {
      api.get('/api/quotes/current')
        .then(res => setCurrentId(res.data?._id || null))
        .catch(console.error);
    };

    fetchCurrent();
    const iv = setInterval(fetchCurrent, 3000); // every 3s for testing
    return () => clearInterval(iv);
  }, []);

  const handleSetCurrent = async (id) => {
    try {
      await api.put(`/api/quotes/current/${id}`, {});
      fetchQuotes();
      setCurrentId(id);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to set current quote');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this quote?')) return;
    try {
      await api.delete(`/api/quotes/${id}`);
      setQuotes(qs => qs.filter(q => q._id !== id));
      if (currentId === id) setCurrentId(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to delete quote');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Quotes</h1>
        <Link to="/quotes/add">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Add Quote
          </button>
        </Link>
      </div>

      {quotes.length === 0 && <p>No quotes found.</p>}

      {quotes.map(q => {
        const isActive = q._id === currentId;
        return (
          <div
            key={q._id}
            className={`flex items-start mb-4 p-4 rounded shadow ${
              isActive
                ? 'border-2 border-yellow-400 bg-yellow-50'
                : 'border border-gray-200 bg-white'
            }`}
          >
            <div className="flex-shrink-0 w-8 text-right mr-4 font-mono text-gray-600">
              {q.number}.
            </div>
            <div className="flex-1 whitespace-pre-wrap">{q.text}</div>
            <div className="flex flex-col space-y-2 ml-4">
              <button
                onClick={() => handleSetCurrent(q._id)}
                className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded hover:bg-yellow-500"
              >
                Set Current
              </button>
              <Link to={`/quotes/edit/${q._id}`}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(q._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardQuotes;
