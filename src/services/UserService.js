import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const BASE_URL = `${API_BASE_URL}/user`


// Login with email
export const login = async (identifier, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    identifier,
    password,
  });

  return response.data;
};
