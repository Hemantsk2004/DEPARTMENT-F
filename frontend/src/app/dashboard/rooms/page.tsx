export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }} className="text-2xl font-bold mb-1">
          Study Rooms
        </h1>
        <p style={{ color: "#475569" }} className="text-sm">
          Create or join real-time study rooms with your peers.
        </p>
      </div>
      <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }} className="p-16 text-center">
        <div style={{ background: "rgba(139,92,246,0.1)", width: 64, height: 64, borderRadius: 16, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>💬</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", color: "#f1f5f9" }} className="text-lg font-semibold mb-2">Coming Soon</h2>
        <p style={{ color: "#334155" }} className="text-sm">Real-time study rooms with Socket.io are being built.</p>
      </div>
    </div>
  );
}