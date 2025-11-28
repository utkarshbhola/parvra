import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function SignupPage() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form.email, form.password);
      alert("Signup successful!");
      navigate("/Onboading", { replace: true });
    } catch (err) {
      console.error("Signup failed:", err);
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">Signup</h2>

        <input
          type="email"
          className="p-2 border rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="p-2 border rounded"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-black text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
}
