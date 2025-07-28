import React, { useState } from 'react';
import ComplaintDetails from '../admin/sub-components/ComplaintDetails';

const dummyComplaints = [
  {
    id: 1,
    title: 'Leaking tap in bathroom',
    message: 'There is a constant leak in the bathroom tap causing water wastage.',
    date: '2025-07-20',
    status: 'Pending',
    priority: 'Medium',
    actionTaken: '',
    resolvedDate: null,
    resolvedBy: null
  },
  {
    id: 2,
    title: 'Wi-Fi not working on 2nd floor',
    message: 'The Wi-Fi signal is very weak on the second floor.',
    date: '2025-07-22',
    status: 'Resolved',
    priority: 'High',
    actionTaken: 'Replaced Wi-Fi router and installed signal booster on 2nd floor',
    resolvedDate: '2025-07-25'
  },
]

const Complaints = () => {
  const [complaints, setComplaints] = useState(dummyComplaints);

  const [newComplaint, setNewComplaint] = useState({
    title: '',
    message: '',
    priority: 'Medium',
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
      priority: newComplaint.priority,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      actionTaken: '',
      resolvedDate: null,
    };

    setComplaints([newEntry, ...complaints]);
    setNewComplaint({ title: '', message: '', priority: 'Medium' });
  };

  return (
    <div className="bg-purpleDarkScale-100  p-6 min-h-screen">
      <h1 h1 className="text-3xl font-bold text-purpleDark mb-6 text-center" >
        Raise a Complaint
      </h1 >

      {/* Complaint Form */}
      <div div className="bg-white p-6 rounded-xl shadow space-y-4 border border-purpleDarkScale-300 mb-10 max-w-3xl mx-auto" >
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
              Priority Level
            </label>
            <select
              name="priority"
              value={newComplaint.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
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
      </div >

      {/* Complaint History */}
      <div div className="max-w-3xl mx-auto space-y-4" >
        <h2 className="text-xl font-semibold text-purpleDark mb-2">
          Your Previous Complaints
        </h2>


        {
          complaints.length === 0 ? (
            <p className="text-gray-600 italic">No complaints raised yet.</p>
          ) : (
            complaints.map((comp) => (
              <div key={comp.id}
                className="bg-white border rounded-lg shadow p-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <ComplaintDetails complaint={comp} />
                </div>
              </div>
            ))

          )
        }
      </div >
    </div >
  );
};

export default Complaints;

