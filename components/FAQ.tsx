"use client";

import { useState } from "react";
import Link from "next/link";
import { HOME_FAQ_DATA } from "@/lib/schema";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const renderEnrichedAnswer = (index: number, answerText: string) => {
    // Enrich specific answers with contextual high-value internal links
    if (index === 2) {
      // Wordly comparison
      return (
        <div className="space-y-2">
          <p>{answerText}</p>
          <div className="pt-2">
            <Link
              href="/lab-test"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline group"
            >
              <span>Read the independent Wordly vs Exbabel latency laboratory report (EXB-LAB-2026-001)</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      );
    }

    if (index === 3) {
      // Equipment cost vs Exbabel
      return (
        <div className="space-y-2">
          <p>{answerText}</p>
          <div className="pt-2">
            <Link
              href="/solutions/church-translation"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline group"
            >
              <span>Explore how churches replace expensive translation hardware with Exbabel</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      );
    }

    if (index === 7) {
      // 180+ languages
      return (
        <div className="space-y-2">
          <p>{answerText}</p>
          <div className="pt-2">
            <Link
              href="/impact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline group"
            >
              <span>Browse all 180+ supported languages and dialects directory</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      );
    }

    if (index === 9) {
      // Pricing
      return (
        <div className="space-y-2">
          <p>{answerText}</p>
          <div className="pt-2">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline group"
            >
              <span>View full pricing tier feature comparison</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      );
    }

    return <p>{answerText}</p>;
  };

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-b from-blue-50/20 to-base-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #7C3AED28 0%, #7C3AED12 50%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #2563EB22 0%, #2563EB10 50%, transparent 70%)' }}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.015em] mb-3 bg-gradient-to-r from-info via-primary to-accent bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Common questions about deployment, capabilities, and integration.
          </p>
        </div>

        {/* Clean, accessible FAQ card list */}
        <div className="flex flex-col gap-3">
          {HOME_FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-title-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className={`w-full bg-white border shadow-sm rounded-2xl overflow-hidden transition-all ${
                  isOpen ? "border-primary/40 ring-1 ring-primary/10" : "border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  id={headingId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left focus:outline-none bg-white hover:bg-slate-50/50 transition-colors"
                >
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 pr-4 leading-snug">
                    {faq.question}
                  </h3>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center border border-slate-200 text-xs font-bold transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-45 bg-primary text-white border-primary" : "text-gray-500 bg-slate-50"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-5 sm:px-6 pb-4 text-gray-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/40"
                  >
                    {renderEnrichedAnswer(index, faq.answer)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
