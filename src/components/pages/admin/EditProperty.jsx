// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";


// const mockProperties = [
//   {
//     roomNo: "101",
//     type: "Single",
//     floor: "1st",
//     rent: "₹10,000",
//     capacity: 1,
//     occupied: 0,
//     facilities: "AC, Attach Bathroom",
//   },
//   {
//     roomNo: "102",
//     type: "Double",
//     floor: "1st",
//     rent: "₹15,000",
//     capacity: 2,
//     occupied: 2,
//     facilities: "AC, Attach Bathroom",
//   },
//   {
//     roomNo: "201",
//     type: "Single",
//     floor: "2nd",
//     rent: "₹12,000",
//     capacity: 1,
//     occupied: 1,
//     facilities: "AC, Shared Bathroom",
//   },
// ];

// export default function EditProperty() {
//   const { roomNo } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     roomNo: "",
//     type: "",
//     floor: "",
//     rent: "",
//     capacity: 0,
//     occupied: 0,
//     facilities: "",
//   });

  
//   useEffect(() => {
//     const found = mockProperties.find((p) => p.roomNo === roomNo);
//     if (found) {
//       setFormData(found);
//     } else {
//       alert("Property not found!");
//       navigate("/admin/rooms");
//     }
//   }, [roomNo, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

    
//     const newValue = ["capacity", "occupied"].includes(name)
//       ? parseInt(value, 10)
//       : value;

//     setFormData((prev) => ({ ...prev, [name]: newValue }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
   
//   //   console.log("Updated property:", formData);
//   //   alert("Property updated successfully!");
//   //   navigate("/admin/rooms");
//   // };
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const updatedRoom = {
//       ...formData,
//       facilities: formData.facilities.split(",").map(f => f.trim()) // convert string to list
//     };

//     await axios.put(`http://localhost:8080/rooms/${roomNo}`, updatedRoom);

//     alert("Room updated successfully!");
//     navigate("/admin/rooms");
//   } catch (error) {
//     console.error("Error updating room:", error);
//     alert("Failed to update room.");
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-semibold mb-4">Edit Room {roomNo}</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium">Room No</label>
//             <input
//               type="text"
//               name="roomNo"
//               value={formData.roomNo}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               disabled
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Type</label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             >
//               <option value="">Select Type</option>
//               <option value="Single">Single</option>
//               <option value="Double">Double</option>
//               <option value="Triple">Triple</option>
//             </select>
//           </div>

//           <div>
//             <label className="block font-medium">Floor</label>
//             <input
//               type="text"
//               name="floor"
//               value={formData.floor}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Rent</label>
//             <input
//               type="text"
//               name="rent"
//               value={formData.rent}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Capacity</label>
//             <input
//               type="number"
//               name="capacity"
//               value={formData.capacity}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Occupied</label>
//             <input
//               type="number"
//               name="occupied"
//               value={formData.occupied}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Facilities</label>
//             <input
//               type="text"
//               name="facilities"
//               value={formData.facilities}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div className="flex justify-between mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Save Changes
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate("/admin/rooms")}
//               className="px-4 py-2 border rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function EditProperty() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     roomNo: "",
//     roomType: "",
//     floor: "",
//     rentAmount: 0,
//     maxOccupancy: 0,
//     currentOccupancy: 0,
//     tenantType: "",
//     facilities: "",
//   });

//   const fetchRoomDetails = async () => {
//     try {
//       console.log(id);
//       const response = await axios.get(`http://localhost:8080/rooms/${id}`);
//       const room = response.data;

//       setFormData({
//         roomNo: room.roomNo,
//         roomType: room.roomType,
//         floor: room.floor,
//         rentAmount: room.rentAmount,
//         maxOccupancy: room.maxOccupancy,
//         currentOccupancy: room.currentOccupancy,
//         tenantType: room.tenantType,
//         facilities: room.facilities.map(f => f.name).join(", "), // converting List<Facility> to comma string
//       });
//     } catch (error) {
//       console.error("Failed to fetch room details:", error);
//       alert("Room not found!");
//       navigate("/admin/rooms");
//     }
//   };

//   useEffect(() => {
//     fetchRoomDetails();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const updatedRoom = {
//         ...formData,
//         facilities: formData.facilities.split(",").map(f => f.trim()),
//       };

//       await axios.put(`http://localhost:8080/rooms/${id}`, updatedRoom);
//       alert("Room updated successfully!");
//       navigate("/admin/rooms");
//     } catch (error) {
//       console.error("Error updating room:", error);
//       alert("Failed to update room.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//         <h2 className="text-2xl font-semibold mb-4">Edit Room {id}</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium">Room No</label>
//             <input
//               type="text"
//               name="roomNo"
//               value={formData.roomNo}
//               disabled
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Room Type</label>
//             <select
//               name="roomType"
//               value={formData.roomType}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             >
//               <option value="">Select Type</option>
//               <option value="SINGLE_SHARING">Single</option>
//               <option value="DOUBLE_SHARING">Double</option>
//               <option value="TRIPLE_SHARING">Triple</option>
//             </select>
//           </div>

//           <div>
//             <label className="block font-medium">Tenant Type</label>
//             <select
//               name="tenantType"
//               value={formData.tenantType}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             >
//               <option value="">Select</option>
//               <option value="MALE_ONLY">Male Only</option>
//               <option value="FEMALE_ONLY">Female Only</option>
//               <option value="UNISEX">Unisex</option>
//             </select>
//           </div>

//           <div>
//             <label className="block font-medium">Floor</label>
//             <input
//               type="text"
//               name="floor"
//               value={formData.floor}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Rent Amount</label>
//             <input
//               type="number"
//               name="rentAmount"
//               value={formData.rentAmount}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Max Occupancy</label>
//             <input
//               type="number"
//               name="maxOccupancy"
//               value={formData.maxOccupancy}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Current Occupancy</label>
//             <input
//               type="number"
//               name="currentOccupancy"
//               value={formData.currentOccupancy}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Facilities (comma separated)</label>
//             <input
//               type="text"
//               name="facilities"
//               value={formData.facilities}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div className="flex justify-between mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Save Changes
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate("/admin/rooms")}
//               className="px-4 py-2 border rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
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
    // Only fetch if ID exists
    if (id) {
      fetchRoomDetails();
    } else {
      console.error("No room ID in URL parameters");
      alert("Invalid room ID. Please select a room to edit.");
      navigate("/admin/rooms");
    }
  }, [id]); // Added dependency to useEffect


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


  

  // Show loading state while fetching data
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

          {/* <div>
            <label className="block font-medium">Facilities (comma separated)</label>
            <input
              type="text"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g., WiFi, AC, Parking"
            />
          </div> */}

          
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