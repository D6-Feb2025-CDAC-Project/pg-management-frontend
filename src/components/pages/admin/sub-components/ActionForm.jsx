// Action Form Component
const ActionForm = ({
    actionText,
    setActionText,
    onSubmit,
    onCancel
}) => (
    <div className="mt-4 pt-4 border-t border-purpleDarkScale-200">
        <textarea
            value={actionText}
            onChange={(e) => setActionText(e.target.value)}
            placeholder="Describe the action taken or planned..."
            rows="3"
            className="w-full px-3 py-2 border border-purpleDarkScale-300 rounded focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400 resize-none text-sm"
        />
        <div className="flex gap-2 mt-2">
            <button
                onClick={onSubmit}
                className="text-sm bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
            >
                Save Action
            </button>
            <button
                onClick={onCancel}
                className="text-sm bg-purpleDarkScale-400 text-white px-4 py-1 rounded hover:bg-purpleDarkScale-500 transition"
            >
                Cancel
            </button>
        </div>
    </div>
);

export default ActionForm;