"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactHero from "@/components/impact/ImpactHero";
import CountriesShowcase from "@/components/impact/CountriesShowcase";
import LanguagesShowcase from "@/components/impact/LanguagesShowcase";
import VoicesShowcase from "@/components/impact/VoicesShowcase";

export default function ImpactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* 1. Hero with animated stats */}
            <ImpactHero />

            {/* 2. Countries showcase grid */}
            <CountriesShowcase />

            {/* 3. Languages with Voice Support */}
            <LanguagesShowcase />

            {/* 4. Voices showcase (dark section) */}
            <VoicesShowcase />

            {/* Footer */}
            <Footer />
        </main>
    );
}
