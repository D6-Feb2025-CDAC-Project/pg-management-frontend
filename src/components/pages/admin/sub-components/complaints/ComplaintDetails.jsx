import PriorityBadge from "../../../sub-components/PriorityBadge";
import StatusBadge from "../../../sub-components/StatusBadge";

// Complaint Details Component
const ComplaintDetails = ({ complaint }) => (
    <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-purpleDark">{complaint.title}</h3>
            <StatusBadge status={complaint.status} />
            <PriorityBadge priority={complaint.priority} />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div>
                {complaint.tenantName && (
                    <>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-purpleDark">Tenant:</span> {complaint.tenantName} ({complaint.tenantId})
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-purpleDark">Apartment:</span> {complaint.apartment}
                        </p>
                    </>
                )}
                <p className="text-sm text-gray-600">
                    <span className="font-medium text-purpleDark">Date:</span> {complaint.date}
                </p>
            </div>
            {complaint.resolvedDate && (
                <div>
                    <p className="text-sm text-gray-600">
                        <span className="font-medium text-purpleDark">Resolved on:</span> {complaint.resolvedDate}
                    </p>
                    {/* <p className="text-sm text-gray-600">
                        <span className="font-medium text-purpleDark">Resolved by:</span> {complaint.resolvedBy}
                    </p> */}
                </div>
            )}
        </div>

        <p className="text-sm text-gray-700 mb-3 bg-purpleDarkScale-50 p-3 rounded border border-purpleDarkScale-200">
            <span className="font-medium text-purpleDark">Issue:</span> {complaint.issue}
        </p>

        {complaint.actionTaken && (
            <p className="text-sm text-gray-700 mb-3 bg-purpleDarkScale-100 p-3 rounded border border-purpleDarkScale-300">
                <span className="font-medium text-purpleDark">Action Taken:</span> {complaint.actionTaken}
            </p>
        )}
    </div>
);

export default ComplaintDetails;
