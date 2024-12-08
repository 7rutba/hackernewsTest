import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState(() =>
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a valid username.");
      return;
    }

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/users/${username}`
      );

      if (response.data && response.data.username) {
        setUserDetails(response.data);
        localStorage.setItem("userDetails", JSON.stringify(response.data));
        setError("");
        navigate("/dashboard?query=&page=0");
      } else {
        throw new Error("User not found.");
      }
    } catch (err) {
      setError("User not found. Please check the username.");
      setUserDetails(null);
      localStorage.removeItem("userDetails");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
