import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error", "Passwords do not match.", "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8001/api/user/register",
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        }
      );

      if (response.status === 200) {
        Swal.fire("Success", response.message, "success");
        navigate("/login");
      } else {
        Swal.fire(
          "Error",
          "Unexpected error. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response ? error.response.data : error.message
      );
      Swal.fire(
        "Error",
        error.response
          ? error.response.data.message
          : "There was an issue registering your account. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-center text-2xl font-semibold text-[#181d27] mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-[#7B7979] text-sm font-medium"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full px-4 py-2 mt-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46B1C1]"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-[#7B7979] text-sm font-medium"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-2 mt-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46B1C1]"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
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
              name="email"
              className="w-full px-4 py-2 mt-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46B1C1]"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              className="w-full px-4 py-2 mt-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46B1C1]"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-[#7B7979] text-sm font-medium"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 mt-2 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#46B1C1]"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#46B1C1] text-white py-2 rounded-lg hover:bg-[#3d9b9b] transition-colors duration-200"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-[#7B7979]">
            Already have an account?{" "}
            <a href="/login" className="text-[#46B1C1] hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
