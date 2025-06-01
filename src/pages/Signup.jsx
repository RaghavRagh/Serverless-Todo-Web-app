import { User } from "lucide-react";
import { useState } from "react";
// import api from "../services/api";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useAuth";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [formError, setFormError] = useState(null);
  const { mutate, isPending, isError, error } = useSignup();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        if (data?.message === "User already exists") {
          setFormError(data.message);
          return;
        }
        if (data?.error) {
          setFormError(data.error || null);
          return;
        }

        navigate("/confirm");
      },
      onError: (err) => {
        console.error("Signup error:", err);
        setFormError(
          err?.response?.data?.error || err.message || "Unknown error"
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md shadwow-lg">
          <div className="flex flex-col items-center mb-6 gap-2">
            <div className="bg-blue-200 w-20 h-20 rounded-full flex items-center justify-center shadow">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-center mt-5">
              Create account
            </h2>
            <p className="text-sm text-gray-500">Sign up to your account</p>
            {(formError || isError) && (
              <p className="text-red-600 text-center leading-none">
                {formError || error?.response?.data?.error || "Signup failed"}
              </p>
            )}
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Name
              </label>
              <input
                type="name"
                id="name"
                className="text-sm w-full p-2 border border-gray-300 rounded-md transition-all duration-200 outline-none focus:border-slate-500"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="text-sm w-full p-2 border border-gray-300 rounded-md transition-all duration-200 outline-none focus:border-slate-500"
                required
                placeholder="abc@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-slate-500"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <div className="text-center mt-6">
            <Link to="/login" className="text-sm text-blue-600">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
