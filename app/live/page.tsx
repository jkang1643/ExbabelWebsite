'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuroraCard } from '@/components/AuroraCard';

import LiveTranslationGraphic from '@/components/LiveTranslationGraphic';
import HowItWorksGraphic from '@/components/HowItWorksGraphic';
import LiveCaptionsGraphic from '@/components/LiveCaptionsGraphic';
import UnlimitedLanguagesGraphic from '@/components/UnlimitedLanguagesGraphic';
import DecorativeWisp from '@/components/DecorativeWisp';
import IntegrationsSection from '@/components/IntegrationsSection';
import GettingStartedSection from '@/components/GettingStartedSection';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.15 }
};

export default function LiveTranslationPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden font-sans">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto z-10 flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          className="flex-1 text-left space-y-6 layout-spine md:px-0 md:items-start text-center lg:text-left"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h1 className="sr-only">Exbabel Live Video Translation</h1>
          <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-base-content leading-tight tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
            Exbabel Live<br />
            <span className="text-primary mt-2 block">Video Translation</span>
          </motion.h2>
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-slate-600 mt-4 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
            Speak Once. Reach Every Language.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-base-content/80 max-w-2xl leading-relaxed font-medium">
            Exbabel Live Video Translation transforms any church livestream, conference, or event into a multilingual experience in real time. As your pastor speaks, Exbabel instantly translates their voice into multiple languages with live captions.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center lg:justify-start">
            <a href="#" className="px-10 py-4 rounded-md bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20 text-center" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              Schedule a Demo
            </a>
            <a href="#how-it-works" className="px-10 py-4 rounded-md text-primary font-bold text-lg bg-white border-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all text-center" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              Watch a Live Example
            </a>
          </motion.div>
        </motion.div>
        <motion.div 
          className="flex-1 w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative w-full flex justify-center">
             <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] -z-20 opacity-90" colorPrimary="#EAD6FF" colorSecondary="#FFD6E5" />
             <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] -z-20 opacity-90" colorPrimary="#D6F5FF" colorSecondary="#EAD6FF" delay={2} reverse={true} />
             <img 
               src="/photos/exbabel_live_translation_concept_1780070697205.png" 
               alt="Live Translation Concept" 
               className="w-full max-w-lg rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15)] ring-1 ring-gray-900/5 relative z-10"
             />
          </div>
        </motion.div>
      </section>

      {/* 2. Problem/Solution & Showcase */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <motion.div 
          className="text-center mb-16 space-y-4 max-w-3xl mx-auto"
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-base-content tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>One Service. Unlimited Languages.</motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-base-content/80 leading-relaxed font-medium">
            Most churches today face a growing challenge. Your congregation may include Spanish-speaking families, Korean-speaking members, international students, refugees, deaf and hard-of-hearing attendees, and online viewers from around the world.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-lg text-base-content/80 leading-relaxed font-medium">
            Traditionally, serving these groups requires hiring interpreters, creating separate language services, or purchasing equipment. <strong className="text-primary">Exbabel changes that.</strong> With Exbabel Live Video Translation, a single sermon can be delivered simultaneously in multiple languages through AI-powered voice translation and live captions.
          </motion.p>
        </motion.div>
        
        {/* Interactive Graphic Showcase */}
        <motion.div 
          className="relative max-w-[900px] mx-auto rounded-3xl p-2 bg-white/50 backdrop-blur-md shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] ring-1 ring-gray-900/5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] w-[150vw] h-[150vh] -z-20 -rotate-12 opacity-80" colorPrimary="#FFD6E5" colorSecondary="#D6F5FF" delay={1} />
          <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[150vw] h-[150vh] -z-20 rotate-12 opacity-80" colorPrimary="#FFF7D1" colorSecondary="#EAD6FF" delay={3} />
          <LiveTranslationGraphic />
        </motion.div>
      </section>

      {/* 3. How It Works */}
      <section id="how-it-works" className="py-24 px-6 relative z-10">
        <motion.div className="max-w-7xl mx-auto" initial="initial" whileInView="whileInView" variants={staggerContainer}>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-base-content text-center mb-16 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>How Exbabel Live Video Translation Works</motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-bold text-base-content mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>1. Pastor Speaks</h3>
                <p className="text-base-content/80 text-lg">Your pastor delivers the sermon naturally in their preferred language (English, Spanish, Korean, Portuguese, etc).</p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-bold text-base-content mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>2. Exbabel Translates in Real Time</h3>
                <p className="text-base-content/80 text-lg mb-2">Our speech-to-speech AI translation engine processes live audio with sub-second latency generating:</p>
                <ul className="text-base-content/80 text-lg space-y-2 list-disc list-inside ml-2 font-medium">
                  <li>Live translated speech</li>
                  <li>Natural AI voiceovers</li>
                  <li>Real-time captions</li>
                  <li>Multi-language streams</li>
                </ul>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl font-bold text-base-content mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>3. Viewers Listen in Their Language</h3>
                <p className="text-base-content/80 text-lg">Each attendee selects their preferred language. Everyone watches the same video stream while hearing translated audio and viewing synchronized captions.</p>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex justify-center relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] -z-20 rotate-90 opacity-60" colorPrimary="#EAD6FF" colorSecondary="#FFD6E5" delay={2} />
              <HowItWorksGraphic />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3.5 Getting Started */}
      <GettingStartedSection />

      {/* 4. Benefits / Why Choose */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        {/* Background Wisps for Benefits Section */}
        <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[150vw] h-[150vh] -z-20 opacity-50 rotate-12" colorPrimary="#D6F5FF" colorSecondary="#EAD6FF" delay={1} />
        <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[150vw] h-[150vh] -z-20 opacity-50 -rotate-12" colorPrimary="#FFD6E5" colorSecondary="#FFF7D1" delay={3} />
        
        <motion.div className="text-center mb-16" initial="initial" whileInView="whileInView" variants={staggerContainer}>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-base-content mb-4 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Why Churches Choose Exbabel</motion.h2>
          <motion.h3 variants={fadeInUp} className="text-2xl font-semibold text-primary">Reach More People Without Adding More Services</motion.h3>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainer}
        >
          {[
            "Welcome multilingual visitors", "Increase accessibility", "Serve international communities", 
            "Support online ministry growth", "Eliminate interpreter scheduling", "Reduce operational complexity", 
            "Keep families worshipping together", "Expand global reach"
          ].map((benefit, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="flex items-center gap-4 p-6 h-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <span className="font-semibold text-slate-800">{benefit}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Live Voice & Captions */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="flex justify-center order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-green-300/20 to-blue-300/20 blur-3xl -z-10 rounded-full" />
            <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] -z-20 -rotate-45 opacity-50" colorPrimary="#D6F5FF" colorSecondary="#EAD6FF" delay={4} />
            <LiveCaptionsGraphic />
          </motion.div>
          <motion.div 
            className="space-y-12 order-1 lg:order-2"
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Live AI Voice Translation</h2>
              <h3 className="text-xl font-bold text-primary mb-4">Let People Hear the Message, Not Just Read It</h3>
              <p className="text-base-content/80 text-lg leading-relaxed">
                Subtitles help. Hearing the message in your native language creates a completely different experience. Exbabel generates natural AI voiceovers in real time, allowing attendees to listen to translated audio while watching the live service. This creates a more immersive and engaging worship experience than captions alone.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Live Video Captioning</h2>
              <h3 className="text-xl font-bold text-primary mb-4">Real-Time Captions for Every Service</h3>
              <p className="text-base-content/80 text-lg leading-relaxed mb-6">
                Exbabel automatically generates synchronized captions during live broadcasts. Captions stay aligned with the video and translated audio stream for a seamless viewing experience.
              </p>
              <ul className="text-base-content/80 grid grid-cols-2 gap-4 font-medium text-lg">
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Deaf & hard-of-hearing</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Noisy environments</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Online viewers</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> ESL audiences</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. Use Cases & ROI */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        {/* Background Wisps for Use Cases Section */}
        <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] -z-20 opacity-40 rotate-45" colorPrimary="#EAD6FF" colorSecondary="#FFD6E5" delay={2} />
        <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[150vw] h-[150vh] -z-20 opacity-40 -rotate-45" colorPrimary="#FFF7D1" colorSecondary="#D6F5FF" delay={5} />

        <motion.h2 
          className="text-4xl md:text-5xl font-extrabold text-base-content text-center mb-16 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Church Use Cases
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          initial="initial"
          whileInView="whileInView"
          variants={staggerContainer}
        >
          {[
            { title: "Sunday Worship Services", desc: "Provide real-time translated sermons, announcements, and worship experiences to help multilingual attendees feel fully included." },
            { title: "Conferences & Events", desc: "Translate keynote speakers and breakout sessions instantly for leadership and worship conferences." },
            { title: "Missions & International", desc: "Reach global audiences through international broadcasts and discipleship without building separate translation teams." },
            { title: "Youth Ministry", desc: "Connect with multilingual students and families at youth nights, camps, and retreats." },
            { title: "Online Streaming", desc: "Transform your livestream into a multilingual broadcast on YouTube, Facebook Live, or Church Online Platform." },
            { title: "Multi-Campus Churches", desc: "Maintain a consistent message across campuses while serving diverse language communities. One message. Many languages." }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="p-8 h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 transition-all hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)]">
                <h3 className="text-xl font-bold text-base-content mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>{item.title}</h3>
                <p className="text-base-content/80">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4 tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>ROI Calculator</h2>
            <h3 className="text-2xl font-bold text-primary">How Much Can Your Church Save?</h3>
          </div>
          <div className="overflow-hidden bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-800 border-b border-slate-200">
                  <th className="p-6 font-bold text-lg">Typical Annual Expense</th>
                  <th className="p-6 font-bold text-lg">Cost</th>
                  <th className="p-6 font-bold text-lg text-primary bg-blue-50/50">With Exbabel</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 font-medium">
                <tr className="border-b border-slate-100">
                  <td className="p-6">Spanish Interpreter</td>
                  <td className="p-6">$18,000 - $48,000</td>
                  <td className="p-6 text-primary font-bold bg-blue-50/50">✓ Included</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-6">Korean Interpreter</td>
                  <td className="p-6">$18,000 - $48,000</td>
                  <td className="p-6 text-primary font-bold bg-blue-50/50">✓ Included</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-6">Interpretation Equipment</td>
                  <td className="p-6">$2,000 - $10,000</td>
                  <td className="p-6 text-primary font-bold bg-blue-50/50">✓ No equipment needed</td>
                </tr>
                <tr>
                  <td className="p-6">Separate Language Services</td>
                  <td className="p-6">Significant overhead</td>
                  <td className="p-6 text-primary font-bold bg-blue-50/50">✓ One unified service</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-12 text-center">
            <a href="#" className="inline-block px-10 py-4 rounded-md bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              Calculate Your Savings
            </a>
          </div>
        </motion.div>
      </section>

      {/* 9. Scale & Infrastructure */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-12"
            initial="initial"
            whileInView="whileInView"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-extrabold text-base-content mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Accessibility for Everyone</h2>
              <p className="text-base-content/80 text-lg mb-2">Exbabel helps churches serve deaf and hard-of-hearing attendees, ESL communities, international visitors, multilingual families, remote viewers, and global audiences. Every person deserves access to the message.</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-extrabold text-base-content mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Supported Streaming Workflows</h2>
              <p className="text-base-content/80 text-lg mb-2">No need to rebuild your livestream infrastructure. Exbabel integrates directly into existing workflows.</p>
              <p className="text-base-content/80 text-lg">Compatible with OBS Studio, vMix, Wirecast, RTMP Encoders, Hardware Streaming Appliances, and Existing Church Streaming Platforms. Setup takes minutes, not months.</p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl font-extrabold text-base-content mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Enterprise-Grade Reliability</h2>
              <p className="text-base-content/80 text-lg mb-2">Built for Mission-Critical Live Events. Church services only happen once. Reliability matters.</p>
              <p className="text-base-content/80 text-lg">Includes automatic failover, stream recovery protection, audio/video synchronization, network resilience, intelligent buffering, real-time monitoring, and broadcast-safe playback.</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-300/20 to-blue-300/20 blur-3xl -z-10 rounded-full" />
            <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] -z-20 rotate-12 opacity-60" colorPrimary="#FFD6E5" colorSecondary="#EAD6FF" delay={6} />
            <UnlimitedLanguagesGraphic />
          </motion.div>
        </div>
      </section>

      {/* 10. Integrations */}
      <IntegrationsSection />

      {/* 11. Final CTA */}
      <section className="py-32 px-6 bg-slate-900 text-center z-10 relative overflow-hidden mt-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.3),transparent_60%)]" />
        
        {/* Single massive ribbon for the background instead of multiple clipped ones */}
        <DecorativeWisp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] -z-10 opacity-60" colorPrimary="#D6F5FF" colorSecondary="#EAD6FF" />
        
        <motion.div 
          className="max-w-4xl mx-auto relative z-10 space-y-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>Ready to Reach More People?</h2>
          <h3 className="text-3xl font-bold text-blue-400">Speak Once. Be Heard Everywhere.</h3>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Turn every livestream, sermon, conference, and event into a multilingual experience with real-time speech-to-speech translation, AI voiceovers, and live captions. Welcome more people. Reach more communities. Extend your ministry beyond language barriers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <a href="#" className="px-10 py-4 rounded-md bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20 text-center" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              Schedule a Live Demo
            </a>
            <a href="#" className="px-10 py-4 rounded-md text-slate-900 font-bold text-lg bg-white border-2 border-transparent hover:bg-slate-50 transition-all transform hover:-translate-y-0.5 shadow-lg text-center" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              See Exbabel Live in Action
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
