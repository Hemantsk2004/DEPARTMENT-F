import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

<html lang="en" data-scroll-behavior="smooth"></html>

export const metadata: Metadata = {
  title: "CampusLink X — Academic & Career Collaboration",
  description:
    "An AI-powered academic and career collaboration platform for students, lecturers, and institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.06)",
            color: "#f1f5f9",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
          }}
        />
      </body>
    </html>
  );
}