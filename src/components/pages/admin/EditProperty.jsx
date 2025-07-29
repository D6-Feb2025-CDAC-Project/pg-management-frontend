import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const mockProperties = [
  {
    roomNo: "101",
    type: "Single",
    floor: "1st",
    rent: "₹10,000",
    capacity: 1,
    occupied: 0,
    facilities: "AC, Attach Bathroom",
  },
  {
    roomNo: "102",
    type: "Double",
    floor: "1st",
    rent: "₹15,000",
    capacity: 2,
    occupied: 2,
    facilities: "AC, Attach Bathroom",
  },
  {
    roomNo: "201",
    type: "Single",
    floor: "2nd",
    rent: "₹12,000",
    capacity: 1,
    occupied: 1,
    facilities: "AC, Shared Bathroom",
  },
];

export default function EditProperty() {
  const { roomNo } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomNo: "",
    type: "",
    floor: "",
    rent: "",
    capacity: 0,
    occupied: 0,
    facilities: "",
  });

  
  useEffect(() => {
    const found = mockProperties.find((p) => p.roomNo === roomNo);
    if (found) {
      setFormData(found);
    } else {
      alert("Property not found!");
      navigate("/admin/properties");
    }
  }, [roomNo, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    const newValue = ["capacity", "occupied"].includes(name)
      ? parseInt(value, 10)
      : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Updated property:", formData);
    alert("Property updated successfully!");
    navigate("/admin/properties");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Edit Property – Room {roomNo}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Room No</label>
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              disabled
            />
          </div>

          <div>
            <label className="block font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
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
            />
          </div>

          <div>
            <label className="block font-medium">Rent</label>
            <input
              type="text"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Occupied</label>
            <input
              type="number"
              name="occupied"
              value={formData.occupied}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Facilities</label>
            <input
              type="text"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/properties")}
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
