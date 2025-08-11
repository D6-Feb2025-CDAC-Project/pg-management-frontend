import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PropertiesListPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [floorFilter, setFloorFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const token = useSelector((state) => state.auth.token);

  const fetchRooms = async () => {
    const res = await fetch(`${API_BASE_URL}/rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const data = await res.json();
    setRooms(data.filter((room) => !room.hidden));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleHideRoom = async (roomId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/hide`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (response.ok) {
        toast.success("Room hidden successfully");
        fetchRooms();
      } else {
        toast.error("Failed to hide room");
      }
    } catch (error) {
      console.error("Error hiding room:", error);
      toast.error("Something went wrong.");
    }
  };

  const filtered = rooms
    .filter(
      (p) =>
        p.roomNo.includes(search) ||
        p.roomType.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => floorFilter === "All" || p.floor === floorFilter)
    .sort((a, b) =>
      sortAsc ? a.rentAmount - b.rentAmount : b.rentAmount - a.rentAmount
    );

  return (
    <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-purpleDark mb-6 text-center">
        Rooms
      </h2>

      <div className="flex justify-end mb-5">
        <button
          onClick={() => navigate("/admin/add-property")}
          className="bg-purpleDark text-white px-4 py-2 rounded"
        >
          + Add New Room
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search rooms…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-auto flex-grow border px-3 py-2 rounded"
        />

        {/* <select
          value={floorFilter}
          onChange={(e) => setFloorFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="All">All Floors</option>
          <option value="Ground">Ground Floor</option>
          <option value="First">First Floor</option>
          <option value="Second">Second Floor</option>
          <option value="Third">Third Floor</option>
        </select> */}

        <button
          className="px-4 py-2 border rounded bg-white"
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Sort by Rent {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      <div className="overflow-x-auto bg-white border rounded-lg">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-purpleDarkScale-200">
              <th className="p-2 border">Room No.</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Floor</th>
              <th className="p-2 border">Rent</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Facilities</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((room) => {
              return (
                <tr key={room.id}>
                  <td className="p-2 border">{room.roomNo}</td>
                  <td className="p-2 border">{room.roomType}</td>
                  <td className="p-2 border">{room.floor}</td>
                  <td className="p-2 border">₹{room.rentAmount}</td>
                  <td className="p-2 border space-x-1">
                    <button className="bg-green-200 text-green-900 text-xs px-2 py-1 rounded">
                      Vacant: {room.maxOccupancy - room.currentOccupancy}
                    </button>
                    <button className="bg-red-200 text-red-900 text-xs px-2 py-1 rounded">
                      Occupied: {room.currentOccupancy}
                    </button>
                  </td>
                  <td className="p-2 border">
                    {room.facilities.map((f) => f.name).join(", ")}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-property/${room.id}`)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleHideRoom(room.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Hide
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
