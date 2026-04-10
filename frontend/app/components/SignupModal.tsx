"use client";
import { useState } from "react";
import { axiosIns } from "../services/api";
type User = { id: number; name: string; email: string };

interface SignupModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSuccess: (user: User) => void;
  onError: (msg: string) => void;
}

export default function SignupModal({
  onClose,
  onSwitchToLogin,
  onSuccess,
  onError,
}: SignupModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await axiosIns.post(`/api/auth/register`, { name, email, password });
      if (!data.success) throw new Error(data.message || "Something went wrong");
      localStorage.setItem("sh_token", data.token);
      localStorage.setItem("sh_user", JSON.stringify(data.user));
      onSuccess(data.user);
    } catch (e: any) {
      const msg = e.response?.data?.message || e.message || "Something went wrong";
      setError(msg);
      onError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm border border-gray-100">

        <div className="text-center mb-6">
          <div className="inline-flex w-14 h-14 bg-blue-100 rounded-2xl items-center justify-center mb-3">
            <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Sign up to get started</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-500 text-white rounded-xl font-semibold text-sm hover:bg-blue-600 transition shadow-md disabled:opacity-70 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating account...
              </span>
            ) : "Create Account"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-5">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-500 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}