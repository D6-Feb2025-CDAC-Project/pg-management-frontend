import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../sub-components/Footer";

const RoomDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // get room data from single rooms , double rooms and triple rooms page
  const { room } = location.state || {};

  if (!room) {
    return <p className="text-center mt-10">No room details found.</p>;
  }

  const handleBookNow = () => {
    navigate("/guest/room-details/registration", { state: { room } });
  };

  return (
    <div className="h-screen overflow-y-auto hide-scrollbar bg-bgGray">
      <div className="flex-grow p-6">
        {/* header */}
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Room details
        </h1>
        {/* image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-200 flex items-center justify-center rounded-md">
            <img
              src={room.image}
              alt={room.number}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          {/* details */}
          <div className="bg-white shadow-md rounded-md p-4 border border-gray-200 relative pb-16">
            <h2 className="text-xl font-bold text-gray-800">
              {room.number} ({room.capacity}-Sharing)
            </h2>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              ₹{room.rent}/month
            </p>
            <hr className="mb-3" />

            <h3 className="font-semibold mb-2 text-gray-800">Room Details</h3>
            <ul className="text-gray-700 list-disc ml-6 space-y-1">
              <li>Capacity: {room.capacity} persons</li>
              <li>Amenities: {room.amenities.join(", ")}</li>
            </ul>

            {/* fixed Buttons inside container */}
            <div className="absolute bottom-4 left-0 w-full flex  gap-3 px-4">
              <button className="primary-button" onClick={handleBookNow}>
                Book Now
              </button>
              <button className="secondary-button">Raise Enquiry</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RoomDetails;
