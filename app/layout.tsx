// app/layout.tsx
import type { Metadata } from "next";
import GlobalStyles from "@/components/GlobalStyles";

export const metadata: Metadata = {
  title:       "VirtuCare — Healthcare Reimagined",
  description: "Book appointments with world-class specialists from the comfort of your home.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, fontFamily: "'Onest', sans-serif", background: "#F8FAFF" }}>
        <GlobalStyles />
        {children}
      </body>
    </html>
  );
}