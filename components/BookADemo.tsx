"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CalendlyDemoScheduler from "./CalendlyDemoScheduler";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  churchName: string;
  role: string;
  churchSize: string;
  phoneNumber: string;
};

export default function BookADemo() {
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    churchName: "",
    role: "",
    churchSize: "",
    phoneNumber: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.exbabel.com";

    try {
      const response = await fetch(`${baseUrl}/api/demo-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventScheduled = async () => {
    setIsScheduled(true);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.exbabel.com";
    try {
      await fetch(`${baseUrl}/api/demo-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formState.email, status: "scheduled" }),
      });
    } catch (e) {
      console.error("Failed to tag lead:", e);
    }
  };

  return (
    <section id="book-demo" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50/50 -z-10" />
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-[#1d1c1d]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-sora), sans-serif' }}
          >
            See Exbabel in Action
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-sora), sans-serif' }}
          >
            Book a 15-minute live demo and see how your church can provide real-time translation and captions in minutes.
          </motion.p>
        </div>

        {/* Value Props */}
        {!isSubmitted && !isScheduled && (
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12 text-sm font-semibold text-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {[
              "No credit card required",
              "15-minute setup walkthrough",
              "Live translation demo",
              "Mobile app walkthrough"
            ].map((prop, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {prop}
              </div>
            ))}
          </motion.div>
        )}

        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted && !isScheduled && (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-bold text-gray-700">First Name *</label>
                    <input required type="text" id="firstName" name="firstName" value={formState.firstName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-bold text-gray-700">Last Name *</label>
                    <input required type="text" id="lastName" name="lastName" value={formState.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email *</label>
                  <input required type="email" id="email" name="email" value={formState.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="churchName" className="block text-sm font-bold text-gray-700">Church Name *</label>
                  <input required type="text" id="churchName" name="churchName" value={formState.churchName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-bold text-gray-700">Role *</label>
                    <select required id="role" name="role" value={formState.role} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 bg-white">
                      <option value="" disabled>Select your role</option>
                      <option value="Pastor">Pastor</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="churchSize" className="block text-sm font-bold text-gray-700">Church Size *</label>
                    <select required id="churchSize" name="churchSize" value={formState.churchSize} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 bg-white">
                      <option value="" disabled>Select church size</option>
                      <option value="Under 100">Under 100</option>
                      <option value="100 - 500">100 - 500</option>
                      <option value="500 - 1000">500 - 1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700">Phone Number (optional)</label>
                  <input type="tel" id="phoneNumber" name="phoneNumber" value={formState.phoneNumber} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900" />
                </div>

                {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

                <div className="pt-6 text-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto inline-block px-12 py-4 bg-primary text-white text-lg font-extrabold rounded-full hover:shadow-[0_8px_30px_rgba(79,70,229,0.4)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-xl"
                    style={{ fontFamily: 'var(--font-sora), sans-serif' }}
                  >
                    {isSubmitting ? "Processing..." : "Continue to Schedule →"}
                  </button>
                </div>
              </motion.form>
            )}

            {isSubmitted && !isScheduled && (
              <motion.div 
                key="calendly"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pick a Time</h3>
                  <p className="text-gray-600">Select a convenient time for your 15-minute demo.</p>
                </div>
                <CalendlyDemoScheduler 
                  prefillName={`${formState.firstName} ${formState.lastName}`} 
                  prefillEmail={formState.email} 
                  onEventScheduled={handleEventScheduled}
                />
              </motion.div>
            )}

            {isScheduled && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Demo Scheduled Successfully</h3>
                <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
                  Thank you for scheduling a demo with Exbabel. We&apos;ve sent a confirmation email and look forward to showing you how Exbabel can help your church provide live translation and captions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
