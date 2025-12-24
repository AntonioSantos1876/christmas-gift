import type { Metadata } from "next";
// import { Playfair_Display, Inter } from "next/font/google"; // Disabled due to build env network issues
import "./globals.css";
import Snowfall from "./components/Snowfall";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "A Christmas Gift",
  description: "A walk down memory lane.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased bg-christmas-dark text-white font-sans overflow-x-hidden`}
        style={{
            // Manually setting variables since next/font isn't injecting them
            // These match the names expected by globals.css
            "--font-playfair": "'Playfair Display', serif",
            "--font-inter": "'Inter', sans-serif",
        } as React.CSSProperties}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Snowfall />
            <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
