import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TermsAndConditions from "../sub-components/TermsAndConditions";
import { addTenant } from "../../../services/TenantService";

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room } = location.state || {};

  const [guest, setGuest] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
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

  const sendOtp = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    alert(`OTP Sent: ${generatedOtp}`);
    setGuest({ ...guest, otp: generatedOtp });
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (guest.enteredOtp === guest.otp) {
      alert("OTP Verified");
      setOtpVerified(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!otpVerified) return alert("Please verify OTP first!");
    // if (!guest.agreed) return alert("Please agree to the terms!");

    const payload = {
      username: guest.name,
      email: guest.email,
      password: guest.password,
      gender: guest.gender,
      contactNumber: guest.phone,
      moveInDate: guest.moveInDate,
      roomId: 3, // since you don't have dynamic room ID yet
    };

    try {
      await addTenant(payload);
      alert("Registration Successful!");
      navigate("/user/login");
    } catch (err) {
      alert(err + "Something went wrong during registration.");
    }
  };

  return (
    <div className="min-h-screen bg-purpleLight p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-purpleDark mb-6 text-center">
          Room Registration
        </h2>

        {/* room details */}
        {room && (
          <div className="mb-6 border p-4 rounded bg-gray-50">
            <h3 className="font-bold text-lg mb-2">Confirm Room Details</h3>
            <p className="mb-1">
              <strong>Room No:</strong> {room.number}
            </p>
            <p className="mb-1">
              <strong>Rent:</strong> ₹{room.rent}/month
            </p>
            <p className="mb-1">
              <strong>Capacity:</strong> {room.capacity} persons
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
            {/* <button
              type="button"
              className="secondary-button"
              onClick={sendOtp}
            >
              Send OTP
            </button> */}
          </div>
          {/* {otpSent && (
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="Enter OTP"
                className="border p-2 rounded flex-grow"
                value={guest.enteredOtp}
                onChange={(e) =>
                  setGuest({ ...guest, enteredOtp: e.target.value })
                }
              />
              <button
                type="button"
                className="primary-button"
                onClick={verifyOtp}
              >
                Verify OTP
              </button>
            </div>
          )} */}
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
            {/* confirm password */}
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
                className={`p-3 border rounded ${
                  guest.gender ? "text-black" : "text-gray-400"
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
              className={`p-3 border rounded ${
                guest.moveInDate ? "text-black" : "text-gray-400"
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
            className="w-full bg-purpleDark text-white py-2 rounded hover:bg-purple-700"
          >
            Confirm Booking
          </button>
        </form>
      </div>

      {/* show Terms Popup */}
      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
    </div>
  );
};

export default Registration;
