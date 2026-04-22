// components/AppointmentCard.tsx
"use client";
import { Avatar, Badge } from "@/components/ui";
import T from "@/lib/tokens";
import { Appointment } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface AppointmentCardProps {
  appt: Appointment;
  past?: boolean;
  onCancel: () => void;
}

export default function AppointmentCard({ appt, past = false, onCancel }: AppointmentCardProps) {
  return (
    <div style={{
      background: T.white, borderRadius: 18,
      border: `1.5px solid ${T.borderLight}`,
      padding: "20px 24px",
      display: "flex", gap: 16, alignItems: "flex-start",
      opacity: past ? 0.75 : 1,
      boxShadow: "0 4px 16px rgba(11,31,75,.05)",
    }}>
      <Avatar initials={appt.avatar} size={50} />

      <div style={{ flex: 1 }}>
        {/* Top: name + cancel button */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 10,
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: T.navy, marginBottom: 4 }}>
              {appt.doctorName}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <Badge variant="sky">{appt.specialty}</Badge>
              {appt.visitType && (
                <Badge variant={past ? "slate" : "green"}>{appt.visitType}</Badge>
              )}
              {past && <Badge variant="slate">Completed</Badge>}
            </div>
          </div>

          {!past && (
            <button
              onClick={onCancel}
              style={{
                background: "#FEF2F2", color: T.danger,
                border: `1.5px solid #FECACA`,
                borderRadius: 8, padding: "6px 14px",
                fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
          )}
        </div>

        {/* Date & Time */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 10 }}>
          {([["📅", formatDate(appt.date)], ["🕐", appt.time]] as [string, string][]).map(([icon, val]) => (
            <div key={icon} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: T.slate }}>
              <span>{icon}</span>
              <span style={{ fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Reason */}
        <div style={{
          background: T.offWhite, borderRadius: 10,
          padding: "9px 13px", fontSize: 13, color: T.slate,
        }}>
          <span style={{
            fontWeight: 700, color: T.slateLight,
            fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8,
          }}>
            Reason:{" "}
          </span>
          {appt.reason}
        </div>
      </div>
    </div>
  );
}