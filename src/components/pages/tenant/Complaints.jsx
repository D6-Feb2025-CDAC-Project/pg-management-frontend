import React, { useState, useEffect } from 'react';
import ComplaintDetails from '../admin/sub-components/complaints/ComplaintDetails';
import TenantComplaintService from '../../../services/TenantComplaintService';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    issue: '',
    priorityLevel: 'MODERATE',
  });

  const [editingComplaint, setEditingComplaint] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    issue: '',
    priorityLevel: 'MODERATE',
  });

  // Fetch complaints on component mount
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const data = await TenantComplaintService.getMyComplaints();
      setComplaints(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch complaints. Please try again.');
      console.error('Error fetching complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewComplaint({ ...newComplaint, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComplaint.title || !newComplaint.issue) return;

    try {
      setLoading(true);
      await TenantComplaintService.submitComplaint(newComplaint);
      setNewComplaint({ title: '', issue: '', priorityLevel: 'MODERATE' });
      setSuccess('Complaint submitted successfully!');
      await fetchComplaints(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
      console.error('Error creating complaint:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (complaint) => {
    // Only allow editing if complaint is still pending
    if (complaint.complaintStatus !== 'PENDING') {
      setError('Only pending complaints can be edited.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setEditingComplaint(complaint.id);
    setEditForm({
      title: complaint.title,
      issue: complaint.issue,
      priorityLevel: complaint.priorityLevel,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editForm.title || !editForm.issue) return;

    try {
      setLoading(true);
      await TenantComplaintService.updateComplaint(editingComplaint, editForm);
      setEditingComplaint(null);
      setEditForm({ title: '', issue: '', priorityLevel: 'MODERATE' });
      setSuccess('Complaint updated successfully!');
      await fetchComplaints(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update complaint. Please try again.');
      console.error('Error updating complaint:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingComplaint(null);
    setEditForm({ title: '', issue: '', priorityLevel: 'MODERATE' });
  };

  const handleDeleteClick = async (complaint) => {
    // Only allow deletion if complaint is still pending
    if (complaint.complaintStatus !== 'PENDING') {
      setError('Only pending complaints can be deleted.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    // Use window.confirm like in Notices.jsx
    if (!window.confirm('Are you sure you want to delete this complaint?')) return;

    try {
      setLoading(true);
      await TenantComplaintService.deleteComplaint(complaint.id);
      setSuccess('Complaint deleted successfully!');
      await fetchComplaints(); // Refresh the list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete complaint. Please try again.');
      console.error('Error deleting complaint:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // Priority level display mapping
  const getPriorityDisplay = (priority) => {
    const priorityMap = {
      'HIGH': 'High',
      'LOW': 'Low', 
      'MODERATE': 'Moderate',
      'GENERAL': 'General',
      'IMPORTANT': 'Important',
      'URGENT': 'Urgent'
    };
    return priorityMap[priority] || priority;
  };

  // Status display mapping
  const getStatusDisplay = (status) => {
    const statusMap = {
      'PENDING': 'Pending',
      'RESOLVED': 'Resolved',
      'IN_PROGRESS': 'In Progress'
    };
    return statusMap[status] || status;
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    const colorMap = {
      'URGENT': 'text-red-600',
      'HIGH': 'text-red-500',
      'IMPORTANT': 'text-orange-500',
      'MODERATE': 'text-yellow-500',
      'GENERAL': 'text-blue-500',
      'LOW': 'text-green-500'
    };
    return colorMap[priority] || 'text-gray-500';
  };

  // Status color mapping
  const getStatusColor = (status) => {
    const colorMap = {
      'PENDING': 'text-yellow-600 bg-yellow-100',
      'IN_PROGRESS': 'text-blue-600 bg-blue-100',
      'RESOLVED': 'text-green-600 bg-green-100'
    };
    return colorMap[status] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-purpleDark mb-6 text-center">
        Raise a Complaint
      </h1>

      {/* Success/Error Messages */}
      {(error || success) && (
        <div className="max-w-3xl mx-auto mb-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
              <button
                onClick={clearMessages}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <span className="sr-only">Dismiss</span>
                ×
              </button>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {success}
              <button
                onClick={clearMessages}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <span className="sr-only">Dismiss</span>
                ×
              </button>
            </div>
          )}
        </div>
      )}

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
              disabled={loading}
              maxLength={100}
            />
            <small className="text-gray-500">Maximum 100 characters</small>
          </div>
          <div>
            <label className="block text-purpleDark text-sm font-medium mb-1">
              Priority Level
            </label>
            <select
              name="priorityLevel"
              value={newComplaint.priorityLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
              disabled={loading}
            >
              <option value="LOW">Low</option>
              <option value="GENERAL">General</option>
              <option value="MODERATE">Moderate</option>
              <option value="IMPORTANT">Important</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-purpleDark text-sm font-medium mb-1">
              Issue Description
            </label>
            <textarea
              name="issue"
              value={newComplaint.issue}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your issue in detail..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400 resize-none"
              required
              disabled={loading}
              maxLength={1000}
            />
            <small className="text-gray-500">Maximum 1000 characters</small>
          </div>
          <button
            type="submit"
            className="bg-purpleDark text-white px-6 py-2 rounded hover:bg-purpleDarkScale-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>

      {/* Complaint History */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold text-purpleDark mb-2">
          Your Previous Complaints
        </h2>

        {loading && complaints.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-purpleDark">Loading complaints...</div>
          </div>
        ) : complaints.length === 0 ? (
          <p className="text-gray-600 italic">No complaints raised yet.</p>
        ) : (
          complaints.map((complaint) => (
            <div key={complaint.id} className="bg-white border rounded-lg shadow p-4">
              {editingComplaint === complaint.id ? (
                // Edit Form
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-purpleDark text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
                      required
                      disabled={loading}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="block text-purpleDark text-sm font-medium mb-1">
                      Priority Level
                    </label>
                    <select
                      name="priorityLevel"
                      value={editForm.priorityLevel}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
                      disabled={loading}
                    >
                      <option value="LOW">Low</option>
                      <option value="GENERAL">General</option>
                      <option value="MODERATE">Moderate</option>
                      <option value="IMPORTANT">Important</option>
                      <option value="HIGH">High</option>
                      <option value="URGENT">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-purpleDark text-sm font-medium mb-1">
                      Issue Description
                    </label>
                    <textarea
                      name="issue"
                      value={editForm.issue}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400 resize-none"
                      required
                      disabled={loading}
                      maxLength={1000}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // Display Mode
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-purpleDark">{complaint.title}</h3>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(complaint.complaintStatus)}`}>
                            {getStatusDisplay(complaint.complaintStatus)}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(complaint.priorityLevel)} bg-gray-100`}>
                            {getPriorityDisplay(complaint.priorityLevel)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700">{complaint.issue}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>Created: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                        {complaint.resolvedDate && (
                          <span>Resolved: {new Date(complaint.resolvedDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      
                      {complaint.actionTaken && (
                        <div className="mt-3 p-3 bg-green-50 rounded border-l-4 border-green-400">
                          <p className="text-sm font-medium text-green-800">Action Taken:</p>
                          <p className="text-sm text-green-700">{complaint.actionTaken}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons - Only show for pending complaints */}
                  {complaint.complaintStatus === 'PENDING' && (
                    <div className="flex gap-2 lg:ml-4 lg:flex-col">
                      <button
                        onClick={() => handleEdit(complaint)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm disabled:opacity-50"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(complaint)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm disabled:opacity-50"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Complaints;