import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const RequireRoomSelection = ({ children }) => {
  const selectedRoom = localStorage.getItem("selectedRoom");
  const location = useLocation();

  if (!selectedRoom) {
    // If no room selected, redirect to rooms page
    return toast.error("Please select room first!!!");
  }

  // If room selected, render the wrapped component (Registration page)
  return children;
};

export default RequireRoomSelection;
