import { useTransactions } from "../context/TransactionContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function AdminDashboard() {
  const { transactions } = useTransactions();

  const lowCount = transactions.filter(
    (tx) => tx.status === "LOW"
  ).length;

  const mediumCount = transactions.filter(
    (tx) => tx.status === "MEDIUM"
  ).length;

  const highCount = transactions.filter(
    (tx) => tx.status === "HIGH"
  ).length;

  const total = transactions.length;

  const data = [
    { name: "Low Risk", value: lowCount },
    { name: "Medium Risk", value: mediumCount },
    { name: "High Risk", value: highCount },
  ];

  const COLORS = ["#16a34a", "#eab308", "#dc2626"];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold">
          Admin Fraud Risk Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Total Transactions</p>
            <h2 className="text-2xl font-bold">{total}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Low Risk</p>
            <h2 className="text-2xl font-bold text-green-600">
              {lowCount}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Medium Risk</p>
            <h2 className="text-2xl font-bold text-yellow-500">
              {mediumCount}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">High Risk</p>
            <h2 className="text-2xl font-bold text-red-600">
              {highCount}
            </h2>
          </div>

        </div>

        {/* Pie Chart */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-6">
            Risk Distribution
          </h2>

          {total === 0 ? (
            <p className="text-gray-500">
              No transaction data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;