"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const links = {
    Product: ["Features", "Pricing", "API", "Enterprise"],
    Company: ["About", "Careers", "Press", "Partners"],
    Resources: ["Blog", "Documentation", "Lab Benchmarks", "Support", "Community"],
    Legal: ["Privacy", "Terms", "Security", "Compliance"],
  };

  // Map specific items to their real routes
  const linkHrefs: Record<string, string> = {
    Support: "mailto:support@exbabel.com",
    Privacy: "/privacy",
    Terms: "/terms",
    Blog: "/blog",
    "Lab Benchmarks": "/lab-test",
  };

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/exbabel", initial: "X" },
    { name: "LinkedIn", href: "https://linkedin.com/company/exbabel", initial: "in" },
    { name: "GitHub", href: "https://github.com/exbabel", initial: "G" },
    { name: "YouTube", href: "https://youtube.com/@exbabel", initial: "Y" },
  ];

  return (
    <footer className="mobile-fade-up bg-slate-100 text-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="mobile-fade-up absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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

      <div className="mobile-fade-up p-10 relative z-10">
        <div className="mobile-fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <motion.nav
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8 }}
           
          >
            <h3 className="mobile-fade-up text-3xl font-bold mb-4 text-primary">
              Exbabel
            </h3>
            <p className="mobile-fade-up text-sm text-slate-600 max-w-xs">
              The enterprise platform for real-time multilingual translation.
            </p>
          </motion.nav>

          {Object.entries(links).map(([category, items], categoryIndex) => (
            <motion.nav
              key={category}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
             
            >
              <h6 className="mobile-fade-up text-xs tracking-wider text-primary uppercase font-bold mb-3">{category}</h6>
              <div className="mobile-fade-up flex flex-col gap-2">
                {items.map((item) => {
                  const href = linkHrefs[item] || "#";
                  const isInternal = href.startsWith("/");

                  if (isInternal) {
                    return (
                      <Link key={item} href={href} className="mobile-fade-up text-sm text-slate-600 hover:text-primary hover:underline transition-colors">
                        {item}
                      </Link>
                    );
                  }

                  return (
                    <a key={item} href={href} className="mobile-fade-up text-sm text-slate-600 hover:text-primary hover:underline transition-colors">
                      {item}
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          ))}
        </div>
      </div>

      <div className="mobile-fade-up flex flex-col items-center gap-4 p-10 bg-slate-100 text-slate-800 border-t border-primary/10 relative z-10 mt-10 w-full text-center">
        <div className="mobile-fade-up flex gap-4">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Exbabel on ${social.name}`}
              className="mobile-fade-up w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 hover:bg-primary hover:text-white transition-all bg-white shadow-sm"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
             
              whileHover={{ scale: 1.1 }}
            >
              <span className="mobile-fade-up text-xs font-bold">{social.initial}</span>
            </motion.a>
          ))}
        </div>
        <div>
          <p className="mobile-fade-up text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} Exbabel Co. All rights reserved.
          </p>
          <p className="mobile-fade-up text-slate-400 text-xs mt-1">
            Houston, TX, USA &bull; (281) 682-4828 &bull; support@exbabel.com
          </p>
        </div>
      </div>
    </footer>
  );
}
