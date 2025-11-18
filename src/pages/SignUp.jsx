import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      // yaha per [e.target.id] bracket ke ander is liay lkha gaya hai q ke e.target.id object hai or hamay is ki value ko point kerna hai
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      // basically fetch method req bej ra hai  per server se jo response ara hai wo us ko return ker ra hai is liay hum ne const res = await fetch() lagaya hai na ke const req = await fetch()
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7 ">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="p-3 rounded-lg border-none bg-white"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 rounded-lg border-none bg-white"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 rounded-lg border-none bg-white"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer flex justify-center items-center font-bold"
        >
          {/* {isLoading ? "Loading..." : "Sign Up"} */}
          {isLoading ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> //this dive creates loader symbol
          ) : (
            "Sign Up"
          )}
        </button>
        {/* Google auth funtionality */}
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
