import axios from "axios";
import { store } from "../redux/store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
  const state = store.getState();
  const token = state.auth.token;
  console.log("token : " + token);
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// GET: Fetch all visible rooms
export const getAllVisibleRooms = async () => {
  const response = await axios.get(`${API_BASE_URL}/rooms`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// POST: Add a new room
export const addRoom = async (roomData) => {
  const response = await axios.post(`${API_BASE_URL}/rooms`, roomData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// GET: Fetch room details by ID
export const getRoomById = async (roomId) => {
  const response = await axios.get(`${API_BASE_URL}/rooms/${roomId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// PUT: Update room details by ID
export const updateRoom = async (roomId, updatedData) => {
  const response = await axios.put(
    `${API_BASE_URL}/rooms/${roomId}`,
    updatedData,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

// PUT: Hide room (logical delete)
export const hideRoom = async (roomId) => {
  const response = await axios.put(`${API_BASE_URL}/rooms/${roomId}/hide`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// get rooms with their facilities
export const getRoomsWithFacilties = async () => {
  const response = await axios.get(`${API_BASE_URL}/guest/rooms/facilities`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
