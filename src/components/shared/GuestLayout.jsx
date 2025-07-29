import { Outlet } from "react-router";
import React from "react";
import logo from "../../assets/images/Logo3-cropped.svg";

import { Link, useNavigate } from "react-router-dom";
import Footer from "../pages/sub-components/Footer";

const GuestLayout = () => {
  const navigate = useNavigate();

  console.log("On guest layout page");

  return (
    <div className="h-screen overflow-y-auto hide-scrollbar bg-bgGray">
      {/* Navbar */}
      <nav className="flex bg-white items-center justify-between px-4 py-2 shadow">
        {/* left logo container */}
        <div className="flex">
          <img src={logo} alt="LOGO" className="w-24" />
        </div>
        {/* pages links */}
        <div className="flex space-x-8 font-semibold text-black">
          <Link to="/guest/dashboard" className="hover:text-[#E7D0F5]">
            Home
          </Link>
          <Link to="/guest/rooms" className="hover:text-[#E7D0F5]">
            Rooms
          </Link>
          <Link to="/guest/amenities" className="hover:text-[#E7D0F5]">
            Amenities
          </Link>
        </div>
        {/* login button */}
        <button
          onClick={() => navigate("/user/login")}
          className="primary-button"
        >
          Login
        </button>
      </nav>
      <Outlet />
      <Footer />
    </div>
  );
};

export default GuestLayout;
