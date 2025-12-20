import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiLoginBoxLine,
  RiShieldCheckLine,
} from "@remixicon/react";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/admin/login`, {
        email,
        password,
      });

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("adminToken", data.token);
        toast.success("Login Successful");
        // Redirect to dashboard (to be created)
        navigate("/admin-dashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-base-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <RiShieldCheckLine size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 font-display">
              Admin Portal
            </h2>
            <p className="mt-2 text-gray-500">
              Secure access for authorized personnel only
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-primary transition-all h-12"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input input-bordered w-full bg-gray-50 focus:bg-white focus:outline-none focus:border-primary transition-all pr-12 h-12"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-primary transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <RiEyeOffLine size={20} />
                    ) : (
                      <RiEyeLine size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full h-12 text-white text-lg font-normal shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <>
                    Sign In <RiLoginBoxLine size={20} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            &copy; 2025 Khasra Khatauni Admin Console
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
