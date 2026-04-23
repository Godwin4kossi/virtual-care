"use client";
import { useState } from "react";
import DoctorCard from "@/components/DoctorCard";
import { Pill, EmptyState, SectionLabel } from "@/components/ui";
import T from "@/lib/tokens";
import { DOCTORS, SPECIALTIES } from "@/lib/data";
import { Doctor } from "@/lib/types";

interface DoctorsPageProps {
  onBook: (doc: Doctor) => void;
}

export default function DoctorsPage({ onBook }: DoctorsPageProps) {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [availOnly, setAvailOnly] = useState(false);

  const filtered = DOCTORS.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = specialty === "All" || d.specialty === specialty;
    const matchAvail = !availOnly || d.available;
    return matchSearch && matchSpecialty && matchAvail;
  });

  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "36px clamp(16px,4vw,40px)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <SectionLabel>FIND CARE</SectionLabel>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: T.navy,
            letterSpacing: -1,
            marginBottom: 8,
          }}
        >
          Our Specialists
        </h1>
        <p style={{ color: T.slate, fontSize: 15 }}>
          {DOCTORS.length} doctors available across {SPECIALTIES.length - 1}{" "}
          specialties
        </p>
      </div>

      {/* Filter bar */}
      <div
        style={{
          background: T.white,
          borderRadius: 16,
          border: `1.5px solid ${T.borderLight}`,
          padding: 20,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 15,
                color: T.slateLight,
              }}
            >
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctors or specialties…"
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                borderRadius: 10,
                border: `1.5px solid ${T.border}`,
                fontSize: 14,
                color: T.navy,
                background: T.bg,
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Available today toggle */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 13,
              fontWeight: 600,
              color: T.slate,
              cursor: "pointer",
              padding: "8px 14px",
              borderRadius: 10,
              border: `1.5px solid ${availOnly ? T.sky : T.border}`,
              background: availOnly ? T.offWhite : T.white,
            }}
          >
            <input
              type="checkbox"
              checked={availOnly}
              onChange={(e) => setAvailOnly(e.target.checked)}
              style={{ display: "none" }}
            />
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                border: `2px solid ${availOnly ? T.sky : T.border}`,
                background: availOnly ? T.sky : "transparent",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {availOnly && (
                <span style={{ color: T.white, fontSize: 11, fontWeight: 900 }}>
                  ✓
                </span>
              )}
            </span>
            Available Today
          </label>
        </div>

        {/* Specialty pills */}
        <div
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}
        >
          {SPECIALTIES.map((s) => (
            <Pill
              key={s}
              label={s}
              active={specialty === s}
              onClick={() => setSpecialty(s)}
            />
          ))}
        </div>
      </div>

      {/* Results count */}
      <div
        style={{
          fontSize: 13,
          color: T.slateLight,
          marginBottom: 20,
          fontWeight: 500,
        }}
      >
        Showing {filtered.length} of {DOCTORS.length} doctors
      </div>

      {/* Doctor grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No doctors found"
          subtitle="Try adjusting your search or filters"
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((doc) => (
            <DoctorCard key={doc.id} doc={doc} onBook={() => onBook(doc)} />
          ))}
        </div>
      )}
    </div>
  );
}
