import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const { role } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your transactions and monitor fraud alerts.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Total Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500 text-sm">Total Transactions</h3>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>

        {/* Successful Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500 text-sm">Successful Payments</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">10</p>
        </div>

        {/* Fraud Transactions */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500 text-sm">Fraud Alerts</h3>
          <p className="text-2xl font-bold text-red-600 mt-2">2</p>
        </div>

      </div>

      {/* Action Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            Make a New Payment
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Send money securely with fraud detection enabled.
          </p>
        </div>

        <button
          onClick={() => navigate("/make-payment")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Make Payment
        </button>
      </div>

    </div>
  );
}

export default UserDashboard;