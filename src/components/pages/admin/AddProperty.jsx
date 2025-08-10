import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [facilitiesList, setFacilitiesList] = useState([
    { name: "AC", category: "Cooling", isChecked: false },
    { name: "Attached Bathroom", category: "Bathroom", isChecked: false },
    { name: "Study Table", category: "Furniture", isChecked: false },
    { name: "Hot Water", category: "Utility", isChecked: false },
  ]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomNo: "",
    roomType: "",
    tenantType: "",
    floor: "",
    rentAmount: "",
    maxOccupancy: "",
    currentOccupancy: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [photos, setPhotos] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityChange = (index) => {
    setFacilitiesList((prev) =>
      prev.map((f, i) => (i === index ? { ...f, isChecked: !f.isChecked } : f))
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      const selectedFacilities = facilitiesList
        .filter((f) => f.isChecked)
        .map((f) => ({
          name: f.name,
          category: f.category,
        }));

      console.log("Selected facilities:", selectedFacilities); // Debug log

      // Add the room JSON
      formDataToSend.append(
        "room",
        new Blob(
          [
            JSON.stringify({
              ...formData,
              rentAmount: Number(formData.rentAmount),
              maxOccupancy: Number(formData.maxOccupancy),
              currentOccupancy: Number(formData.currentOccupancy),
              facilities: selectedFacilities,
            }),
          ],
          { type: "application/json" }
        )
      );

      // Append a single image
      if (selectedFile) {
        formDataToSend.append("image", selectedFile);
      }

      const response = await axios.post(
        `${API_BASE_URL}/rooms`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      console.log("Room added:", response.data);
      toast.success("Room added successfully!");

      setFormData({
        roomNo: "",
        roomType: "",
        tenantType: "",
        floor: "",
        rentAmount: "",
        maxOccupancy: "",
        currentOccupancy: "",
      });
      setFacilitiesList((prev) =>
        prev.map((f) => ({ ...f, isChecked: false }))
      );
      setSelectedFile(null);
      setPhotos([]);
      navigate("/admin/rooms");
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);

      if (err.response?.data) {
        toast.error(`Error: ${err.response.data.message || err.response.data}`);
      } else {
        toast.error("Error adding room. Check console for details.");
      }
    }
  };

  return (
    <div className="p-6 bg-purple-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Add New Room</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Room Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Number */}
          <div>
            <label className="block font-medium mb-1">Room Number*</label>
            <input
              type="text"
              name="roomNo"
              value={formData.roomNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block font-medium mb-1">Room Type*</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Room Type</option>
              <option value="SINGLE_SHARING">Single</option>
              <option value="DOUBLE_SHARING">Double</option>
              <option value="THREE_SHARING">Triple</option>
            </select>
          </div>

          {/* Max Occupancy */}
          <div>
            <label className="block font-medium mb-1">Max Occupancy*</label>
            <input
              type="number"
              name="maxOccupancy"
              value={formData.maxOccupancy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Floor */}
          <div>
            <label className="block font-medium mb-1">Floor*</label>
            <select
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Floor</option>
              <option value="Ground">Ground</option>
              <option value="First">First</option>
              <option value="Second">Second</option>
            </select>
          </div>

          {/* Tenant Type */}
          <div>
            <label className="block font-medium mb-1">Tenant Type*</label>
            <select
              name="tenantType"
              value={formData.tenantType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Tenant Type</option>
              <option value="FEMALE_ONLY">Female Only</option>
              <option value="MALE_ONLY">Male Only</option>
              <option value="UNISEX">Unisex</option>
            </select>
          </div>

          {/* Monthly Rent */}
          <div>
            <label className="block font-medium mb-1">Monthly Rent (₹)*</label>
            <input
              type="number"
              name="rentAmount"
              value={formData.rentAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Current Occupancy */}
          <div>
            <label className="block font-medium mb-1">Current Occupancy</label>
            <input
              type="number"
              name="currentOccupancy"
              value={formData.currentOccupancy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              min="0"
            />
          </div>

          {/* Facilities */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Facilities</label>
            <div className="flex flex-wrap gap-4">
              {facilitiesList.map((facility, index) => (
                <label key={index} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={facility.isChecked}
                    onChange={() => handleFacilityChange(index)}
                    className="h-4 w-4"
                  />
                  {facility.name}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Room Photos */}
        <div className="mt-6">
          <label className="block font-medium mb-2">Room Photos</label>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Upload Room Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {selectedFile && (
              <p className="text-sm text-green-600 mt-1">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            id="photo-upload"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Previews */}
          {photos.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(photo)}
                  alt={`Photo ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-8 gap-4">
          <button
            type="button"
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            onClick={() => {
              // Reset form
              setFormData({
                roomNo: "",
                roomType: "",
                tenantType: "",
                floor: "",
                rentAmount: "",
                maxOccupancy: "",
                currentOccupancy: "",
              });
              setFacilitiesList((prev) =>
                prev.map((f) => ({ ...f, isChecked: false }))
              );
              setSelectedFile(null);
              setPhotos([]);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
