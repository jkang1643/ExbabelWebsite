"use client";

import Navbar from "@/components/Navbar";
import BookADemo from "@/components/BookADemo";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export default function DemoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Book a Demo", url: "https://exbabel.com/demo" }]} />
      <main className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-24">
          <BookADemo />
        </div>
        <Footer />
      </main>
    </>
  );
}
