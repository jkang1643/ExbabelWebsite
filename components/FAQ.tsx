"use client";

import { useState } from "react";
import { HOME_FAQ_DATA } from "@/lib/schema";

export default function FAQ() {
  // Use the centralized FAQ data but render with JSX for the link in the first answer
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
    <section id="faq" className="py-16 md:py-24 px-4 bg-gradient-to-b from-blue-50/20 to-base-100 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #7C3AED28 0%, #7C3AED12 50%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #2563EB22 0%, #2563EB10 50%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-info via-primary to-accent bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-base-content max-w-2xl mx-auto">
            Common questions about deployment, capabilities, and integration.
          </p>
        </div>

        {/* FAQ list with explicit flex gap (no vertical layout stretching on mobile) */}
        <div className="flex flex-col gap-3.5 my-0">
          {faqs.map((faq, index) => (
            <div key={index} className="w-full my-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full text-left bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden focus:outline-none"
              >
                <div className="flex items-center justify-between px-5 sm:px-6 py-4">
                  <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-45 text-primary' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'}`}
                >
                  <div className="px-5 sm:px-6 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">{faq.answer}</div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
