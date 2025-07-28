// Reusable Filter Component
const FilterControls = ({
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy
}) => (
    <div className="bg-white p-4 rounded-xl shadow mb-6 max-w-6xl mx-auto border border-purpleDarkScale-300">
        <div className="flex flex-wrap gap-4 items-center">
            <div>
                <label className="text-sm font-medium text-purpleDark mr-2">Status:</label>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-purpleDarkScale-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>

            <div>
                <label className="text-sm font-medium text-purpleDark mr-2">Priority:</label>
                <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="border border-purpleDarkScale-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
                >
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div>
                <label className="text-sm font-medium text-purpleDark mr-2">Sort by:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-purpleDarkScale-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
                >
                    <option value="date">Date</option>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                </select>
            </div>
        </div>
    </div>
);

export default FilterControls;