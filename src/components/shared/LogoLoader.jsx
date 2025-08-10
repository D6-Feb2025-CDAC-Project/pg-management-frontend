import React from "react";
import "./LogoLoader.css";
import logo from "../../assets/images/Logo3-cropped.svg";

const LogoLoader = () => {
  return (
    <div className="loader-wrapper">
      {/* Logo */}
      <div className="logo-circle">
        <img src={logo} alt="LOGO" className="w-20" />
      </div>

      {/* Title */}
      <h1 className="title">
        {"Easy PG".split("").map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.15}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default LogoLoader;
