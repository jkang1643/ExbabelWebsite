"use client";

import Navbar from "@/components/Navbar";
import BookADemo from "@/components/BookADemo";
import Footer from "@/components/Footer";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-24">
        <BookADemo />
      </div>
      <Footer />
    </main>
  );
}
