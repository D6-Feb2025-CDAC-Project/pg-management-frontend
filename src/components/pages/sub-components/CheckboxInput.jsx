// Reusable Checkbox Component
const CheckboxInput = ({ id, checked, onChange, children }) => (
    <div className="flex items-start gap-3">
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="mt-1 w-4 h-4 text-purpleDark bg-white border-purpleDarkScale-300 rounded focus:ring-purpleDarkScale-400 focus:ring-2"
        />
        <label htmlFor={id} className="text-gray-700 text-sm leading-relaxed">
            {children}
        </label>
    </div>
);

export default CheckboxInput;