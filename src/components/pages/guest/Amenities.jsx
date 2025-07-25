import React from "react";
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

const amenities = [
  {
    title: "Basic Amenities",
    items: [
      { icon: <FaBed />, label: "Comfortable Beds" },
      { icon: <FaShower />, label: "Hot Water Bathrooms" },
      { icon: <FaWifi />, label: "Free High-Speed Wi-Fi" },
      { icon: <FaUtensils />, label: "Dining Area" },
      { icon: <FaCouch />, label: "Air Conditioning / Fans" },
    ],
  },
  {
    title: "Safety & Hygiene",
    items: [
      { icon: <FaShieldAlt />, label: "24x7 Security & CCTV" },
      { icon: <FaBroom />, label: "Daily Cleaning" },
      { icon: <FaConciergeBell />, label: "Sanitized Rooms" },
    ],
  },
  {
    title: "Lifestyle & Extras",
    items: [
      { icon: <FaDumbbell />, label: "Gym / Yoga Space" },
      { icon: <FaUsers />, label: "Community Events" },
      { icon: <FaUtensils />, label: "Home-Cooked Meals" },
    ],
  },
];

const Amenities = () => {
  return (
    <div className="bg-[#F9F6FF] py-12 px-6 md:px-16">
      {amenities.map((section, idx) => (
        <div key={idx} className="mb-10">
          <h2 className="text-2xl font-semibold text-[#6E39A3] mb-4">
            {section.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
              >
                <div className="text-[#6E39A3] text-xl mr-4">{item.icon}</div>
                <span className="text-gray-800 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
