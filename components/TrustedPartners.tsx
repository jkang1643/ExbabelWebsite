"use client";

import { motion } from "framer-motion";

export default function TrustedPartners() {
  const partners = [
    { name: "Google", icon: "G" },
    { name: "Microsoft", icon: "M" },
    { name: "Salesforce", icon: "SF" },
    { name: "HubSpot", icon: "H" },
    { name: "Zoom", icon: "Z" },
    { name: "Slack", icon: "S" },
    { name: "Spotify", icon: "SP" },
    { name: "Adobe", icon: "A" },
    { name: "Oracle", icon: "O" },
    { name: "SAP", icon: "SAP" },
    { name: "IBM", icon: "IBM" },
    { name: "Cisco", icon: "C" },
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#F8F9FA] to-white border-b border-gray-100">

      <div className="layout-spine relative z-20 text-center">
        <p className="text-eyebrow mb-4 text-slate-400">
          TRUSTED BY CHURCHES WORLDWIDE
        </p>
        <a
          href="/impact"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary/60 hover:text-primary transition-colors mb-12 group"
        >
          View our global impact
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </a>

        {/* Scrolling logos container */}
        <div className="relative w-full overflow-hidden mask-gradient-x">
          <div className="flex gap-16 md:gap-24 animate-scroll whitespace-nowrap">
            {[
              "Houston Apostolic Church", "Lighthouse Pentecostal Church", "Houston Chinese Community Church",
              "Trail Church", "1st Baptist Church of Houston",
              "Houston Apostolic Church", "Lighthouse Pentecostal Church", "Houston Chinese Community Church",
              "Trail Church", "1st Baptist Church of Houston"
            ].map((partner, index) => (
              <div key={index} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="text-xl md:text-2xl font-bold text-[#1d1c1d] flex items-center gap-3">
                  {/* Simple dot placeholder for logo */}
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <span className="tracking-tight">{partner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
          .mask-gradient-x {
             mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          }
          @keyframes scroll {
             0% { transform: translateX(0); }
             100% { transform: translateX(-50%); }
          }
          .animate-scroll {
             animation: scroll 40s linear infinite;
          }
       `}</style>
    </section>
  );
}
