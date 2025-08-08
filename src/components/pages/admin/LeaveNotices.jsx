import React, { useState, useEffect } from 'react';
import StatsCard from '../sub-components/StatsCard';
import InfoCard from '../sub-components/InfoCard';
import FilterControls from './sub-components/complaints/FilterControls';
import DepositModal from './sub-components/leave-notices/DepositModal';
import NoticeCard from './sub-components/leave-notices/NoticeCard';
import { useLeaveNoticesHandlers } from '../../../services/LeaveNoticeAPI';

const LeaveNotices = () => {
    const {
        notices,
        loading,
        error,
        loadNotices,
        handleStatusChange,
        handleNotesSubmit,
        handleDepositSettlement
    } = useLeaveNoticesHandlers();

    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState('date');
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [reviewNotes, setReviewNotes] = useState('');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [depositNotice, setDepositNotice] = useState(null);

    // Load data on component mount
    useEffect(() => {
        loadNotices();
    }, []);

    // Handle status changes with API integration
    const onStatusChange = async (noticeId, newStatus, notes = '') => {
        try {
            await handleStatusChange(noticeId, newStatus, notes);
            setSelectedNotice(null);
            setReviewNotes('');
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    // Handle notes submission with API integration
    const onNotesSubmit = async (noticeId) => {
        if (!reviewNotes.trim()) return;

        try {
            await handleNotesSubmit(noticeId, reviewNotes);
            setReviewNotes('');
            setSelectedNotice(null);
        } catch (err) {
            console.error('Error updating notes:', err);
        }
    };

    const handleNotesCancel = () => {
        setSelectedNotice(null);
        setReviewNotes('');
    };

    const handleSettleDeposit = (notice) => {
        setDepositNotice(notice);
        setShowDepositModal(true);
    };

    // Handle deposit settlement with API integration
    const onDepositSettlement = async (noticeId, settlementData) => {
        try {
            await handleDepositSettlement(noticeId, settlementData);
            setShowDepositModal(false);
            setDepositNotice(null);
        } catch (err) {
            console.error('Error processing settlement:', err);
        }
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
                case 'tenant':
                    return a.tenantName.localeCompare(b.tenantName);
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
        paymentProcessing: notices.filter(n => n.status === 'Payment Processing').length,
        completed: notices.filter(n => n.status === 'Completed').length
    };

    return (
        <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-purpleDark mb-6 text-center">
                Admin - Leave Notices Management
            </h1>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-4 max-w-6xl mx-auto">
                    <span className="font-medium">Error:</span> {error}
                    <button
                        onClick={loadNotices}
                        className="ml-2 underline hover:no-underline"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Loading Indicator */}
            {loading && (
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purpleDark"></div>
                    <p className="mt-2 text-purpleDark">Loading leave notices...</p>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 max-w-6xl mx-auto">
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
                    color="border-green-500"
                    bgColor="text-green-600"
                />
                <StatsCard
                    title="Completed"
                    value={stats.completed}
                    color="border-purpleDark"
                    bgColor="text-purpleDark"
                />
            </div>

            {/* Filters and Controls */}
            {!loading && (
                <FilterControls
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            )}

            {/* Leave Notices List */}
            {!loading && (
                <div className="max-w-6xl mx-auto space-y-4">
                    {filteredNotices.length === 0 ? (
                        <InfoCard>
                            <div className="p-8 text-center">
                                <p className="text-purpleDarkScale-600 italic">
                                    {notices.length === 0
                                        ? "No leave notices found."
                                        : "No leave notices found matching the selected filters."
                                    }
                                </p>
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
                                onStatusChange={onStatusChange}
                                onAddNotes={setSelectedNotice}
                                onNotesSubmit={onNotesSubmit}
                                onNotesCancel={handleNotesCancel}
                                onSettleDeposit={handleSettleDeposit}
                            />
                        ))
                    )}
                </div>
            )}

            {/* Deposit Settlement Modal */}
            <DepositModal
                isOpen={showDepositModal}
                onClose={() => {
                    setShowDepositModal(false);
                    setDepositNotice(null);
                }}
                notice={depositNotice}
                onSubmit={onDepositSettlement}
            />
        </div>
    );
};

export default LeaveNotices;