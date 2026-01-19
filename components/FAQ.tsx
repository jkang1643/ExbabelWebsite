"use client";

import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      question: "Which languages are supported?",
      answer: "Exbabel supports translation into 180+ languages and dialects, including English, Spanish, French, Chinese (Simplified & Traditional), Arabic, Hindi, Portuguese, Russian, Japanese, Korean, German, Italian, and many more. We continuously add support for additional languages.",
    },
    {
      question: "How is this different from Google Translate?",
      answer: "The biggest difference is our AI models are custom-trained to understand context, cultural nuances, and specialized terminology. Unlike generic translation apps that only work with everyday conversations, Exbabel is designed to handle complex, professional communication with higher accuracy and cultural sensitivity.",
    },
    {
      question: "Do users need to install an app?",
      answer: "No, anyone can access translations directly through their web browser - no installation required. Simply scan a QR code or visit a link to start receiving translations on any device: phone, tablet, or computer.",
    },
    {
      question: "What are the technical requirements?",
      answer: "You just need a computer with a modern web browser (Chrome, Firefox, Safari, or Edge) and a stable internet connection. For audio input, you can use your device's built-in microphone or connect to a professional audio system.",
    },
    {
      question: "Does the platform use Artificial Intelligence (AI)?",
      answer: "Yes, Exbabel uses advanced AI models to power our translation service. We have fine-tuned these models to accurately understand context, idioms, and cultural nuances, ensuring your message stays true to its original meaning even after translation.",
    },
    {
      question: "Is there a trial or demo available?",
      answer: "Yes! Please get started and create your free account, which comes with four hours of captions and translation so you can try it out risk-free.",
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-b from-blue-50/20 to-base-100">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-info via-primary to-accent bg-clip-text text-transparent">
            FAQs
          </h2>
          <p className="text-lg text-base-content">
            Everything you need to know before getting started
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="collapse collapse-plus bg-white/70 backdrop-blur-sm border border-[#5a5d80]/20 hover:border-[#5a5d80]/40 shadow-sm hover:shadow-md transition-all rounded-2xl">
                <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                <div className="collapse-title text-base font-semibold text-base-content">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

