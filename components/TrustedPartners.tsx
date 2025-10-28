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
    { name: "Shopify", icon: "SH" },
    { name: "Adobe", icon: "A" },
    { name: "Oracle", icon: "O" },
    { name: "SAP", icon: "SAP" },
    { name: "IBM", icon: "IBM" },
    { name: "Cisco", icon: "C" },
  ];

  // Duplicate the array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-base-100 to-blue-50/30 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral">
              Trusted by industry leaders
            </h2>
            <p className="text-lg text-neutral/70 max-w-2xl mx-auto">
              Join thousands of organizations worldwide that rely on Exbabel for seamless communication
            </p>
        </motion.div>

        {/* Scrolling logos container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-base-100 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-base-100 to-transparent z-10" />

          {/* First row - scroll left to right */}
          <div className="mb-8 overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-32 bg-white/70 backdrop-blur-sm rounded-3xl border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 group hover:scale-105"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-100/50 flex items-center justify-center group-hover:from-primary/20 group-hover:to-blue-100 transition-all">
                    <span className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                      {partner.icon}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-neutral">{partner.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second row - scroll right to left */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [-1920, 0],
              }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-32 bg-white/70 backdrop-blur-sm rounded-3xl border border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 group hover:scale-105"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/10 to-blue-100/50 flex items-center justify-center group-hover:from-secondary/20 group-hover:to-blue-100 transition-all">
                    <span className="text-2xl font-bold bg-gradient-to-br from-secondary to-info bg-clip-text text-transparent">
                      {partner.icon}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-neutral">{partner.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats below */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { value: "10,000+", label: "Organizations" },
            { value: "2M+", label: "Active Users" },
            { value: "150+", label: "Countries" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

