import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) return <p className="p-6">Checking session...</p>;
  if (!user) return <Navigate to="/login" />;

  return children;
}
