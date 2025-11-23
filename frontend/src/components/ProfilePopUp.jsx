import { useState, useContext } from "react";
import { X, Star } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import API from "../api/AxiosInstance";

export default function ProfilePopup({ onClose }) {
  const { user, fetchUser } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [saving, setSaving] = useState(false);

  // Defaults from DB
  const username = user?.username || "User";
  const avatar =
    user?.profile_photo_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  const events = user?.events_count || 0; // you will fill this from DB later
  const communities = user?.communities_count || 0;

  const stars = Math.min(5, Math.floor(events / 10));

  async function saveBio() {
    setSaving(true);
    try {
      await API.put("/profiles/update", { bio });
      await fetchUser(); // refresh user info in context
      setEditing(false);
    } catch (err) {
      alert("Failed to update bio");
    }
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <div className="flex flex-col items-center text-center space-y-3">

          {/* Avatar */}
          <img
            src={avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-400"
          />

          {/* Username */}
          <h2 className="text-2xl font-bold text-gray-900">{username}</h2>

          {/* Editable Bio */}
          {editing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border p-2 rounded w-full text-gray-800"
            />
          ) : (
            <p className="text-gray-700 italic">
              {bio || "No bio added yet."}
            </p>
          )}

          <button
            onClick={editing ? saveBio : () => setEditing(true)}
            className="text-sm text-yellow-600 hover:underline"
          >
            {editing ? (saving ? "Saving..." : "Save") : "Edit bio"}
          </button>

          {/* Stats Row */}
          <div className="flex justify-around w-full mt-4 text-gray-800">
            <div className="text-center">
              <p className="text-lg font-semibold">{events}</p>
              <p className="text-sm text-gray-500">Events</p>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold">{communities}</p>
              <p className="text-sm text-gray-500">Communities</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center mt-4">
            {[...Array(stars)].map((_, i) => (
              <Star key={i} className="text-yellow-500 fill-yellow-500 w-5 h-5" />
            ))}
            {[...Array(5 - stars)].map((_, i) => (
              <Star key={i} className="text-gray-300 w-5 h-5" />
            ))}
          </div>

          <p className="text-sm text-gray-500">
            {stars}/5 Stars ({events} events)
          </p>
        </div>
      </div>
    </div>
  );
}
