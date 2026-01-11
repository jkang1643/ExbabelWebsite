"use client";

import { motion } from "framer-motion";
import { appRoutes } from "@/lib/config";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "24",
      features: [
        "5 hours of streaming",
        "+$2 per additional hour",
        "Translation into 2 other languages",
        "Pick and choose languages anytime",
        "Unlimited users",
      ],
      highlighted: false,
      signupUrl: appRoutes.pricingStarter,
    },
    {
      name: "Pro",
      price: "49",
      features: [
        "10 hours of streaming",
        "+$3 per additional hour",
        "Translation into 4 other languages",
        "Pick and choose languages anytime",
        "Unlimited users",
      ],
      highlighted: true,
      signupUrl: appRoutes.pricingPro,
    },
    {
      name: "Unlimited",
      price: "149",
      features: [
        "Unlimited hours of streaming",
        "Translation into 150+ languages",
        "All languages available",
        "Priority support",
        "Unlimited users",
      ],
      highlighted: false,
      signupUrl: appRoutes.pricingUnlimited,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-base-100 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-info via-primary to-accent bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-lg text-base-content max-w-2xl mx-auto">
            Try Exbabel for free with four hours of captions and translations, then choose a plan that works for you. All plans are month-to-month and can be changed anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`card bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-3xl ${plan.highlighted ? 'border-2 border-primary scale-105' : 'border border-[#5a5d80]/20'
                }`}>
                {plan.highlighted && (
                  <div className="badge badge-primary absolute top-6 right-6 text-white rounded-full px-4">Popular</div>
                )}
                <div className="card-body p-8">
                  <h3 className="text-2xl font-bold text-base-content text-center mb-2">{plan.name}</h3>
                  <div className="text-center my-6">
                    <span className="text-5xl font-bold text-primary">${plan.price}</span>
                    <span className="text-base-content/70 text-lg">/mo</span>
                    <p className="text-xs text-base-content/60 mt-2">USD</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-base-content text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-actions justify-center mt-auto">
                    <a href={plan.signupUrl} className={`btn w-full rounded-full ${plan.highlighted ? 'btn-primary border-none shadow-lg' : 'btn-primary border-none'}`}>
                      Get started free
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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

