import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

interface SignInFormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email: data.email, password: data.password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("the response:", res)

      // Check for token
      const token = res.data?.token;
      if (!token) throw new Error("No token returned from server");

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Show success toast
      toast.success(res.data?.message || "Login successful!");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Invalid email or password!";
      toast.error(msg);
      console.error("Login error:", error?.response?.data || error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Sign In
          </button>

          {/* Redirect */}
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
