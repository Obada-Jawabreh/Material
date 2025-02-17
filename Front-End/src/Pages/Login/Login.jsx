import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/api/user/login", {
        email,
        password,
      });
      
      if (response.status === 200) {
        Swal.fire("Success", "Login successful!", "success");
        navigate("/home"); // Navigate to the home page after successful login
      }
    } catch (error) {
      Swal.fire("Error", "Invalid credentials. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-center text-2xl font-semibold text-[#181d27] mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-[#7B7979] text-sm font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46B1C1]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-[#7B7979] text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46B1C1]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2960EC] text-white py-2 rounded-lg hover:bg-[#17398EEE] transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-[#7B7979]">
            Don't have an account?{" "}
            <a href="/register" className="text-[#2960EC] hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
