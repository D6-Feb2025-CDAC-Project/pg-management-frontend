import ActionButton from "./ActionButton";

const NoticeControls = ({
    notice,
    onStatusChange,
    onAddNotes,
    onSettleDeposit,
    loading = false
}) => {

    const canProcessSettlement = () => {
        return notice.status === 'Approved' &&
            notice.settlementGenerated &&
            !notice.depositSettlement; // No settlement details means it hasn't been processed yet
    };

    const getSettlementButtonText = () => {
        if (!notice.settlementGenerated) {
            return 'Settlement Not Available';
        }
        if (notice.depositSettlement) {
            return 'Settlement Processed';
        }
        return 'Settle Deposit';
    };

    return (
        <div className="flex flex-col gap-2 min-w-fit">
            {notice.status === 'Pending Review' && (
                <>
                    <ActionButton
                        onClick={() => onStatusChange(notice.id, 'Under Review', 'Notice under review')}
                        variant="primary"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Start Review'}
                    </ActionButton>
                    <ActionButton
                        onClick={() => onAddNotes(notice.id)}
                        variant="secondary"
                        disabled={loading}
                    >
                        Add Notes
                    </ActionButton>
                </>
            )}

            {notice.status === 'Under Review' && (
                <>
                    <ActionButton
                        onClick={() => onStatusChange(notice.id, 'Approved', 'Notice approved for move-out')}
                        variant="success"
                        disabled={loading}
                    >
                        Approve
                    </ActionButton>
                    <ActionButton
                        onClick={() => onStatusChange(notice.id, 'Rejected', 'Notice rejected due to policy violation')}
                        variant="danger"
                        disabled={loading}
                    >
                        Reject
                    </ActionButton>
                </>
            )}

            {notice.status === 'Approved' && (
                <div className="space-y-2">
                    {notice.settlementGenerated ? (
                        <div className="text-sm text-green-600 font-medium p-2 bg-green-50 rounded border border-green-200">
                            ✅ Settlement Created
                        </div>
                    ) : (
                        <div className="text-sm text-yellow-600 font-medium p-2 bg-yellow-50 rounded border border-yellow-200">
                            ⏳ Creating Settlement...
                        </div>
                    )}

                    <ActionButton
                        onClick={() => onSettleDeposit(notice)}
                        variant="warning"
                        disabled={loading || !canProcessSettlement()}
                    >
                        {getSettlementButtonText()}
                    </ActionButton>
                </div>
            )}

            {notice.status === 'Payment Processing' && (
                <div className="space-y-2">
                    <div className="text-sm text-blue-600 font-medium p-2 bg-blue-50 rounded border border-blue-200">
                        🔄 Processing Refund...
                    </div>
                    {notice.depositSettlement && (
                        <div className="text-xs text-gray-600">
                            Refund Amount: ₹{notice.depositSettlement.finalAmount}
                        </div>
                    )}
                </div>
            )}

            {notice.status === 'Completed' && (
                <div className="space-y-2">
                    <div className="text-sm text-green-600 font-medium p-2 bg-green-50 rounded border border-green-200">
                        ✅ Process Completed
                    </div>
                    {notice.depositSettlement && (
                        <div className="text-xs text-gray-600">
                            Refunded: ₹{notice.depositSettlement.finalAmount}
                        </div>
                    )}
                </div>
            )}

            {notice.status === 'Rejected' && (
                <div className="text-sm text-red-600 font-medium p-2 bg-red-50 rounded border border-red-200">
                    ❌ Notice Rejected
                </div>
            )}
        </div>
    );
};

export default NoticeControls;