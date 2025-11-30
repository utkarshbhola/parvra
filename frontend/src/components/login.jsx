import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("Trying login with:", form);

      // 1️⃣ Login (sets token + fetchUser in context)
      await login(form.email, form.password);

      // 2️⃣ Immediately go to /app
      navigate("/app");

      // ProtectedRoute will redirect to /onboarding if needed

    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
