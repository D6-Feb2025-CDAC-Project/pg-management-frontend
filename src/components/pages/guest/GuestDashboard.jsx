import React from "react";
import image1 from "../../../assets/images/Guest_dashboard_img1.jpg";
import image2 from "../../../assets/images/Guest_dashboard_img2.jpg";

function GuestDashboard() {
  return (
    // dashboard page
    <>
      {/*1st container*/}
      <div className="grid grid-cols-1 md:grid-cols-2 my-8 bg-[#EBD8FF] ">
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
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
          {/* watch video button */}
          <div className="absolute bottom-5 left-5">
            <button className="flex items-center text-black font-semibold">
              <span className="mr-2 ">▶</span> Watch Video
            </button>
          </div>
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-8 px-4  py-6 place-items-center">
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Free Electricity</h3>
          <span className="text-5xl mt-5">💡</span>
        </div>
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Swimming</h3>
          <span className="text-5xl mt-5">🏊🏻‍♂️</span>
        </div>
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Parking Area</h3>
          <span className="text-5xl mt-5">🚗</span>
        </div>
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Exercise Space</h3>
          <span className="text-5xl mt-5">🏋🏻‍♂️</span>
        </div>
        <div className="h-50 w-50 p-10 bg-white rounded-lg shadow-2xl flex flex-col items-center">
          <h3>Free Wifi</h3>
          <span className="text-5xl mt-5">🌐</span>
        </div>
      </div>

      {/* 3rd container */}

      <div className="grid grid-cols-1 md:grid-cols-2 my-15 bg-[#EBD8FF] w-[96%] mx-auto rounded-tr-2xl rounded-tl-2xl">
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
          {/* title */}
          <h1 className="text-4xl font-bold mb-10 leading-tight">
            Our History
          </h1>
          {/* description */}
          <p className="text-gray-700 mb-10">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy.
          </p>
        </div>
      </div>
    </>
  );
}

export default GuestDashboard;
