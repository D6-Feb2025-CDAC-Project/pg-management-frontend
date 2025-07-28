const ActionButton = ({ onClick, variant = "primary", children, className = "" }) => {
    const variants = {
        primary: "bg-purpleDark hover:bg-purpleDarkScale-600 text-white",
        secondary: "bg-purpleDarkScale-200 hover:bg-purpleDarkScale-300 text-purpleDark",
        success: "bg-green-600 hover:bg-green-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        warning: "bg-yellow-600 hover:bg-yellow-700 text-white"
    };

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default ActionButton;