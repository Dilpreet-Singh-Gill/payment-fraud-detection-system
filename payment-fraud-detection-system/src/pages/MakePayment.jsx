import { useState } from "react";

function MakePayment() {
  const [formData, setFormData] = useState({
    amount: "",
    merchant: "",
    description: "",
  });

  const [transactions, setTransactions] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amountNumber = parseFloat(formData.amount);
    const status = amountNumber > 50000 ? "FRAUD" : "SUCCESS";

    const newTransaction = {
      id: Date.now(),
      ...formData,
      status,
      date: new Date().toLocaleString(),
    };

    setTransactions([newTransaction, ...transactions]);

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
                        className={`px-3 py-1 rounded-full text-white text-sm ${tx.status === "FRAUD"
                            ? "bg-red-500"
                            : "bg-green-500"
                          }`}
                      >
                        {tx.status}
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