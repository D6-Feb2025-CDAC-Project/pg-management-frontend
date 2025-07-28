import ActionButton from "./ActionButton";

const NoticeControls = ({
    notice,
    onStatusChange,
    onAddNotes,
    onSettleDeposit
}) => (
    <div className="flex flex-col gap-2 min-w-fit">
        {notice.status === 'Pending Review' && (
            <>
                <ActionButton
                    onClick={() => onStatusChange(notice.id, 'Under Review', 'Notice under review')}
                    variant="primary"
                >
                    Start Review
                </ActionButton>
                <ActionButton
                    onClick={() => onAddNotes(notice.id)}
                    variant="secondary"
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
                >
                    Approve
                </ActionButton>
                <ActionButton
                    onClick={() => onStatusChange(notice.id, 'Rejected', 'Notice rejected due to policy violation')}
                    variant="danger"
                >
                    Reject
                </ActionButton>
            </>
        )}

        {notice.status === 'Approved' && !notice.depositSettlement && (
            <ActionButton
                onClick={() => onSettleDeposit(notice)}
                variant="warning"
            >
                Settle Deposit
            </ActionButton>
        )}
    </div>
);

export default NoticeControls;