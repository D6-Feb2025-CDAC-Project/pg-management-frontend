import React, { useState } from "react";
import { FaEye, FaDownload } from "react-icons/fa"; // 👈 Import icons

const PendingBookings = ({ onBack }) => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      tenant: "John Doe",
      room: "Room 101",
      date: "2025-07-30",
      status: "Pending",
    },
    {
      id: 2,
      tenant: "Priya Sharma",
      room: "Room 205",
      date: "2025-07-31",
      status: "Pending",
    },
    {
      id: 3,
      tenant: "Amit Verma",
      room: "Room 307",
      date: "2025-08-01",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleViewDocument = (id) => {
    alert(`Viewing document for booking ID ${id}`);
  };

  const handleDownloadDocument = (id) => {
    alert(`Downloading document for booking ID ${id}`);
  };

  return (
    <div className="p-10 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Pending Booking Requests</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No pending booking requests.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Tenant Name</th>
              <th className="p-2 border">Room</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="p-2 border">{booking.tenant}</td>
                <td className="p-2 border">{booking.room}</td>
                <td className="p-2 border">{booking.date}</td>
                <td className="p-2 border">{booking.status}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    className=" text-purpleDark px-3 py-1 rounded hover:bg-purpleLight"
                    onClick={() => handleViewDocument(booking.id)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className=" text-blue-900 px-3 py-1 rounded hover:bg-purpleLight"
                    onClick={() => handleDownloadDocument(booking.id)}
                  >
                    <FaDownload />
                  </button>

                  {booking.status === "Pending" && (
                    <>
                      <button
                        className="approve-button"
                        onClick={() => updateStatus(booking.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => updateStatus(booking.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingBookings;
