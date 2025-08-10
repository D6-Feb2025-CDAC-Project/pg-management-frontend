import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPaymentOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/guest/create-order`,
      orderData
    );
    return { success: true, ...response.data };
  } catch (error) {
    console.error("Order creation error:", error);
    throw new Error(
      error.response?.data?.error || "Failed to create payment order"
    );
  }
};

// This function now handles both payment verification AND tenant registration
// matching your backend's atomic transaction approach
export const verifyPaymentAndCompleteRegistration = async (paymentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/guest/verify-payment`,
      paymentData
    );
    return { success: true, ...response.data };
  } catch (error) {
    console.error("Payment verification and registration error:", error);
    const errorMessage =
      error.response?.data?.error ||
      "Payment verification and registration failed";
    throw new Error(errorMessage);
  }
};

export const verifyPayment = async (paymentData) => {
  console.warn(
    "verifyPayment is deprecated. Use verifyPaymentAndCompleteRegistration instead."
  );
  return verifyPaymentAndCompleteRegistration(paymentData);
};
