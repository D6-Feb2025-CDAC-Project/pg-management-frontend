import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/notices');
      setNotices(res.data);
    } catch (err) {
      console.error('Failed to fetch notices:', err);
    }
  };

  const handleAddNotice = async () => {
    if (!title || !message) return alert("Both fields are required");

    const newNotice = {
      title,
      message,
      createdAt: new Date().toISOString()
    };

    try {
      await axios.post('http://localhost:5000/notices', newNotice);
      fetchNotices(); // refresh list
      setTitle('');
      setMessage('');
    } catch (err) {
      console.error('Failed to post notice:', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-purple-200">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Admin Notice Board</h1>

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
        <button
          onClick={handleAddNotice}
          className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition"
        >
          Post Notice
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-purple-800 mb-4">Previous Notices</h2>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <div key={notice.id} className="bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">{notice.title}</h3>
            <p className="text-gray-800 mb-1">{notice.message}</p>
            <p className="text-sm text-gray-500">
              {notice.createdAt ? new Date(notice.createdAt).toLocaleString() : 'No timestamp'}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-700">No notices found.</p>
      )}
    </div>
  );
};

export default AdminNotices;
