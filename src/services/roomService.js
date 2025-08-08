import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// GET: Fetch all visible rooms
export const getAllVisibleRooms = async () => {
  const response = await axios.get(`${API_BASE_URL}/rooms`);
  return response.data;
};

// POST: Add a new room
export const addRoom = async (roomData) => {
  const response = await axios.post(`${API_BASE_URL}/rooms`, roomData);
  return response.data;
};

// GET: Fetch room details by ID
export const getRoomById = async (roomId) => {
  const response = await axios.get(`${API_BASE_URL}/rooms/${roomId}`);
  return response.data;
};

// PUT: Update room details by ID
export const updateRoom = async (roomId, updatedData) => {
  const response = await axios.put(
    `${API_BASE_URL}/rooms/${roomId}`,
    updatedData
  );
  return response.data;
};

// PUT: Hide room (logical delete)
export const hideRoom = async (roomId) => {
  const response = await axios.put(`${API_BASE_URL}/rooms/${roomId}/hide`);
  return response.data;
};

// get rooms with their facilities
export const getRoomsWithFacilties = async () => {
  const response = await axios.get(`${API_BASE_URL}/rooms/facilities`);
  return response.data;
};
