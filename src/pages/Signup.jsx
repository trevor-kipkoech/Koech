import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignup(e) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-xl shadow-md border w-full max-w-md">
        <h1 className="text-2xl font-bold tracking-wide mb-6">Signup</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-black outline-none"
            required
          />

          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition">
            CREATE ACCOUNT
          </button>
        </form>

        {message && <p className="mt-4 text-red-500 text-sm">{message}</p>}

        <p className="mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
