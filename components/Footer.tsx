"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const links = {
    Product: ["Features", "Pricing", "API", "Enterprise"],
    Company: ["About", "Careers", "Press", "Partners"],
    Resources: ["Blog", "Documentation", "Support", "Community"],
    Legal: ["Privacy", "Terms", "Security", "Compliance"],
  };

  return (
    <footer className="footer p-10 bg-base-200 text-base-content relative overflow-hidden">
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

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Exbabel
          </h3>
          <p className="text-sm text-neutral max-w-xs">
            Bridging communities through the power of language.
          </p>
        </motion.div>
      </div>

      {Object.entries(links).map(([category, items], categoryIndex) => (
        <motion.nav
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
          viewport={{ once: true }}
        >
          <h6 className="footer-title text-accent">{category}</h6>
          {items.map((item) => (
            <a key={item} href="#" className="link link-hover text-neutral">
              {item}
            </a>
          ))}
        </motion.nav>
      ))}

      <div className="footer footer-center p-10 bg-base-200 text-base-content border-t border-primary/10 relative z-10 mt-10 w-full">
        <div className="grid grid-flow-col gap-4">
          {["Twitter", "LinkedIn", "GitHub", "Discord"].map((social, i) => (
            <motion.a
              key={social}
              href="#"
              className="btn btn-ghost btn-circle hover:bg-primary hover:text-white transition-all"
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
          <p className="text-neutral text-sm">
            © {new Date().getFullYear()} Exbabel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

