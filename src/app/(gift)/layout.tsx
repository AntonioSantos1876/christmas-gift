"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

// This specialized layout wraps all the pages inside the "gift" section.
// It ensures there's a navigation bar at the top so she can explore.
export default function GiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // We want to hide the footer on the Memories page to give the photos more space
  // and avoid clutter, but show it everywhere else.
  const showFooter = !pathname.includes("/memories");

  return (
    <div className="flex flex-col min-h-screen">
      {/* The sticky navbar is always here */}
      <Navbar />
      
      {/* This renders the actual page content (Letter, Game, etc.) */}
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
}
