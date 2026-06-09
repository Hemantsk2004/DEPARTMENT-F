"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { notificationService } from "@/services/notification.service";


const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/courses": "My Courses",
  "/dashboard/courses/new": "Create Course",
  "/dashboard/profile": "Profile",
  "/dashboard/users": "Manage Users",
  "/dashboard/ai-study": "AI Study Assistant",
  "/dashboard/rooms": "Study Rooms",
  "/dashboard/opportunities": "Opportunities",
  "/dashboard/portfolio": "My Portfolio",
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const pageTitle = pageTitles[pathname] ?? "CampusLink X";
  useEffect(() => {
  const fetchNotifications =
    async () => {
      try {
        const res =
          await notificationService.getNotifications();

        setNotifications(
          res.data || []
        );
      } catch (error) {
        console.error(error);
      }
    };

  if (user) {
    fetchNotifications();
  }
}, [user]);

  return (
    <nav
      style={{
        background: "#0f172a",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
      className="h-16 flex items-center justify-between px-6 sticky top-0 z-50"
    >
      {/* Left — page title or logo */}
      {user ? (
        <div>
          <h1
            style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}
            className="text-lg font-semibold"
          >
            {pageTitle}
          </h1>
        </div>
      ) : (
        <Link href="/" className="flex items-center gap-2">
          <div
            style={{ background: "#3b82f6" }}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
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
      )}

      {/* Right */}
      {user ? (
        <div className="flex items-center gap-4">
          {/* Notification bell */}
<div className="relative">

  <button
    onClick={() =>
      setShowNotifications(
        !showNotifications
      )
    }
    style={{
      background:
        "rgba(255,255,255,0.04)",

      border:
        "1px solid rgba(255,255,255,0.06)",

      color: "#94a3b8",
    }}
    className="w-9 h-9 rounded-lg flex items-center justify-center hover:text-white transition-colors relative"
  >
    🔔

    {notifications.some(
      (n) => !n.isRead
    ) && (
      <span
        style={{
          background:
            "#3b82f6",
        }}
        className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
      />
    )}
  </button>

  {showNotifications && (
    <div
      style={{
        background: "#0f172a",
        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
      className="absolute right-0 mt-2 w-80 rounded-xl shadow-xl overflow-hidden z-50"
    >
      <div className="p-3 border-b border-slate-800">
        <h3 className="text-white font-semibold">
          Notifications
        </h3>
      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 ? (
          <div className="p-4 text-slate-400 text-sm">
            No notifications
          </div>
        ) : (
          notifications.map(
            (notification) => (
              <div
                key={
                  notification._id
                }
                className="p-4 border-b border-slate-800 hover:bg-slate-900 cursor-pointer"
              >
                <p className="text-white text-sm font-medium">
                  {
                    notification.title
                  }
                </p>

                <p className="text-slate-400 text-xs mt-1">
                  {
                    notification.message
                  }
                </p>
              </div>
            )
          )
        )}

      </div>
    </div>
  )}

</div>

          {/* Role badge */}
          <span
            className={`badge ${
              user.role === "admin"
                ? "badge-red"
                : user.role === "lecturer"
                ? "badge-purple"
                : "badge-green"
            }`}
          >
            {user.role}
          </span>

          {/* Avatar + name */}
          <div className="flex items-center gap-2">
            <div
              style={{ background: "#1d4ed8" }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <span
              style={{ color: "#cbd5e1" }}
              className="text-sm font-medium hidden md:block"
            >
              {user.name}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            style={{ color: "#64748b" }}
            className="text-sm font-medium hover:text-red-400 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            style={{ color: "#94a3b8" }}
            className="text-sm font-medium hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="btn-accent text-sm"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}