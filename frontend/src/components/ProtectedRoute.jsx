import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user === undefined) return <div>Loading...</div>; // <-- WAIT
  if (user === null) return <Navigate to="/login" replace />; // BLOCK
  return children; // ALLOW
}
