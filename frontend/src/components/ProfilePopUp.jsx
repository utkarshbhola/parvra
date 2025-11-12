import { useState } from "react";
import { X, Star } from "lucide-react";

export default function ProfilePopup({ onClose }) {
  const [about, setAbout] = useState("AI enthusiast and developer"); // editable 'Who are you?'
  const [editing, setEditing] = useState(false);

  // Example static user stats
  const user = {
    name: "Parvra",
    dp: "https://api.dicebear.com/7.x/avataaars/svg?seed=Parvra",
    events: 32,
    communities: 5,
  };

  // 🌟 Star calculation: 1 star per 10 events (max 5)
  const stars = Math.min(5, Math.floor(user.events / 10));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center space-y-3">
          <img
            src={user.dp}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-yellow-400"
          />
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>

          {/* Editable About Section */}
          {editing ? (
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="border p-2 rounded w-full text-gray-800"
            />
          ) : (
            <p className="text-gray-700 italic">{about}</p>
          )}
          <button
            onClick={() => setEditing(!editing)}
            className="text-sm text-yellow-600 hover:underline"
          >
            {editing ? "Save" : "Edit bio"}
          </button>

          {/* Stats */}
          <div className="flex justify-around w-full mt-4 text-gray-800">
            <div className="text-center">
              <p className="text-lg font-semibold">{user.events}</p>
              <p className="text-sm text-gray-500">Events</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">{user.communities}</p>
              <p className="text-sm text-gray-500">Communities</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex justify-center mt-4">
            {[...Array(stars)].map((_, i) => (
              <Star key={i} className="text-yellow-500 fill-yellow-500 w-5 h-5" />
            ))}
            {[...Array(5 - stars)].map((_, i) => (
              <Star key={i} className="text-gray-300 w-5 h-5" />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {stars}/5 Stars ({user.events} events)
          </p>
        </div>
      </div>
    </div>
  );
}
