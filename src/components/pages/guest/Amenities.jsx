// import React from "react";
// import {
//   FaWifi,
//   FaBed,
//   FaShower,
//   FaUtensils,
//   FaCouch,
//   FaShieldAlt,
//   FaBroom,
//   FaConciergeBell,
//   FaDumbbell,
//   FaUsers,
// } from "react-icons/fa";

// const amenities = [
//   {
//     title: "Basic Amenities",
//     items: [
//       { icon: <FaBed />, label: "Comfortable Beds" },
//       { icon: <FaShower />, label: "Hot Water Bathrooms" },
//       { icon: <FaWifi />, label: "Free High-Speed Wi-Fi" },
//       { icon: <FaUtensils />, label: "Dining Area" },
//       { icon: <FaCouch />, label: "Air Conditioning / Fans" },
//     ],
//   },
//   {
//     title: "Safety & Hygiene",
//     items: [
//       { icon: <FaShieldAlt />, label: "24x7 Security & CCTV" },
//       { icon: <FaBroom />, label: "Daily Cleaning" },
//       { icon: <FaConciergeBell />, label: "Sanitized Rooms" },
//     ],
//   },
//   {
//     title: "Lifestyle & Extras",
//     items: [
//       { icon: <FaDumbbell />, label: "Gym / Yoga Space" },
//       { icon: <FaUsers />, label: "Community Events" },
//       { icon: <FaUtensils />, label: "Home-Cooked Meals" },
//     ],
//   },
// ];

// const Amenities = () => {
//   return (
//     <div className="bg-bgGray px-6 md:px-16 mt-8">
//       {amenities.map((section, idx) => (
//         <div key={idx} className="mb-10">
//           <h2 className="text-2xl font-semibold text-purpleDark mb-4">
//             {section.title}
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {section.items.map((item, i) => (
//               <div
//                 key={i}
//                 className="flex items-center bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
//               >
//                 <div className="text-[#6E39A3] text-xl mr-4">{item.icon}</div>
//                 <span className="text-gray-800 font-medium">{item.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Amenities;

import React, { useEffect, useState } from "react";
import {
  FaWifi,
  FaBed,
  FaShower,
  FaUtensils,
  FaCouch,
  FaShieldAlt,
  FaBroom,
  FaConciergeBell,
  FaDumbbell,
  FaUsers,
} from "react-icons/fa";
import { getAvailableFacilities } from "../../../services/FacilityService";

// Map icon based on label or backend field
const iconMap = {
  "Comfortable Beds": <FaBed />,
  "Hot Water Bathrooms": <FaShower />,
  "Free High-Speed Wi-Fi": <FaWifi />,
  "Dining Area": <FaUtensils />,
  "Air Conditioning / Fans": <FaCouch />,
  "24x7 Security & CCTV": <FaShieldAlt />,
  "Daily Cleaning": <FaBroom />,
  "Sanitized Rooms": <FaConciergeBell />,
  "Gym / Yoga Space": <FaDumbbell />,
  "Community Events": <FaUsers />,
  "Home-Cooked Meals": <FaUtensils />,
};

const Amenities = () => {
  const [groupedAmenities, setGroupedAmenities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const facilities = await getAvailableFacilities();

        // Group by category
        const grouped = facilities.reduce((acc, facility) => {
          const { category, name } = facility;
          if (!acc[category]) acc[category] = [];
          acc[category].push({
            label: name,
            icon: iconMap[name] || <FaCouch />,
          });
          return acc;
        }, {});

        // Convert to array like before
        const formatted = Object.keys(grouped).map((key) => ({
          title: key,
          items: grouped[key],
        }));
        setGroupedAmenities(formatted);
      } catch (error) {
        console.error("Failed to fetch amenities", error);
      }
    };

    fetchFacilities();
  }, []);

  const formatEnumTitle = (str) => {
    return str
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="bg-bgGray px-6 md:px-16 mt-8">
      {groupedAmenities.length === 0 ? (
        <p className="text-center text-gray-500">No amenities available.</p>
      ) : (
        groupedAmenities.map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-2xl font-semibold text-purpleDark mb-4">
              {formatEnumTitle(section.title)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
                >
                  <div className="text-[#6E39A3] text-xl mr-4">{item.icon}</div>
                  <span className="text-gray-800 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Amenities;
