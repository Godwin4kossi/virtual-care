"use client";
import { Input, Textarea } from "@/components/ui";
import T from "@/lib/tokens";

interface StepDetailsProps {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  reason: string;
  setReason: (v: string) => void;
  errors: Record<string, string>;
  setErrors: (
    fn: (prev: Record<string, string>) => Record<string, string>
  ) => void;
}

export default function BookingStepDetails({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  reason,
  setReason,
  errors,
  setErrors,
}: StepDetailsProps) {
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
        Your Details
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((p) => ({ ...p, name: "" }));
          }}
          placeholder="e.g. John Osei"
          error={errors.name}
        />
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((p) => ({ ...p, email: "" }));
          }}
          placeholder="you@example.com"
          error={errors.email}
        />
        <Input
          label="Phone (optional)"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234 800 000 0000"
        />
        <Textarea
          label="Reason for Visit"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            setErrors((p) => ({ ...p, reason: "" }));
          }}
          placeholder="Please describe your symptoms or reason for this appointment…"
          error={errors.reason}
        />
      </div>
    </div>
  );
}
