"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

type User = { id: number; name: string; email: string };
type ModalType = "login" | "signup" | null;
type Toast = { msg: string; ok: boolean } | null;

export default function Home() {
  const router = useRouter();
  const [modal, setModal] = useState<ModalType>(null);
  const [user, setUser] = useState<User | null>(null);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sh_user");
    const token = localStorage.getItem("sh_token");
    if (saved && token) setUser(JSON.parse(saved));
  }, []);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const logout = () => {
    localStorage.removeItem("sh_token");
    localStorage.removeItem("sh_user");
    setUser(null);
    showToast("Logged out successfully");
  };

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    showToast(
      modal === "login"
        ? `Welcome back, ${u.name}! 👋`
        : `Account created! Welcome, ${u.name} 🎉`
    );
    setModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg text-white text-sm font-semibold animate-bounce
          ${toast.ok ? "bg-green-500" : "bg-red-500"}`}>
          {toast.ok ? (
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 md:px-12 py-4 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-800">
            Staff<span className="text-blue-500">MS</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-xl text-sm">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium truncate max-w-[120px]">{user.name}</span>
              </div>
              <button
                onClick={() => router.push("/StaffList")}
                className="px-3 sm:px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition shadow-md"
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className="px-3 sm:px-5 py-2 border border-gray-200 text-gray-500 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setModal("login")}
                className="px-3 sm:px-5 py-2 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition"
              >
                Login
              </button>
              <button
                onClick={() => setModal("signup")}
                className="px-3 sm:px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition shadow-md"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12">

          {/* Left text */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Staff Management System
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-5">
              Manage Your <br />
              <span className="text-blue-500">Team</span> with Ease
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Streamline staff records, departments, and organisation all in one powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              {user ? (
                <button
                  onClick={() => router.push("/StaffList")}
                  className="px-7 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition shadow-lg text-sm"
                >
                  Go to Dashboard →
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setModal("signup")}
                    className="px-7 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition shadow-lg text-sm"
                  >
                    Get Started →
                  </button>
                  <button
                    onClick={() => setModal("login")}
                    className="px-7 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition shadow-sm text-sm"
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            <div className="mt-10 flex gap-8 justify-center md:justify-start flex-wrap">
              {[
                { value: "Fast", label: "Performance" },
                { value: "Easy", label: "To Use" },
                { value: "Secure", label: "Data" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right illustration */}
          <div className="flex-1 flex justify-center w-full">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-60" />

              {/* Card 1 */}
              <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-36 sm:w-44 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">J</div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-700 truncate">John Doe</p>
                    <p className="text-xs text-gray-400">Engineering</p>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-1.5 bg-blue-400 rounded-full w-3/4" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute bottom-10 left-0 bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-32 sm:w-36 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Departments</p>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-800">12</p>
                <p className="text-xs text-green-500 font-semibold mt-1">↑ Active</p>
              </div>

              {/* Card 3 */}
              <div className="absolute bottom-0 right-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-32 sm:w-36 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Total Staff</p>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-800">48</p>
                <p className="text-xs text-blue-500 font-semibold mt-1">↑ Growing</p>
              </div>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-3xl shadow-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="px-4 sm:px-6 md:px-12 py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: "👥", title: "Staff Records", desc: "Add, update and manage all your staff members easily." },
            { icon: "🏢", title: "Departments", desc: "Organise staff into departments for clear structure." },
            { icon: "⚡", title: "Fast & Simple", desc: "Built for speed and simplicity — no complexity." },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md transition">
              <span className="text-4xl mb-3">{f.icon}</span>
              <h3 className="font-bold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-5 border-t border-gray-100">
        © {new Date().getFullYear()} StaffMS. All rights reserved.
      </footer>

      {/* Auth Modals */}
      {modal === "login" && (
        <LoginModal
          onClose={() => setModal(null)}
          onSwitchToSignup={() => setModal("signup")}
          onSuccess={handleAuthSuccess}
          onError={(msg) => showToast(msg, false)}
        />
      )}
      {modal === "signup" && (
        <SignupModal
          onClose={() => setModal(null)}
          onSwitchToLogin={() => setModal("login")}
          onSuccess={handleAuthSuccess}
          onError={(msg) => showToast(msg, false)}
        />
      )}
    </div>
  );
}