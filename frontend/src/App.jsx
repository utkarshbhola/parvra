import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Context/AuthContext";

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

  // Wait for user to load
  if (user === undefined) return <div>Loading...</div>;

  // Not logged in
  if (user === null) return <Navigate to="/login" replace />;

  // Logged in
  return children;
}

/* ================================
   LOGIN PAGE (FIXED)
================================ */
function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- useNavigate correctly
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/app", { replace: true }); // <-- NO MORE window reload
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">Login</h2>

        <input
          type="email"
          className="p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-black text-white p-2 rounded">Login</button>

        <p>
          Don't have an account?{" "}
          <a href="/signup" className="underline">Signup</a>
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
    navigate("/app", { replace: true });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">Signup</h2>

        <input
          type="email"
          className="p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-black text-white p-2 rounded">Signup</button>

        <p>
          Have an account? <a href="/login" className="underline">Login</a>
        </p>
      </form>
    </div>
  );
}

/* ================================
   MAIN APP UI
================================ */
function MainApp() {
  const [activePanel, setActivePanel] = useState(null);

  const getPanelContent = () => {
    switch (activePanel) {
      case "communities":
        return <CommunitiesPanel />;
      case "events":
        return <EventsPanel />;
      case "friends":
        return <FriendsPanel />;
      default:
        return null;
    }
  };

  const isPanelOpen =
    activePanel && activePanel !== "create" && getPanelContent() !== null;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />

        <SlidePanel
          isOpen={isPanelOpen}
          onClose={() => setActivePanel(null)}
          content={getPanelContent()}
        />

        <div className="flex-1 relative overflow-hidden z-0">
          <MapView />
        </div>
      </div>

      {activePanel === "create" && (
        <CreatePopup onClose={() => setActivePanel(null)} />
      )}
    </div>
  );
}

/* ================================
   FINAL ROUTER
================================ */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />

          {/* default route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
