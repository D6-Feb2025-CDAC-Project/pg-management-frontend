import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleBookNow = (room) => {
    if (room) {
      localStorage.setItem("selectedRoom", JSON.stringify(room));
      navigate("/guest/registration", { state: { room } });
      toast.warn("Do not refresh the page until registration completed...");
    } else {
      toast.warn("Please select a room first.");
    }
  };

  const capacity = 1;
  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 flex flex-col h-[500px]">
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
          <strong>Rent:</strong> ₹{room.rent}/month, extra charges (₹
          {room.electricity} & ₹{room.maintenance})
        </p>
        <p className="mb-1">
          <strong>Deposit:</strong> ₹{room.deposit}
        </p>
        <p className="mb-1">
          <strong>Vacancy :</strong> {room.capacity - room.currentOccupancy}{" "}
          person
        </p>
        <p className="mb-1">
          <strong>Available for :</strong> {room.tenantType}
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
