// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const disptach = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation()
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await loginUser(data).unwrap();
      console.log(response)
      // eslint-disable-next-line no-unused-vars
      const {token, user} = response;

      disptach(setUser({user}))

      alert("Login successful");
      navigate("/");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <section className="image1">
      <section className="h-screen flex items-center justify-center min-h-screen">
        <div className="max-w-sm border shadow bg-white mx-auto p-8 rounded-lg">
          <h2 className="text-2xl font-semibold pt-5">Login</h2>
          <form
            onSubmit={handleLogin}
            className="space-y-5 pt-5 text-center text-gray-800 mx-auto pt-8"
            action="space-y-6  max-w-sm  text-center text-gray-800 mx-auto pt-8"
          >
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full bg-gray-100 border border-gray-300 rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full rounded-md px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray facus:outline-none px-5 py-3 "
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
              Login
            </button>
          </form>
          <p className="my-5 italic text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="clr underline">
              Register
            </Link>{" "}
            here.
          </p>
        </div>
      </section>
    </section>
  );
};

export default Login;
