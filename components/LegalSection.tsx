"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LegalSection() {
  const [expanded, setExpanded] = useState<"privacy" | "terms" | null>(null);

  const toggleSection = (section: "privacy" | "terms") => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <section
      id="legal-section"
      className="bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-wider text-primary uppercase font-bold mb-3">
            Legal
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Privacy &amp; Terms
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            Transparency matters. Read our policies below.
          </p>
        </motion.div>

        {/* Accordion panels */}
        <div className="space-y-4">
          {/* Privacy Policy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <button
              onClick={() => toggleSection("privacy")}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors group"
              aria-expanded={expanded === "privacy"}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                </span>
                <span className="font-semibold text-slate-800">Privacy Policy</span>
              </div>
              <motion.svg
                animate={{ rotate: expanded === "privacy" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {expanded === "privacy" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed space-y-4 border-t border-slate-100 pt-4">
                    <p><strong>Effective Date:</strong> July 15, 2026</p>

                    <p>
                      Exbabel (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at exbabel.com and use our real-time translation services.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">1. Information We Collect</h4>
                    <p>
                      <strong>Personal Information:</strong> When you create an account, subscribe to a plan, or contact us, we may collect your name, email address, billing information, and organization details.
                    </p>
                    <p>
                      <strong>Usage Data:</strong> We automatically collect information about how you interact with our services, including IP address, browser type, device information, pages visited, and session duration.
                    </p>
                    <p>
                      <strong>Audio &amp; Translation Data:</strong> Our platform processes real-time audio for translation purposes. Audio streams are processed in real-time and are not stored permanently unless you explicitly enable recording features.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">2. How We Use Your Information</h4>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>To provide and maintain our real-time translation services</li>
                      <li>To process transactions and manage your subscription</li>
                      <li>To improve and personalize your experience</li>
                      <li>To communicate with you about updates, security alerts, and support</li>
                      <li>To analyze usage patterns and optimize our platform performance</li>
                    </ul>

                    <h4 className="font-semibold text-slate-800 pt-2">3. Cookies &amp; Tracking Technologies</h4>
                    <p>
                      We use cookies and similar tracking technologies to enhance your experience:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li><strong>Essential Cookies:</strong> Required for the platform to function properly (authentication, session management).</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website to improve our services.</li>
                      <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and measure their effectiveness.</li>
                    </ul>
                    <p>
                      You can manage your cookie preferences through your browser settings. Disabling certain cookies may limit the functionality of our services.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">4. Data Sharing &amp; Disclosure</h4>
                    <p>
                      We do not sell your personal information. We may share data with trusted third-party service providers who assist us in operating our platform (e.g., payment processors, cloud hosting, analytics). All third parties are contractually obligated to protect your data.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">5. Data Retention &amp; Security</h4>
                    <p>
                      We retain your information only for as long as necessary to fulfill the purposes outlined in this policy. We implement industry-standard security measures, including encryption in transit and at rest, to protect your data from unauthorized access.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">6. Your Rights</h4>
                    <p>
                      Depending on your jurisdiction, you may have the right to access, correct, delete, or export your personal data. To exercise these rights, please contact us at <a href="mailto:support@exbabel.com" className="text-primary hover:underline">support@exbabel.com</a>.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">7. Contact Us</h4>
                    <p>
                      If you have questions about this Privacy Policy, please contact us at <a href="mailto:support@exbabel.com" className="text-primary hover:underline">support@exbabel.com</a>.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Terms of Service */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <button
              onClick={() => toggleSection("terms")}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors group"
              aria-expanded={expanded === "terms"}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </span>
                <span className="font-semibold text-slate-800">Terms of Service</span>
              </div>
              <motion.svg
                animate={{ rotate: expanded === "terms" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {expanded === "terms" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed space-y-4 border-t border-slate-100 pt-4">
                    <p><strong>Effective Date:</strong> July 15, 2026</p>

                    <p>
                      Welcome to Exbabel. By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">1. Services</h4>
                    <p>
                      Exbabel provides real-time speech-to-speech AI translation services for live events, video, audio, and captions. Our services include but are not limited to live translation sessions, livestream translation, and AI-powered caption generation.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">2. Account Registration</h4>
                    <p>
                      To access certain features, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">3. Acceptable Use</h4>
                    <p>You agree not to:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>Use the platform for any unlawful purpose</li>
                      <li>Attempt to gain unauthorized access to our systems or networks</li>
                      <li>Interfere with or disrupt the integrity or performance of the platform</li>
                      <li>Reverse-engineer, decompile, or disassemble any aspect of our technology</li>
                      <li>Use the service to translate content that promotes hate speech, violence, or illegal activity</li>
                    </ul>

                    <h4 className="font-semibold text-slate-800 pt-2">4. Subscription &amp; Billing</h4>
                    <p>
                      Paid features are billed according to the plan you select. Subscription fees are non-refundable except as required by applicable law. We reserve the right to modify pricing with reasonable advance notice.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">5. Intellectual Property</h4>
                    <p>
                      All content, features, and functionality of the Exbabel platform are owned by Exbabel and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of any content you submit through our platform.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">6. Limitation of Liability</h4>
                    <p>
                      To the maximum extent permitted by law, Exbabel shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our total liability shall not exceed the amount you have paid us in the twelve (12) months preceding the claim.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">7. Termination</h4>
                    <p>
                      We may suspend or terminate your access to the platform at our sole discretion, with or without cause, upon reasonable notice. Upon termination, your right to use the service will cease immediately.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">8. Governing Law</h4>
                    <p>
                      These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms will be resolved through binding arbitration.
                    </p>

                    <h4 className="font-semibold text-slate-800 pt-2">9. Contact Us</h4>
                    <p>
                      For any questions regarding these Terms, please contact us at <a href="mailto:support@exbabel.com" className="text-primary hover:underline">support@exbabel.com</a>.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
