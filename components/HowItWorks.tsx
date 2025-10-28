"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    {
      number: "1",
      title: "Connect Your Audio",
      description: "Stream audio from your sound system through any computer with Chrome browser. No special hardware needed.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a2 2 0 002.828 0l6.364-6.364a2 2 0 000-2.828l-6.364-6.364a2 2 0 00-2.828 0l-6.364 6.364a2 2 0 000 2.828z" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Share QR Code",
      description: "Display a QR code on screens or handouts. Attendees scan to instantly connect from any device.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Choose Language",
      description: "Users select their preferred language from 150+ options. Works on phones, tablets, and computers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
    },
    {
      number: "4",
      title: "Real-Time Translation",
      description: "AI translates speech instantly. Users can listen with headphones or read live captions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-base-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            How It Works
          </h2>
          <p className="text-xl text-neutral max-w-2xl mx-auto">
            Get started in minutes with our simple four-step process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent -ml-4 z-0" />
              )}

              <div className="card bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300 border border-primary/20 h-full relative z-10">
                <div className="card-body items-center text-center">
                  {/* Step Number Badge */}
                  <div className="badge badge-primary badge-lg text-white mb-4 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-primary mb-4">
                    {step.icon}
                  </div>
                  
                  <h3 className="card-title text-accent text-xl justify-center mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* QR Code Demo Section */}
        <motion.div 
          className="card bg-gradient-to-br from-primary to-accent shadow-2xl text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card-body items-center text-center p-12">
            <h3 className="text-3xl font-bold mb-6">
              Just Scan the QR Code to Connect
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl">
              No app installation required. Works on any device with a web browser.
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
              {/* QR Code Placeholder */}
              <div className="mockup-phone border-primary">
                <div className="camera"></div>
                <div className="display">
                  <div className="artboard artboard-demo phone-1 bg-base-100">
                    <div className="flex flex-col items-center justify-center h-full p-4">
                      <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center mb-4">
                        <div className="grid grid-cols-3 gap-1 p-4">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-primary rounded-sm" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-neutral font-semibold">Scan to Join</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature List */}
              <div className="flex-1 text-left">
                <ul className="space-y-4">
                  {[
                    "Works on iPhone, Android, tablets, laptops",
                    "No app installation needed",
                    "Instant connection via web browser",
                    "Secure encrypted connection",
                  ].map((feature, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="badge badge-lg bg-white/20 border-white/40">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-lg">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />
    </section>
  );
}

