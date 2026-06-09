"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  roles?: string[];
}

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "⊞",
    roles: ["admin"],
  },

  {
    href: "/dashboard/courses",
    label: "My Courses",
    icon: "📚",
  },

  {
    href: "/dashboard/rooms",
    label: "Study Rooms",
    icon: "💬",
  },

  {
    href: "/dashboard/ai-study",
    label: "AI Assistant",
    icon: "🤖",
    roles: ["student", "lecturer"],
  },

  {
    href: "/dashboard/opportunities",
    label: "Opportunities",
    icon: "🚀",
  },

  {
    href: "/dashboard/portfolio",
    label: "My Portfolio",
    icon: "🧑‍💼",
    roles: ["student"],
  },
];

const bottomNavItems: NavItem[] = [
  { href: "/dashboard/profile", label: "Profile", icon: "👤" },
];

const adminItems: NavItem[] = [
  { href: "/dashboard/users", label: "Manage Users", icon: "👥", roles: ["admin"] },
];

const lecturerItems: NavItem[] = [
  { href: "/dashboard/courses/new", label: "Create Course", icon: "➕", roles: ["lecturer", "admin"] },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  const NavLink = ({ item }: { item: NavItem }) => (
    <Link
      href={item.href}
      style={
        isActive(item.href)
          ? {
              background: "rgba(59,130,246,0.12)",
              color: "#60a5fa",
              borderRight: "2px solid #3b82f6",
            }
          : {
              color: "#64748b",
            }
      }
      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150 hover:bg-white/5 hover:text-slate-300 ${
        isActive(item.href) ? "nav-active" : ""
      }`}
    >
      <span className="text-base w-5 text-center">{item.icon}</span>
      <span>{item.label}</span>
      {isActive(item.href) && (
        <span
          style={{ background: "#3b82f6" }}
          className="ml-auto w-1.5 h-1.5 rounded-full"
        />
      )}
    </Link>
  );

  return (
    <aside
      style={{
        background: "#0a0f1e",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        width: "220px",
        minHeight: "calc(100vh - 4rem)",
      }}
      className="flex flex-col sticky top-16 self-start"
    >
      {/* Logo */}
      <div
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="px-4 py-4 flex items-center gap-2"
      >
        <div
          style={{ background: "#3b82f6" }}
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        >
          <span className="text-white font-bold text-xs">CX</span>
        </div>
        <span
          style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}
          className="text-base font-bold"
        >
          CampusLink <span style={{ color: "#3b82f6" }}>X</span>
        </span>
      </div>

      {/* User info */}
      <div
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="px-4 py-3 flex items-center gap-3"
      >
        <div
          style={{ background: "#1d4ed8" }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
        >
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <p
            style={{ color: "#e2e8f0" }}
            className="text-sm font-medium truncate"
          >
            {user.name}
          </p>
          <p style={{ color: "#475569" }} className="text-xs capitalize">
            {user.role}
          </p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 py-3">
        <div className="space-y-0.5">
        {navItems
          .filter(
            (item) =>
              !item.roles ||
              item.roles.includes(user.role)
          )
          .map((item) => (
            <NavLink
              key={item.href}
              item={item}
            />
        ))}
        </div>

        {/* Role-specific */}
        {(user.role === "lecturer" || user.role === "admin") && (
          <div className="mt-2 space-y-0.5">
            <p
              style={{ color: "#334155" }}
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2"
            >
              Teaching
            </p>
            {lecturerItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        )}

        {user.role === "admin" && (
          <div className="mt-2 space-y-0.5">
            <p
              style={{ color: "#334155" }}
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2"
            >
              Admin
            </p>
            {adminItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        className="py-3 space-y-0.5"
      >
        {bottomNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
        <button
          onClick={logout}
          style={{ color: "#64748b" }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium hover:bg-white/5 hover:text-red-400 transition-all duration-150"
        >
          <span className="text-base w-5 text-center">🚪</span>
          <span>Logout</span>
        </button>
      </div>

      {/* Version */}
      <p style={{ color: "#334155" }}className="text-xs text-center">
        CampusLink X
      </p>
    </aside>
  );
}