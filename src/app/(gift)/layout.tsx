"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

export default function GiftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showFooter = !pathname.includes("/memories");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
