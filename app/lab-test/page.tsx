import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import LabTestClient from "./LabTestClient";

export const metadata: Metadata = {
  title: "Exbabel Delivers 10x-30x Faster Audio Translation | Lab Report",
  description:
    "Independent lab report EXB-LAB-2026-001: While Wordly lags by 20-60+ seconds during continuous speech, Exbabel streams live audio in ~2 seconds (10x-30x speedup).",
  alternates: {
    canonical: "/lab-test",
  },
  openGraph: {
    title: "Exbabel vs. Wordly: Up to 30x Faster Audio Translation",
    description:
      "Controlled A/V latency report: Wordly's continuous speech audio lags by 20+ seconds while Exbabel maintains constant ~2s streaming audio (10x to 30x faster).",
    url: "https://exbabel.com/lab-test",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exbabel vs. Wordly Latency Benchmark Lab Report",
    description:
      "Objective A/V latency testing report. Exbabel streams translated speech in ~2.0s vs Wordly's 7.22s continuous speech buffering lag.",
  },
};

export default function LabTestPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Lab Testing & Benchmarks", url: "https://exbabel.com/lab-test" },
        ]}
      />
      <main className="min-h-screen bg-[#F8F9FA] text-[#0B1220] font-sans selection:bg-[#394dfe]/20">
        {/* Main Blue Header Navigation Bar */}
        <header className="sticky top-0 z-50 bg-[#394dfe] text-white shadow-lg shadow-[#394dfe]/20">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-2xl font-black text-white hover:opacity-90 transition-opacity tracking-tight"
              >
                Exbabel
              </Link>
              <span className="h-4 w-px bg-white/30" />
              <span className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-white/15 text-white border border-white/20 font-bold">
                Research Lab
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors mr-2 hidden sm:inline-block"
              >
                ← Back to Home
              </Link>
              
              {/* PDF Download Header Button */}
              <a
                href="/docs/exbabel_vs_wordly_lab_report.pdf"
                download="Exbabel_vs_Wordly_Lab_Report_2026.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-full bg-white text-[#394dfe] hover:bg-slate-100 transition-all shadow-md hover:scale-[1.02]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 16L7 11H10V4H14V11H17L12 16ZM19 18H5V20H19V18Z" />
                </svg>
                <span>Download PDF Report</span>
              </a>

              {/* MD Download Header Button */}
              <a
                href="/docs/exbabel_vs_wordly_lab_report.md"
                download="Exbabel_vs_Wordly_Lab_Report_2026.md"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-full bg-white/15 text-white border border-white/30 hover:bg-white/25 transition-all hidden md:inline-flex"
              >
                <span>.MD</span>
              </a>
            </div>
          </div>
        </header>

        {/* Client Interactive Section */}
        <LabTestClient />
      </main>
    </>
  );
}
