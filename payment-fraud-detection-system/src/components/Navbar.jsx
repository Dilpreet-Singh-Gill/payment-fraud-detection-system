import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  if (!role) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Fraud Detection System</h1>

      <div className="flex items-center gap-6">
        {role === "USER" && (
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        )}

        {role === "ADMIN" && (
          <Link to="/admin/dashboard" className="hover:text-gray-300">
            Admin Dashboard
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;