import { useState } from "react";
import API from "../api/AxiosInstance";

export default function OnboardingPage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Starter"
  );

  const avatars = ["CoderFox", "AstroTiger", "PixelWolf", "ZenBear", "NeonCat"];

  const handleSubmit = async () => {
    await API.put("/user/update", {
      username,
      bio,
      profile_photo_url: avatar,
    });

    window.location.href = "/app"; // finish onboarding → go inside app
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-6">Set up your profile</h1>

      {/* Username */}
      <input
        type="text"
        placeholder="Choose a username"
        className="border p-2 mb-4 w-80"
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Bio */}
      <textarea
        placeholder="Short bio"
        className="border p-2 mb-4 w-80"
        onChange={(e) => setBio(e.target.value)}
      />

      {/* Avatars */}
      <div className="flex gap-4 mb-4">
        {avatars.map((seed) => (
          <img
            key={seed}
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
            className={`w-16 h-16 rounded-full cursor-pointer ${
              avatar.includes(seed) ? "ring-4 ring-yellow-400" : ""
            }`}
            onClick={() =>
              setAvatar(
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
              )
            }
          />
        ))}
      </div>

      {/* Submit */}
      <button
        className="bg-black text-white p-2 rounded w-80"
        onClick={handleSubmit}
      >
        Save & Continue
      </button>
    </div>
  );
}
