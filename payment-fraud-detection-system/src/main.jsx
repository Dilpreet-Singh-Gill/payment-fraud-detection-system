import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";
import { TransactionProvider } from "./context/TransactionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransactionProvider>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </TransactionProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);