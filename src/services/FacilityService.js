import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}/guest/facility`;

export const getAvailableFacilities = async () => {
  try {
    const response = await axios.get(BASE_URL);
    // console.log("response : " + response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 204) {
      return [];
    }

    console.error("Error fetching facilities:", error);
    throw error;
  }
};
