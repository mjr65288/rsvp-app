import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aylin turns 5 | Birthday RSVP",
  description:
    "You are invited to Aylin's KPop Demon Hunters birthday celebration.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf6ee",
};

function BackgroundEffects() {
  return (
    <div className="background-effects" aria-hidden="true">
      <span className="effect-glow effect-glow-one" />
      <span className="effect-glow effect-glow-two" />
      <span className="effect-glow effect-glow-three" />
      <span className="effect-sparkle effect-sparkle-one" />
      <span className="effect-sparkle effect-sparkle-two" />
      <span className="effect-sparkle effect-sparkle-three" />
      <span className="effect-sparkle effect-sparkle-four" />
      <span className="effect-sparkle effect-sparkle-five" />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <BackgroundEffects />
        <div className="site-content">{children}</div>
      </body>
    </html>
  );
}
