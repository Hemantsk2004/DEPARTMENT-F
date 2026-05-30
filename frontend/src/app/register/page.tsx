"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ background: "#020617", minHeight: "100vh" }}
      className="flex items-center justify-center px-4 py-12"
    >
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="w-full max-w-md fade-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div
              style={{ background: "#3b82f6" }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
            >
              <span className="text-white font-bold text-sm">CX</span>
            </div>
            <span
              style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}
              className="text-xl font-bold"
            >
              CampusLink <span style={{ color: "#3b82f6" }}>X</span>
            </span>
          </Link>
          <h1
            style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}
            className="text-2xl font-bold mb-2"
          >
            Create your account
          </h1>
          <p style={{ color: "#475569" }} className="text-sm">
            Join thousands of students and lecturers
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#0f172a",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }}
                className="block mb-1.5"
              >
                Full name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Aditya Sharma"
                className="input-dark"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }}
                className="block mb-1.5"
              >
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@university.edu"
                className="input-dark"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }}
                className="block mb-1.5"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="input-dark"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                style={{ color: "#94a3b8", fontSize: "13px", fontWeight: 500 }}
                className="block mb-1.5"
              >
                I am a...
              </label>
              <select
                name="role"
                className="input-dark"
                value={formData.role}
                onChange={handleChange}
                style={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#f1f5f9",
                  width: "100%",
                  outline: "none",
                }}
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full py-2.5 mt-2"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p
            style={{
              color: "#475569",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
            className="text-sm text-center mt-6 pt-6"
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{ color: "#60a5fa" }}
              className="font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}