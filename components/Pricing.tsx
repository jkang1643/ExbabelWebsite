"use client";

import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      originalPrice: 45,
      discountedPrice: 22.50,
      description: "Everything you need to start translating live services",
      features: [
        { text: "6 hrs/mo live + 10 hrs solo", icon: "🎙️" },
        { text: "60 natural voices", icon: "🔊" },
        { text: "200+ languages", icon: "🌐" },
        { text: "3 languages at once", icon: "🔀" },
        { text: "Email & phone support", icon: "📧" },
        { text: "30-day free trial", icon: "🎁" },
      ],
      cta: "Start Free Trial",
      highlighted: false,
      badge: "🎁 30-DAY FREE TRIAL",
      signupUrl: appRoutes.pricingStarter,
    },
    {
      name: "Pro",
      originalPrice: 100,
      discountedPrice: 50,
      description: "More hours, more voices, faster translation",
      features: [
        { text: "12 hrs/mo live + 20 hrs solo", icon: "🎙️" },
        { text: "90 premium AI voices", icon: "🔊" },
        { text: "250+ languages & dialects", icon: "🌐" },
        { text: "5 languages at once", icon: "🔀" },
        { text: "50% faster translation", icon: "⚡" },
        { text: "24/7 support", icon: "📧" },
      ],
      cta: "Get Pro",
      highlighted: true,
      signupUrl: appRoutes.pricingPro,
    },
    {
      name: "Unlimited",
      originalPrice: 300,
      discountedPrice: 150,
      description: "No limits. World-class voices. White-glove service.",
      features: [
        { text: "Unlimited live & solo hours", icon: "🎙️" },
        { text: "Studio-grade lifelike voices", icon: "🔊" },
        { text: "250+ languages & dialects", icon: "🌐" },
        { text: "Unlimited simultaneous languages", icon: "🔀" },
        { text: "Fastest translation speed", icon: "⚡" },
        { text: "24/7 priority + personal onboarding", icon: "📧" },
        { text: "Custom branding & voice cloning", icon: "💎" },
      ],
      cta: "Go Unlimited",
      highlighted: false,
      signupUrl: appRoutes.pricingUnlimited,
    },
  ];

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
        {/* Header with Promo Banner */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Promo Banner */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold mb-7 shadow-lg">
            <span>🔥</span>
            <span>Launch Promotion — <strong>50% OFF</strong> all plans for 1 year</span>
            <span>🔥</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Break Language Barriers<br />
            <span className="bg-gradient-to-r from-info via-primary to-accent bg-clip-text text-transparent">
              In Your Ministry
            </span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Real-time AI translation for churches. Your congregation hears every word, in their language.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`card bg-white backdrop-blur-sm transition-all duration-300 h-full rounded-3xl relative ${plan.highlighted
                ? 'border-0 scale-105 shadow-[0_24px_64px_rgba(79,70,229,0.25),0_12px_32px_rgba(79,70,229,0.15)] ring-2 ring-primary/50'
                : 'border-0 shadow-[0_16px_48px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.16),0_8px_24px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5 hover:ring-slate-900/10'
                }`}>
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

                <div className={`card-body p-8 ${plan.highlighted ? 'pt-10' : 'pt-8'}`}>
                  {/* Plan Name & Description */}
                  <h3 className="text-2xl font-bold text-base-content text-center mb-2">{plan.name}</h3>
                  <p className="text-sm text-base-content/60 text-center mb-5">{plan.description}</p>

                  {/* Pricing */}
                  <div className="text-center mb-5 min-h-[160px] flex flex-col justify-start">
                    {plan.name === "Starter" ? (
                      <>
                        <div className="flex items-baseline justify-center gap-2 mb-1 h-6">
                          <div className="text-base text-base-content/50 line-through">
                            ${plan.originalPrice}<span className="text-sm">/mo</span>
                          </div>
                          <div className="text-base font-medium text-base-content/70">
                            then ${plan.discountedPrice.toFixed(2)}/mo
                          </div>
                        </div>
                        <div className="text-sm text-base-content/50 font-medium mb-1 uppercase tracking-wide">
                          Free for 30 Days
                        </div>
                        <div className="text-5xl font-extrabold text-base-content leading-none">
                          $0
                        </div>
                        <div className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mt-2">
                          Save ${((plan.originalPrice - plan.discountedPrice) * 12).toFixed(0)}/year
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-base text-base-content/50 line-through mb-1 h-6">
                          ${plan.originalPrice}<span className="text-sm">/mo</span>
                        </div>
                        {/* Spacer to align with 'Free for 30 Days' line in Starter plan */}
                        <div className="h-6 mb-1" aria-hidden="true" />

                        <div className="text-5xl font-extrabold text-base-content leading-none">
                          ${plan.discountedPrice % 1 === 0 ? plan.discountedPrice : plan.discountedPrice.toFixed(2)}
                          <span className="text-lg font-medium text-base-content/70">/mo</span>
                        </div>
                        <div className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mt-2">
                          Save ${((plan.originalPrice - plan.discountedPrice) * 12).toFixed(0)}/year
                        </div>
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
                      href={plan.signupUrl}
                      className={`btn w-full rounded-xl font-bold ${plan.highlighted
                        ? 'btn-primary border-none shadow-lg hover:shadow-xl'
                        : 'btn-primary border-none'
                        }`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="flex justify-center gap-8 flex-wrap mb-12"
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
              <a href={appRoutes.pricingCustom} className="btn btn-primary rounded-full px-8 border-none shadow-lg hover:shadow-xl">Contact Us</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

