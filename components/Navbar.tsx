"use client";
import { Btn } from "@/components/ui";
import T from "@/lib/tokens";
import { Page } from "@/lib/types";

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  apptCount: number;
}

const NAV_LINKS: { id: Page; label: string }[] = [
  { id: "home",         label: "Home"            },
  { id: "doctors",      label: "Doctors"          },
  { id: "appointments", label: "My Appointments"  },
];

export default function Navbar({ page, setPage, apptCount }: NavbarProps) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
      borderBottom: `1.5px solid ${T.borderLight}`,
      padding: "0 clamp(16px,4vw,48px)", height: 66,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div
        onClick={() => setPage("home")}
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `linear-gradient(135deg, ${T.navy}, ${T.navyLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" fill={T.sky} opacity=".3" />
            <path d="M10 5v5l3 3" stroke={T.white} strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="10" r="2" fill={T.sky} />
          </svg>
        </div>
        <span style={{ fontWeight: 800, fontSize: 18, color: T.navy, letterSpacing: -0.3 }}>VirtuCare</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {NAV_LINKS.map(l => (
          <button
            key={l.id}
            onClick={() => setPage(l.id)}
            style={{
              background: page === l.id ? T.offWhite : "none",
              border: "none", cursor: "pointer",
              padding: "7px 14px", borderRadius: 8,
              fontSize: 14, fontWeight: 600, fontFamily: "inherit",
              color: page === l.id ? T.navy : T.slate,
              display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.15s",
            }}
          >
            {l.label}
            {l.id === "appointments" && apptCount > 0 && (
              <span style={{
                background: T.sky, color: T.navy, borderRadius: 999,
                minWidth: 18, height: 18, fontSize: 11, fontWeight: 800,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "0 5px",
              }}>
                {apptCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Btn small onClick={() => setPage("doctors")}>Book Now</Btn>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: `linear-gradient(135deg, ${T.navyLight}, ${T.sky})`,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}>
          <span style={{ fontSize: 14 }}>👤</span>
        </div>
      </div>
    </nav>
  );
}
