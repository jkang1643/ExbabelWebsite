"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Apple Liquid Glass Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Liquid Glass Effect */}
        <motion.div
          className="liquid-glass-navbar"
          animate={{
            boxShadow: scrolled
              ? "0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.8)"
              : "0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* Subtle gradient overlay for depth */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[24px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.01) 100%)",
            }}
          />

          {/* Content */}
          <div className="relative navbar px-4 py-2">
            <div className="navbar-start">
              {/* Mobile Menu */}
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden hover:bg-black/5 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-3 w-52"
                  style={{
                    background: "rgba(255, 255, 255, 0.55)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <li>
                    <a
                      href="#how-it-works"
                      className="rounded-xl hover:bg-black/5 transition-colors"
                    >
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      className="rounded-xl hover:bg-black/5 transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="rounded-xl hover:bg-black/5 transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="rounded-xl hover:bg-black/5 transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Logo */}
              <a className="btn btn-ghost text-2xl font-black normal-case hover:bg-transparent text-primary">
                Exbabel
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-1">
                <li>
                  <a
                    href="#how-it-works"
                    className="rounded-xl hover:bg-black/5 font-medium text-sm transition-all duration-200"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="rounded-xl hover:bg-black/5 font-medium text-sm transition-all duration-200"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="rounded-xl hover:bg-black/5 font-medium text-sm transition-all duration-200"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="rounded-xl hover:bg-black/5 font-medium text-sm transition-all duration-200"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="navbar-end gap-2">
              <motion.a
                className="btn btn-ghost btn-sm rounded-full font-medium hover:bg-black/5 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign in
              </motion.a>
              <motion.a
                className="btn btn-primary btn-sm rounded-full font-medium px-5 text-white border-none"
                style={{
                  boxShadow: "0 4px 16px rgba(59, 91, 219, 0.3)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Sign up
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
