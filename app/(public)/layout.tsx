import type { Metadata } from "next";
import "@/app/globals.css";

import Navbar from "@/components/layout/Header/Navbar";
import Footer from "@/components/layout/Footer/Footer";


export const metadata: Metadata = {
  title: "MessLoc | Online Mess Booking platform",
  description: "MessLoc is a location-based platform that helps students and working professionals discover, compare, and subscribe to affordable nearby mess services.",
  icons: {
    icon: "/logosmall.svg",
  }
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
