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
      <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 transition-opacity"
              >
                Exbabel
              </Link>
              <span className="hidden sm:inline-block h-4 w-px bg-slate-800" />
              <span className="hidden sm:inline-block text-xs font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                Research Lab
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                ← Back to Home
              </Link>
              <a
                href="/docs/exbabel_vs_wordly_lab_report.md"
                download="Exbabel_vs_Wordly_Lab_Report_2026.md"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Report (.MD)
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
