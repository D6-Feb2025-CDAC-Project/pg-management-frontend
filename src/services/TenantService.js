import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${API_BASE_URL}/tenant`;

export const getAllTenants = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 204) {
      return [];
    }
    console.error("Error fetching tenants:", error);
    throw error;
  }
};

export const updateTenant = async (tenantId, updateData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${tenantId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating tenant:", error);
    throw error;
  }
};

export const addTenant = async (tenantData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, tenantData);
    return response.data;
  } catch (error) {
    console.error("Error adding tenant:", error);
    throw error;
  }
};
