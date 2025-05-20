import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Login() {
  const [Error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const handlechange = (e) => {
    setValues({
      ...Values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // if (!Values.username || !Values.password) {
    //   setError("Please all fields are required....");
    // }

    try {
      const response = await api.post("/login", Values);
      if (response.data) {
        localStorage.setItem("user__token", response.data.token);
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>{" "}
        {Error && <div>{Error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              name="username"
              value={Values.username}
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
              value={Values.password}
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
            <Link to="/register2" className=" text-indigo-600 hover:underline">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
