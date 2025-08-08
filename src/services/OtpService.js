import axios from "axios";

const BASE_URL = "http://localhost:8080/otp";

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
