import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/AxiosInstance";
import { AuthContext } from "../Context/AuthContext";

export default function Onboarding() {
  const { fetchUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    bio: "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Default",
  });

  const avatars = [
    "Harry", "Luna", "Nova", "Pixel", "Echo"
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await API.put("/onboarding", form);
      await fetchUser();             // refresh AuthContext
      navigate("/app");              // go to main app
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-6">Complete Your Profile</h1>

      <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
        {/* Avatar selection */}
        <label>Select Character Avatar</label>
        <div className="flex gap-2">
          {avatars.map((name) => (
            <img
              key={name}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
              className={`w-12 h-12 cursor-pointer rounded-full border
                ${form.avatar.includes(name) ? "border-yellow-400" : "border-gray-300"}
              `}
              onClick={() =>
                setForm({
                  ...form,
                  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
                })
              }
            />
          ))}
        </div>

        {/* Username */}
        <input
          type="text"
          placeholder="Choose a username"
          className="p-2 border rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        {/* Bio */}
        <textarea
          placeholder="Write about yourself"
          className="p-2 border rounded"
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <button className="bg-black text-white p-2 rounded">
          Save & Continue
        </button>
      </form>
    </div>
  );
}
