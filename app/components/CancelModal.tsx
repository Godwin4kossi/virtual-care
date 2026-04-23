// components/CancelModal.tsx
"use client";
import { Btn } from "@/components/ui";
import T from "@/lib/tokens";
import { Appointment } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface CancelModalProps {
  appointment: Appointment;
  onConfirm: () => void;
  onDismiss: () => void;
}

export default function CancelModal({
  appointment,
  onConfirm,
  onDismiss,
}: CancelModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11,31,75,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeIn .2s",
      }}
    >
      <div
        style={{
          background: T.white,
          borderRadius: 20,
          padding: 36,
          maxWidth: 400,
          width: "90%",
          boxShadow: "0 24px 64px rgba(11,31,75,.25)",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 16, textAlign: "center" }}>
          ⚠️
        </div>

        <h3
          style={{
            textAlign: "center",
            fontWeight: 800,
            color: T.navy,
            fontSize: 20,
            marginBottom: 8,
          }}
        >
          Cancel Appointment?
        </h3>

        <p
          style={{
            color: T.slate,
            fontSize: 14,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Your appointment with <strong>{appointment.doctorName}</strong>
        </p>
        <p
          style={{
            color: T.skyDark,
            fontWeight: 700,
            textAlign: "center",
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          {formatDate(appointment.date)} at {appointment.time}
        </p>
        <p
          style={{
            color: T.slateLight,
            fontSize: 13,
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          This action cannot be undone. The time slot will be released.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <Btn full variant="ghost" onClick={onDismiss}>
            Keep It
          </Btn>
          <Btn full variant="danger" onClick={onConfirm}>
            Yes, Cancel
          </Btn>
        </div>
      </div>
    </div>
  );
}
