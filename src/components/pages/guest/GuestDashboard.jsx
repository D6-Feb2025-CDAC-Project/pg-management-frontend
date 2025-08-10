import React, { useState, useEffect } from "react";
import image1 from "../../../assets/images/Guest_dashboard_img1.jpg";
import image2 from "../../../assets/images/Guest_dashboard_img2.jpg";
import {
  FaCar,
  FaPlay,
  FaRegLightbulb,
  FaSwimmingPool,
  FaUtensils,
  FaWifi,
  FaWindowClose,
} from "react-icons/fa";
import TourVideo from "../../../assets/videos/Tour_Video.mp4";
import LogoLoader from "../../shared/LogoLoader";
import Loader from "../../shared/Loader";

function GuestDashboard() {
  const [showVideo, setShowVideo] = useState(false);
  const [logoLoading, setLogoLoading] = useState(true);

  // Show loader for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (logoLoading) {
    return <LogoLoader />; // Only loader for 2 seconds
  }

  return (
    <>
      {/*1st container*/}
      <div className="grid grid-cols-1 md:grid-cols-2 my-8 bg-purpleLight">
        {/* left content */}
        <div className="px-5 flex flex-col justify-center relative">
          {/* title */}
          <h1 className="text-4xl font-bold mb-10 leading-tight">
            Find your perfect
            <br />
            place to stay
          </h1>
          {/* description */}
          <p className="text-gray-700 mb-10">
            Your search for the perfect PG ends here!
            <br /> Browse comfy, affordable stays with all the amenities you
            need.
            <br /> Book your ideal room quickly and stress-free.
            <br />
            Easy PG helps you find the right place, at the right price.
          </p>
          {/* watch video button */}
          <div
            onClick={() => setShowVideo(true)}
            className="absolute bottom-5 left-5"
          >
            <button className="flex items-center text-black font-semibold">
              <div className="mr-2 text-purpleDark">
                <FaPlay />
              </div>
              Watch Video
            </button>
          </div>

          {showVideo && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative w-[80%] max-w-3xl">
                <video controls autoPlay className="w-full rounded-lg">
                  <source src={TourVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  className="absolute top-2 right-2  text-2xl text-purpleDark"
                  onClick={() => setShowVideo(false)}
                >
                  <FaWindowClose />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* right image */}
        <div>
          <img
            src={image1}
            alt="Living Room"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 2nd container */}
      <h1 className="text-2xl font-medium text-center mt-10 mb-3">
        Why Choose Us?
      </h1>
      <div className="h-0.5 w-40 justify-center bg-gray-400 mx-auto"></div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-8 px-4 py-6 place-items-center">
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Free Electricity</h3>
          <span className="text-5xl mt-5 text-purple-500">
            <FaRegLightbulb />
          </span>
        </div>
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Swimming</h3>
          <span className="text-5xl mt-5 text-purple-500">
            <FaSwimmingPool />
          </span>
        </div>
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Parking Area</h3>
          <span className="text-5xl mt-5 text-purple-500">
            <FaCar />
          </span>
        </div>
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Homemade Food</h3>
          <span className="text-5xl mt-5 text-purple-500">
            <FaUtensils />
          </span>
        </div>
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Free Wifi</h3>
          <span className="text-5xl mt-5 text-purple-500">
            <FaWifi />
          </span>
        </div>
      </div>

      {/* 3rd container */}
      <div className="grid grid-cols-1 md:grid-cols-2 my-15 bg-purpleLight w-[96%] mx-auto rounded-tr-2xl rounded-tl-2xl">
        {/* left image */}
        <div>
          <img
            src={image2}
            alt="Living Room"
            className="w-full h-full object-cover rounded-tl-2xl"
          />
        </div>
        {/* right content */}
        <div className="px-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-10 leading-tight">
            Our History
          </h1>
          <p className="text-gray-700 mb-10">
            Our journey began with a simple idea – to make PG accommodation
            management easier, faster, and more transparent for everyone. Before
            this platform, PG owners and tenants struggled with manual
            record-keeping, delayed communication, and lack of organized data.
            Seeing these challenges, our team came together to build a digital
            solution that could simplify day-to-day PG operations. Over time, we
            have evolved into a reliable platform where owners can efficiently
            manage rooms, payments, and tenant details, while tenants can easily
            access information and updates.
          </p>
        </div>
      </div>
    </>
  );
}

export default GuestDashboard;
