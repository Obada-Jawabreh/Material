import React from "react";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";

const NavBar = () => {
  const userName = "John Doe";
  const profileImage = "https://via.placeholder.com/40";

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/user/logout");
      if (response.status === 200) {
        console.log("Logged out successfully");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-[#1C2D69] p-4 flex justify-between items-center shadow-lg">
      {/* Logo or System Name */}
      <div className="text-xxl font-bold text-[#90A6F0] hover:text-[#46B1C1] transition duration-300 cursor-pointer">
        Materials Management
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <img
          src={profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-[#46B1C1]"
        />
        <span className="text-[#90A6F0] font-medium">{userName}</span>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-[#2960EC] text-white px-4 py-2 rounded-lg hover:bg-[#46B1C1] transition duration-300"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
