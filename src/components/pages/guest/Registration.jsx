import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TermsAndConditions from "../sub-components/TermsAndConditions";
import { generateOtp, verifyGeneratedOtp } from "../../../services/OtpService";
import { createPaymentOrder, verifyPaymentAndCompleteRegistration } from "../../../services/PaymentService";
import { toast } from "react-toastify";

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room } = location.state || {};

  const [guest, setGuest] = useState({
    name: "",
    email: "",
    phone: "",
    enteredOtp: "",
    password: "",
    confirmPassword: "",
    gender: "",
    moveInDate: "",
    agreed: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Razorpay key - replace with your actual key
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
  const REGISTRATION_AMOUNT = 10000; // ₹10,000

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        // Check if script is already loaded
        if (window.Razorpay) {
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const sendOtp = async () => {
    if (guest.email != "") {
      setLoadingOtp(true);
      setTimeout(async () => {
        const result = await generateOtp(guest.email);
        //console.log(result);
        if (result.status == "success") {
          toast.success(result.message);
          setOtpSent(true);
          setLoadingOtp(false);
        } else {
          toast.error(result.message)
        }
      }, 3000);
    } else {
      toast.warn("Please enter email");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await verifyGeneratedOtp(guest.email, guest.enteredOtp);
      if (result.success) {
        setOtpVerified(true);
        toast.success("OTP verified successfully! ✓");
      } else {
        toast.error(result.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("OTP verification failed. Please try again.");
      console.error("OTP verification error:", error);
    }
  };

  const initiatePayment = async () => {
    try {
      // Debug: Check Razorpay key
      console.log('RAZORPAY_KEY:', RAZORPAY_KEY);
      if (!RAZORPAY_KEY) {
        toast.error("Razorpay key is not configured. Please check environment variables.");
        return;
      }

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        toast.error("Payment gateway is loading. Please try again.");
        return;
      }

      setPaymentProcessing(true);

      // Create order on backend
      const orderResponse = await createPaymentOrder({
        amount: REGISTRATION_AMOUNT,
        currency: "INR"
      });

      const options = {
        key: RAZORPAY_KEY,
        amount: REGISTRATION_AMOUNT * 100, // amount in paise
        currency: "INR",
        name: "EasyPG",
        description: `Room Registration - ${room.number}`,
        order_id: orderResponse.orderId,
        prefill: {
          name: guest.name,
          email: guest.email,
          contact: guest.phone,
        },
        theme: {
          color: "#8B5CF6", // matches your purpleDark theme
        },
        handler: async function (response) {
          await handlePaymentSuccess(response);
        },
        modal: {
          ondismiss: function () {
            setPaymentProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setPaymentProcessing(false);
      toast.error("Failed to initiate payment");
      console.error("Payment initiation error:", error);
    }
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      // Prepare complete registration data including payment details
      const registrationPayload = {
        orderId: paymentResponse.razorpay_order_id,
        paymentId: paymentResponse.razorpay_payment_id,
        signature: paymentResponse.razorpay_signature,
        amount: REGISTRATION_AMOUNT,
        registrationData: {
          username: guest.name,
          email: guest.email,
          password: guest.password,
          gender: guest.gender,
          contactNumber: guest.phone,
          moveInDate: guest.moveInDate,
          roomId: room.id
        }
      };

      // Single API call that handles payment verification AND tenant registration
      const result = await verifyPaymentAndCompleteRegistration(registrationPayload);

      if (result.success) {
        setPaymentProcessing(false);
        toast.success("Registration completed successfully!");
        navigate("/user/login");
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      setPaymentProcessing(false);
      toast.error(error.message || "Registration failed after payment. Please contact support.");
      console.error("Registration completion error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) return toast.warn("Please verify Email first!");
    if (!guest.agreed) return toast.warn("Please agree to the terms!");
    if (guest.password != guest.confirmPassword)
      return toast.warn("Password & Confirm password doesn't match");

    // Initiate payment - everything else happens after payment success
    await initiatePayment();
  };

  return (
    <div className="min-h-screen bg-purpleLight p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-purpleDark mb-6 text-center">
          Room Registration
        </h2>

        {/* Payment Amount Info */}
        <div className="mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded">
          <h3 className="font-bold text-lg mb-2 text-yellow-800">Payment Information</h3>
          <p className="text-yellow-700">
            Registration Amount: <strong>₹{REGISTRATION_AMOUNT.toLocaleString()}</strong>
          </p>
          <p className="text-sm text-yellow-600 mt-1">
            This includes security deposit and advance payment. You'll be redirected to Razorpay for secure payment.
          </p>
        </div>

        {/* room details */}
        {room && (
          <div className="mb-6 border p-4 rounded bg-gray-50">
            <h3 className="font-bold text-lg mb-2">Confirm Room Details</h3>
            <p className="mb-1">
              <strong>Room No:</strong> {room.number}
            </p>
            <p className="mb-1">
              <strong>Rent:</strong> ₹{room.rent}/month + extra charges (For
              Maintenance : ₹{room.maintenance}/month & Electricity : ₹
              {room.electricity}/month)
            </p>
            <p className="mb-1">
              <strong>Deposit:</strong> ₹{room.deposit}
            </p>
            <p className="mb-1">
              <strong>Current Occupancy:</strong> {room.currentOccupancy}{" "}
              persons
            </p>
            <p className="mb-1">
              <strong>Available for:</strong> {room.tenantType}
            </p>
            <p className="mb-1">
              <strong>Amenities:</strong> {room.amenities.join(", ")}
            </p>
          </div>
        )}

        {/* guest info */}
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-2">Guest Information</h3>

          {/* full name */}
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded w-full mb-3"
            value={guest.name}
            onChange={(e) => setGuest({ ...guest, name: e.target.value })}
            required
          />

          {/* email */}
          <div className="flex gap-3 mb-3">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded flex-grow"
              value={guest.email}
              onChange={(e) => setGuest({ ...guest, email: e.target.value })}
              required
            />
            <button
              type="button"
              className="secondary-button"
              onClick={sendOtp}
              disabled={loadingOtp}
            >
              {loadingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>

          {otpSent && (
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="Enter OTP"
                className="border p-2 rounded flex-grow"
                value={guest.enteredOtp}
                onChange={(e) =>
                  setGuest({ ...guest, enteredOtp: e.target.value })
                }
                disabled={otpVerified}
              />
              <button
                type="button"
                className={`px-4 py-2 rounded font-medium transition-colors ${otpVerified
                  ? "bg-green-500 text-white cursor-default"
                  : "bg-purpleDark text-white hover:bg-purple-700"
                  }`}
                onClick={verifyOtp}
                disabled={otpVerified}
              >
                {otpVerified ? "OTP Verified ✓" : "Verify OTP"}
              </button>
            </div>
          )}

          {/* phone number */}
          <input
            type="tel"
            placeholder="Phone Number"
            className="border p-2 rounded w-full mb-3"
            value={guest.phone}
            onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
            required
          />

          {/* password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-6">
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded flex-grow mr-5"
              value={guest.password}
              onChange={(e) => setGuest({ ...guest, password: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border p-2 rounded flex-grow"
              value={guest.confirmPassword}
              onChange={(e) =>
                setGuest({ ...guest, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          {/* gender dropdown */}
          <div className="grid gap-4 mb-6">
            <div className="flex flex-col">
              <select
                value={guest.gender}
                onChange={(e) => setGuest({ ...guest, gender: e.target.value })}
                className={`p-3 border rounded ${guest.gender ? "text-black" : "text-gray-400"
                  }`}
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* move in date */}
          <div className="flex flex-col mb-6">
            <label className="mb-1 font-medium">Expected Move-in Date</label>
            <input
              type="date"
              className={`p-3 border rounded ${guest.moveInDate ? "text-black" : "text-gray-400"
                }`}
              value={guest.moveInDate}
              onChange={(e) =>
                setGuest({ ...guest, moveInDate: e.target.value })
              }
              required
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={guest.agreed}
              onChange={(e) => setGuest({ ...guest, agreed: e.target.checked })}
              required
            />
            <span>
              I agree to the{" "}
              <button
                type="button"
                className="text-purple-600 underline"
                onClick={() => setShowTerms(true)}
              >
                Terms & Conditions
              </button>
            </span>
          </div>

          {/* submit Button */}
          <button
            type="submit"
            className="w-full bg-purpleDark text-white py-2 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={paymentProcessing || !razorpayLoaded}
          >
            {!razorpayLoaded
              ? "Loading Payment Gateway..."
              : paymentProcessing
                ? "Processing Payment..."
                : `Pay ₹${REGISTRATION_AMOUNT.toLocaleString()} & Confirm Booking`}
          </button>
        </form>
      </div>

      {/* show Terms Popup */}
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
    </div>
  );
};

export default Registration;