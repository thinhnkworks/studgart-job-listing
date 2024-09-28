import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer newestOnTop />
      <div className="bg-white p-8 rounded-[24px] shadow-md w-full max-w-sm flex flex-col items-center">
        <div className="flex justify-start w-full mb-4">
          <button
            className="text-gray-500 text-2xl"
            onClick={() => navigate("/login")}
          >
            &larr;
          </button>
        </div>
        <img
          className="h-[50px] mb-4"
          src="/images/FPT_Logo.svg"
          alt="FPT Logo"
        />
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        <div className="mb-4 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Username or primary email
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <FaEnvelope className="ml-3 text-gray-400" />
            <input
              type="email"
              id="email"
              placeholder="Username or primary email"
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-[#007acc] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default PasswordReset;
