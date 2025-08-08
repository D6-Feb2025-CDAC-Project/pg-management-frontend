import axios from "axios";

const BASE_URL = "http://localhost:8080/user";

// Login with email
export const login = async (identifier, password) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    identifier,
    password,
  });

  return response.data;
};
