import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomNo: "",
    roomType: "",
    floor: "",
    rentAmount: 0,
    maxOccupancy: 0,
    currentOccupancy: 0,
    tenantType: "",
    facilities: "",
  });

  const [loading, setLoading] = useState(true);

 const fetchRoomDetails = async () => {
  try {
    console.log("Room ID:", id);

    if (!id) {
      console.error("No room ID provided in URL parameters");
      alert("Invalid room ID. Redirecting to rooms list.");
      navigate("/admin/rooms");
      return;
    }

    setLoading(true);
    const response = await axios.get(`http://localhost:8080/rooms/${id}`);
    const room = response.data;

    setFormData({
      roomNo: room.roomNo,
      roomType: room.roomType,
      floor: room.floor,
      rentAmount: room.rentAmount,
      maxOccupancy: room.maxOccupancy,
      currentOccupancy: room.currentOccupancy,
      tenantType: room.tenantType,
      facilities: Array.isArray(room.facilities)
        ? room.facilities.map(f => ({
            name: f.name || f,
            category: f.category || "General",
          }))
        : [],
    });

    setLoading(false);
  } catch (error) {
    console.error("Failed to fetch room details:", error);
    setLoading(false);
    alert("Room not found or server error!");
    navigate("/admin/rooms");
  }
};


  useEffect(() => {
    
    if (id) {
      fetchRoomDetails();
    } else {
      console.error("No room ID in URL parameters");
      alert("Invalid room ID. Please select a room to edit.");
      navigate("/admin/rooms");
    }
  }, [id]); 


   const facilityOptions = [
    { name: "Wi-Fi", category: "Internet" },
    { name: "AC", category: "Comfort" },
    { name: "Geyser", category: "Utility" },
    { name: "Study Table", category: "Furniture" },
    { name: "Attached Bathroom", category: "Essential" },
    { name: "Cupboard", category: "Storage" },
    { name: "Fan", category: "Essential" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityToggle = (facility) => {
    setFormData((prev) => {
      const exists = prev.facilities.some((f) => f.name === facility.name);
      const updatedFacilities = exists
        ? prev.facilities.filter((f) => f.name !== facility.name)
        : [...prev.facilities, facility];
      return { ...prev, facilities: updatedFacilities };
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!id) {
    alert("Invalid room ID. Cannot update room.");
    return;
  }

  try {
    const updatedRoom = {
      ...formData,
      facilities: formData.facilities.map((f) => ({
        name: f.name,
        category: f.category || "General",
      })),
    };

    await axios.put(`http://localhost:8080/rooms/${id}`, updatedRoom);
    alert("Room updated successfully!");
    navigate("/admin/rooms");
  } catch (error) {
    console.error("Error updating room:", error);
    alert("Failed to update room. Please try again.");
  }
};


  

  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl">Loading room details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">
          Edit Room {id || "Unknown"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Room No</label>
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              disabled
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Room Type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="SINGLE_SHARING">Single</option>
              <option value="DOUBLE_SHARING">Double</option>
              <option value="TRIPLE_SHARING">Triple</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Tenant Type</label>
            <select
              name="tenantType"
              value={formData.tenantType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select</option>
              <option value="MALE_ONLY">Male Only</option>
              <option value="FEMALE_ONLY">Female Only</option>
              <option value="UNISEX">Unisex</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Floor</label>
            <input
              type="text"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Rent Amount</label>
            <input
              type="number"
              name="rentAmount"
              value={formData.rentAmount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Max Occupancy</label>
            <input
              type="number"
              name="maxOccupancy"
              value={formData.maxOccupancy}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Current Occupancy</label>
            <input
              type="number"
              name="currentOccupancy"
              value={formData.currentOccupancy}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              min="0"
              max={formData.maxOccupancy}
            />
          </div>


          
        <div className="mt-4">
          <label className="block font-semibold mb-2">Facilities:</label>
          <div className="flex flex-wrap gap-2">
            {facilityOptions.map((facility) => (
              <label key={facility.name} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={formData.facilities.some(
                    (f) => f.name === facility.name
                  )}
                  onChange={() => handleFacilityToggle(facility)}
                />
                <span>{facility.name}</span>
              </label>
            ))}
          </div>
        </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={!id}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/rooms")}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}