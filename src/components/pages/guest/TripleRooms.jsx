import React, { useEffect, useState } from "react";
import RoomCard from "../sub-components/RoomCard";
import { getRoomsWithFacilties } from "../../../services/roomService";
function TripleRooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRoomsWithFacilties(); // wait for API
        setRooms(Array.isArray(data) ? data : []); // ensure array
      } catch (error) {
        console.error("Failed to fetch rooms", error);
        setRooms([]); // fallback to empty array
      }
    };

    fetchRooms();
  }, []);

  const availableRooms = rooms.filter(
    (room) => room.roomType === "THREE_SHARING"
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-black">
        Available Triple Sharing Rooms
      </h1>

      {availableRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableRooms.map((room) => (
            <RoomCard
              key={room.roomNo}
              room={{
                id: room.id,
                number: room.roomNo,
                rent: room.rentAmount,
                capacity: 3,
                amenities: room.facilties?.map((f) => f.name) || [],
                currentOccupancy: room.currentOccupancy,
                image: room.photoUrl,
                deposit: room.deposit,
                electricity: room.electricityCharges,
                maintenance: room.maintenanceCharges,
                tenantType: room.tenantType,
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-700">
          No Triple Rooms Available at the moment.
        </p>
      )}
    </div>
  );
}

export default TripleRooms;
