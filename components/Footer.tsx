"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const links = {
    Product: ["Features", "Pricing", "API", "Enterprise"],
    Company: ["About", "Careers", "Press", "Partners"],
    Resources: ["Blog", "Documentation", "Support", "Community"],
    Legal: ["Privacy", "Terms", "Security", "Compliance"],
  };

  // Map specific items to their real routes
  const linkHrefs: Record<string, string> = {
    Support: "mailto:support@exbabel.com",
    Privacy: "/privacy",
    Terms: "/terms",
  };

  return (
    <footer className="bg-slate-100 text-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="p-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4 text-primary">
              Exbabel
            </h3>
            <p className="text-sm text-slate-600 max-w-xs">
              Real-time speech-to-speech AI translation platform for live video, audio, and captions.
            </p>
          </motion.nav>

          {Object.entries(links).map(([category, items], categoryIndex) => (
            <motion.nav
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h6 className="text-xs tracking-wider text-primary uppercase font-bold mb-3">{category}</h6>
              <div className="flex flex-col gap-2">
                {items.map((item) => {
                  const href = linkHrefs[item] || "#";
                  const isInternal = href.startsWith("/");

                  if (isInternal) {
                    return (
                      <Link key={item} href={href} className="text-sm text-slate-600 hover:text-primary hover:underline transition-colors">
                        {item}
                      </Link>
                    );
                  }

                  return (
                    <a key={item} href={href} className="text-sm text-slate-600 hover:text-primary hover:underline transition-colors">
                      {item}
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-10 bg-slate-100 text-slate-800 border-t border-primary/10 relative z-10 mt-10 w-full text-center">
        <div className="flex gap-4">
          {["Twitter", "LinkedIn", "GitHub", "Discord"].map((social, i) => (
            <motion.a
              key={social}
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 hover:bg-primary hover:text-white transition-all bg-white shadow-sm"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-xs font-bold">{social.charAt(0)}</span>
            </motion.a>
          ))}
        </div>
        <div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Exbabel. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs mt-1">
            v1.0.0 • Deployed via CI/CD
          </p>
        </div>
      </div>
    </footer>
  );
}

