// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import facilitiesList from "../../../assets/constants/facilitiesList";

// const AddProperty = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     roomNumber: "",
//     roomType: "",
//     floor: "",
//     rent: "",
//     roomSize: "",
//     maxOccupancy: "",
//     facilities: {
//       ac: false,
//       attachedBathroom: false,
//       studyTable: false,
//       hotWater: false,
//     },
//     status: "",
//     photos: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (["ac", "attachedBathroom", "studyTable", "hotWater"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         facilities: {
//           ...prev.facilities,
//           [name]: checked,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     // TODO: Send data to backend
//     alert("Property Added!");
//     navigate("/admin/properties"); // redirect to properties list
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">Add New Room</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white border rounded-lg p-6 shadow"
//       >
//         {/* Row 1 */}
//         <div className="grid grid-cols-2 gap-6 mb-4">
//           <div>
//             <label className="block mb-1 font-semibold">Room Number</label>
//             <input
//               type="text"
//               name="roomNumber"
//               value={formData.roomNumber}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">
//               Room Size (sq.ft)
//             </label>
//             <input
//               type="text"
//               name="roomSize"
//               value={formData.roomSize}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="grid grid-cols-1 gap-6 mb-4">
//           <div>
//             <label className="block mb-1 font-semibold">Room Type</label>
//             <select
//               name="roomType"
//               value={formData.roomType}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             >
//               <option value="">Select Room Type</option>
//               <option value="Single">Single</option>
//               <option value="Double">Double</option>
//               <option value="Triple">Triple</option>
//             </select>
//           </div>
//         </div>

//         {/* Row 3 */}
//         <div className="grid grid-cols-2 gap-6 mb-4">
//           <div>
//             <label className="block mb-1 font-semibold">Floor</label>
//             <select
//               name="floor"
//               value={formData.floor}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             >
//               <option value="">Select Floor</option>
//               <option value="1st">1st</option>
//               <option value="2nd">2nd</option>
//               <option value="3rd">3rd</option>
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Monthly Rent (₹)</label>
//             <input
//               type="number"
//               name="rent"
//               value={formData.rent}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>
//         </div>

//         {/* Facilities */}
//         <div className="mb-4">
//           <label className="block mb-4 font-semibold">Facilities</label>

//           {Object.entries(facilitiesList).map(([category, items]) => (
//             <div key={category} className="mb-7">
//               <h4 className="font-semibold capitalize">{category}</h4>
//               <div className="grid grid-cols-2 gap-4 pl-4">
//                 {items.map((facility) => (
//                   <label key={facility}>
//                     <input
//                       type="checkbox"
//                       name={facility}
//                       checked={formData.facilities[facility] || false}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           facilities: {
//                             ...prev.facilities,
//                             [facility]: e.target.checked,
//                           },
//                         }))
//                       }
//                       className="mr-2"
//                     />
//                     {facility}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Status */}
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           >
//             <option value="">Select Status</option>
//             <option value="Vacant">Vacant</option>
//             <option value="Partially Occupied">Partially Occupied</option>
//             <option value="Occupied">Occupied</option>
//           </select>
//         </div>

//         {/* Photos */}
//         <div className="mb-6">
//           <label className="block mb-1 font-semibold">Room Photo</label>
//           <input
//             type="file"
//             accept="image/*"
//             name="photos"
//             onChange={(e) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 photos: e.target.files[0], // store file object
//               }))
//             }
//             className="w-full border px-3 py-2 rounded"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between">
//           <button
//             type="button"
//             onClick={() => navigate("/admin/properties")}
//             className="reject-button"
//           >
//             Cancel
//           </button>
//           <button type="submit" className="approve-button">
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProperty;
// AddProperty.jsx

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AddProperty() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     roomNo: "",
//     roomType: "SINGLE_SHARING",
//     tenantType: "MALE_ONLY",
//     floor: "1st",
//     rentAmount: "",
//     maxOccupancy: "",
//     currentOccupancy: 0,
//     facilities: [],
//   });

//   const facilityOptions = [
//     "Wi-Fi",
//     "AC",
//     "Geyser",
//     "Study Table",
//     "Attached Bathroom",
//     "Cupboard",
//     "Fan",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFacilityToggle = (facility) => {
//     setFormData((prev) => {
//       const facilities = prev.facilities.includes(facility)
//         ? prev.facilities.filter((f) => f !== facility)
//         : [...prev.facilities, facility];
//       return { ...prev, facilities };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:8080/rooms", formData);
//       alert("Room added successfully!");
//       navigate("/admin/rooms");
//     } catch (error) {
//       console.error("Error adding room:", error);
//       alert("Failed to add room. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
//       <h2 className="text-3xl font-bold text-purpleDark mb-6 text-center">
//         Add New Room
//       </h2>

//       <form
//         onSubmit={handleSubmit}
//         className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="roomNo"
//             placeholder="Room Number"
//             value={formData.roomNo}
//             onChange={handleChange}
//             required
//             className="border p-2 rounded"
//           />

//           <select
//             name="roomType"
//             value={formData.roomType}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="SINGLE_SHARING">Single Sharing</option>
//             <option value="DOUBLE_SHARING">Double Sharing</option>
//             <option value="TRIPLE_SHARING">Triple Sharing</option>
//           </select>

//           <select
//             name="tenantType"
//             value={formData.tenantType}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="MALE_ONLY">Male Only</option>
//             <option value="FEMALE_ONLY">Female Only</option>
//             <option value="UNISEX">Unisex</option>
//           </select>

//           <select
//             name="floor"
//             value={formData.floor}
//             onChange={handleChange}
//             className="border p-2 rounded"
//           >
//             <option value="1st">1st Floor</option>
//             <option value="2nd">2nd Floor</option>
//             <option value="3rd">3rd Floor</option>
//           </select>

//           <input
//             type="number"
//             name="rentAmount"
//             placeholder="Rent Amount"
//             value={formData.rentAmount}
//             onChange={handleChange}
//             required
//             className="border p-2 rounded"
//           />

//           <input
//             type="number"
//             name="maxOccupancy"
//             placeholder="Max Occupancy"
//             value={formData.maxOccupancy}
//             onChange={handleChange}
//             required
//             className="border p-2 rounded"
//           />
//         </div>

//         <div className="mt-4">
//           <label className="block font-semibold mb-2">Facilities:</label>
//           <div className="flex flex-wrap gap-2">
//             {facilityOptions.map((facility) => (
//               <label key={facility} className="flex items-center gap-1">
//                 <input
//                   type="checkbox"
//                   checked={formData.facilities.includes(facility)}
//                   onChange={() => handleFacilityToggle(facility)}
//                 />
//                 <span>{facility}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             type="submit"
//             className="bg-purpleDark text-white px-6 py-2 rounded"
//           >
//             Add Room
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomNo: "",
    roomType: "SINGLE_SHARING",
    tenantType: "MALE_ONLY",
    floor: "1st",
    rentAmount: "",
    maxOccupancy: "",
    currentOccupancy: 0,
    facilities: [],
  });

  // Added facilityOptions with default categories
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    try {
      await axios.post("http://localhost:8080/rooms", formData);
      alert("Room added successfully!");
      navigate("/admin/rooms");
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Failed to add room. Please try again.");
    }
  };

  return (
    <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-purpleDark mb-6 text-center">
        Add New Room
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="roomNo"
            placeholder="Room Number"
            value={formData.roomNo}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="SINGLE_SHARING">Single Sharing</option>
            <option value="DOUBLE_SHARING">Double Sharing</option>
            <option value="TRIPLE_SHARING">Triple Sharing</option>
          </select>

          <select
            name="tenantType"
            value={formData.tenantType}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="MALE_ONLY">Male Only</option>
            <option value="FEMALE_ONLY">Female Only</option>
            <option value="UNISEX">Unisex</option>
          </select>

          <select
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="1st">1st Floor</option>
            <option value="2nd">2nd Floor</option>
            <option value="3rd">3rd Floor</option>
          </select>

          <input
            type="number"
            name="rentAmount"
            placeholder="Rent Amount"
            value={formData.rentAmount}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="maxOccupancy"
            placeholder="Max Occupancy"
            value={formData.maxOccupancy}
            onChange={handleChange}
            required
            className="border p-2 rounded"
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

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-purpleDark text-white px-6 py-2 rounded"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
}
