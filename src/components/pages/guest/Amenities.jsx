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
  FaTag,
} from "react-icons/fa";
import { getAvailableFacilities } from "../../../services/FacilityService";
import Loader from "../../shared/Loader";

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
  const [loading, setLoading] = useState(true);

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
            icon: iconMap[name] || <FaTag />,
          });
          return acc;
        }, {});

        // Convert to array like before
        const formatted = Object.keys(grouped).map((key) => ({
          title: key,
          items: grouped[key],
        }));
        setGroupedAmenities(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch amenities", error);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const formatEnumTitle = (str) => {
    //IN_PROGRESS
    return str
      .toLowerCase() // in_progress
      .split("_") // ["in","progress"]
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) //["In","Progress"]
      .join(" "); // In Progress
  };

  if (loading) {
    return <Loader />;
  }

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
