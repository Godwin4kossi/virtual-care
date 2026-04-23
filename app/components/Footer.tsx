// components/Footer.tsx
import T from "@/lib/tokens";

export default function Footer() {
  return (
    <footer style={{
      background: T.navy, color: "#8AACCC", fontSize: 13,
      padding: "24px clamp(16px,4vw,80px)",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 12,
      marginTop: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: T.navyLight,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: T.sky, fontWeight: 900, fontSize: 13 }}>V</span>
        </div>
        <span style={{ color: T.white, fontWeight: 700 }}>VirtuCare</span>
      </div>
      <span>© 2025 VirtuCare. Built with ♥ for better healthcare.</span>
    </footer>
  );
}