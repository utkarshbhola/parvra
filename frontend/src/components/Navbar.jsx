import { useState, useContext } from "react";
import SearchBar from "./SearchBar";
import ProfilePopup from "./ProfilePopUp";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useContext(AuthContext);

  // Extract profile data
  const username = user?.username || user?.email?.split("@")[0] || "User";
  const avatar =
    user?.profile_photo_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  return (
    <>
      <div className="flex items-center justify-between bg-gray-900 text-white px-6 py-3 shadow-md">

        {/* App Name */}
        <h1 className="text-2xl font-bold tracking-wide text-yellow-400">
          Parvra
        </h1>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        {/* Profile Section */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setShowProfile(true)}
        >
          <span className="text-gray-300">Hi, {username}</span>

          <img
            src={avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-yellow-400"
          />
        </div>
      </div>

      {/* Profile Popup */}
      {showProfile && <ProfilePopup onClose={() => setShowProfile(false)} />}
    </>
  );
}
