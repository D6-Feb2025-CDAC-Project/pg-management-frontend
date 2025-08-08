import InfoDisplay from "../../../sub-components/InfoDisplay";
import StatusBadge from "../../../sub-components/StatusBadge";

const NoticeDetails = ({ notice }) => (
    <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-purpleDark">{notice.tenantName}</h3>
            <StatusBadge status={notice.status} />
            <span className="px-2 py-1 text-xs font-medium rounded border bg-purpleDarkScale-100 text-purpleDark border-purpleDarkScale-300">
                {notice.referenceId}
            </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div>
                <InfoDisplay label="Tenant ID" value={notice.tenantId} />
                <InfoDisplay label="Room" value={notice.roomNumber} />
                <InfoDisplay label="Submission Date" value={notice.submissionDate} />
                <InfoDisplay label="Move-out Date" value={notice.moveOutDate} />
            </div>
            <div>
                <InfoDisplay label="Reason" value={notice.reasonText} />
                <InfoDisplay label="Contact" value={notice.contactNumber} />
                <InfoDisplay label="Email" value={notice.emailAddress} />
                <InfoDisplay label="Security Deposit" value={`₹${notice.securityDeposit}`} />
            </div>
        </div>

        {notice.details && (
            <p className="text-sm text-gray-700 mb-3 bg-purpleDarkScale-50 p-3 rounded border border-purpleDarkScale-200">
                <span className="font-medium text-purpleDark">Additional Details:</span> {notice.details}
            </p>
        )}

        {notice.reviewNotes && (
            <p className="text-sm text-gray-700 mb-3 bg-purpleDarkScale-100 p-3 rounded border border-purpleDarkScale-300">
                <span className="font-medium text-purpleDark">Review Notes:</span> {notice.reviewNotes}
            </p>
        )}

        {/* Settlement Status Display */}
        {notice.status === 'Approved' || notice.status === 'Payment Processing' || notice.status === 'Completed' ? (
            <div className="bg-blue-50 p-3 rounded border border-blue-200 mb-3">
                <h4 className="font-medium text-blue-800 mb-2">Settlement Information</h4>
                <div className="text-sm space-y-1">
                    <div>
                        <span className="font-medium">Status:</span>
                        {notice.settlementGenerated ? (
                            <span className="text-green-600 ml-1">Created</span>
                        ) : (
                            <span className="text-yellow-600 ml-1">Creating...</span>
                        )}
                    </div>
                    {notice.depositSettlement ? (
                        <>
                            <div><span className="font-medium">Deduction:</span> ₹{notice.depositSettlement.deductionAmount}</div>
                            <div><span className="font-medium">Reason:</span> {notice.depositSettlement.deductionReason || 'No deductions'}</div>
                            <div><span className="font-medium">Final Refund:</span> ₹{notice.depositSettlement.finalAmount}</div>
                            {notice.depositSettlement.processedDate && (
                                <div><span className="font-medium">Processed:</span> {notice.depositSettlement.processedDate}</div>
                            )}
                        </>
                    ) : notice.settlementGenerated ? (
                        <div className="text-gray-600">Settlement created, awaiting processing</div>
                    ) : null}
                </div>
            </div>
        ) : null}
    </div>
);

export default NoticeDetails;