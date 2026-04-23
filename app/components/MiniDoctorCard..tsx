// components/MiniDoctorCard.tsx
"use client";
import { Avatar, Badge, StarRating, Btn } from "@/components/ui";
import T from "@/lib/tokens";
import { Doctor } from "@/lib/types";

interface MiniDoctorCardProps {
  doc: Doctor;
  onBook: () => void;
}

export default function MiniDoctorCard({ doc, onBook }: MiniDoctorCardProps) {
  return (
    <div
      style={{
        background: T.white,
        borderRadius: 18,
        border: `1.5px solid ${T.borderLight}`,
        padding: 20,
        boxShadow: "0 4px 16px rgba(11,31,75,.05)",
        transition: "all .2s",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          marginBottom: 14,
        }}
      >
        <Avatar initials={doc.avatar} size={46} />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: 14,
              color: T.navy,
              marginBottom: 3,
            }}
          >
            {doc.name}
          </div>
          <Badge variant="sky">{doc.specialty}</Badge>
        </div>
        <div style={{ textAlign: "right" }}>
          <StarRating rating={doc.rating} />
          <div style={{ fontSize: 11, color: T.slateLight, marginTop: 2 }}>
            {doc.reviews} reviews
          </div>
        </div>
      </div>

      {/* Availability */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: doc.available ? T.success : "#94A3B8",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontSize: 12,
            color: doc.available ? T.success : T.slateLight,
            fontWeight: 600,
          }}
        >
          {doc.nextSlot}
        </span>
      </div>

      <Btn full small onClick={onBook}>
        Book Appointment
      </Btn>
    </div>
  );
}
