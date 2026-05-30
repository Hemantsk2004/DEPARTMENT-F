"use client";

import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { User } from "@/types/user";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-slate-400 py-10">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <p className="text-slate-500 text-sm">
            Total Users
          </p>
          <p className="text-3xl font-bold text-blue-400">
            {users.length}
          </p>
        </div>

        <div className="glass-card p-5">
          <p className="text-slate-500 text-sm">
            Students
          </p>
          <p className="text-3xl font-bold text-green-400">
            {
              users.filter(
                (u) => u.role === "student"
              ).length
            }
          </p>
        </div>

        <div className="glass-card p-5">
          <p className="text-slate-500 text-sm">
            Lecturers
          </p>
          <p className="text-3xl font-bold text-purple-400">
            {
              users.filter(
                (u) => u.role === "lecturer"
              ).length
            }
          </p>
        </div>

        <div className="glass-card p-5">
          <p className="text-slate-500 text-sm">
            Admins
          </p>
          <p className="text-3xl font-bold text-red-400">
            {
              users.filter(
                (u) => u.role === "admin"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Users List */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            Registered Users
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition"
            >
              <div>
                <h3 className="text-white font-medium">
                  {user.name}
                </h3>

                <p className="text-slate-400 text-sm">
                  {user.email}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-red-500/20 text-red-400"
                    : user.role === "lecturer"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}