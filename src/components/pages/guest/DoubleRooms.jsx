import React from "react";
import { Link } from "react-router-dom";
import RoomCard from "../sub-components/RoomCard";

const doubleRooms = [
  {
    id: 1,
    number: "D201",
    rent: 6500,
    capacity: 2,
    amenities: ["Wi-Fi", "Shared Bathroom", "2 Beds", "Wardrobe"],
    available: true,
    image:
      "https://risingstarhostel.com/wp-content/uploads/2024/03/A05I5717-scaled.jpg",
  },
  {
    id: 2,
    number: "D202",
    rent: 6700,
    capacity: 2,
    amenities: ["Wi-Fi", "Balcony", "2 Chairs", "24x7 Water"],
    available: true,
    image:
      "https://img1.wsimg.com/isteam/ip/3e37772c-11b9-4f93-ac8b-ce984c048c0c/Deluxe%20Twin_11zon.jpg/:/cr=t:0%25,l:20.72%25,w:66.68%25,h:100%25/rs=w:388,h:388,cg:true",
  },
  {
    id: 3,
    number: "D203",
    rent: 7000,
    capacity: 2,
    amenities: ["Wi-Fi", "Geyser", "Fridge", "Laundry"],
    available: true,
    image:
      "https://metrocityliving.com/wp-content/uploads/2024/06/metrocity-girls-hostel-in-kothrud-madhavbaug-double-bed-sharing-e1719839173434.jpg",
  },
];

function DoubleRooms() {
  const availableRooms = doubleRooms.filter((room) => room.available);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-black">
        Available Double Sharing Rooms
      </h1>

      {availableRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <p className="text-gray-700">
          No Double Rooms Available at the moment.
        </p>
      )}
    </div>
  );
}

export default DoubleRooms;
