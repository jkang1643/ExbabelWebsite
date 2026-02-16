"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { appRoutes } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-black/5" : "bg-transparent py-6"
        }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-2xl font-black text-primary tracking-tight transition-colors duration-300">
            Exbabel
          </span>
        </a>

        {/* Desktop Menu - Centered & Simple */}
        <div className="hidden lg:flex items-center gap-8">
          {["How It Works", "Features", "Pricing", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <a
            href={appRoutes.signin}
            className="hidden md:block text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors"
          >
            Sign in
          </a>
          <div className="relative">

            <a
              href={appRoutes.demo}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg ${scrolled
                ? "bg-primary text-white hover:bg-primary/90 scale-105"
                : "bg-white text-primary border-2 border-white hover:bg-white/90"
                }`}
              style={!scrolled ? { color: '#1d1c1d', backgroundColor: 'white' } : {}}
            >
              Try for free
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
