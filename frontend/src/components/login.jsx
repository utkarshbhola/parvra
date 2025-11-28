import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/AxiosInstance";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("Trying login with:", form.email);

      // 1️⃣ LOGIN
      await login(form.email, form.password);

      // 2️⃣ USER NOW AVAILABLE FROM CONTEXT
      const userId = user?.id;
      if (!userId) {
        console.log("User not loaded yet");
        return;
      }

      // 3️⃣ CHECK IF PROFILE EXISTS
      const res = await API.get(`/profiles/check`);
      const exists = res.data?.exists;

      // 4️⃣ REDIRECT BASED ON PROFILE EXISTENCE
      if (exists) {
        console.log("Profile exists → redirecting to /app");
        navigate("/app");
      } else {
        console.log("Profile missing → redirecting to /Onboarding");
        navigate("/Onboarding");
      }

    } catch (err) {
      console.error(err);
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
