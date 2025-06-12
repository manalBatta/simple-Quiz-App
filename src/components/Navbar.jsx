import React from "react";
import "./Navbar.css";

function Navbar({ currentPage, setPage }) {
  return (
    <nav className="navbar">
      <div
        className={`nav-item ${currentPage === "home" ? "active" : ""}`}
        onClick={() => setPage("home")}
      >
        Home
      </div>
      <div
        className={`nav-item ${currentPage === "admin" ? "active" : ""}`}
        onClick={() => setPage("admin")}
      >
        Admin
      </div>
      <div
        className={`nav-item ${currentPage === "quiz" ? "active" : ""}`}
        onClick={() => setPage("quiz")}
      >
        Take Quiz
      </div>
      <div
        className={`nav-item ${currentPage === "leaderboard" ? "active" : ""}`}
        onClick={() => setPage("leaderboard")}
      >
        Leaderboard
      </div>
    </nav>
  );
}

export default Navbar;
