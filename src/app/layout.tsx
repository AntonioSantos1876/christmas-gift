import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import BackgroundMusic from "./components/BackgroundMusic";

// These are the fonts we use to make the app look nice.
// Geist is for the main UI text (modern and clean), 
// and Playfair Display gives that elegant, "Christmas card" feel to headings.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

// This controls what shows up in the browser tab and search results.
export const metadata: Metadata = {
  title: "A Christmas Gift",
  description: "A special digital gift found at chrixtmas.vercel.app",
};

// This is the main shell of our entire application.
// Every other page sits inside this 'RootLayout'.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* We add our custom fonts here so they are available everywhere */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {/* The ThemeProvider handles the dark/light mode magic (mainly dark for the cozy vibes) */}
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <BackgroundMusic />
          </ThemeProvider>
      </body>
    </html>
  );
}
