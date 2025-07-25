import React from "react";

const Registration = () => {
  return (
    <form className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center text-[#6E39A3] mb-6">
        Register here
      </h2>
      <h5 className=" font-normal text-center text-gray-500 mb-6">
        Help us know you better so we can find the perfect PG for you!
      </h5>
      {/* Personal Info */}
      <div className="grid gap-4 mb-6">
        <input
          type="text"
          placeholder="Full Name"
          className="p-3 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="p-3 border rounded w-full"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="p-3 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="p-3 border rounded w-full"
        />
      </div>

      {/* Preferences */}
      <div className="grid gap-4 mb-6">
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Gender</label>
          <select className="p-3 border rounded">
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Preferred Room Type</label>
          <select className="p-3 border rounded">
            <option value="">Select</option>
            <option>Single</option>
            <option>Double</option>
            <option>Triple Sharing</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Expected Move-in Date</label>
          <input type="date" className="p-3 border rounded" />
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Preferred Amenities</label>
        <div className="flex flex-wrap gap-4">
          <label>
            <input type="checkbox" className="mr-2" /> Wi-Fi
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> AC
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Food
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Housekeeping
          </label>
          <label>
            <input type="checkbox" className="mr-2" /> Attached Washroom
          </label>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Additional Notes</label>
        <textarea
          placeholder="Any specific needs or queries..."
          className="p-3 border rounded w-full"
          rows="3"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#6E39A3] text-white py-3 rounded hover:bg-[#582c85] transition"
      >
        Register
      </button>
    </form>
  );
};

export default Registration;
