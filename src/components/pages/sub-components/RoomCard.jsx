import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleBookNow = (room) => {
    navigate("/guest/registration", { state: { room } });
  };
  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 flex flex-col h-[420px]">
      <img
        src={room.image}
        alt={`Room ${room.number}`}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <div className="p-4 flex flex-col flex-grow">
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

        <div className="mt-auto flex justify-center">
          <button
            className="primary-button justify-center"
            onClick={() => handleBookNow(room)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
