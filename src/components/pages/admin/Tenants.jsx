  import React, { useState } from "react";

  const dummyTenants = [
    { name: "John Doe", room: "205 (Double)", tenure: "4 months", rentStatus: "Paid", complaints: "3 (1 Active)" },
    { name: "Jane Smith", room: "101 (Single)", tenure: "7 months", rentStatus: "Due", complaints: "1 (0 Active)" },
    { name: "Robert Johnson", room: "308 (Triple)", tenure: "2 months", rentStatus: "Overdue", complaints: "5 (2 Active)" },
    { name: "Sarah Williams", room: "210 (Double)", tenure: "1 month", rentStatus: "Paid", complaints: "0 (0 Active)" },
    { name: "Michael Brown", room: "105 (Single)", tenure: "8 months", rentStatus: "Paid", complaints: "7 (0 Active)" },
  ];

  export default function Tenants() {
    const [searchQuery, setSearchQuery] = useState("");
    const [actionIndex, setActionIndex] = useState(null);

    const getRentStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-700";
      case "Due": return "bg-yellow-100 text-yellow-700";
      case "Overdue": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };



    const filteredTenants = dummyTenants.filter((tenant) => {
      const query = searchQuery.toLowerCase();
      return (
        tenant.name.toLowerCase().includes(query) ||
        tenant.room.toLowerCase().includes(query)
      );
    });

      return (
        <div className="p-6">
        <h1 className="text-3xl font-bold text-purpleDark mb-6">Tenants</h1>
        

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name or room..."
              className="border p-2 rounded w-full sm:w-1/3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

        {filteredTenants.length === 0 ? (
          <div className="text-center text-gray-500">No matching tenants found.</div>
        ) : (
          <div className="space-y-4">
            {filteredTenants.map((tenant, index) => (
              <div
    key={index}
    className="bg-white border border-purple-200 rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
  >
                {/* Fixed-width columns */}
            <div className="flex flex-col w-[60%]">
              <div>
                <p className="text-lg font-semibold text-purple-800">{tenant.name}</p>
      <p className="text-sm text-purple-600">{tenant.room}</p>
              </div>
              <div className="mt-1">
              <p className="text-sm text-purple-700">Tenure: <span className="font-medium">{tenant.tenure}</span></p>
      <p className="text-sm text-purple-700">Complaints: <span className="font-medium">{tenant.complaints}</span></p>
              </div>
            </div>


                <div className="flex items-center gap-2 w-fit ml-auto">
    <span className={`text-sm px-2 py-1 rounded font-semibold ${getRentStatusColor(tenant.rentStatus)}`}>
    {tenant.rentStatus}
  </span>

    <button
      
      className="bg-purpleDark text-white px-3 py-1 rounded text-sm"
    >
      Action
    </button>
  </div>


                
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
