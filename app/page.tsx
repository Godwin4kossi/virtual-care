"use client";
import { useState } from "react";

import Navbar             from "@/components/Navbar";
import Footer             from "@/components/Footer";
import HomePage           from "@/app/HomePage";
import DoctorsPage        from "@/app/DoctorsPage";
import BookingPage        from "@/app/BookingPage";
import AppointmentsPage   from "@/app/AppointmentsPage";

import { useLocalStorage } from "@/lib/hooks";
import { genId }           from "@/lib/utils";
import { Appointment, Doctor, Page } from "@/lib/types";

export default function RootPage() {
  const [page,           setPage]           = useState<Page>("home");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointments,   setAppointments]   = useLocalStorage<Appointment[]>("virtucare_appointments", []);

  const navPage: Page = page === "book" ? "doctors" : page;

  function handleBook(doc: Doctor) {
    setSelectedDoctor(doc);
    setPage("book");
  }

  function handleConfirm(appt: Omit<Appointment, "id">) {
    const newAppt: Appointment = { ...appt, id: genId() };
    setAppointments(prev => [...prev, newAppt]);
  }

  function handleCancel(id: string) {
    setAppointments(prev => prev.filter(a => a.id !== id));
  }

  function handleNav(p: Page) {
    setSelectedDoctor(null);
    setPage(p);
  }

  function handleBack() {
    setSelectedDoctor(null);
    setPage("doctors");
  }

  return (
    <>
      <Navbar
        page={navPage}
        setPage={handleNav}
        apptCount={appointments.length}
      />

      <main>
        {page === "home" && (
          <HomePage
            onExplore={() => setPage("doctors")}
            onBook={handleBook}
          />
        )}

        {page === "doctors" && (
          <DoctorsPage onBook={handleBook} />
        )}

        {page === "book" && selectedDoctor && (
          <BookingPage
            doctor={selectedDoctor}
            appointments={appointments}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}

        {page === "appointments" && (
          <AppointmentsPage
            appointments={appointments}
            onCancel={handleCancel}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
