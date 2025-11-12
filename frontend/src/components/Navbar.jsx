import { useState } from "react";
import SearchBar from "./SearchBar";
import ProfilePopup from "./ProfilePopUp";

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

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

        {/* Profile / Avatar */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setShowProfile(true)}
        >
          <span className="text-gray-300">Hi, Parvra</span>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Parvra"
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
