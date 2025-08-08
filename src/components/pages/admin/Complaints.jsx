import React, { useState, useEffect } from "react";
import StatsCard from "../sub-components/StatsCard";
import FilterControls from "./sub-components/complaints/FilterControls";
import ComplaintCard from "./sub-components/complaints/ComplaintCard";
import AdminComplaintService from "../../../services/AdminComplaintService";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [actionText, setActionText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  // Stats state
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  // Fetch complaints on component mount
  useEffect(() => {
    fetchComplaints();
    fetchStats();
  }, []);

  // Fetch complaints when filters change
  useEffect(() => {
    fetchFilteredComplaints();
  }, [filterStatus, filterPriority]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const data = await AdminComplaintService.getAllComplaints();
      const formattedComplaints = AdminComplaintService.formatComplaintsForFrontend(data);
      setComplaints(formattedComplaints);
      setError('');
    } catch (err) {
      setError('Failed to fetch complaints. Please try again.');
      console.error('Error fetching complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredComplaints = async () => {
    try {
      setLoading(true);
      let data;
      
      if (filterStatus === "All" && filterPriority === "All") {
        data = await AdminComplaintService.getAllComplaints();
      } else {
        const statusFilter = filterStatus !== "All" ? filterStatus : null;
        const priorityFilter = filterPriority !== "All" ? filterPriority : null;
        data = await AdminComplaintService.filterComplaints(statusFilter, priorityFilter);
      }
      
      const formattedComplaints = AdminComplaintService.formatComplaintsForFrontend(data);
      setComplaints(formattedComplaints);
      setError('');
    } catch (err) {
      setError('Failed to fetch filtered complaints. Please try again.');
      console.error('Error fetching filtered complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await AdminComplaintService.getComplaintStats();
      setStats({
        total: statsData.totalComplaints || 0,
        pending: statsData.pendingCount || 0,
        inProgress: statsData.inProgressCount || 0,
        resolved: statsData.resolvedCount || 0,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      // Use calculated stats from current complaints as fallback
      calculateStatsFromComplaints();
    }
  };

  const calculateStatsFromComplaints = () => {
    setStats({
      total: complaints.length,
      pending: complaints.filter((c) => c.status === "Pending").length,
      inProgress: complaints.filter((c) => c.status === "In Progress").length,
      resolved: complaints.filter((c) => c.status === "Resolved").length,
    });
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      setLoading(true);
      
      // Convert frontend status to backend format
      const backendStatus = newStatus.toUpperCase().replace(" ", "_");
      
      await AdminComplaintService.updateComplaintStatus(complaintId, backendStatus);
      
      // Update local state
      setComplaints(complaints.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              status: newStatus,
              resolvedDate: newStatus === "Resolved" 
                ? new Date().toISOString().split("T")[0] 
                : null,
              resolvedBy: newStatus === "Resolved" ? "Admin" : null,
            }
          : complaint
      ));
      
      setSuccess('Complaint status updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
      // Refresh stats
      fetchStats();
    } catch (err) {
      setError('Failed to update complaint status. Please try again.');
      console.error('Error updating status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePriorityChange = async (complaintId, newPriority) => {
    try {
      setLoading(true);
      
      // Convert frontend priority to backend format
      const backendPriority = newPriority.toUpperCase();
      
      await AdminComplaintService.updateComplaintPriority(complaintId, backendPriority);
      
      // Update local state
      setComplaints(complaints.map((complaint) =>
        complaint.id === complaintId
          ? { ...complaint, priority: newPriority }
          : complaint
      ));
      
      setSuccess('Complaint priority updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update complaint priority. Please try again.');
      console.error('Error updating priority:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleActionSubmit = async (complaintId) => {
    if (!actionText.trim()) return;

    try {
      setLoading(true);
      
      await AdminComplaintService.updateComplaintAction(complaintId, actionText);
      
      // Update local state
      setComplaints(complaints.map((complaint) =>
        complaint.id === complaintId
          ? {
              ...complaint,
              actionTaken: actionText,
              status: "In Progress",
            }
          : complaint
      ));
      
      setActionText("");
      setSelectedComplaint(null);
      setSuccess('Action added successfully!');
      setTimeout(() => setSuccess(''), 3000);
      
      // Refresh stats
      fetchStats();
    } catch (err) {
      setError('Failed to add action. Please try again.');
      console.error('Error adding action:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleActionCancel = () => {
    setSelectedComplaint(null);
    setActionText("");
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const getFilteredComplaints = () => {
    let filtered = [...complaints];

    // Client-side sorting (since we get pre-filtered data from backend)
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b._original?.createdAt || b.date) - new Date(a._original?.createdAt || a.date);
        case "priority":
          const priorityOrder = { 
            Urgent: 6, High: 5, Important: 4, 
             Moderate: 3, General: 2, Low: 1 
          };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredComplaints = getFilteredComplaints();

  return (
    <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-purpleDark mb-6 text-center">
        Admin - Complaints Management
      </h1>

      {/* Success/Error Messages */}
      {(error || success) && (
        <div className="max-w-6xl mx-auto mb-6">
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 max-w-6xl mx-auto">
        <StatsCard
          title="Total Complaints"
          value={stats.total}
          color="border-purpleDark"
          bgColor="text-purpleDark"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          color="border-yellow-500"
          bgColor="text-yellow-600"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          color="border-purpleDark"
          bgColor="text-purpleDark"
        />
        <StatsCard
          title="Resolved"
          value={stats.resolved}
          color="border-green-500"
          bgColor="text-green-600"
        />
      </div>

      {/* Filters and Controls */}
      <FilterControls
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="text-purpleDark">Loading complaints...</div>
        </div>
      )}

      {/* Complaints List */}
      <div className="max-w-6xl mx-auto space-y-4">
        {!loading && filteredComplaints.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center border border-purpleDarkScale-300">
            <p className="text-purpleDarkScale-600 italic">
              {filterStatus !== "All" || filterPriority !== "All" 
                ? "No complaints found matching the selected filters."
                : "No complaints available."}
            </p>
          </div>
        ) : (
          !loading && filteredComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              selectedComplaint={selectedComplaint}
              actionText={actionText}
              setActionText={setActionText}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
              onAddAction={setSelectedComplaint}
              onActionSubmit={handleActionSubmit}
              onActionCancel={handleActionCancel}
              loading={loading}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Complaints;