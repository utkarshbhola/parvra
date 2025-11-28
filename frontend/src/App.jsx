import { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import Onboarding from "./components/Onboarding";  // <-- Make sure this import exists
import Sidebar from "./components/Sidebar";
import SlidePanel from "./components/Sidepanel";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import CreatePopup from "./components/CreatePopUp";
import FriendsPanel from "./components/FriendsPanel";
import CommunitiesPanel from "./components/CommunitiesPanel";
import EventsPanel from "./components/EventsPanel";
import API from "./api/AxiosInstance";

/* ================================
   FIXED PROTECTED ROUTE
================================ */
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  const [shouldGoOnboarding, setShouldGoOnboarding] = useState(false);

  useEffect(() => {
    async function check() {
      if (user === undefined) return;   
      if (user === null) {              
        setChecking(false);
        return;
      }

      try {
        const res = await API.get("/profiles/check");
        if (!res.data.exists) {
          setShouldGoOnboarding(true);
        }
      } catch (err) {
        console.error("Onboarding check failed:", err);
      }
      setChecking(false);
    }

    check();
  }, [user]);

  if (checking || user === undefined) return <div>Loading…</div>;
  if (user === null) return <Navigate to="/login" replace />;
  if (shouldGoOnboarding) return <Navigate to="/onboarding" replace />;

  return children;
}

/* ================================
   LOGIN PAGE
================================ */
function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/app", { replace: true });
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">Login</h2>

        <input type="email" className="p-2 border rounded"
               placeholder="Email"
               onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" className="p-2 border rounded"
               placeholder="Password"
               onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="bg-black text-white p-2 rounded">Login</button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="underline">Signup</Link> 
          {/* ❌ You wrote <a> earlier; this is the FIX */}
        </p>
      </form>
    </div>
  );
}

/* ================================
   SIGNUP PAGE
================================ */
function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/signup", form);
    alert("Signup successful!");
    navigate("/Onboarding", { replace: true }); 
    {/* ❌ FIXED capitalization from /Onboarding */}
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">Signup</h2>

        <input type="email" className="p-2 border rounded"
               placeholder="Email"
               onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" className="p-2 border rounded"
               placeholder="Password"
               onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="bg-black text-white p-2 rounded">Signup</button>

        <p>
          Have an account?{" "}
          <Link to="/login" className="underline">Login</Link>  
          {/* ❌ FIXED <a> to <Link> */}
        </p>
      </form>
    </div>
  );
}

/* ================================
   MAIN APP UI (unchanged)
================================ */
function MainApp() { /* ... */ }

/* ================================
   ROUTER
================================ */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/Onboarding" element={<Onboarding />} /> 
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
