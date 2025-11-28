import { useState, useContext, useEffect } from "react";
import { X } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import API from "../api/AxiosInstance";

export default function ProfilePopup({ onClose }) {
  const { user, fetchUser } = useContext(AuthContext);

  // Local editable copies
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  // Sync local state ONLY after user loads
  useEffect(() => {
    if (user) {
      setBio(user.bio || "");
      setPhone(user.Phone_number || "");
    }
  }, [user]);

  if (!user) return null; // safety

  const username = user.username || "User";
  const avatar =
    user.profile_photo_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  async function saveChanges() {
    setSaving(true);
    try {
      await API.put("/profiles/update", {
        bio,
        phone_number: phone,
      });

      await fetchUser();   // refresh global user
      setEditing(false);

    } catch (err) {
      alert(err.response?.data?.error || "Failed to update");
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

        {/* CONTENT */}
        <div className="flex flex-col items-center text-center space-y-4">

          {/* Avatar */}
          <img
            src={avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-400"
          />

          {/* Username */}
          <h2 className="text-2xl font-bold text-gray-900">{username}</h2>

          {/* BIO */}
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

          {/* Phone Number */}
          {editing ? (
            <input
              value={phone}
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 rounded w-full text-gray-800"
            />
          ) : (
            <p className="text-gray-700">📱 {phone || "No phone added"}</p>
          )}

          {/* Edit / Save Button */}
          <button
            onClick={editing ? saveChanges : () => setEditing(true)}
            className="text-sm text-yellow-600 hover:underline"
          >
            {editing ? (saving ? "Saving..." : "Save Changes") : "Edit Profile"}
          </button>

        </div>

      </div>
    </div>
  );
}
