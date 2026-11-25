"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import styles from "./Pricing.module.css";
import { churchPricingPlans } from "@/components/church/churchPricingPlans";
import { capturePostHogEvent } from "@/lib/posthog-client";

export default function HomePricing() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  return (
    <section id="pricing" className="py-20 px-6 bg-base-100 relative overflow-hidden">
      {/* Background blobs — static */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #7C3AED35 0%, #7C3AED18 50%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, #2563EB30 0%, #2563EB15 50%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <h2 className="homepage-section-title mb-10 text-center text-4xl font-bold tracking-[0.015em] text-base-content md:text-5xl"
          style={{ fontFamily: "var(--font-sora), sans-serif" }}>
          Select Your Plan
        </h2>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {churchPricingPlans.map(plan => {
            const isActive = selectedPlan === plan.name.toLowerCase();
            return (
              <div
                key={plan.id}
                onClick={() => {
                  setSelectedPlan(plan.name.toLowerCase());
                  capturePostHogEvent("pricing_plan_selected", {
                    plan_name: plan.name.toLowerCase(),
                    billing_interval: "monthly",
                    is_recommended: plan.highlighted,
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="bg-white md:backdrop-blur-sm transition-all duration-300 h-full rounded-3xl relative"
                  style={{
                    borderStyle: "solid",
                    borderTopWidth: 2,
                    borderRightWidth: 2,
                    borderBottomWidth: 2,
                    borderLeftWidth: 2,
                    borderTopColor: plan.accentColor,
                    borderRightColor: isActive ? plan.accentColor : `${plan.accentColor}66`,
                    borderBottomColor: isActive ? plan.accentColor : `${plan.accentColor}66`,
                    borderLeftColor: isActive ? plan.accentColor : `${plan.accentColor}66`,
                    boxShadow: isActive
                      ? `0 8px 40px ${plan.accentColor}38, 0 2px 8px ${plan.accentColor}18`
                      : "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
                    transform: isActive ? "scale(1.04)" : "scale(1)",
                  }}
                >
                  {/* Popular Badge */}
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_8px_24px_rgba(79,70,229,0.4)] whitespace-nowrap z-10">
                      Most popular
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

                  <div className="p-8 pt-10 flex flex-col h-full">
                    {/* Plan Name & Description */}
                    <div>
                      <h3 className="flex items-center justify-center gap-3 text-2xl font-bold text-center mb-3" style={{ color: plan.accentColor }}><Image src={plan.art} alt="" width={80} height={80} className="w-20 h-20 shrink-0 object-cover rounded-lg border" style={{ borderColor: `${plan.accentColor}55` }} /><span>{plan.name}</span></h3>
                    </div>

                    <div className="my-5 text-center">
                      <div className="text-5xl font-extrabold text-base-content leading-none">
                        ${plan.monthlyPrice}<span className="text-lg font-medium text-base-content/70">/mo</span>
                      </div>
                      <p className="mt-3 text-sm font-semibold" style={{ color: plan.accentColor }}>
                        {plan.hours} Hours / Month <span className="font-normal text-base-content/60">(~{plan.annualHours} hrs/yr)</span>
                      </p>
                    </div>

                    <p className="mb-4 text-center text-sm font-semibold text-[#234fdb]">Unlimited simultaneous languages</p>

                    {/* Divider */}
                    <div className="w-full h-px bg-base-content/10 mb-5"></div>

                    {/* Features */}
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-base-content/70">Sample Meeting Types:</p>
                    <ul className="space-y-2 mb-6 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-sm text-base-content/80">
                          <span className="text-sm flex-shrink-0 font-semibold" style={{ color: plan.accentColor }}>✓</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-auto text-center">
                      <a
                        href={plan.checkout}
                        onClick={(e) => {
                          e.stopPropagation();
                          capturePostHogEvent("checkout_started", {
                            plan_name: plan.name.toLowerCase(),
                            billing_interval: "monthly",
                            is_recommended: plan.highlighted,
                          });
                        }}
                        className={`${styles.planButton} inline-flex w-full items-center justify-center py-3 rounded-xl font-bold text-center`}
                        style={{ "--plan-accent": plan.accentColor } as CSSProperties}
                      >
                        {plan.cta}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
