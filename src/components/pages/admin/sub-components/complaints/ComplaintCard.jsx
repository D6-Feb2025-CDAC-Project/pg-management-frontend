import ActionForm from "./ActionForm";
import ComplaintControls from "./ComplaintControls";
import ComplaintDetails from "./ComplaintDetails";

// Main Complaint Card Component
const ComplaintCard = ({
    complaint,
    selectedComplaint,
    actionText,
    setActionText,
    onStatusChange,
    onPriorityChange,
    onAddAction,
    onActionSubmit,
    onActionCancel
}) => (
    <div className="bg-white border rounded-xl shadow p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <ComplaintDetails complaint={complaint} />
            <ComplaintControls
                complaint={complaint}
                onStatusChange={onStatusChange}
                onPriorityChange={onPriorityChange}
                onAddAction={onAddAction}
            />
        </div>

        {selectedComplaint === complaint.id && (
            <ActionForm
                actionText={actionText}
                setActionText={setActionText}
                onSubmit={() => onActionSubmit(complaint.id)}
                onCancel={onActionCancel}
            />
        )}
    </div>
);

export default ComplaintCard;