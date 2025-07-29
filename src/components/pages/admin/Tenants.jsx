import React, { useState } from "react";

const dummyTenants = [
  {
    name: "John Doe",
    room: "205 (Double)",
    tenure: "4 months",
    rentStatus: "Paid",
    complaints: "3 (1 Active)",
  },
  {
    name: "Jane Smith",
    room: "101 (Single)",
    tenure: "7 months",
    rentStatus: "Due",
    complaints: "1 (0 Active)",
  },
  {
    name: "Robert Johnson",
    room: "308 (Triple)",
    tenure: "2 months",
    rentStatus: "Overdue",
    complaints: "5 (2 Active)",
  },
  {
    name: "Sarah Williams",
    room: "210 (Double)",
    tenure: "1 month",
    rentStatus: "Paid",
    complaints: "0 (0 Active)",
  },
  {
    name: "Michael Brown",
    room: "105 (Single)",
    tenure: "8 months",
    rentStatus: "Paid",
    complaints: "7 (0 Active)",
  },
];

export default function Tenants() {
  const [actionIndex, setActionIndex] = useState(null);

  const getRentStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-500";
      case "Due":
        return "bg-yellow-400";
      case "Overdue":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold  mb-6">
      Tenants 
      </h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, room number, or mobile..."
          className="border p-2 rounded w-1/3"
        />

        <div className="flex gap-2 items-center">
          <button className="border px-3 py-2 rounded">Filter ▼</button>
          <button className="bg-blue-500 text-white px-3 py-2 rounded">
            Export Data
          </button>
        </div>
      </div>

      <table className="w-full table-auto border shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Room</th>
            <th className="border px-4 py-2 text-left">Tenure</th>
            <th className="border px-4 py-2 text-left">Rent Status</th>
            <th className="border px-4 py-2 text-left">Complaints</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyTenants.map((tenant, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{tenant.name}</td>
              <td className="border px-4 py-2">{tenant.room}</td>
              <td className="border px-4 py-2">{tenant.tenure}</td>
              <td className="border px-4 py-2">
                <span
                  className={`text-white text-sm px-2 py-1 rounded ${getRentStatusColor(
                    tenant.rentStatus
                  )}`}
                >
                  {tenant.rentStatus}
                </span>
              </td>
              <td className="border px-4 py-2">{tenant.complaints}</td>
              <td className="border px-4 py-2 relative">
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm mr-2">
                  View
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() =>
                    setActionIndex(actionIndex === index ? null : index)
                  }
                >
                  Action
                </button>

                {actionIndex === index && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md border rounded z-10">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Send Reminder
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Call Tenant
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                      Deactivate
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="flex justify-between items-center mt-6">
        <p className="text-sm">Showing 1-5 of 12 tenants</p>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">Next →</button>
        </div>
      </div> */}
    </div>
  );
}
