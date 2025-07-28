import React, { useState } from 'react';
import StatsCard from '../sub-components/StatsCard';
import InfoCard from '../sub-components/InfoCard';
import FilterControls from './sub-components/complaints/FilterControls';
import DepositModal from './sub-components/leave-notices/DepositModal';
import NoticeCard from './sub-components/leave-notices/NoticeCard';

// Sample data
const dummyLeaveNotices = [
    {
        id: 1,
        referenceId: 'LN001',
        tenantName: 'John Smith',
        tenantId: 'T001',
        roomNumber: 'Room 205',
        submissionDate: '2025-07-20',
        moveOutDate: '2025-08-20',
        reason: 'job_relocation',
        reasonText: 'Job Relocation',
        details: 'Got a new job in Mumbai, need to relocate immediately.',
        contactNumber: '+91 98765 43210',
        emailAddress: 'john.smith@email.com',
        status: 'Pending Review',
        securityDeposit: 15000,
        reviewNotes: '',
        depositSettlement: null
    },
    {
        id: 2,
        referenceId: 'LN002',
        tenantName: 'Sarah Johnson',
        tenantId: 'T002',
        roomNumber: 'Room 301',
        submissionDate: '2025-07-18',
        moveOutDate: '2025-08-15',
        reason: 'higher_studies',
        reasonText: 'Higher Studies',
        details: 'Admitted to university abroad for Masters degree.',
        contactNumber: '+91 87654 32109',
        emailAddress: 'sarah.j@email.com',
        status: 'Approved',
        securityDeposit: 15000,
        reviewNotes: 'Approved. Good tenant with no issues.',
        depositSettlement: {
            deductionAmount: 500,
            deductionReason: 'Minor wall damage repair',
            finalAmount: 14500,
            processedDate: '2025-07-25'
        }
    },
    {
        id: 3,
        referenceId: 'LN003',
        tenantName: 'Mike Davis',
        tenantId: 'T003',
        roomNumber: 'Room 102',
        submissionDate: '2025-07-22',
        moveOutDate: '2025-08-10',
        reason: 'financial_constraints',
        reasonText: 'Financial Constraints',
        details: 'Due to job loss, unable to continue staying.',
        contactNumber: '+91 76543 21098',
        emailAddress: 'mike.davis@email.com',
        status: 'Under Review',
        securityDeposit: 15000,
        reviewNotes: 'Checking payment history and room condition.',
        depositSettlement: null
    }
];

const LeaveNotices = () => {
    const [notices, setNotices] = useState(dummyLeaveNotices);
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState('date');
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [reviewNotes, setReviewNotes] = useState('');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [depositNotice, setDepositNotice] = useState(null);

    const handleStatusChange = (noticeId, newStatus, notes = '') => {
        setNotices(notices.map(notice =>
            notice.id === noticeId
                ? { ...notice, status: newStatus, reviewNotes: notes }
                : notice
        ));
        setSelectedNotice(null);
        setReviewNotes('');
    };

    const handleNotesSubmit = (noticeId) => {
        if (!reviewNotes.trim()) return;

        setNotices(notices.map(notice =>
            notice.id === noticeId
                ? { ...notice, reviewNotes: reviewNotes, status: 'Under Review' }
                : notice
        ));
        setReviewNotes('');
        setSelectedNotice(null);
    };

    const handleNotesCancel = () => {
        setSelectedNotice(null);
        setReviewNotes('');
    };

    const handleSettleDeposit = (notice) => {
        setDepositNotice(notice);
        setShowDepositModal(true);
    };

    const handleDepositSettlement = (noticeId, settlementData) => {
        setNotices(notices.map(notice =>
            notice.id === noticeId
                ? {
                    ...notice,
                    status: 'Completed',
                    depositSettlement: {
                        ...settlementData,
                        processedDate: new Date().toISOString().split('T')[0]
                    }
                }
                : notice
        ));
    };

    const getFilteredNotices = () => {
        let filtered = notices;

        if (filterStatus !== 'All') {
            filtered = filtered.filter(notice => notice.status === filterStatus);
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.submissionDate) - new Date(a.submissionDate);
                case 'moveOutDate':
                    return new Date(a.moveOutDate) - new Date(b.moveOutDate);
                case 'status':
                    return a.status.localeCompare(b.status);
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const filteredNotices = getFilteredNotices();

    const stats = {
        total: notices.length,
        pending: notices.filter(n => n.status === 'Pending Review').length,
        underReview: notices.filter(n => n.status === 'Under Review').length,
        approved: notices.filter(n => n.status === 'Approved').length,
        completed: notices.filter(n => n.status === 'Completed').length
    };

    return (
        <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-purpleDark mb-6 text-center">
                Admin - Leave Notices Management
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 max-w-6xl mx-auto">
                <StatsCard
                    title="Total Notices"
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
                    title="Under Review"
                    value={stats.underReview}
                    color="border-blue-500"
                    bgColor="text-blue-600"
                />
                <StatsCard
                    title="Approved"
                    value={stats.approved}
                    color="border-purpleDark"
                    bgColor="text-purpleDark"
                />
                {/* <StatsCard
                    title="Completed"
                    value={stats.completed}
                    color="border-green-500"
                    bgColor="text-green-600"
                /> */}
            </div>

            {/* Filters and Controls */}
            <FilterControls
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {/* Leave Notices List */}
            <div className="max-w-6xl mx-auto space-y-4">
                {filteredNotices.length === 0 ? (
                    <InfoCard>
                        <div className="p-8 text-center">
                            <p className="text-purpleDarkScale-600 italic">No leave notices found matching the selected filters.</p>
                        </div>
                    </InfoCard>
                ) : (
                    filteredNotices.map((notice) => (
                        <NoticeCard
                            key={notice.id}
                            notice={notice}
                            selectedNotice={selectedNotice}
                            reviewNotes={reviewNotes}
                            setReviewNotes={setReviewNotes}
                            onStatusChange={handleStatusChange}
                            onAddNotes={setSelectedNotice}
                            onNotesSubmit={handleNotesSubmit}
                            onNotesCancel={handleNotesCancel}
                            onSettleDeposit={handleSettleDeposit}
                        />
                    ))
                )}
            </div>

            {/* Deposit Settlement Modal */}
            <DepositModal
                isOpen={showDepositModal}
                onClose={() => setShowDepositModal(false)}
                notice={depositNotice}
                onSubmit={handleDepositSettlement}
            />
        </div>
    );
};

export default LeaveNotices;