"use client";

import { useState } from "react";
import { HOME_FAQ_DATA } from "@/lib/schema";

export default function FAQ() {
  // Use centralized FAQ data but render with JSX for the link in the second answer
  const faqs = HOME_FAQ_DATA.map((faq, i) => ({
    question: faq.question,
    answer:
      i === 1 ? (
        <>
          Exbabel supports translation into{" "}
          <a
            href="/impact"
            className="text-primary font-bold hover:underline decoration-2 underline-offset-4"
          >
            180+ languages and dialects
          </a>
          , including English, Spanish, French, Chinese (Simplified &amp;
          Traditional), Arabic, Hindi, Portuguese, Russian, Japanese, Korean,
          German, Italian, and many more. 90+ languages include premium AI voice
          output, and 250+ are available for captions and text translation.
        </>
      ) : (
        faq.answer
      ),
  }));

  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-b from-blue-50/20 to-base-100 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #7C3AED28 0%, #7C3AED12 50%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #2563EB22 0%, #2563EB10 50%, transparent 70%)' }} />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-info via-primary to-accent bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Common questions about deployment, capabilities, and integration.
          </p>
        </div>

        {/* Standard-compliant clean card list (fixes iOS WebKit button height bug) */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="w-full bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left focus:outline-none bg-white hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45 text-primary' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/30">
                    {faq.answer}
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
