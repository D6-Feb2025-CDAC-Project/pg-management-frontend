import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const BASE_URL = `${API_BASE_URL}/otp`

export const generateOtp = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/generate`, { email });
    return { message: response.data };
  } catch (error) {
    return {
      message:
        error.response?.data || "Failed to send OTP. Please try again later.",
    };
  }
};

export const verifyGeneratedOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify`, { email, otp });
    return { success: true, message: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data || "Invalid or expired OTP. Please try again.",
    };
  }
};
