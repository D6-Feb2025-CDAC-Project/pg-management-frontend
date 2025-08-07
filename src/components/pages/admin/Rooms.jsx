// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const properties = [
//   {
//     roomNo: "101",
//     type: "Single",
//     floor: "1st",
//     rent: 10000,
//     capacity: 1,
//     occupied: 0,
//     facilities: "AC, Attach Bathroom",
//   },
//   {
//     roomNo: "102",
//     type: "Double",
//     floor: "1st",
//     rent: 15000,
//     capacity: 2,
//     occupied: 2,
//     facilities: "AC, Attach Bathroom",
//   },
//   {
//     roomNo: "201",
//     type: "Single",
//     floor: "2nd",
//     rent: 12000,
//     capacity: 1,
//     occupied: 1,
//     facilities: "AC, Shared Bathroom",
//   },
//   {
//     roomNo: "202",
//     type: "Triple",
//     floor: "2nd",
//     rent: 18000,
//     capacity: 3,
//     occupied: 1,
//     facilities: "AC, Attach Bathroom",
//   },
//   {
//     roomNo: "301",
//     type: "Double",
//     floor: "3rd",
//     rent: 16000,
//     capacity: 2,
//     occupied: 0,
//     facilities: "AC, Attach Bathroom",
//   },
// ];

// export default function PropertiesListPage() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");
//   const [floorFilter, setFloorFilter] = useState("All");
//   const [sortAsc, setSortAsc] = useState(true);

//   const filtered = properties
//     .filter(
//       (p) =>
//         p.roomNo.includes(search) ||
//         p.type.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((p) => floorFilter === "All" || p.floor === floorFilter)
//     .sort((a, b) => (sortAsc ? a.rent - b.rent : b.rent - a.rent));

//   return (
//     <div className="bg-purpleDarkScale-100 p-6 min-h-screen">
//       <h2 className="text-3xl font-bold text-purpleDark mb-6 text-center">
//         Rooms
//       </h2>

//       <div className="flex justify-end mb-5">
//         <button
//           onClick={() => navigate("/admin/add-property")}
//           className="bg-purpleDark text-white px-4 py-2 rounded"
//         >
//           + Add New Room
//         </button>
//       </div>

//       <div className="flex gap-2 mb-4 flex-wrap">
//         <input
//           type="text"
//           placeholder="Search rooms…"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full sm:w-auto flex-grow border px-3 py-2 rounded"
//         />

//         <select
//           value={floorFilter}
//           onChange={(e) => setFloorFilter(e.target.value)}
//           className="px-4 py-2 border rounded"
//         >
//           <option value="All">All Floors</option>
//           <option value="1st">1st Floor</option>
//           <option value="2nd">2nd Floor</option>
//           <option value="3rd">3rd Floor</option>
//         </select>

//         <button
//           className="px-4 py-2 border rounded bg-white"
//           onClick={() => setSortAsc((prev) => !prev)}
//         >
//           Sort by Rent {sortAsc ? "↑" : "↓"}
//         </button>
//       </div>

//       <div className="overflow-x-auto bg-white border rounded-lg">
//         <table className="w-full text-left text-sm">
//           <thead>
//             <tr className="bg-purpleDarkScale-200">
//               <th className="p-2 border">Room No.</th>
//               <th className="p-2 border">Type</th>
//               <th className="p-2 border">Floor</th>
//               <th className="p-2 border">Rent</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border">Facilities</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((room) => {
//               return (
//                 <tr key={room.roomNo}>
//                   <td className="p-2 border">{room.roomNo}</td>
//                   <td className="p-2 border">{room.type}</td>
//                   <td className="p-2 border">{room.floor}</td>
//                   <td className="p-2 border">₹{room.rent.toLocaleString()}</td>
//                   <td className="p-2 border space-x-1">
//                     <button
//                       className="bg-green-200 text-green-900 text-xs px-2 py-1 rounded"
//                       title="Vacant Beds"
//                     >
//                       Vacant: {room.capacity - room.occupied}
//                     </button>
//                     <button
//                       className="bg-red-200 text-red-900 text-xs px-2 py-1 rounded"
//                       title="Occupied Beds"
//                     >
//                       Occupied: {room.occupied}
//                     </button>
//                   </td>
//                   <td className="p-2 border">{room.facilities}</td>
//                   <td className="p-2 border space-x-2">
//                     <button
//                       onClick={() =>
//                         navigate(`/admin/edit-property/${room.roomNo}`)
//                       }
//                       className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
//                       Hide
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PropertiesListPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [floorFilter, setFloorFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);

  // ✅ Fetch room list on mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/rooms") // Update if your API endpoint is different
      .then((res) => setRooms(res.data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  const filtered = rooms
    .filter(
      (p) =>
        p.roomNo.includes(search) ||
        p.roomType.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => floorFilter === "All" || p.floor === floorFilter)
    .sort((a, b) => (sortAsc ? a.rentAmount - b.rentAmount : b.rentAmount - a.rentAmount));

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

        <select
          value={floorFilter}
          onChange={(e) => setFloorFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="All">All Floors</option>
          <option value="first">1st Floor</option>
          <option value="second">2nd Floor</option>
          <option value="third">3rd Floor</option>
        </select>

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
                    <button
                      className="bg-green-200 text-green-900 text-xs px-2 py-1 rounded"
                    >
                      Vacant: {room.maxOccupancy - room.currentOccupancy}
                    </button>
                    <button
                      className="bg-red-200 text-red-900 text-xs px-2 py-1 rounded"
                    >
                      Occupied: {room.currentOccupancy}
                    </button>
                  </td>
                  <td className="p-2 border">
                    {room.facilities.map((f) => f.name).join(", ")}
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                    onClick={() => navigate(`/admin/edit-property/${room.id}`)}
                      // onClick={() => {
                      //   console.log("Room object:", room);
                      //   console.log("Room object:", room);
                      //   console.log("room.id =", room.id);
                      //   navigate(`/admin/edit-property/${room.id}`);
                      // }}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
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
