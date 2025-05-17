import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/signup`, {
        username,
        password,
      });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Error from backend while signing up");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-pink-500 via-purple-700 to-indigo-900 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-bold mb-6">Create an Account</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="flex flex-col items-center w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 px-4 py-3 rounded-full text-black w-full bg-white"
          />

          <div className="relative w-full mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full text-black bg-white pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-900 font-bold"
            >
              <div className="cursor-pointer">
                {showPassword ? "Hide" : "Show"}
              </div>
            </button>
          </div>

          <button
            type="submit"
            className="bg-yellow-400 text-indigo-900 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-yellow-300" onClick={() => navigate("/login")}>
          Already have an account?{" "}
          <span className="cursor-pointer hover:text-lg font-semibold">
            Log in
          </span>
        </p>

        <Footer />
      </div>
    </>
  );
}
