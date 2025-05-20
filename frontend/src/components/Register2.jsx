import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [Error, setError] = useState(false);
  const [Succes, setSucces] = useState(false);
  const navigate = useNavigate();

  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...Values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSucces("")
    if (!Values.username || !Values.email || !Values.password) {
      setError(" All fiels are required!...");
    }
    try {
      const response = await axios.post("http://localhost:2000/register", Values);
      setSucces(response.data.message)
      console.log(response);
      
      if (response) {
        navigate('/login2')
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message)
      
      
    }


  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>
        <div>
          {Error && (
            <div className="p-2 bg-red-500/30 text-red-500 rounded">
              {" "}
              {Error}
            </div>
          )}
        </div>
        <div>
          {Succes && (
            <div className="p-2 bg-green-500/20 text-green-700 rounded">
              {" "}
              {Succes}
            </div>
          )}
        </div>
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
              onChange={handleChange}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              name="email"
              value={Values.email}
              onChange={handleChange}
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
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
              onChange={handleChange}
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Sign Up
          </button>

          <p>
            have an account{" "}
            <Link to="/login2" className=" text-indigo-600 hover:underline">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
