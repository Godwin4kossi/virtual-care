// components/BookingStepReview.tsx
import T from "@/lib/tokens";
import { Doctor, VisitType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface StepReviewProps {
  doc: Doctor;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  reason: string;
  visitType: VisitType;
}

export default function BookingStepReview({
  doc,
  date,
  time,
  name,
  email,
  phone,
  reason,
  visitType,
}: StepReviewProps) {
  const rows: [string, string][] = [
    ["Doctor", doc.name],
    ["Specialty", doc.specialty],
    ["Visit Type", visitType],
    ["Date", formatDate(date)],
    ["Time", time],
    ["Patient", name],
    ["Email", email],
    ...(phone ? [["Phone", phone] as [string, string]] : []),
    ["Reason", reason],
  ];

  return (
    <div>
      <h3
        style={{
          fontWeight: 800,
          fontSize: 20,
          color: T.navy,
          marginBottom: 8,
          letterSpacing: -0.3,
        }}
      >
        Review & Confirm
      </h3>
      <p style={{ color: T.slate, fontSize: 14, marginBottom: 24 }}>
        Please review your appointment details before confirming.
      </p>

      <div
        style={{
          background: T.offWhite,
          borderRadius: 14,
          overflow: "hidden",
          border: `1.5px solid ${T.borderLight}`,
        }}
      >
        {rows.map(([label, value], i) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "13px 18px",
              borderBottom:
                i < rows.length - 1 ? `1px solid ${T.borderLight}` : "none",
              fontSize: 14,
            }}
          >
            <span style={{ color: T.slate, fontWeight: 500 }}>{label}</span>
            <span
              style={{
                color: T.navy,
                fontWeight: 700,
                textAlign: "right",
                maxWidth: "60%",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          background: "#EFF6FF",
          borderRadius: 12,
          padding: "12px 16px",
          display: "flex",
          gap: 10,
          alignItems: "center",
          fontSize: 13,
          color: T.skyDark,
        }}
      >
        ℹ️{" "}
        <span>
          You will receive a confirmation email at <strong>{email}</strong>
        </span>
      </div>
    </div>
  );
}
