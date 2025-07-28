const FilterControls = ({
    filterStatus,
    setFilterStatus,
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
                    <option value="Pending Review">Pending Review</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div>
                <label className="text-sm font-medium text-purpleDark mr-2">Sort by:</label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-purpleDarkScale-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
                >
                    <option value="date">Submission Date</option>
                    <option value="moveOutDate">Move-out Date</option>
                    <option value="status">Status</option>
                </select>
            </div>
        </div>
    </div>
);

export default FilterControls;