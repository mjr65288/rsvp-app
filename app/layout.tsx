import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aylin turns 5 | Birthday RSVP",
  description:
    "You are invited to Aylin's KPop Demon Hunters birthday celebration.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
