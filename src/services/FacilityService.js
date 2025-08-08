import axios from "axios";

const BASE_URL = "http://localhost:8080/facility";

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
