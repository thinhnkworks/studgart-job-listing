import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const PasswordNew: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer newestOnTop />
      <div className="bg-white p-8 rounded-[24px] shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-left">
          Set Your New Password
        </h2>
        <hr className="mb-4 border-gray-300 w-full" />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <FaLock className="ml-3 text-gray-400" />
            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <FaLock className="ml-3 text-gray-400" />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm New Password"
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <p className="text-[#858585] mb-4">
          Your password must be at least 8 characters long.
        </p>

        <button
          className="bg-[#007acc] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PasswordNew;
