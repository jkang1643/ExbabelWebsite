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
    <section className="relative py-4 md:py-6 max-w-5xl mx-auto">
      <div className="layout-spine relative z-20 text-center flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 opacity-80">
        <p className="text-sm font-semibold tracking-wide text-slate-500 whitespace-nowrap">
          Trusted by top churches
        </p>

        {/* Scrolling logos container */}
        <div className="relative flex-1 w-full overflow-hidden mask-gradient-x">
          <div className="flex gap-16 md:gap-24 animate-scroll whitespace-nowrap">
            {[
              "Houston Apostolic Church", "Lighthouse Pentecostal Church", "Lighthouse Church",
              "1st Baptist Church of Houston",
              "Houston Apostolic Church", "Lighthouse Pentecostal Church", "Lighthouse Church",
              "1st Baptist Church of Houston"
            ].map((partner, index) => (
              <div key={index} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="text-base md:text-lg font-bold text-[#1d1c1d] flex items-center gap-2">
                  {/* Simple dot placeholder for logo */}
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
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
             animation: scroll 20s linear infinite;
          }
       `}</style>
    </section>
  );
}
