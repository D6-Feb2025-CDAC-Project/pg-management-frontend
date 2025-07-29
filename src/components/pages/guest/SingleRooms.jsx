import React from "react";
import { Link } from "react-router-dom";

const singleRooms = [
  {
    id: 1,
    number: "S101",
    rent: 8500,
    capacity: 1,
    amenities: ["Wi-Fi", "Attached Bathroom", "Bed", "Study Table"],
    available: true,
    image:
      "https://www.inselhotel.com/files/public/inselhotel-bonn/zimmer/einzelzimmer-standard/einzelzimmer-standard-insel-hotel-bonn-2524.jpg",
  },
  {
    id: 2,
    number: "S102",
    rent: 8700,
    capacity: 1,
    amenities: ["Wi-Fi", "Balcony", "Cupboard", "24x7 Water"],
    available: true,
    image:
      "https://www.shutterstock.com/image-photo/interior-modern-new-hotel-single-260nw-544295437.jpg",
  },
  {
    id: 3,
    number: "S103",
    rent: 8800,
    capacity: 1,
    amenities: ["Wi-Fi", "Laundry Service", "Geyser"],
    available: false,
    image:
      "https://risingstarhostel.com/wp-content/uploads/2024/03/PRB_6359-scaled.jpg",
  },
  {
    id: 4,
    number: "S104",
    rent: 8600,
    capacity: 1,
    amenities: ["Wi-Fi", "Private Balcony", "Smart TV", "AC"],
    available: true,
    image:
      "https://scdn.aro.ie/Sites/50/imperialhotels2022/uploads/images/PanelImages/General/156757059_Bedford_Hotel__Single_Room._4500x3000.jpg",
  },
  {
    id: 5,
    number: "S105",
    rent: 9000,
    capacity: 1,
    amenities: ["Wi-Fi", "Mini Fridge", "Cupboard", "Attached Bathroom"],
    available: true,
    image:
      "https://lh5.googleusercontent.com/proxy/79dFS7_kef_xyyP2-1d9fVDlBN_13ilA_Dn8sg4RH0TkFDI_xnjRxRrQr-r9ZMvZxIRJhkUZa42WUo4rFSv4_FkHNzY4Tuvf8T8yBfC9MeN5IDWaVRZk-8594W7WncvpzOks4_fv3BH1WS4OGM1D58HFH61UoRd4whY",
  },
  {
    id: 6,
    number: "S106",
    rent: 8200,
    capacity: 1,
    amenities: ["Wi-Fi", "Bed", "Laundry", "24x7 Water"],
    available: true,
    image:
      "https://www.frasersproperty.com/content/dam/frasers-hospitality/english/properties/united-kingdom/south-kensington/park-international-hotel-south-kensington/images/gallery-images/rooms/room-type-main-images/single-room/PIHL_Single%20Room.jpg",
  },
];

function SingleRooms() {
  const availableRooms = singleRooms.filter((room) => room.available);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Available Single Rooms
      </h1>

      {availableRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRooms.map((room) => (
            <Link to="/guest/room-details" state={{ room }} key={room.id}>
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
                  <strong>Capacity:</strong> {room.capacity} person
                </p>
                <p className="mb-2">
                  <strong>Amenities:</strong> {room.amenities.join(", ")}
                </p>
                <p className="text-green-600 font-medium mb-2">Available</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">
          No Single Rooms Available at the moment.
        </p>
      )}
    </div>
  );
}

export default SingleRooms;
