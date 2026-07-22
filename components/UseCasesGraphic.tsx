"use client";

import { motion } from "framer-motion";

export default function UseCasesGraphic() {
  const useCases = [
    {
      title: "Businesses",
      border: "border-emerald-300 hover:border-emerald-500",
      textColor: "text-blue-600",
      icon: (
        <svg className="w-12 h-12 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1" />
        </svg>
      ),
    },
    {
      title: "Associations & Not-For-Profits",
      border: "border-emerald-300 hover:border-emerald-500",
      textColor: "text-blue-600",
      icon: (
        <svg className="w-12 h-12 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5a1.5 1.5 0 113 0m-3 0V11m3-5.5a1.5 1.5 0 113 0m-3 0V11" />
        </svg>
      ),
    },
    {
      title: "Governments",
      border: "border-blue-300 hover:border-blue-500",
      textColor: "text-blue-600",
      icon: (
        <svg className="w-12 h-12 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
    },
    {
      title: "Education",
      border: "border-emerald-300 hover:border-emerald-500",
      textColor: "text-blue-600",
      icon: (
        <svg className="w-12 h-12 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      title: "Houses of Worship",
      border: "border-emerald-300 hover:border-emerald-500",
      textColor: "text-blue-600",
      icon: (
        <svg className="w-12 h-12 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "All Use Cases",
      isHighlighted: true,
      border: "border-blue-600",
      textColor: "text-white",
      icon: null,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="layout-spine max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora), sans-serif" }}
          >
            Built for Every Industry &amp; Setting
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-600 font-medium"
          >
            Tailored translation workflows designed to meet the exact requirements of your organization.
          </motion.p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[220px] shadow-sm hover:shadow-xl ${
                item.isHighlighted
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : `bg-white border-2 ${item.border}`
              }`}
            >
              {item.icon && <div className="mb-6 flex justify-center">{item.icon}</div>}
              <h3
                className={`text-xl md:text-2xl font-bold max-w-xs ${item.textColor}`}
                style={{ fontFamily: "var(--font-sora), sans-serif" }}
              >
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
