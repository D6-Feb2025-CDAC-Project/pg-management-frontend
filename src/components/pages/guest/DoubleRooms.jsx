import React, { useEffect, useState } from "react";
import RoomCard from "../sub-components/RoomCard";
import { getRoomsWithFacilties } from "../../../services/roomService";
import Loader from "../../shared/Loader";

function DoubleRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRoomsWithFacilties(); // wait for API
        setRooms(Array.isArray(data) ? data : []); // ensure array
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
        setRooms([]); // fallback to empty array
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const availableRooms = rooms.filter(
    (room) => room.roomType === "DOUBLE_SHARING"
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-black">
        Available Double Sharing Rooms
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
                capacity: 2,
                amenities: room.facilties?.map((f) => f.name) || [],
                currentOccupancy: room.currentOccupancy,
                image: room.photoUrl.startsWith("/uploads")
                  ? `http://localhost:9090${room.photoUrl}`
                  : room.photoUrl,
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
          No Double Rooms Available at the moment.
        </p>
      )}
    </div>
  );
}

export default DoubleRooms;
