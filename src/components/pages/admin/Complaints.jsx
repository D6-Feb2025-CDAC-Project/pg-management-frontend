import React, { useState } from 'react';
import StatsCard from '../sub-components/StatsCard';
import FilterControls from './sub-components/complaints/FilterControls';
import ComplaintCard from './sub-components/complaints/ComplaintCard';

const dummyComplaints = [
    {
        id: 1,
        title: 'Leaking tap in bathroom',
        message: 'There is a constant leak in the bathroom tap causing water wastage.',
        date: '2025-07-20',
        status: 'Pending',
        tenantName: 'John Smith',
        tenantId: 'T001',
        apartment: 'A-101',
        priority: 'Medium',
        actionTaken: '',
        resolvedDate: null,
        resolvedBy: null,
    },
    {
        id: 2,
        title: 'Wi-Fi not working on 2nd floor',
        message: 'The Wi-Fi signal is very weak on the second floor.',
        date: '2025-07-22',
        status: 'Resolved',
        tenantName: 'Sarah Johnson',
        tenantId: 'T002',
        apartment: 'B-205',
        priority: 'High',
        actionTaken: 'Replaced Wi-Fi router and installed signal booster on 2nd floor',
        resolvedDate: '2025-07-25',
        resolvedBy: 'Admin',
    },
    {
        id: 3,
        title: 'Parking slot occupied',
        message: 'Someone has been parking in my assigned parking slot for the past 3 days.',
        date: '2025-07-24',
        status: 'In Progress',
        tenantName: 'Mike Davis',
        tenantId: 'T003',
        apartment: 'C-302',
        priority: 'Low',
        actionTaken: 'Sent notice to all residents regarding parking violations',
        resolvedDate: null,
        resolvedBy: null,
    },
    {
        id: 4,
        title: 'Elevator not working',
        message: 'The main elevator has been out of order since yesterday. This is causing inconvenience for elderly residents.',
        date: '2025-07-26',
        status: 'Pending',
        tenantName: 'Emma Wilson',
        tenantId: 'T004',
        apartment: 'A-503',
        priority: 'High',
        actionTaken: '',
        resolvedDate: null,
        resolvedBy: null,
    },
];

// Main Admin Component
const AdminComplaints = () => {
    const [complaints, setComplaints] = useState(dummyComplaints);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [actionText, setActionText] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [sortBy, setSortBy] = useState('date');

    const handleStatusChange = (complaintId, newStatus) => {
        setComplaints(complaints.map(complaint =>
            complaint.id === complaintId
                ? {
                    ...complaint,
                    status: newStatus,
                    resolvedDate: newStatus === 'Resolved' ? new Date().toISOString().split('T')[0] : null,
                    resolvedBy: newStatus === 'Resolved' ? 'Admin' : null
                }
                : complaint
        ));
    };

    const handlePriorityChange = (complaintId, newPriority) => {
        setComplaints(complaints.map(complaint =>
            complaint.id === complaintId
                ? { ...complaint, priority: newPriority }
                : complaint
        ));
    };

    const handleActionSubmit = (complaintId) => {
        if (!actionText.trim()) return;

        setComplaints(complaints.map(complaint =>
            complaint.id === complaintId
                ? {
                    ...complaint,
                    actionTaken: actionText,
                    status: 'In Progress'
                }
                : complaint
        ));
        setActionText('');
        setSelectedComplaint(null);
    };

    const handleActionCancel = () => {
        setSelectedComplaint(null);
        setActionText('');
    };

    const getFilteredComplaints = () => {
        let filtered = complaints;

        if (filterStatus !== 'All') {
            filtered = filtered.filter(complaint => complaint.status === filterStatus);
        }

        if (filterPriority !== 'All') {
            filtered = filtered.filter(complaint => complaint.priority === filterPriority);
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                case 'priority':
                    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'status':
                    return a.status.localeCompare(b.status);
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const filteredComplaints = getFilteredComplaints();

    const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        inProgress: complaints.filter(c => c.status === 'In Progress').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length,
    };

    return (
        <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-purpleDark mb-6 text-center">
                Admin - Complaints Management
            </h1>

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

            {/* Complaints List */}
            <div className="max-w-6xl mx-auto space-y-4">
                {filteredComplaints.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow text-center border border-purpleDarkScale-300">
                        <p className="text-purpleDarkScale-600 italic">No complaints found matching the selected filters.</p>
                    </div>
                ) : (
                    filteredComplaints.map((complaint) => (
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
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminComplaints;