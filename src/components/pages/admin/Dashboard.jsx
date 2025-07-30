import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const earningsData = [
    { month: "Jan", earnings: 30000 },
    { month: "Feb", earnings: 40000 },
    { month: "Mar", earnings: 35000 },
    { month: "Apr", earnings: 50000 },
    { month: "May", earnings: 45000 },
  ];

  const occupancyData = [
    { name: "Occupied", value: 45 },
    { name: "Vacant", value: 15 },
  ];

  const COLORS = ["#1E3A8A", "#93C5FD"];

  const recentActivities = [
    { id: 1, action: "Tenant John paid rent", date: "2025-07-29" },
    { id: 2, action: "New PG Added - Royal Stay", date: "2025-07-28" },
    { id: 3, action: "Complaint resolved for Room 102", date: "2025-07-28" },
    { id: 4, action: "Tenant Priya checked out", date: "2025-07-27" },
  ];

  const grids = [
    // {
    //   title: "Pending Bookings",
    //   value: "4",
    //   nextPage: "/admin/pending-bookings",
    // },
    { title: "Total Tenants", value: "45", nextPage: "/admin/tenants" },
    { title: "Available Rooms", value: "8", nextPage: "/admin/rooms" },
    { title: "Active Complaints", value: "2", nextPage: "/admin/complaints" },
  ];

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">
        Admin Dashboard
      </h1>
      {/* 4 main grids */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {grids.map((grid, index) => (
          <Link key={index} to={grid.nextPage}>
            <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-90 transition">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">
                {grid.title}
              </h2>
              <p className="text-xl font-semibold">{grid.value}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* monthly income chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-6">
            Earnings Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="#6E39A3" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* occupancy chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">
            Occupancy Rate
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={occupancyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {occupancyData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* recent activity */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Recent Activities
        </h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-purpleLight">
              <th className="p-2 border">Action</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id}>
                <td className="p-2 border">{activity.action}</td>
                <td className="p-2 border">{activity.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* quick actions */}
      <div className="bg-white p-6 shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {["Add Room", "View Complaints", "Manage Tenants"].map(
            (action, index) => (
              <button key={index} className="secondary-button">
                {action}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
