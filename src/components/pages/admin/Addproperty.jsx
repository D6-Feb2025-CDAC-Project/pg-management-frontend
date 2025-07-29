import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    floor: "",
    rent: "",
    roomSize: "",
    maxOccupancy: "",
    facilities: {
      ac: false,
      attachedBathroom: false,
      studyTable: false,
      hotWater: false,
    },
    status: "",
    photos: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (["ac", "attachedBathroom", "studyTable", "hotWater"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        facilities: {
          ...prev.facilities,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // TODO: Send data to backend
    alert("Property Added!");
    navigate("/admin/properties"); // redirect to properties list
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Property</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg p-6 shadow"
      >
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Room Number*</label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Room Size (sq.ft)</label>
            <input
              type="text"
              name="roomSize"
              value={formData.roomSize}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Room Type*</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Room Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Max Occupancy*</label>
            <input
              type="number"
              name="maxOccupancy"
              value={formData.maxOccupancy}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-1 font-semibold">Floor*</label>
            <select
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Floor</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Monthly Rent (₹)*</label>
            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Facilities</label>
          <div className="grid grid-cols-2 gap-4">
            <label>
              <input
                type="checkbox"
                name="ac"
                checked={formData.facilities.ac}
                onChange={handleChange}
                className="mr-2"
              />
              AC
            </label>
            <label>
              <input
                type="checkbox"
                name="attachedBathroom"
                checked={formData.facilities.attachedBathroom}
                onChange={handleChange}
                className="mr-2"
              />
              Attached Bathroom
            </label>
            <label>
              <input
                type="checkbox"
                name="studyTable"
                checked={formData.facilities.studyTable}
                onChange={handleChange}
                className="mr-2"
              />
              Study Table
            </label>
            <label>
              <input
                type="checkbox"
                name="hotWater"
                checked={formData.facilities.hotWater}
                onChange={handleChange}
                className="mr-2"
              />
              Hot Water
            </label>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Status*</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="Vacant">Vacant</option>
            <option value="Partially Occupied">Partially Occupied</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>

        {/* Photos */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Room Photos (URL)</label>
          <input
            type="text"
            name="photos"
            value={formData.photos}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/properties")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
