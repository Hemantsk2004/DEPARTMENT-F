"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { User } from "@/types/user";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  useEffect(() => {
  if (user?.role !== "admin") {
    setLoading(false);
    return;
  }

  const fetchUsers = async () => {
    try {
      const response =
        await userService.getAllUsers();

      setUsers(response.data);
    } catch {
      toast.error(
        "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, [user]);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const roleStyle = (role: string) => {
    if (role === "admin") return { bg: "rgba(239,68,68,0.1)", color: "#f87171" };
    if (role === "lecturer") return { bg: "rgba(139,92,246,0.1)", color: "#a78bfa" };
    return { bg: "rgba(16,185,129,0.1)", color: "#34d399" };
  };

  const counts = {
    total: users.length,
    students: users.filter((u) => u.role === "student").length,
    lecturers: users.filter((u) => u.role === "lecturer").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}
          className="text-2xl font-bold mb-1"
        >
          Manage Users
        </h1>
        <p style={{ color: "#475569" }} className="text-sm">
          View and manage all registered users
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: counts.total, color: "#3b82f6" },
          { label: "Students", value: counts.students, color: "#10b981" },
          { label: "Lecturers", value: counts.lecturers, color: "#8b5cf6" },
          { label: "Admins", value: counts.admins, color: "#ef4444" },
        ].map((stat, i) => (
          <div key={stat.label} className="glass-card p-5 fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <p className="stat-number" style={{ color: stat.color }}>{stat.value}</p>
            <p style={{ color: "#475569" }} className="text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div
        style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}
        className="p-4"
      >
        <input
          type="text"
          placeholder="Search by name, email or role..."
          className="input-dark"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="space-y-2 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="shimmer h-14 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["User", "Email", "Role", "Joined"].map((h) => (
                    <th
                      key={h}
                      style={{ color: "#334155", fontSize: 11, fontWeight: 600 }}
                      className="text-left px-5 py-3 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((u, i) => {
                    const rs = roleStyle(u.role);
                    return (
                      <tr
                        key={u._id}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              style={{ background: "#1d4ed8", width: 32, height: 32, borderRadius: "50%", flexShrink: 0 }}
                              className="flex items-center justify-center text-white text-xs font-semibold"
                            >
                              {u.name?.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ color: "#e2e8f0" }} className="text-sm font-medium">
                              {u.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span style={{ color: "#475569" }} className="text-sm">
                            {u.email}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span
                            style={{ background: rs.bg, color: rs.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999 }}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span style={{ color: "#334155" }} className="text-xs">
                            —
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center">
                      <p style={{ color: "#334155" }} className="text-sm">
                        No users found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}