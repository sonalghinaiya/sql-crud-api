import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-7xl font-bold text-gray-900 mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-600 text-center max-w-md mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
      >
        Go Back Home
      </button>
    </div>
  );
}