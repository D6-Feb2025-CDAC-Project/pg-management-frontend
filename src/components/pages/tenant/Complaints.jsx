import React, { useState } from 'react';

const Complaints = () => {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: 'Leaking tap in bathroom',
      message: 'There is a constant leak in the bathroom tap causing water wastage.',
      date: '2025-07-20',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Wi-Fi not working on 2nd floor',
      message: 'The Wi-Fi signal is very weak on the second floor.',
      date: '2025-07-22',
      status: 'Resolved',
    },
  ]);

  const [newComplaint, setNewComplaint] = useState({
    title: '',
    message: '',
  });

  const handleChange = (e) => {
    setNewComplaint({ ...newComplaint, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComplaint.title || !newComplaint.message) return;

    const newEntry = {
      id: complaints.length + 1,
      title: newComplaint.title,
      message: newComplaint.message,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };

    setComplaints([newEntry, ...complaints]);
    setNewComplaint({ title: '', message: '' });
  };

  return (
    <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-purpleDark mb-6 text-center">
        Raise a Complaint
      </h1>

      {/* Complaint Form */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4 border border-purpleDarkScale-300 mb-10 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-purpleDark text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={newComplaint.title}
              onChange={handleChange}
              placeholder="Enter complaint title"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
              required
            />
          </div>
          <div>
            <label className="block text-purpleDark text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={newComplaint.message}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your issue..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purpleDark text-white px-6 py-2 rounded hover:bg-purpleDarkScale-600 transition"
          >
            Submit Complaint
          </button>
        </form>
      </div>

      {/* Complaint History */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold text-purpleDark mb-2">
          Your Previous Complaints
        </h2>

        {complaints.length === 0 ? (
          <p className="text-gray-600 italic">No complaints raised yet.</p>
        ) : (
          complaints.map((comp) => (
            <div
              key={comp.id}
              className="bg-white border border-purpleDarkScale-300 rounded-lg shadow p-4"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold text-gray-900">{comp.title}</h3>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    comp.status === 'Resolved'
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-400 text-black'
                  }`}
                >
                  {comp.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{comp.message}</p>
              <p className="text-xs text-gray-500">Date: {comp.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Complaints;

