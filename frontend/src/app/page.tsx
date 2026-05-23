import Link from "next/link";

const features = [
  {
    icon: "🤖",
    title: "AI Study Assistant",
    desc: "Upload notes, get instant summaries, key points, and revision guides powered by Gemini AI.",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
  },
  {
    icon: "💬",
    title: "Real-time Study Rooms",
    desc: "Create or join study rooms, collaborate with peers, and solve doubts together in real time.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
  },
  {
    icon: "🚀",
    title: "Career Opportunities",
    desc: "Browse internships, hackathons, and placements posted by mentors and campus recruiters.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
  },
  {
    icon: "🧑‍💼",
    title: "Student Portfolios",
    desc: "Build your professional profile with skills, projects, GitHub, and LinkedIn — all in one place.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
];

const stats = [
  { value: "10K+", label: "Students" },
  { value: "500+", label: "Courses" },
  { value: "200+", label: "Opportunities" },
  { value: "50+", label: "Institutions" },
];

export default function LandingPage() {
  return (
    <div style={{ background: "#020617", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "#0a0f1e",
        }}
        className="h-16 flex items-center justify-between px-8 sticky top-0 z-50"
      >
        <div className="flex items-center gap-2">
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
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/login"
            style={{ color: "#94a3b8" }}
            className="text-sm font-medium hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link href="/register" className="btn-accent text-sm">
            Get Started →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-24 pb-20 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#60a5fa",
            }}
            className="text-xs font-semibold px-4 py-1.5 rounded-full"
          >
            🎓 Academic & Career Collaboration Platform
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            color: "#f1f5f9",
            lineHeight: 1.1,
          }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Connect. Learn.{" "}
          <span style={{ color: "#3b82f6" }}>Grow.</span>
          <br />
          <span style={{ color: "#475569" }}>All in One Campus.</span>
        </h1>

        <p
          style={{ color: "#64748b", maxWidth: "560px" }}
          className="text-lg mx-auto mb-10 leading-relaxed"
        >
          CampusLink X is your academic and career companion. Collaborate,
          learn, and unlock opportunities — all in one modern ecosystem.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/register" className="btn-accent px-8 py-3 text-base">
            Get Started Free
          </Link>
          <Link href="/login" className="btn-ghost px-8 py-3 text-base">
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              className="rounded-xl p-6"
            >
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "#f1f5f9",
                }}
                className="text-3xl font-bold mb-1"
              >
                {stat.value}
              </p>
              <p style={{ color: "#475569" }} className="text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        className="px-8 py-20 max-w-6xl mx-auto"
      >
        <div className="text-center mb-14">
          <h2
            style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Everything you need to{" "}
            <span style={{ color: "#3b82f6" }}>succeed</span>
          </h2>
          <p style={{ color: "#475569" }} className="text-base">
            Four powerful features built for the modern student.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              className="rounded-2xl p-8 hover:border-white/10 transition-all duration-200 group"
            >
              <div
                style={{ background: f.bg, width: 52, height: 52 }}
                className="rounded-xl flex items-center justify-center text-2xl mb-5"
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "#f1f5f9",
                }}
                className="text-xl font-semibold mb-3"
              >
                {f.title}
              </h3>
              <p style={{ color: "#475569" }} className="text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        className="px-8 py-20 text-center"
      >
        <h2
          style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to transform your{" "}
          <span style={{ color: "#3b82f6" }}>campus experience?</span>
        </h2>
        <p style={{ color: "#475569" }} className="text-base mb-8">
          Join thousands of students and lecturers already using CampusLink X.
        </p>
        <Link href="/register" className="btn-accent px-10 py-3 text-base">
          Join CampusLink X →
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          color: "#334155",
        }}
        className="px-8 py-6 text-center text-sm"
      >
        © 2025 CampusLink X. Built for students, by students.
      </footer>
    </div>
  );
}