// Control Buttons Component
const ComplaintControls = ({
    complaint,
    onStatusChange,
    onPriorityChange,
    onAddAction
}) => (
    <div className="flex flex-col gap-2 min-w-fit">
        <div className="flex gap-2">
            <select
                value={complaint.status}
                onChange={(e) => onStatusChange(complaint.id, e.target.value)}
                className="text-xs border border-purpleDarkScale-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
            >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
            </select>

            <select
                value={complaint.priority}
                onChange={(e) => onPriorityChange(complaint.id, e.target.value)}
                className="text-xs border border-purpleDarkScale-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </div>

        <button
            onClick={() => onAddAction(complaint.id)}
            className="text-xs bg-purpleDark text-white px-3 py-1 rounded hover:bg-purpleDarkScale-600 transition"
        >
            Add Action
        </button>
    </div>
);

export default ComplaintControls;