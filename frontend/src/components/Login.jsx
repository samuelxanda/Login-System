import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [Error, setError] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handlechange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!values.username || !values.password) {
      return setError("Please or field are required!!");
    }

    try {
      
    const response = await axios.post("http://localhost:3000/login", values);
    if (response.data) {
      localStorage.setItem("login_token", response.data.token);
      navigate("/");
    }
    } catch (error) {
      setError(error.response?.data?.message || error.message)
    }

  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {Error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {Error}
            </div>
          )}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              name="username"
              value={values.username}
              onChange={handlechange}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              name="password"
              value={values.password}
              onChange={handlechange}
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Sign In
          </button>

          <p>
            Don't have an account{" "}
            <Link to="/register" className=" text-indigo-600 hover:underline">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
