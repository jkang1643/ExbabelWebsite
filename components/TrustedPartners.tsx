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
    <section className="py-24 bg-white">
      <div className="layout-spine">
        <p className="text-[#616061] text-sm font-bold uppercase tracking-widest mb-12 text-center">
          Trusted by teams at
        </p>

        {/* Scrolling logos container */}
        <div className="relative w-full overflow-hidden mask-gradient-x">
          <div className="flex gap-16 md:gap-24 animate-scroll whitespace-nowrap">
            {duplicatedPartners.map((partner, index) => (
              <div key={index} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                <div className="text-3xl font-black text-[#1d1c1d] flex items-center gap-2">
                  {/* Simple placeholder logo */}
                  <div className="w-8 h-8 bg-[#1d1c1d] rounded text-white flex items-center justify-center text-sm font-bold">
                    {partner.icon}
                  </div>
                  <span className="text-xl font-bold">{partner.name}</span>
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
