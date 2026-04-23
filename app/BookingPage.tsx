"use client";
import { useState } from "react";
import { Avatar, Badge, StarRating, Btn } from "@/components/ui";
import BookingStepDateTime from "@/components/BookingStepDateTime";
import BookingStepDetails  from "@/components/BookingStepDetails";
import BookingStepReview   from "@/components/BookingStepReview";
import T from "@/lib/tokens";
import { Appointment, Doctor, VisitType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface BookingPageProps {
  doctor: Doctor;
  appointments: Appointment[];
  onConfirm: (appt: Omit<Appointment, "id">) => void;
  onBack: () => void;
}

const STEPS = ["Date & Time", "Your Details", "Review"];

export default function BookingPage({ doctor, appointments, onConfirm, onBack }: BookingPageProps) {
  const [step,      setStep]      = useState(1);
  const [date,      setDate]      = useState("");
  const [time,      setTime]      = useState("");
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [reason,    setReason]    = useState("");
  const [visitType, setVisitType] = useState<VisitType>("Virtual");
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [done,      setDone]      = useState(false);

  const bookedSlots = appointments
    .filter(a => a.doctorId === doctor.id && a.date === date)
    .map(a => a.time);

  function validateStep(s: number) {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!date) e.date = "Please select a date";
      if (!time) e.time = "Please select a time slot";
    }
    if (s === 2) {
      if (!name.trim()) e.name = "Full name is required";
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email required";
      if (!reason.trim()) e.reason = "Please describe your reason for visit";
    }
    return e;
  }

  function handleNext() {
    const e = validateStep(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    if (step === 3) {
      onConfirm({ doctorId: doctor.id, doctorName: doctor.name, specialty: doctor.specialty, avatar: doctor.avatar, date, time, reason, visitType, name, email, phone });
      setDone(true);
    } else {
      setStep(s => s + 1);
    }
  }

  // ── Success screen ─────────────────────────────────────────
  if (done) return (
    <div style={{ maxWidth: 520, margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%", background: "#DCFCE7",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px", fontSize: 36,
      }}>✓</div>

      <h2 style={{ fontWeight: 900, fontSize: 26, color: T.navy, marginBottom: 10, letterSpacing: -0.5 }}>
        Appointment Confirmed!
      </h2>
      <p style={{ color: T.slate, fontSize: 15, marginBottom: 6 }}>
        Your visit with <strong>{doctor.name}</strong> is booked for
      </p>
      <p style={{ color: T.skyDark, fontWeight: 800, fontSize: 18, marginBottom: 32 }}>
        {formatDate(date)} at {time}
      </p>

      <div style={{ background: T.offWhite, borderRadius: 16, padding: 20, marginBottom: 32, textAlign: "left" }}>
        {([["Doctor", doctor.name], ["Specialty", doctor.specialty], ["Date", formatDate(date)], ["Time", time], ["Type", visitType], ["Reason", reason]] as [string, string][]).map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.borderLight}`, fontSize: 14 }}>
            <span style={{ color: T.slate, fontWeight: 500 }}>{l}</span>
            <span style={{ color: T.navy, fontWeight: 700, textAlign: "right", maxWidth: "60%" }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Btn onClick={onBack}>Back to Doctors</Btn>
        <Btn variant="ghost" onClick={() => { setDone(false); setStep(1); setDate(""); setTime(""); setReason(""); }}>
          Book Another
        </Btn>
      </div>
    </div>
  );

  // ── Booking form ───────────────────────────────────────────
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "36px clamp(16px,4vw,24px)" }}>
      {/* Back */}
      <button onClick={onBack} style={{
        background: "none", border: "none", color: T.slate, fontSize: 14,
        cursor: "pointer", fontFamily: "inherit", fontWeight: 600,
        marginBottom: 24, display: "flex", alignItems: "center", gap: 6, padding: 0,
      }}>
        ← Back to Doctors
      </button>

      {/* Doctor summary */}
      <div style={{
        background: T.white, borderRadius: 16, border: `1.5px solid ${T.borderLight}`,
        padding: 20, marginBottom: 28, display: "flex", gap: 16, alignItems: "center",
      }}>
        <Avatar initials={doctor.avatar} size={54} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: T.navy }}>{doctor.name}</div>
          <Badge variant="sky">{doctor.specialty}</Badge>
        </div>
        <div style={{ textAlign: "right" }}>
          <StarRating rating={doctor.rating} />
          <div style={{ fontSize: 12, color: T.slateLight, marginTop: 2 }}>{doctor.reviews} reviews</div>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: step > i + 1 ? T.success : step === i + 1 ? T.navy : T.borderLight,
                color: step > i + 1 || step === i + 1 ? T.white : T.slateLight,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 13, transition: "all .3s",
              }}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: step === i + 1 ? T.navy : T.slateLight, whiteSpace: "nowrap" }}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: step > i + 1 ? T.success : T.borderLight, margin: "0 8px", marginBottom: 16, transition: "background .3s" }} />
            )}
          </div>
        ))}
      </div>

      {/* Step panel */}
      <div style={{ background: T.white, borderRadius: 20, border: `1.5px solid ${T.borderLight}`, padding: 28 }}>
        {step === 1 && (
          <BookingStepDateTime
            doc={doctor} date={date} setDate={setDate} time={time} setTime={setTime}
            bookedSlots={bookedSlots} visitType={visitType} setVisitType={setVisitType}
            errors={errors} setErrors={setErrors}
          />
        )}
        {step === 2 && (
          <BookingStepDetails
            name={name} setName={setName} email={email} setEmail={setEmail}
            phone={phone} setPhone={setPhone} reason={reason} setReason={setReason}
            errors={errors} setErrors={setErrors}
          />
        )}
        {step === 3 && (
          <BookingStepReview
            doc={doctor} date={date} time={time}
            name={name} email={email} phone={phone}
            reason={reason} visitType={visitType}
          />
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "space-between" }}>
          <div>
            {step > 1 && <Btn variant="ghost" onClick={() => setStep(s => s - 1)}>← Back</Btn>}
          </div>
          <Btn onClick={handleNext}>
            {step === 3 ? "Confirm Booking" : "Continue →"}
          </Btn>
        </div>
      </div>
    </div>
  );
}
