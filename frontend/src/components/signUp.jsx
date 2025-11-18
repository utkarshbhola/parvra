import { useState } from "react";
import API from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    await API.post("/auth/signup", form);
    alert("Signup successful! Now login.");
    navigate("/login");
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}
