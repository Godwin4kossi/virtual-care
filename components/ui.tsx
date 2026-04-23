"use client";
import T from "@/lib/tokens";

interface AvatarProps { initials: string; size?: number; ring?: boolean; }
export function Avatar({ initials, size = 44, ring = false }: AvatarProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${T.navyLight}, ${T.skyDark})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: T.white, fontWeight: 700, fontSize: size * 0.33,
      flexShrink: 0, letterSpacing: 0.5,
      boxShadow: ring ? `0 0 0 3px ${T.white}, 0 0 0 5px ${T.sky}` : "none",
    }}>
      {initials}
    </div>
  );
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      <span style={{ color: T.warn, fontSize: 13 }}>★</span>
      <span style={{ fontWeight: 700, fontSize: 13, color: T.navy }}>{rating}</span>
    </span>
  );
}

export function Tag({ label }: { label: string }) {
  return (
    <span style={{
      background: T.offWhite, color: T.navyMid,
      border: `1px solid ${T.skyLight}`,
      borderRadius: 6, padding: "2px 9px",
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
    }}>
      {label}
    </span>
  );
}

type BadgeVariant = "sky" | "green" | "slate" | "red";
const BADGE_STYLES: Record<BadgeVariant, { bg: string; color: string }> = {
  sky:   { bg: "#E0F2FE", color: T.skyDark },
  green: { bg: "#DCFCE7", color: "#166534" },
  slate: { bg: T.borderLight, color: T.slate },
  red:   { bg: "#FEE2E2", color: T.danger },
};
export function Badge({ children, variant = "sky" }: { children: React.ReactNode; variant?: BadgeVariant }) {
  const s = BADGE_STYLES[variant];
  return (
    <span style={{
      background: s.bg, color: s.color, borderRadius: 20,
      padding: "3px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 0.4,
      display: "inline-flex", alignItems: "center",
    }}>
      {children}
    </span>
  );
}

export function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 18px", borderRadius: 999,
      border: active ? "none" : `1.5px solid ${T.border}`,
      background: active ? T.navy : T.white,
      color: active ? T.white : T.slate,
      fontSize: 13, fontWeight: 600, cursor: "pointer",
      transition: "all 0.18s", whiteSpace: "nowrap",
      boxShadow: active ? `0 4px 12px ${T.navy}30` : "none",
      fontFamily: "inherit",
    }}>
      {label}
    </button>
  );
}

type BtnVariant = "primary" | "sky" | "outline" | "ghost" | "danger";
const BTN_STYLES: Record<BtnVariant, React.CSSProperties> = {
  primary: { background: T.navy,        color: T.white, boxShadow: `0 4px 16px ${T.navy}40` },
  sky:     { background: T.sky,         color: T.navy,  boxShadow: `0 4px 16px ${T.sky}40`  },
  outline: { background: "transparent", color: T.navy,  border: `1.5px solid ${T.navy}`      },
  ghost:   { background: T.offWhite,    color: T.slate                                        },
  danger:  { background: T.danger,      color: T.white                                        },
};
interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  full?: boolean;
  small?: boolean;
  disabled?: boolean;
}
export function Btn({ children, onClick, variant = "primary", full, small, disabled }: BtnProps) {
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      border: "none", borderRadius: 10, fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.18s",
      fontSize: small ? 13 : 14, padding: small ? "8px 18px" : "12px 24px",
      width: full ? "100%" : "auto", opacity: disabled ? 0.5 : 1,
      fontFamily: "inherit",
      ...BTN_STYLES[variant],
    }}>
      {children}
    </button>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export function Input({ label, error, ...props }: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 700, color: T.navy, letterSpacing: 0.2 }}>{label}</label>}
      <input {...props} style={{
        padding: "10px 14px", borderRadius: 10,
        border: `1.5px solid ${error ? T.danger : T.border}`,
        fontSize: 14, color: T.navy, background: T.white,
        outline: "none", fontFamily: "inherit",
        transition: "border-color 0.15s", width: "100%",
        ...props.style,
      }} />
      {error && <span style={{ color: T.danger, fontSize: 12, fontWeight: 500 }}>{error}</span>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export function Textarea({ label, error, ...props }: TextareaProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 700, color: T.navy, letterSpacing: 0.2 }}>{label}</label>}
      <textarea {...props} style={{
        padding: "10px 14px", borderRadius: 10,
        border: `1.5px solid ${error ? T.danger : T.border}`,
        fontSize: 14, color: T.navy, background: T.white,
        outline: "none", fontFamily: "inherit",
        resize: "vertical", minHeight: 90,
        transition: "border-color 0.15s",
        ...props.style,
      }} />
      {error && <span style={{ color: T.danger, fontSize: 12, fontWeight: 500 }}>{error}</span>}
    </div>
  );
}

export function Divider() {
  return <div style={{ height: 1, background: T.borderLight, margin: "8px 0" }} />;
}

export function EmptyState({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div style={{ textAlign: "center", padding: "72px 24px", color: T.slateLight }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 18, color: T.slate, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14 }}>{subtitle}</div>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, color: T.sky, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
      {children}
    </div>
  );
}
