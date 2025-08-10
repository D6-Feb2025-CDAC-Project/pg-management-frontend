import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavItem({ icon, text, isOpen, setIsOpen, url, tooltipId, onClick }) {
  const location = useLocation();
  const isActive = url && location.pathname === url;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (!url) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      className={`flex items-center gap-3 cursor-pointer w-full 
        hover:text-purple-950 
        ${isActive ? "text-purple-950" : ""}
      `}
    >
      <span
        onClick={handleClick}
        data-tooltip-id={!isOpen ? tooltipId : undefined}
        data-tooltip-content={!isOpen ? text : undefined}
        className="text-xl"
      >
        {icon}
      </span>

      {isOpen && (
        <div>
          {url ? (
            <Link to={url}>{text}</Link>
          ) : (
            <span onClick={handleClick}>{text}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default NavItem;
