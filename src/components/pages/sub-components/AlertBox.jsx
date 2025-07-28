// Reusable Alert Box Component
const AlertBox = ({ type = "warning", children }) => {
  const alertStyles = {
    warning: "bg-yellow-50 border border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border border-blue-200 text-blue-800",
    success: "bg-green-50 border border-green-200 text-green-800"
  };

  return (
    <div className={`${alertStyles[type]} text-sm rounded-xl p-5`}>
      {children}
    </div>
  );
};

export default AlertBox;