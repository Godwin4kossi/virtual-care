// lib/types.ts

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  avatar: string;
  available: boolean;
  nextSlot: string;
  slots: string[];
  bio: string;
  tags: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  avatar: string;
  date: string;
  time: string;
  reason: string;
  visitType: "Virtual" | "In-Person";
  name: string;
  email: string;
  phone?: string;
}

export type Page = "home" | "doctors" | "book" | "appointments";
export type VisitType = "Virtual" | "In-Person";
export type TabType = "upcoming" | "past";
