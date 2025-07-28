// Reusable Priority Badge Component
const PriorityBadge = ({ priority }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(priority)}`}>
            {priority} Priority
        </span>
    );
};

export default PriorityBadge;