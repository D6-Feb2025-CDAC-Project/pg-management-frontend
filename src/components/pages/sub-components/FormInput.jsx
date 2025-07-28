// Reusable Form Input Component
const FormInput = ({
    label,
    type = "text",
    value,
    onChange,
    required = false,
    placeholder = "",
    min = "",
    children,
    className = ""
}) => (
    <div className={className}>
        <label className="block font-medium text-gray-600 mb-2">{label}</label>
        {type === "select" ? (
            <select
                className="w-full border border-purpleDarkScale-300 px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400 focus:border-transparent"
                value={value}
                onChange={onChange}
                required={required}
            >
                {children}
            </select>
        ) : type === "textarea" ? (
            <textarea
                className="w-full border border-purpleDarkScale-300 px-4 py-3 rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400 focus:border-transparent resize-none"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        ) : (
            <input
                type={type}
                className="w-full border border-purpleDarkScale-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400 focus:border-transparent"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                min={min}
            />
        )}
    </div>
);

export default FormInput;