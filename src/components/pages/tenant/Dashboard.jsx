import React from 'react';

function Dashboard() {
    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            {/* Welcome Section */}
            <div className="bg-blue-100 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    Welcome back, John Doe!
                </h2>
                <p className="text-gray-600 text-sm">
                    Room 205, Double Room, 2nd Floor
                </p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Rent Status */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                        Rent Status
                    </h3>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                        Paid
                    </div>
                    <p className="text-sm text-gray-500">
                        Next due: 01/05/2025
                    </p>
                </div>

                {/* Complaints */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                        Complaints
                    </h3>
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                        1 Active
                    </div>
                    <p className="text-sm text-gray-500">
                        2 Resolved
                    </p>
                </div>

                {/* Tenancy */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                        Tenancy
                    </h3>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                        4 months
                    </div>
                    <p className="text-sm text-gray-500">
                        Started: 01/01/2025
                    </p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Recent Activity
                </h3>

                <div className="space-y-4">
                    {/* Activity Item 1 */}
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">
                            Rent paid for April 2025
                        </span>
                        <span className="text-sm text-gray-500">
                            27 Apr 2025
                        </span>
                    </div>

                    {/* Activity Item 2 */}
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">
                            Maintenance request for AC repair - Completed
                        </span>
                        <span className="text-sm text-gray-500">
                            20 Apr 2025
                        </span>
                    </div>

                    {/* Activity Item 3 */}
                    <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">
                            Complaint about water pressure - In Progress
                        </span>
                        <span className="text-sm text-gray-500">
                            15 Apr 2025
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
