import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/AxiosInstance";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  // TEST BACKEND CONNECTION
  useEffect(() => {
    API.get("/")
      .then(() => console.log("Backend connected!"))
      .catch(() => console.log("Backend NOT connected"));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("Trying login with:", form.email);  // GOOD LOG
      await login(form.email, form.password);
      console.log("Login succeeded. Navigating to /app…");
      navigate("/app");
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
