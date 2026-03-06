"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";

export default function Pricing() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 39,
      annualPrice: 375,
      description: "Everything you need to start translating live services",
      features: [
        { text: "6 hours live + 10 hours solo included", icon: "🎙️" },
        { text: "60 premium languages with voices (TTS)", icon: "🔊" },
        { text: "200+ languages", icon: "🌐" },
        { text: "Unlimited simultaneous languages", icon: "🔀" },
        { text: "Email & phone support", icon: "📧" },
        { text: "30-day free trial", icon: "🎁" },
        { text: "Additional hours: $10/hour", icon: "⏱️" },
      ],
      cta: "Start Free Trial",
      highlighted: false,
      badge: "🎁 30-DAY FREE TRIAL",
      accentColor: "#10b981",
      signupUrl: (interval: string) =>
        `${appRoutes.pricingStarter}${interval === "yearly" ? "&billing=yearly" : ""}`,
    },
    {
      name: "Pro",
      monthlyPrice: 99,
      annualPrice: 950,
      description: "More hours, more voices, faster translation",
      features: [
        { text: "12 hours live + 20 hours solo included", icon: "🎙️" },
        { text: "90 premium languages with voices (TTS)", icon: "🔊" },
        { text: "250+ languages & dialects", icon: "🌐" },
        { text: "Unlimited simultaneous languages", icon: "🔀" },
        { text: "50% faster translation", icon: "⚡" },
        { text: "24/7 support", icon: "📧" },
        { text: "Additional hours: $10/hour", icon: "⏱️" },
      ],
      cta: "Get Pro",
      highlighted: true,
      accentColor: "#3b82f6",
      signupUrl: (interval: string) =>
        `${appRoutes.pricingPro}${interval === "yearly" ? "&billing=yearly" : ""}`,
    },
    {
      name: "Unlimited",
      monthlyPrice: 299,
      annualPrice: 2900,
      description: "No limits. World-class voices. White-glove service.",
      features: [
        { text: "15 hours live included + unlimited solo hours", icon: "🎙️" },
        { text: "60 premium languages with voices (TTS)", icon: "🔊" },
        { text: "90 premium languages with voices (TTS)", icon: "🎤" },
        { text: "75 world-class life-like languages with voices (ElevenLabs)", icon: "💎" },
        { text: "250+ languages & dialects", icon: "🌐" },
        { text: "Unlimited simultaneous languages", icon: "🔀" },
        { text: "Fastest translation speed", icon: "⚡" },
        { text: "24/7 priority + personal onboarding", icon: "📧" },
        { text: "Custom branding & voice cloning", icon: "💎" },
        { text: "Additional hours: $10/hour", icon: "⏱️" },
      ],
      cta: "Go Unlimited",
      highlighted: false,
      accentColor: "#8b5cf6",
      signupUrl: (interval: string) =>
        `${appRoutes.pricingUnlimited}${interval === "yearly" ? "&billing=yearly" : ""}`,
    },
  ];

  const isYearly = billingInterval === "yearly";

  return (
    <section id="pricing" className="py-20 px-4 bg-base-100 relative overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="showcase-blob absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #7C3AED35 0%, #7C3AED18 50%, transparent 70%)' }} />
        <div className="showcase-blob absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #2563EB30 0%, #2563EB15 50%, transparent 70%)', animationDelay: '4s' }} />
        <div className="showcase-blob absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #059669 25 0%, #05966912 50%, transparent 70%)', animationDelay: '8s' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Break Language Barriers<br />
            <span className="bg-gradient-to-r from-info via-primary to-accent bg-clip-text text-transparent">
              In Your Ministry
            </span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8">
            Real-time AI translation for churches. Your congregation hears every word, in their language.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex bg-base-200 rounded-full p-1 gap-0">
            <button
              onClick={() => setBillingInterval("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${billingInterval === "monthly"
                ? "bg-white text-base-content shadow-md"
                : "text-base-content/60 hover:text-base-content/80"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval("yearly")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${billingInterval === "yearly"
                ? "bg-white text-base-content shadow-md"
                : "text-base-content/60 hover:text-base-content/80"
                }`}
            >
              Annual
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                20% OFF
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => {
            const isActive = selectedPlan === plan.name.toLowerCase();
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="card bg-white backdrop-blur-sm transition-all duration-300 h-full rounded-3xl relative"
                  style={{
                    border: isActive ? `2px solid ${plan.accentColor}` : "2px solid transparent",
                    boxShadow: isActive
                      ? `0 8px 40px ${plan.accentColor}38, 0 2px 8px ${plan.accentColor}18`
                      : "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  {/* Popular Badge */}
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_8px_24px_rgba(79,70,229,0.4)] whitespace-nowrap z-10">
                      ⭐ MOST POPULAR
                    </div>
                  )}

                  {/* Free Trial Badge */}
                  {plan.badge && !plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap z-10">
                      {plan.badge}
                    </div>
                  )}

                  {/* Selected checkmark */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute", top: 14, right: 16,
                        width: 24, height: 24, background: plan.accentColor,
                        borderRadius: "50%", display: "flex", alignItems: "center",
                        justifyContent: "center", color: "white", fontSize: 13,
                        fontWeight: 700, zIndex: 10,
                      }}
                    >
                      ✓
                    </div>
                  )}

                  <div className="card-body p-8 pt-10">
                    {/* Plan Name & Description — fixed height so all price blocks align */}
                    <div style={{ minHeight: "8rem" }}>
                      <h3 className="text-2xl font-bold text-base-content text-center mb-2">{plan.name}</h3>
                      <p className="text-sm text-base-content/60 text-center mb-5">{plan.description}</p>
                    </div>

                    {/* Pricing — fixed height for alignment */}
                    <div className="text-center mb-5 flex flex-col justify-center" style={{ minHeight: 130 }}>
                      {isYearly ? (
                        <>
                          {plan.name === "Starter" && (
                            <div className="text-xs text-base-content/50 font-semibold mb-1 uppercase tracking-wide">
                              Free for 30 Days
                            </div>
                          )}
                          {plan.name !== "Starter" && <div className="h-5 mb-1" aria-hidden="true" />}
                          <div className="text-5xl font-extrabold text-base-content leading-none">
                            ${plan.annualPrice.toLocaleString()}
                            <span className="text-lg font-medium text-base-content/70">/yr</span>
                          </div>
                          <div className="text-sm text-base-content/50 mt-1">
                            ~${Math.round(plan.annualPrice / 12)}/mo
                          </div>
                          <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full mt-2 self-center">
                            Save ${plan.monthlyPrice * 12 - plan.annualPrice}/year
                          </div>
                        </>
                      ) : (
                        <>
                          {plan.name === "Starter" ? (
                            <>
                              <div className="text-xs text-base-content/50 font-semibold mb-1 uppercase tracking-wide">
                                Free for 30 Days
                              </div>
                              <div className="text-5xl font-extrabold text-base-content leading-none">$0</div>
                              <div className="text-sm font-semibold text-base-content/70 mt-1.5">
                                then ${plan.monthlyPrice}/mo
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="h-5" aria-hidden="true" />
                              <div
                                className="text-5xl font-extrabold text-base-content leading-none"
                                style={plan.name === "Unlimited" ? { paddingTop: "2rem", paddingBottom: "2rem" } : {}}
                              >
                                ${plan.monthlyPrice}
                                <span className="text-lg font-medium text-base-content/70">/mo</span>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-base-content/10 mb-5"></div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-sm text-base-content/80">
                          <span className="text-base flex-shrink-0">{feature.icon}</span>
                          <span className="leading-relaxed">{feature.text}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="card-actions justify-center mt-auto">
                      <a
                        href={plan.signupUrl(billingInterval)}
                        onClick={(e) => e.stopPropagation()}
                        className="btn w-full rounded-xl font-bold border-none"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${plan.accentColor}, ${plan.accentColor}cc)`
                            : "#e2e8f0",
                          color: isActive ? "white" : "#64748b",
                          boxShadow: isActive ? `0 4px 20px ${plan.accentColor}55` : "none",
                        }}
                      >
                        {plan.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="flex justify-center gap-8 flex-wrap mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🔒</span>
            <span className="text-sm text-base-content/70">Secure payment via Stripe</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">↩️</span>
            <span className="text-sm text-base-content/70">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">🎁</span>
            <span className="text-sm text-base-content/70">30-day free trial on Starter</span>
          </div>
        </motion.div>

        {/* Custom Plan CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="card bg-gradient-to-br from-[#5a5d80]/5 to-white/70 backdrop-blur-sm shadow-lg border border-[#5a5d80]/20 inline-block rounded-3xl">
            <div className="card-body p-8 text-center">
              <h3 className="text-xl font-bold text-base-content mb-2">Need a custom plan?</h3>
              <p className="text-base-content/70 mb-4">Contact our team to build a custom plan at a cost that works for you.</p>
              <a href="mailto:support@exbabel.com" className="btn btn-primary rounded-full px-8 border-none shadow-lg hover:shadow-xl">Contact Us</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
