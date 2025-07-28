// Reusable Stats Card Component
const StatsCard = ({ title, value, color, bgColor }) => (
    <div className={`bg-white p-4 rounded-xl shadow border-l-4 ${color}`}>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className={`text-2xl font-bold ${bgColor}`}>{value}</p>
    </div>
);

export default StatsCard;