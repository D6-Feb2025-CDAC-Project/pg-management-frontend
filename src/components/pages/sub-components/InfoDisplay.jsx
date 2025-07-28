const InfoDisplay = ({ label, value, className = "" }) => (
    <div className={`flex items-center ${className}`}>
        <span className="w-48 font-medium text-gray-600">{label}:</span>
        <span className="text-gray-700">{value}</span>
    </div >
);

export default InfoDisplay;