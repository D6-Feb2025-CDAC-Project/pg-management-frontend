import React from "react";
import SingleRooms from "./SingleRooms";
import DoubleRooms from "./DoubleRooms";
import TripleRooms from "./TripleRooms";

import { useNavigate } from "react-router-dom";

const rooms = [
  {
    id: 1,
    type: "Single Room",
    capacity: 1,
    image:
      "https://media.istockphoto.com/id/653447274/photo/empty-single-bedroom.jpg?s=612x612&w=0&k=20&c=zb_l0uNIc0TfWhYf9_582SGan1vw-ivbkUfTmWZHnGk=",
  },
  {
    id: 2,
    type: "Double Sharing",
    capacity: 2,
    image:
      "https://5.imimg.com/data5/HU/QM/GLADMIN-13282401/standard-double-sharing-non-ac-rooms-500x500.jpg",
  },
  {
    id: 3,
    type: "Triple Sharing",
    capacity: 3,
    image:
      "data:image/jpeg;base64,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",
  },
];

function Rooms() {
  const navigate = useNavigate();
  const handleBookNow = (type) => {
    if (type === "Single Room") navigate("/guest/rooms/single");
    else if (type === "Double Sharing") navigate("/guest/rooms/double");
    else if (type === "Triple Sharing") navigate("/guest/rooms/triple");
    // console.log("hello");
  };
  return (
    <>
      <div className="bg-white shadow-2xl mt-8 w-[96%] mx-auto">
        {/* Page Heading */}
        <div className=" py-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Available Rooms</h2>
          <p className="text-gray-600 mt-2">
            Choose the room that fits you best
          </p>
        </div>

        {/* Room Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="border rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <img
                src={room.image}
                alt={room.type}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {room.type}
                </h3>
                <p className="text-gray-600 mb-1">
                  Capacity: {room.capacity} person(s)
                </p>
                <div className="mt-auto">
                  <button
                    onClick={() => handleBookNow(room.type)}
                    className="secondary-button mt-5"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Rooms;
