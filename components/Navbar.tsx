"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { appRoutes } from "@/lib/config";

// A reusable Dropdown Item component for consistency
function DropdownItem({ 
  href, 
  onClick, 
  title, 
  description,
  isAnchor = false 
}: { 
  href: string; 
  onClick: () => void; 
  title: React.ReactNode; 
  description?: string;
  isAnchor?: boolean;
}) {
  const content = (
    <>
      <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{title}</div>
      {description && <div className="text-xs text-gray-500 font-normal mt-0.5">{description}</div>}
    </>
  );

  const className = "block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-slate-50 transition-colors group";

  if (isAnchor) {
    return <a href={href} onClick={onClick} className={className}>{content}</a>;
  }
  return <Link href={href} onClick={onClick} className={className}>{content}</Link>;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
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

  const chevronIcon = (isOpen: boolean) => (
    <svg 
      className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`relative w-full transition-all duration-300 ${
          scrolled 
            ? "py-3 bg-white/95 md:backdrop-blur-md shadow-sm border-b border-black/5" 
            : "py-4 bg-white/80 md:backdrop-blur-sm border-b border-black/5 lg:bg-transparent lg:border-b-0 lg:shadow-none"
        }`}
      >
        <div 
          className={`absolute top-[-100px] left-0 right-0 bottom-0 transition-all duration-300 pointer-events-none z-[-1] ${
            scrolled 
              ? "bg-white shadow-sm border-b border-black/5" 
              : "bg-white shadow-sm border-b border-black/5 lg:bg-transparent lg:border-b-0 lg:shadow-none"
          }`}
        />
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <span className="text-2xl font-black text-primary tracking-tight transition-colors duration-300">
                Exbabel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 mx-auto py-1">
              
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
                  {chevronIcon(isProductsOpen)}
                </button>
                
                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ y: 8, scale: 0.96 }}
                      animate={{ y: 0, scale: 1 }}
                      exit={{ y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full -left-2 mt-1 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2.5 z-50 origin-top-left"
                    >
                      <DropdownItem 
                        href="/" 
                        onClick={() => setIsProductsOpen(false)}
                        title="ExBabel Translate"
                      />
                      <DropdownItem 
                        href="/live" 
                        onClick={() => setIsProductsOpen(false)}
                        title="ExBabel Live"
                        description="Real-time AI speech-to-speech stream"
                      />
                      <DropdownItem 
                        href="/live" 
                        onClick={() => setIsProductsOpen(false)}
                        title="ExBabel Live Captions"
                        description="Sub-second multilingual captions"
                      />
                      <DropdownItem 
                        href="#" 
                        onClick={() => setIsProductsOpen(false)}
                        title="ExBabel Events"
                        description="Coming soon"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <button 
                  onClick={() => setIsSolutionsOpen((prev) => !prev)}
                  className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors flex items-center gap-1.5 py-2 focus:outline-none"
                >
                  Solutions
                  {chevronIcon(isSolutionsOpen)}
                </button>
                
                <AnimatePresence>
                  {isSolutionsOpen && (
                    <motion.div
                      initial={{ y: 8, scale: 0.96 }}
                      animate={{ y: 0, scale: 1 }}
                      exit={{ y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full -left-2 mt-1 w-52 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2.5 z-50 origin-top-left"
                    >
                      <DropdownItem 
                        href="/solutions/churches" 
                        onClick={() => setIsSolutionsOpen(false)}
                        title="For Churches"
                      />
                      <DropdownItem 
                        href="/solutions/business" 
                        onClick={() => setIsSolutionsOpen(false)}
                        title="For Business"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <button 
                  onClick={() => setIsResourcesOpen((prev) => !prev)}
                  className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors flex items-center gap-1.5 py-2 focus:outline-none"
                >
                  Resources
                  {chevronIcon(isResourcesOpen)}
                </button>
                
                <AnimatePresence>
                  {isResourcesOpen && (
                    <motion.div
                      initial={{ y: 8, scale: 0.96 }}
                      animate={{ y: 0, scale: 1 }}
                      exit={{ y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full -left-2 mt-1 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2.5 z-50 origin-top-left"
                    >
                      <DropdownItem 
                        href="/how-it-works" 
                        onClick={() => setIsResourcesOpen(false)}
                        title="How It Works"
                      />
                      <DropdownItem 
                        href="/lab-test" 
                        onClick={() => setIsResourcesOpen(false)}
                        title={<span className="text-primary">Performance Report</span>}
                        description="Independent IEEE/ISO benchmark report"
                      />
                      <DropdownItem 
                        href="/blog" 
                        onClick={() => setIsResourcesOpen(false)}
                        title="Blog"
                      />
                      <DropdownItem 
                        href="/impact" 
                        onClick={() => setIsResourcesOpen(false)}
                        title="Impact"
                      />
                      <DropdownItem 
                        href={pathname === '/' ? "#faq" : "/#faq"} 
                        isAnchor={true}
                        onClick={() => setIsResourcesOpen(false)}
                        title="FAQ"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing directly visible */}
              <a
                href={pathname === '/' ? "#pricing" : "/#pricing"}
                className="text-sm font-medium text-[#1d1c1d] hover:text-primary transition-colors"
              >
                Pricing
              </a>
            </div>

          {/* Right Action Bar (Sign In, CTA Buttons, Language & Mobile Hamburger) */}
          <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 flex-shrink-0">
            
            <Link
              href="https://app.exbabel.com/translate/checkout?plan=starter"
              className={`hidden sm:flex px-4 py-1.5 rounded-full text-sm font-bold transition-all items-center justify-center border-2 border-[#1d1c1d] text-[#1d1c1d] hover:bg-slate-50 whitespace-nowrap`}
            >
              Try it now
            </Link>

            <Link
              href="/demo"
              className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg whitespace-nowrap ${
                scrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-primary text-white hover:bg-primary/90 border border-transparent"
              }`}
            >
              Schedule a Consultation
            </Link>

            <a
              href={appRoutes.signin}
              className="hidden sm:block text-sm font-bold text-[#1d1c1d] hover:text-primary transition-colors px-1 py-1 whitespace-nowrap"
            >
              Log in
            </a>

            <div className="hidden lg:block w-px h-5 bg-gray-200 mx-1"></div>

            {/* Minimal Language Selector with Globe Icon */}
            <div className="hidden lg:block relative" onMouseEnter={() => setIsLanguageOpen(true)} onMouseLeave={() => setIsLanguageOpen(false)}>
              <button 
                onClick={() => setIsLanguageOpen((prev) => !prev)}
                className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-1 py-2 focus:outline-none"
                aria-label="Select Language"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden xl:inline-block ml-0.5 font-semibold">English</span>
                {chevronIcon(isLanguageOpen)}
              </button>
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ y: 8, scale: 0.96 }}
                    animate={{ y: 0, scale: 1 }}
                    exit={{ y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 origin-top-right"
                  >
                    <button className="w-full text-left px-4 py-2 text-sm font-bold text-gray-900 bg-slate-50 flex items-center gap-2">
                      <span>🇺🇸</span> English
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-50 flex items-center gap-2">
                      <span>🇪🇸</span> Español
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-slate-50 flex items-center gap-2">
                      <span>🇫🇷</span> Français
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-primary hover:bg-slate-100/80 transition-colors focus:outline-none ml-1"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
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
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-white/98 md:backdrop-blur-xl border-t border-gray-100 shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 py-1">Products</div>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">ExBabel Translate</Link>
                  <Link href="/live" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">ExBabel Live</Link>
                  <Link href="/live" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">ExBabel Live Captions</Link>
                  <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-500 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">ExBabel Events <span className="text-xs font-normal bg-gray-100 px-2 py-0.5 rounded-full ml-1">Soon</span></Link>
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-1">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 py-1">Solutions</div>
                  <Link href="/solutions/churches" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">For Churches</Link>
                  <Link href="/solutions/business" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">For Business</Link>
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-1">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 py-1">Resources</div>
                  <Link href="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">How It Works</Link>
                  <Link href="/lab-test" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">Performance Report</Link>
                  <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">Blog</Link>
                  <a href={pathname === '/' ? "#pricing" : "/#pricing"} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">Pricing</a>
                  <a href={pathname === '/' ? "#faq" : "/#faq"} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">FAQ</a>
                  <Link href="/impact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-bold text-gray-900 hover:text-primary rounded-xl hover:bg-slate-50 transition-colors">Impact</Link>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-center pb-2">
                    <button className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-primary bg-slate-50 px-4 py-2 rounded-xl">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       English
                    </button>
                  </div>
                  <Link href="https://app.exbabel.com/translate/checkout?plan=starter" onClick={() => setIsMobileMenuOpen(false)} className="w-full block text-center py-3 border-2 border-gray-200 text-gray-900 font-extrabold text-sm rounded-full hover:bg-slate-50 transition-all">
                    Try it now
                  </Link>
                  <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)} className="w-full block text-center py-3 bg-primary text-white font-extrabold text-sm rounded-full shadow-md hover:bg-primary/90 transition-all">
                    Schedule a Consultation
                  </Link>
                  <div className="text-center pt-2">
                    <a href={appRoutes.signin} className="text-sm font-bold text-gray-600 hover:text-primary">Log in</a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
