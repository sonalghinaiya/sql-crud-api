import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      toast.success(res.data.message || "Register Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Register to start managing your todos
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-200 block mb-2">Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-white/10 border border-gray-500 text-white placeholder-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white transition"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-200 block mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-gray-500 text-white placeholder-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-white transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-200 block mb-2">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-white/10 border border-gray-500 text-white placeholder-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-white transition"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition duration-300">
            Register
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-white font-semibold hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
