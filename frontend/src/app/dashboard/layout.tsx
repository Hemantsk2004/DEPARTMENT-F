"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        style={{ background: "#020617" }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            style={{ borderTopColor: "#3b82f6", borderBottomColor: "#3b82f6" }}
            className="animate-spin rounded-full h-10 w-10 border-2 border-transparent"
          />
          <p style={{ color: "#475569" }} className="text-sm">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ background: "#020617" }} className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main
          style={{ background: "#020617" }}
          className="flex-1 p-6 md:p-8 overflow-y-auto min-h-[calc(100vh-4rem)]"
        >
          {children}
        </main>
      </div>
    </div>
  );
}