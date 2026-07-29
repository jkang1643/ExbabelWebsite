"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { appRoutes } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const pathname = usePathname();

  // Throttled scroll handler using requestAnimationFrame
  const rafRef = useRef<number>(0);
  const handleScroll = useCallback(() => {
    if (rafRef.current) return; // Already scheduled
    rafRef.current = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 20);
      rafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Dynamic viewport-fit cover fix for iOS Safari notch gap
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      const content = meta.getAttribute("content") || "";
      if (!content.includes("viewport-fit=cover")) {
        meta.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-safe-area ${
        scrolled 
          ? "navbar-padding-scrolled" 
          : "navbar-padding-normal"
      }`}
    >
      {/* Absolute background cover for notch & navbar to prevent compositor clipping on iOS Safari */}
      <div 
        className={`absolute top-[-100px] left-0 right-0 bottom-0 transition-all duration-300 pointer-events-none z-[-1] ${
          scrolled 
            ? "bg-white shadow-sm border-b border-black/5" 
            : "bg-white shadow-sm border-b border-black/5 lg:bg-transparent lg:border-b-0 lg:shadow-none"
        }`}
      />
      <div 
        className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black text-primary tracking-tight transition-colors duration-300">
            Exbabel
          </span>
        </Link>

        {/* Desktop Menu - Centered & Simple */}
        <div className="flex items-center gap-3 sm:gap-5 lg:gap-7 py-1">
          
          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button 
              onClick={() => setIsProductsOpen((prev) => !prev)}
              className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors flex items-center gap-1.5 py-2 focus:outline-none"
            >
              Products
              <svg 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isProductsOpen ? 'rotate-180 text-primary' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full -left-2 mt-1 w-60 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2.5 z-50 origin-top-left"
                >
                  <a 
                    href={appRoutes.live} 
                    onClick={() => setIsProductsOpen(false)}
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    <div className="font-bold text-gray-900">Live Video Translation</div>
                    <div className="text-xs text-gray-500 font-normal">Real-time AI speech-to-speech stream</div>
                  </a>
                  <a 
                    href={appRoutes.live} 
                    onClick={() => setIsProductsOpen(false)}
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    <div className="font-bold text-gray-900">Live Video Captions</div>
                    <div className="text-xs text-gray-500 font-normal">Sub-second multilingual captions</div>
                  </a>
                  <div className="my-1.5 border-t border-gray-100" />
                  <Link 
                    href="/lab-test" 
                    onClick={() => setIsProductsOpen(false)}
                    className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    <div className="font-bold text-primary flex items-center gap-1.5">
                      <span>Lab Latency Report</span>
                      <span className="text-[10px] bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded font-mono uppercase">EXB-LAB</span>
                    </div>
                    <div className="text-xs text-gray-500 font-normal">Independent IEEE/ISO benchmark report</div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/how-it-works"
            className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors"
          >
            How It Works
          </Link>

          <Link
            href="/lab-test"
            className="text-xs sm:text-sm font-bold text-primary bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-full hover:bg-cyan-100 transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            Laboratory Testing
          </Link>

          {["Pricing", "FAQ"].map((item) => {
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
    </nav>
  );
}
