import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚫 Unauthorized Access</h1>
      <p style={styles.message}>
        You do not have permission to view this page.
      </p>
      <Link
        to={
          user.role === "ROLE_USER"
            ? "/tenant/dashboard"
            : user.role === "ROLE_ADMIN"
            ? "/admin/dashboard"
            : "/guest/dashboard"
        }
        style={styles.link}
      >
        Go Back
      </Link>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    color: "#333",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    color: "#e63946",
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  link: {
    fontSize: "1rem",
    textDecoration: "none",
    backgroundColor: "#6E39A3",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
  },
};
