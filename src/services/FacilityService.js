import axios from "axios";

// Base URL of your backend API
const BASE_URL = "http://localhost:8080/facility";

export const getAvailableFacilities = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    // If 204 No Content, just return empty array
    if (error.response && error.response.status === 204) {
      return [];
    }
    // Log or rethrow error if needed
    console.error("Error fetching facilities:", error);
    throw error;
  }
};
