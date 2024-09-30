/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from '../../lib/reducers/auth/Register'; // Chỉ import hàm register

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [role, setRole] = useState<string>("job_seeker");
  const [bio, setBio] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const registerData = {
        email,
        password,
        username,
        fullName,
        phone,
        address,
        role,
        bio,
      };

      // Log data being sent for inspection
      console.log("Dữ liệu được gửi đi:", registerData);

      // Call the register function with the user data
      const response = await register(registerData);
      toast.success("Registration successful!");
      localStorage.setItem("userEmail", email);
      // Chờ 2 giây trước khi chuyển hướng
      setTimeout(() => {
        navigate("/login"); // Quay về trang login
      }, 2000); // Delay 2000ms (2 giây)

      console.log("Registration response:", response);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Registration failed:", error.message);
        toast.error("Error during registration.");
      } else {
        console.error("Unexpected error during registration:", error);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer newestOnTop />
      <div className="bg-white p-8 rounded-[24px] shadow-md w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="flex h-full justify-center items-center">
            <img className="h-[50px]" src="/images/FPT_Logo.svg" alt="FPT Logo" />
          </div>
          <h2 className="text-2xl font-bold">STUDGART</h2>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Minimum length is 8 characters"
              className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-0 pr-3"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Phone number"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          >
            <option value="job_seeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            placeholder="Tell us about yourself"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Register Button */}
        <button
          className="bg-[#007acc] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading && <FaSpinner className="mr-2 animate-spin" />}
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-sm text-[#007acc] hover:text-blue-800"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
