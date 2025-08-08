import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [from, setFrom] = useState('PG Admin');
  const [type, setType] = useState('general');
  const [unread, setUnread] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  const fetchNotices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/notices`);
      setNotices(res.data);
    } catch (err) {
      console.error('Failed to fetch notices:', err);
    }
  };

  const handleAddNotice = async () => {
    if (!title || !message) return alert("Both title and message are required");

    const newNotice = {
      id: Date.now(),
      title,
      content: message,
      from,
      type,
      unread,
      time: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(`${API_BASE_URL}/notices`, newNotice);
      fetchNotices();
      setTitle('');
      setMessage('');
      setFrom('PG Admin');
      setType('general');
      setUnread(true);
    } catch (err) {
      console.error('Failed to post notice:', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const badgeColor = {
    urgent: 'bg-red-600',
    important: 'bg-yellow-400 text-black',
    general: 'bg-gray-600',
  };

  return (
    <div className="min-h-screen p-6 bg-purple-200">
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">
        Admin Notice Board
      </h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Add New Notice</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Message"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        {/* Sender Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="PG Admin">PG Admin</option>
            <option value="PG Owner">PG Owner</option>
            <option value="Housekeeping Staff">Housekeeping Staff</option>
          </select>
        </div>

        {/* Priority Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <div className="flex gap-4">
            {['urgent', 'important', 'general'].map((t) => (
              <label key={t} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value={t}
                  checked={type === t}
                  onChange={(e) => setType(e.target.value)}
                  className="accent-purple-600"
                />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddNotice}
          className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition"
        >
          Post Notice
        </button>
      </div>

      {/* Display Notices */}
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">Previous Notices</h2>

      {notices.length > 0 ? (
        notices.map((notice) => (
          <div
            key={notice.id}
            className={`bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-sm ${notice.unread ? 'ring-2 ring-green-400' : ''
              }`}
          >
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <h3 className="text-lg font-medium text-gray-900">{notice.title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span
                  className={`px-2 py-0.5 rounded-full font-semibold text-white ${badgeColor[notice.type]}`}
                >
                  {notice.type}
                </span>
                {notice.unread && (
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">
                    New
                  </span>
                )}
                <span>{notice.time}</span>
              </div>
            </div>
            <p className="text-gray-800 mb-1">{notice.content || notice.message}</p>
            <p className="text-sm text-gray-500">From: {notice.from}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No notices found.</p>
      )}
    </div>
  );
};

export default AdminNotices;
