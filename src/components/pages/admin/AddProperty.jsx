import React, { useState } from "react";
import axios from "axios";

const AddProperty = () => {
  const [formData, setFormData] = useState({
  roomNo: "",            
  roomType: "",
  tenantType: "",         
  floor: "",
  rentAmount: "",         
  maxOccupancy: "",
  currentOccupancy: "",  
  facilities: [],
  });


  const [selectedFile, setSelectedFile] = useState(null);
  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedFacilities = checked
        ? [...prev.facilities, value]
        : prev.facilities.filter((item) => item !== value);
      return { ...prev, facilities: updatedFacilities };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files]);
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formDataToSend = new FormData();

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
            facilities: formData.facilities.map((name) => ({
              name: name,
              category: "", 
            })),
          }),
        ],
        { type: "application/json" }
      )
    );

    // Append a single image (make sure selectedFile is a File object)
    if (selectedFile) {
      formDataToSend.append("image", selectedFile);
    }

   
    const response = await axios.post("http://localhost:8080/rooms", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Room added:", response.data);
    alert("Room added successfully!");
  } catch (err) {
    console.error("Error adding room:", err);
    alert("Error adding room.");
  }
};

   return (
    <div className="p-6 bg-purple-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Add New Property</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-lg font-semibold mb-4">Property Details</h3>

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


          {/* Monthly Rent */}
          <div>
            <label className="block font-medium mb-1">
              Monthly Rent (₹)*
            </label>
            <input
              type="number"
              name="rentAmount"
              value={formData.rentAmount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status*</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>

          {/* Facilities */}
          <div>
            <label className="block font-medium mb-1">Facilities</label>
            <div className="flex flex-wrap gap-4">
              {["AC", "Attached Bathroom", "Study Table", "Hot Water"].map(
                (facility) => (
                  <label key={facility} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={facility}
                      checked={formData.facilities.includes(facility)}
                      onChange={handleFacilityChange}
                      className="h-4 w-4"
                    />
                    {facility}
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {/* Room Photos */}
        <div className="mt-6">
          <label className="block font-medium mb-2">Room Photos</label>

          <input
            type="file"
            accept="image/*"
            multiple
            id="photo-upload"
            onChange={handleImageUpload}
            className="hidden"
          />

        

            <div>
             <label>Upload Room Image</label>
             <input
             type="file"
             accept="image/*"
             onChange={(e) => setSelectedFile(e.target.files[0])}/>
             </div>


          {/* Previews */}
          <div className="flex flex-wrap gap-3">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={URL.createObjectURL(photo)}
                alt={`Photo ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-8 gap-4">
          <button
            type="button"
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
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


