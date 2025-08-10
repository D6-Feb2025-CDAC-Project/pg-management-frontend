// src/components/shared/Sidebar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlignLeft } from "lucide-react";
import NavItem from "./NavItem";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

function Sidebar({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipIdName = "sidebar-tooltip";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    if (item.action === "logout") {
      dispatch(logout());
      // for best practice
      localStorage.clear();
      navigate("/user/login");
    } else if (item.url) {
      navigate(item.url);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ width: 60 }}
        animate={{ width: isOpen ? 220 : 60 }}
        transition={{ duration: 0.4 }}
        className="bg-purpleDark h-screen text-white p-4"
      >
        <button onClick={() => setIsOpen((prev) => !prev)} className="mb-10">
          <AlignLeft />
        </button>
        <nav className="flex flex-col gap-11">
          {menuItems.map((item) => (
            <NavItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              url={item.url}
              tooltipId={tooltipIdName}
              onClick={() => handleMenuClick(item)}
            />
          ))}
        </nav>
      </motion.div>
      <Tooltip id={tooltipIdName} />
    </div>
  );
}

export default Sidebar;
