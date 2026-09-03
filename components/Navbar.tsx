"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { appRoutes } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Throttled scroll handler using requestAnimationFrame
  const rafRef = useRef<number>(0);
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 20);
      rafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

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
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`relative w-full transition-all duration-300 ${
          scrolled 
            ? "py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5" 
            : "py-4 bg-white/80 backdrop-blur-sm border-b border-black/5 lg:bg-transparent lg:border-b-0 lg:shadow-none"
        }`}
      >
        <div 
          className={`absolute top-[-100px] left-0 right-0 bottom-0 transition-all duration-300 pointer-events-none z-[-1] ${
            scrolled 
              ? "bg-white shadow-sm border-b border-black/5" 
              : "bg-white shadow-sm border-b border-black/5 lg:bg-transparent lg:border-b-0 lg:shadow-none"
          }`}
        />
        <div 
          className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-2xl font-black text-primary tracking-tight transition-colors duration-300">
              Exbabel
            </span>
          </Link>

          {/* Desktop Navigation Links — HIDDEN ON MOBILE (lg:flex) */}
          <div className="hidden lg:flex items-center gap-7 py-1">
            
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
                        Performance Report
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
              className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors cursor-pointer"
            >
              Performance Report
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

          {/* Right Action Bar (Sign In, Consultation CTA & Mobile Hamburger Button) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={appRoutes.signin}
              className="text-xs sm:text-sm font-bold text-[#1d1c1d] hover:text-primary transition-colors px-2 py-1"
            >
              Sign in
            </a>

            <Link
              href="/demo"
              className={`px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg whitespace-nowrap ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-primary border border-slate-200 lg:border-2 lg:border-white hover:bg-white/90"
              }`}
              style={!scrolled ? { color: '#1d1c1d', backgroundColor: 'white' } : {}}
            >
              Schedule a Consultation
            </Link>

            {/* Mobile Hamburger Button (3 Horizontal Lines - Slack style) — MOBILE ONLY */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-primary hover:bg-slate-100/80 transition-colors focus:outline-none ml-1"
            >
              {isMobileMenuOpen ? (
                /* Close Icon X */
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Slack 3-Horizontal Lines Icon */
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 py-1">Products</div>
                  <a
                    href={appRoutes.live}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Live Video Translation
                  </a>
                  <a
                    href={appRoutes.live}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Live Video Captions
                  </a>
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-1">
                  <Link
                    href="/how-it-works"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    How It Works
                  </Link>

                  <Link
                    href="/lab-test"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Performance Report
                  </Link>

                  <a
                    href={pathname === '/' ? "#pricing" : "/#pricing"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Pricing
                  </a>

                  <a
                    href={pathname === '/' ? "#faq" : "/#faq"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    FAQ
                  </a>

                  <a
                    href="/impact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Impact
                  </a>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <Link
                    href="/demo"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full block text-center py-3 bg-primary text-white font-extrabold text-sm rounded-full shadow-md hover:bg-primary/90 transition-all"
                  >
                    Schedule a Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
