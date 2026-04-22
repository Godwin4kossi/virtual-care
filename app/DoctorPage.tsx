"use client";
import { useState } from "react";
import AppointmentCard from "@/components/AppointmentCard";
import CancelModal     from "@/components/CancelModal";
import { EmptyState, SectionLabel } from "@/components/ui";
import T from "@/lib/tokens";
import { Appointment, TabType } from "@/lib/types";

interface AppointmentsPageProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
}

export default function AppointmentsPage({ appointments, onCancel }: AppointmentsPageProps) {
  const [tab,          setTab]          = useState<TabType>("upcoming");
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);

  const now = new Date();

  const upcoming = appointments
    .filter(a => new Date(a.date + "T" + a.time) >= now)
    .sort((a, b) => new Date(a.date + "T" + a.time).getTime() - new Date(b.date + "T" + b.time).getTime());

  const past = appointments
    .filter(a => new Date(a.date + "T" + a.time) < now)
    .sort((a, b) => new Date(b.date + "T" + b.time).getTime() - new Date(a.date + "T" + a.time).getTime());

  const list = tab === "upcoming" ? upcoming : past;

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "36px clamp(16px,4vw,40px)" }}>

      <div style={{ marginBottom: 32 }}>
        <SectionLabel>MY SCHEDULE</SectionLabel>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: T.navy, letterSpacing: -1, marginBottom: 4 }}>
          Appointments
        </h1>
        <p style={{ color: T.slate, fontSize: 15 }}>
          {upcoming.length} upcoming · {past.length} past
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        marginBottom: 32,
      }}>
        {[
          { label: "Total Booked", value: appointments.length, icon: "📅", color: T.navy    },
          { label: "Upcoming",     value: upcoming.length,     icon: "🔔", color: T.skyDark  },
          { label: "Completed",    value: past.length,         icon: "✅", color: T.success  },
        ].map((c, i) => (
          <div key={i} style={{
            background: T.white, borderRadius: 16,
            border: `1.5px solid ${T.borderLight}`,
            padding: "18px 20px",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ fontSize: 28 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: c.color }}>{c.value}</div>
              <div style={{ fontSize: 12, color: T.slateLight, fontWeight: 500 }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: "flex", gap: 4,
        background: T.white, borderRadius: 12, padding: 4,
        border: `1.5px solid ${T.borderLight}`,
        marginBottom: 24, width: "fit-content",
      }}>
        {(["upcoming", "past"] as TabType[]).map(id => {
          const count = id === "upcoming" ? upcoming.length : past.length;
          const label = id === "upcoming" ? "Upcoming" : "Past";
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: "8px 20px", borderRadius: 9,
                fontFamily: "inherit", fontSize: 14, fontWeight: 700,
                border: "none", cursor: "pointer", transition: "all .18s",
                background: active ? T.navy : "transparent",
                color:      active ? T.white : T.slate,
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              {label}
              <span style={{
                background: active ? "rgba(255,255,255,.2)" : T.borderLight,
                color:      active ? T.white : T.slateLight,
                borderRadius: 999, padding: "1px 8px",
                fontSize: 11, fontWeight: 800,
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {appointments.length === 0 ? (
        <EmptyState
          icon="📅"
          title="No appointments yet"
          subtitle="Book a visit with one of our specialists to get started."
        />
      ) : list.length === 0 ? (
        <EmptyState
          icon={tab === "upcoming" ? "🗓" : "📋"}
          title={tab === "upcoming" ? "No upcoming appointments" : "No past appointments"}
          subtitle={tab === "upcoming"
            ? "Your future bookings will appear here."
            : "Your completed visits will appear here."}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {list.map(appt => (
            <AppointmentCard
              key={appt.id}
              appt={appt}
              past={tab === "past"}
              onCancel={() => setCancelTarget(appt)}
            />
          ))}
        </div>
      )}

      {cancelTarget && (
        <CancelModal
          appointment={cancelTarget}
          onConfirm={() => {
            onCancel(cancelTarget.id);
            setCancelTarget(null);
          }}
          onDismiss={() => setCancelTarget(null)}
        />
      )}
    </div>
  );
}