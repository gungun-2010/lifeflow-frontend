import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';
import API from "../api/axios";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateLogin = () => {

    let newErrors = {};

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {

      newErrors.email =
        "Email is required";

    } else if (
      !emailRegex.test(email)
    ) {

      newErrors.email =
        "Please enter a valid email address";

    }

    if (!password) {

      newErrors.password =
        "Password is required";

    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!validateLogin()) return;

    toast.promise(

      async () => {

        console.log(
          "LOGIN ATTEMPT:",
          email
        );

        const response =
          await API.post(

            "/auth/login",

            {
              email,
              password
            }

          );

        console.log(
          "FULL LOGIN RESPONSE:",
          response.data
        );

        if (
          response.data.success
        ) {

          const userData =
            response.data.user;

          console.log(
            "USER DATA:",
            userData
          );

          console.log(
            "USER ROLE:",
            userData.role
          );

          // SAVE USER

          localStorage.setItem(
            "user",
            JSON.stringify(userData)
          );

          if (
            response.data.token
          ) {

            localStorage.setItem(
              "token",
              response.data.token
            );

          }

          console.log(
            "LOCAL STORAGE SAVED"
          );

          const userRole =
            userData.role?.toLowerCase();

          console.log(
            "NAVIGATING TO ROLE:",
            userRole
          );

          if (
            userRole === "admin"
          ) {

            navigate(
              "/admin-panel"
            );

          }

          else if (
            userRole === "hospital"
          ) {

            navigate(
              "/hospital-dashboard"
            );

          }

          else if (
            userRole === "donor"
          ) {

            navigate(
              "/dashboard"
            );

          }

          else {

            console.log(
              "UNKNOWN ROLE:",
              userRole
            );

            navigate("/");

          }

          return `Welcome back, ${userData.name}!`;

        }

        throw new Error(
          response.data.message ||
          "Login failed"
        );

      },

      {
        loading:
          "Verifying credentials...",

        success: (msg) => msg,

        error: (err) =>
          err.message ||
          "Invalid email or password"
      }

    );

  };

  return (

    <div className="w-full pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-center">

      <Toaster
        position="top-right"
        richColors
      />

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-10">

        <div className="flex flex-col items-center mb-10">

          <div className="w-16 h-16 bg-red-50 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-inner rotate-3">

            <LogIn
              className="text-red-600"
              size={32}
            />

          </div>

          <h2 className="text-4xl font-black text-gray-900">

            Welcome Back

          </h2>

          <p className="text-gray-500 mt-2 font-medium">

            Manage your life-saving profile

          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>

            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">

              Email Address

            </label>

            <div className="relative group">

              <Mail
                className={`absolute left-4 top-4 ${
                  errors.email
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
                size={20}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => {

                  setEmail(
                    e.target.value
                  );

                  if (
                    errors.email
                  ) {

                    setErrors({
                      ...errors,
                      email: ""
                    });

                  }

                }}
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border"
              />

            </div>

            {errors.email && (

              <p className="text-red-500 text-xs font-bold mt-2">

                {errors.email}

              </p>

            )}

          </div>

          <div>

            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">

              Password

            </label>

            <div className="relative group">

              <Lock
                className={`absolute left-4 top-4 ${
                  errors.password
                    ? "text-red-400"
                    : "text-gray-400"
                }`}
                size={20}
              />

              <input
                type="password"
                value={password}
                onChange={(e) => {

                  setPassword(
                    e.target.value
                  );

                  if (
                    errors.password
                  ) {

                    setErrors({
                      ...errors,
                      password: ""
                    });

                  }

                }}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border"
              />

            </div>

            {errors.password && (

              <p className="text-red-500 text-xs font-bold mt-2">

                {errors.password}

              </p>

            )}

          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black hover:bg-red-600 transition-all"
          >

            Sign In

          </button>

        </form>

      </div>

    </div>

  );

};

export default Login;