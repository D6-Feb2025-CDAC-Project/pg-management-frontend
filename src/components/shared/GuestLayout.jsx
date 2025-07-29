import { Outlet } from "react-router";
import React from "react";
import logo from "../../assets/images/Logo3-cropped.svg";

import { Link, useNavigate } from "react-router-dom";

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
      {/* footer */}
      <footer className="bg-gray-800 text-gray-800 py-6 px-4 mt-12">
        {/* Project Description */}
        <p className="text-sm md:text-base text-gray-400 font-normal mb-5">
          This educational project was developed by a dedicated team of four
          students to help users find PGs and rental spaces easily and
          efficiently.
        </p>
        <div className="max-w-6xl mx-auto text-center space-y-4 mt-5">
          {/* Quick Links */}
          <div className="flex justify-center flex-wrap gap-6 text-sm md:text-base  text-white">
            <div className="flex flex-col items-center">
              <span className="font-semibold">Home</span>
              <span className="text-md">🏠</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Rooms</span>

              <span className="text-md">🛏️</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Amenities</span>
              <span className="text-md">🛠️</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Contact</span>
              <span className="text-md">👩🏻‍💻</span>
            </div>
          </div>

          {/* Team Members */}
          <div className="flex justify-center flex-wrap gap-6 mt-10 text-sm md:text-base font-semibold  text-gray-400">
            <a href="https://www.linkedin.com/in/tanviGavhane/">
              Tanvi Gavhane
            </a>
            <a href="https://www.linkedin.com/in/nivedita-bsm/">
              Nivedita Magdum
            </a>
            <a href="">Prajkta Kamble</a>
            <a href="">Shruti Naik</a>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-400 mt-8 pt-4 text-center text-sm text-white">
            © {new Date().getFullYear()} EasyPG. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GuestLayout;
