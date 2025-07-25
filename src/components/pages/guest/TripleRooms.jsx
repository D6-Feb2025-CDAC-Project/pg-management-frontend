import React from "react";

const tripleRooms = [
  {
    id: 1,
    number: "T201",
    rent: 5500,
    capacity: 3,
    amenities: ["Wi-Fi", "Attached Bathroom", "3 Beds", "Storage Lockers"],
    available: true,
    image:
      "https://www.shutterstock.com/image-photo/triple-room-modern-hotel-260nw-649329964.jpg",
  },
  {
    id: 2,
    number: "T202",
    rent: 5300,
    capacity: 3,
    amenities: ["Wi-Fi", "Balcony", "Shared Wardrobe", "24x7 Water"],
    available: true,
    image:
      "https://a0.muscache.com/im/pictures/7e3680d2-e66a-4a6c-9438-0375235d1bcc.jpg?im_w=720",
  },
  {
    id: 3,
    number: "T203",
    rent: 5000,
    capacity: 3,
    amenities: ["Wi-Fi", "Geyser", "Laundry Service", "Table & Chair"],
    available: false,
    image:
      "https://www.silkahotels.com/images/silka-tsuen-wan/stay/triple-room/triple_room-S360-desktop.webp",
  },
  {
    id: 4,
    number: "T204",
    rent: 5600,
    capacity: 3,
    amenities: ["Wi-Fi", "Mini Fridge", "Attached Bathroom", "Smart TV"],
    available: true,
    image:
      "https://risingstarhostel.com/wp-content/uploads/2025/05/Copy-of-PRB_1274-scaled.jpg",
  },
  {
    id: 5,
    number: "T205",
    rent: 5200,
    capacity: 3,
    amenities: ["Wi-Fi", "Cupboard", "3 Beds", "24x7 Security"],
    available: true,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5mhoym0US4lPP23sNjxn86mEGdlU7cFj4Q&s",
  },
  {
    id: 6,
    number: "T206",
    rent: 5100,
    capacity: 3,
    amenities: ["Wi-Fi", "Laundry", "Geyser", "Fan & Lights"],
    available: true,
    image:
      "https://5.imimg.com/data5/GI/SC/GLADMIN-50954254/ams-pg-triple-sharing-room-500x500.jpg",
  },
];

function TripleRooms() {
  const availableRooms = tripleRooms.filter((room) => room.available);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Available Triple Sharing Rooms
      </h1>

      {availableRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white shadow-md p-6 rounded-xl border border-gray-200"
            >
              <img
                src={room.image}
                alt={`Room ${room.number}`}
                className="mb-4 w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Room No: {room.number}
              </h3>
              <p className="mb-1">
                <strong>Rent:</strong> ₹{room.rent}/month
              </p>
              <p className="mb-1">
                <strong>Capacity:</strong> {room.capacity} persons
              </p>
              <p className="mb-2">
                <strong>Amenities:</strong> {room.amenities.join(", ")}
              </p>
              <p className="text-green-600 font-medium mb-2">Available</p>
              <button className="mt-2 primary-button hover:bg-purple-700">
                Proceed to Book
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">
          No Triple Sharing Rooms Available at the moment.
        </p>
      )}
    </div>
  );
}

export default TripleRooms;
