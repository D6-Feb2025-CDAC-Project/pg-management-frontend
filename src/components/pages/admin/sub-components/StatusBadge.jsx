// Reusable Status Badge Component
const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved':
                return 'bg-green-500 text-white';
            case 'In Progress':
                return 'bg-purpleDark text-white';
            case 'Pending':
                return 'bg-yellow-400 text-black';
            default:
                return 'bg-gray-400 text-white';
        }
    };

    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
            {status}
        </span>
    );
};

export default StatusBadge;