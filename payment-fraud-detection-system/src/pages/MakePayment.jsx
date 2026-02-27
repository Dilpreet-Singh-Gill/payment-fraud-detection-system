import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import { toast } from "react-toastify";

function MakePayment() {
  const { transactions, addTransaction } = useTransactions();

  const [formData, setFormData] = useState({
    amount: "",
    merchant: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);

    // 🧠 Simple Risk Scoring Logic
    let riskScore = 0;

    // Rule 1: High amount increases risk
    if (amount > 50000) riskScore += 50;
    else if (amount > 20000) riskScore += 30;
    else riskScore += 10;

    // Rule 2: Suspicious merchant keywords
    const suspiciousKeywords = ["crypto", "casino", "bet", "lottery"];
    if (
      suspiciousKeywords.some((word) =>
        formData.merchant.toLowerCase().includes(word)
      )
    ) {
      riskScore += 30;
    }

    // Rule 3: Random behavioral factor (simulate ML uncertainty)
    riskScore += Math.floor(Math.random() * 20);

    // Cap at 100
    if (riskScore > 100) riskScore = 100;

    let status = "LOW";
    if (riskScore > 70) status = "HIGH";
    else if (riskScore > 40) status = "MEDIUM";

    const newTransaction = {
      id: Date.now(),
      ...formData,
      riskScore,
      status,
      date: new Date().toLocaleString(),
    };

    addTransaction(newTransaction);

    // 🔥 Smart Alert
    if (status === "HIGH") {
      toast.error(`🚨 High Fraud Risk (${riskScore}%)`, {
        theme: "colored",
      });
    } else if (status === "MEDIUM") {
      toast.warning(`⚠ Medium Risk (${riskScore}%)`, {
        theme: "colored",
      });
    } else {
      toast.success(`✅ Low Risk (${riskScore}%)`, {
        theme: "colored",
      });
    }

    setFormData({
      amount: "",
      merchant: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Make a Payment
        </h1>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 mb-8">

          <input
            type="number"
            name="amount"
            required
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount (₹)"
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="merchant"
            required
            value={formData.merchant}
            onChange={handleChange}
            placeholder="Merchant"
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="md:col-span-3 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Payment
          </button>
        </form>

        {/* Transactions Table */}
        <h2 className="text-xl font-semibold mb-4">
          Transaction History
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Merchant</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b">

                    <td className="p-3">{tx.date}</td>
                    <td className="p-3">₹{tx.amount}</td>
                    <td className="p-3">{tx.merchant}</td>
                    <td className="p-3">{tx.description}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${tx.status === "HIGH"
                            ? "bg-red-500"
                            : tx.status === "MEDIUM"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                      >
                        {tx.status} ({tx.riskScore}%)
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default MakePayment;