// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";

const Register = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };
    try {
      await registerUser(data).unwrap();
      alert("Register successful");
      navigate("/login");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <section className="image1">
      <section className="h-screen flex items-center justify-center min-h-screen">
        <div className="max-w-sm border shadow bg-white mx-auto p-8 rounded-lg">
          <h2 className="text-2xl font-semibold pt-5">Register</h2>
          <form
            onSubmit={handleRegister}
            className="space-y-5 pt-5 text-center text-gray-800 mx-auto pt-8"
            action="space-y-6  max-w-sm  text-center text-gray-800 mx-auto pt-8"
          >
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              required
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full bg-gray-100 border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray facus:outline-none px-5 py-3 "
            />
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="space-y-6 w-full bg-gray-100 border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full bg-gray-100 border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray facus:outline-none px-5 py-3 "
            />

            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              className="space-y-6 w-full bg-gray-100 border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full bg-gray-100 border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full bg-gray facus:outline-none px-5 py-3"
            />

            {message && <p className="textred">{message} </p>}
            <button
              type="submit"
              className="space-y-6 btn w-full bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 transition duration-300"
            >
              Register
            </button>
          </form>
          <p className="my-5 italic text-sm text-center">
            Already have an account? Please{" "}
            <Link to="/login" className="clr underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </section>
  );
};

export default Register;
