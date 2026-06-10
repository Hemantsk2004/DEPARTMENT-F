"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth.service";
import { User } from "@/types/user";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    name: user?.name || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.updateUser(user!._id, formData);
      // @ts-expect-error context type mismatch
      setUser((prev) => ({ ...prev, ...formData }));
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const roleColor =
    user?.role === "admin"
      ? { bg: "rgba(239,68,68,0.1)", color: "#f87171" }
      : user?.role === "lecturer"
      ? { bg: "rgba(139,92,246,0.1)", color: "#a78bfa" }
      : { bg: "rgba(16,185,129,0.1)", color: "#34d399" };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div
        className="glass-card p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(15,23,42,0.9))",
        }}
      >
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "#f1f5f9",
          }}
          className="text-3xl font-bold"
        >
          My Profile
        </h1>

        <p
          style={{ color: "#64748b" }}
          className="mt-2"
        >
          Manage your account information and track your academic journey.
        </p>
      </div>

      {/* Profile card */}
      <div className=" glass-card  p-8  flex  items-center  gap-6  transition-all duration-300 hover:border-blue-500/30">
        <div
          style={{ background: "#1d4ed8", width: 72, height: 72, borderRadius: "50%", flexShrink: 0 }}
          className="flex items-center justify-center text-white text-2xl font-bold"
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }} className="text-lg font-semibold mb-1">
            {user?.name}
          </h2>
          <p style={{ color: "#475569" }} className="text-sm mb-2">
            {user?.email}
          </p>
          <span
            style={{ background: roleColor.bg, color: roleColor.color }}
            className="badge"
          >
            {user?.role}
          </span>
          <p className="text-slate-500 text-sm mt-3">
            Member of CampusLink X
          </p>
        </div>
      </div>

    <div className="grid md:grid-cols-3 gap-4">

      <div className="glass-card p-5">
        <p className="text-slate-500 text-sm">
          Role
        </p>

        <p className="text-white text-xl font-bold mt-2 capitalize">
          {user?.role}
        </p>
      </div>

      <div className="glass-card p-5">
        <p className="text-slate-500 text-sm">
          Account Status
        </p>

        <p className="text-green-400 text-xl font-bold mt-2">
          Active
        </p>
      </div>

      <div className="glass-card p-5">
        <p className="text-slate-500 text-sm">
          Platform
        </p>

        <p className="text-blue-400 text-xl font-bold mt-2">
          CampusLink X
        </p>
      </div>

    </div>
      {/* Edit form */}
      <div className="glass-card p-6">
        <div className="mb-6">

          <h3
            style={{
              fontFamily:
                "'Syne', sans-serif",
              color: "#f1f5f9",
            }}
            className="text-xl font-semibold"
          >
            Personal Information
          </h3>

          <p className="text-slate-500 text-sm mt-1">
            Update your profile details.
          </p>

        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }} className="block mb-1.5">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              className="input-dark"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 500 }} className="block mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className="input-dark"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="btn-accent px-6 py-2">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}