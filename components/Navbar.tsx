"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { appRoutes } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-black/5" 
          : "bg-white/90 backdrop-blur-md shadow-sm border-b border-black/5 lg:bg-transparent lg:border-b-0 lg:shadow-none"
      }`}
      style={{
        paddingTop: scrolled ? "calc(env(safe-area-inset-top, 0px) + 0.75rem)" : "calc(env(safe-area-inset-top, 0px) + 1.5rem)",
        paddingBottom: scrolled ? "0.75rem" : "1.5rem",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black text-primary tracking-tight transition-colors duration-300">
            Exbabel
          </span>
        </Link>

        {/* Desktop Menu - Centered & Simple */}
        <div className="hidden lg:flex items-center gap-8">
          
          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors flex items-center gap-1.5 py-2">
              Products
              <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </button>
            
            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full -left-4 mt-1 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 overflow-hidden origin-top-left"
                >
                  <Link href="/live" className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-primary transition-colors">
                    Live Video Translation
                  </Link>
                  <Link href="/live" className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-primary transition-colors">
                    Live Video Captions
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {["How It Works", "Pricing", "FAQ"].map((item) => {
            const id = item.toLowerCase().replace(/\s+/g, '-');
            const targetHref = pathname === '/' ? `#${id}` : `/#${id}`;
            return (
              <a
                key={item}
                href={targetHref}
                className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors"
              >
                {item}
              </a>
            );
          })}
          <a
            href="/impact"
            className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors"
          >
            Impact
          </a>
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

            <Link
              href="/demo"
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg ${scrolled
                ? "bg-primary text-white hover:bg-primary/90 scale-105"
                : "bg-white text-primary border-2 border-white hover:bg-white/90"
                }`}
              style={!scrolled ? { color: '#1d1c1d', backgroundColor: 'white' } : {}}
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
