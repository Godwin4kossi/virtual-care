// components/BookingStepDateTime.tsx
"use client";
import { Input } from "@/components/ui";
import T from "@/lib/tokens";
import { Doctor, VisitType } from "@/lib/types";
import { getTodayStr } from "@/lib/utils";

interface StepDateTimeProps {
  doc: Doctor;
  date: string;
  setDate: (d: string) => void;
  time: string;
  setTime: (t: string) => void;
  bookedSlots: string[];
  visitType: VisitType;
  setVisitType: (v: VisitType) => void;
  errors: Record<string, string>;
  setErrors: (
    fn: (prev: Record<string, string>) => Record<string, string>
  ) => void;
}

export default function BookingStepDateTime({
  doc,
  date,
  setDate,
  time,
  setTime,
  bookedSlots,
  visitType,
  setVisitType,
  errors,
  setErrors,
}: StepDateTimeProps) {
  return (
    <div>
      <h3
        style={{
          fontWeight: 800,
          fontSize: 20,
          color: T.navy,
          marginBottom: 24,
          letterSpacing: -0.3,
        }}
      >
        Select Date & Time
      </h3>

      {/* Visit type */}
      <div style={{ marginBottom: 24 }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: T.navy,
            display: "block",
            marginBottom: 10,
          }}
        >
          Visit Type
        </label>
        <div style={{ display: "flex", gap: 10 }}>
          {(["Virtual", "In-Person"] as VisitType[]).map((vt) => (
            <button
              key={vt}
              onClick={() => setVisitType(vt)}
              style={{
                flex: 1,
                padding: "12px 0",
                borderRadius: 10,
                fontFamily: "inherit",
                border: `1.5px solid ${visitType === vt ? T.navy : T.border}`,
                background: visitType === vt ? T.navy : T.white,
                color: visitType === vt ? T.white : T.slate,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all .15s",
              }}
            >
              {vt === "Virtual" ? "💻" : "🏥"} {vt}
            </button>
          ))}
        </div>
      </div>

      {/* Date picker */}
      <div style={{ marginBottom: 22 }}>
        <Input
          label="Select Date"
          type="date"
          min={getTodayStr()}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setTime("");
            setErrors((p) => ({ ...p, date: "" }));
          }}
          error={errors.date}
        />
      </div>

      {/* Time slots */}
      <div>
        <label
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: T.navy,
            display: "block",
            marginBottom: 10,
          }}
        >
          Available Time Slots
        </label>

        {!date ? (
          <div
            style={{
              background: T.offWhite,
              borderRadius: 12,
              padding: 20,
              textAlign: "center",
              color: T.slateLight,
              fontSize: 13,
            }}
          >
            ← Select a date to view available slots
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {doc.slots.map((s) => {
              const booked = bookedSlots.includes(s);
              const sel = time === s;
              return (
                <button
                  key={s}
                  disabled={booked}
                  onClick={() => {
                    setTime(s);
                    setErrors((p) => ({ ...p, time: "" }));
                  }}
                  style={{
                    padding: "11px 0",
                    borderRadius: 10,
                    fontFamily: "inherit",
                    border: `1.5px solid ${
                      booked ? "#E2E8F0" : sel ? T.navy : T.border
                    }`,
                    background: booked ? "#F8FAFC" : sel ? T.navy : T.white,
                    color: booked ? T.slateLight : sel ? T.white : T.navy,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: booked ? "not-allowed" : "pointer",
                    opacity: booked ? 0.5 : 1,
                    textDecoration: booked ? "line-through" : "none",
                    transition: "all .15s",
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        )}

        {errors.time && (
          <div
            style={{
              color: T.danger,
              fontSize: 12,
              fontWeight: 500,
              marginTop: 8,
            }}
          >
            {errors.time}
          </div>
        )}
      </div>
    </div>
  );
}
