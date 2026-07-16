"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookiesPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so the popup doesn't flash on load if already accepted
    const timer = setTimeout(() => {
      const accepted = localStorage.getItem("exbabel_cookies_accepted");
      if (!accepted) {
        setVisible(true);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("exbabel_cookies_accepted", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Cookie icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl" role="img" aria-label="cookie">🍪</span>
            </div>

            {/* Message */}
            <p className="flex-1 text-sm text-slate-600 leading-relaxed">
              We use cookies to improve your experience and analyze site traffic.
              By continuing to use this site, you agree to our{" "}
              <Link
                href="/privacy"
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </Link>{" "}
              and cookie usage.
            </p>

            {/* Actions */}
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={handleAccept}
                className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
