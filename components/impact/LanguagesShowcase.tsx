"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DarkAuroraBackground from "../DarkAuroraBackground";

// ── Types ─────────────────────────────────────────────────────────────────────
export type PlanTier = "Starter" | "Pro" | "Unlimited";
export type TierName = "Gemini" | "Chirp3 HD" | "Neural2" | "Standard" | "ElevenLabs v3" | "ElevenLabs Flash";

export interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
    tiers: TierName[];
    plan: PlanTier;
}

// ── Authoritative counts (from LANGUAGE SUPPORT AND SCRIPT FROM GOOGLETTS.md) ─
// Gemini=87 | Chirp3 HD=53 | Neural2=48 | Standard=60 | EL v3=75 | EL Flash=29
// These are the exact counts displayed in the filter pill badges.
const AUTH_COUNTS: Record<TierName, number> = {
    "Gemini": 87,
    "Chirp3 HD": 53,
    "Neural2": 48,
    "Standard": 60,
    "ElevenLabs v3": 75,
    "ElevenLabs Flash": 29,
};

// ── Standard 60 locale-to-entry mapping (determines "Starter" plan) ───────────
// If a language's code is in this set it is available on the Starter plan.
// Source: Standard 60 list from authoritative doc.
const STARTER_CODES = new Set([
    "af", "am", "ar", "bg", "bn", "ca", "cmn-CN", "cmn-TW", "cs", "da", "de", "el",
    "en-AU", "en-GB", "en-IN", "en-US", "es-ES", "es-US", "et", "eu", "fi", "fil",
    "fr-CA", "fr-FR", "gl", "gu", "he", "hi", "hu", "id", "is", "it", "ja", "kn", "ko",
    "lt", "lv", "ml", "mr", "ms", "nb", "nl", "nl-BE", "pa", "pl", "pt-BR", "pt-PT",
    "ro", "ru", "sk", "sr", "sv", "ta", "te", "th", "tr", "uk", "ur", "vi", "yue",
]);

const planFor = (code: string, tiers: TierName[]): PlanTier => {
    if (STARTER_CODES.has(code)) return "Starter";
    const hasGoogle = tiers.some(t => ["Gemini", "Chirp3 HD", "Neural2", "Standard"].includes(t));
    return hasGoogle ? "Pro" : "Unlimited";
};

const L = (code: string, name: string, nativeName: string, flag: string, tiers: TierName[]): Language =>
    ({ code, name, nativeName, flag, tiers, plan: planFor(code, tiers) });

// ── 90 Languages — exact union of all 6 tiers (Gemini87 ∪ Chirp3-53 ∪ Neural2-48 ∪ Std60 ∪ ELv3-75 ∪ ELFlash-29)
// Regional variants kept where TTS APIs treat them as distinct locale codes.
const ALL_LANGUAGES: Language[] = [
    // ── Starter (in Standard 60) ──────────────────────────────────────────────
    L("af", "Afrikaans", "Afrikaans", "🇿🇦", ["Gemini", "Standard", "ElevenLabs v3"]),
    L("am", "Amharic", "አማርኛ", "🇪🇹", ["Gemini", "Neural2", "Standard", "ElevenLabs v3"]),
    L("ar", "Arabic", "العربية", "🇸🇦", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("bg", "Bulgarian", "Български", "🇧🇬", ["Gemini", "Chirp3 HD", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("bn", "Bengali", "বাংলা", "🇧🇩", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("ca", "Catalan", "Català", "🇪🇸", ["Gemini", "Standard", "ElevenLabs v3"]),
    L("cmn-CN", "Chinese (Simplified)", "普通话 (简体)", "🇨🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("cmn-TW", "Chinese (Traditional)", "普通話 (繁體)", "🇹🇼", ["Gemini", "Neural2", "Standard"]),
    L("cs", "Czech", "Čeština", "🇨🇿", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("da", "Danish", "Dansk", "🇩🇰", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("de", "German", "Deutsch", "🇩🇪", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("el", "Greek", "Ελληνικά", "🇬🇷", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("en-US", "English (US)", "English (US)", "🇺🇸", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("en-GB", "English (UK)", "English (UK)", "🇬🇧", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("en-AU", "English (Australia)", "English (AU)", "🇦🇺", ["Gemini", "Chirp3 HD", "Neural2", "Standard"]),
    L("en-IN", "English (India)", "English (IN)", "🇮🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard"]),
    L("es-ES", "Spanish (Spain)", "Español (España)", "🇪🇸", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("es-US", "Spanish (US)", "Español (EE.UU.)", "🇺🇸", ["Chirp3 HD", "Neural2", "Standard"]),
    L("et", "Estonian", "Eesti", "🇪🇪", ["Gemini", "Chirp3 HD", "Standard", "ElevenLabs v3"]),
    L("eu", "Basque", "Euskara", "🇪🇸", ["Gemini", "Standard", "ElevenLabs v3"]),
    L("fi", "Finnish", "Suomi", "🇫🇮", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("fil", "Filipino (Tagalog)", "Filipino", "🇵🇭", ["Gemini", "Neural2", "Standard", "ElevenLabs v3"]),
    L("fr-FR", "French (France)", "Français (France)", "🇫🇷", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("fr-CA", "French (Canada)", "Français (Canada)", "🇨🇦", ["Gemini", "Chirp3 HD", "Neural2", "Standard"]),
    L("gl", "Galician", "Galego", "🇪🇸", ["Gemini", "Standard", "ElevenLabs v3"]),
    L("gu", "Gujarati", "ગુજરાતી", "🇮🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("he", "Hebrew", "עברית", "🇮🇱", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("hi", "Hindi", "हिन्दी", "🇮🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("hu", "Hungarian", "Magyar", "🇭🇺", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("id", "Indonesian", "Bahasa Indonesia", "🇮🇩", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("is", "Icelandic", "Íslenska", "🇮🇸", ["Gemini", "Standard", "ElevenLabs v3"]),
    L("it", "Italian", "Italiano", "🇮🇹", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("ja", "Japanese", "日本語", "🇯🇵", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("kn", "Kannada", "ಕನ್ನಡ", "🇮🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("ko", "Korean", "한국어", "🇰🇷", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("lt", "Lithuanian", "Lietuvių", "🇱🇹", ["Gemini", "Chirp3 HD", "Standard", "ElevenLabs v3"]),
    L("lv", "Latvian", "Latviešu", "🇱🇻", ["Gemini", "Chirp3 HD", "Standard", "ElevenLabs v3"]),
    L("ml", "Malayalam", "മലയാളം", "🇮🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("mr", "Marathi", "मराठी", "🇮🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("ms", "Malay", "Bahasa Melayu", "🇲🇾", ["Gemini", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("nb", "Norwegian (Bokmål)", "Norsk Bokmål", "🇳🇴", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("nl", "Dutch (Netherlands)", "Nederlands (NL)", "🇳🇱", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("nl-BE", "Dutch (Belgium)", "Nederlands (BE)", "🇧🇪", ["Chirp3 HD", "Neural2", "Standard"]),
    L("pa", "Punjabi (Gurmukhi)", "ਪੰਜਾਬੀ", "🇮🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("pl", "Polish", "Polski", "🇵🇱", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("pt-BR", "Portuguese (Brazil)", "Português (Brasil)", "🇧🇷", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("pt-PT", "Portuguese (Portugal)", "Português (Portugal)", "🇵🇹", ["Gemini", "Neural2", "Standard", "ElevenLabs v3"]),
    L("ro", "Romanian", "Română", "🇷🇴", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("ru", "Russian", "Русский", "🇷🇺", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("sk", "Slovak", "Slovenčina", "🇸🇰", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("sr", "Serbian", "Српски", "🇷🇸", ["Gemini", "Chirp3 HD", "Standard", "ElevenLabs v3"]),
    L("sv", "Swedish", "Svenska", "🇸🇪", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("ta", "Tamil", "தமிழ்", "🇮🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("te", "Telugu", "తెలుగు", "🇮🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("th", "Thai", "ภาษาไทย", "🇹🇭", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("tr", "Turkish", "Türkçe", "🇹🇷", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("uk", "Ukrainian", "Українська", "🇺🇦", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("ur", "Urdu", "اردو", "🇵🇰", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3"]),
    L("vi", "Vietnamese", "Tiếng Việt", "🇻🇳", ["Gemini", "Chirp3 HD", "Neural2", "Standard", "ElevenLabs v3", "ElevenLabs Flash"]),
    L("yue", "Cantonese", "廣東話", "🇭🇰", ["Chirp3 HD", "Standard"]),

    // ── Pro (in Gemini/Chirp3/Neural2 but NOT Standard 60) ────────────────────
    L("az", "Azerbaijani", "Azərbaycan", "🇦🇿", ["Gemini", "ElevenLabs v3"]),
    L("be", "Belarusian", "Беларуская", "🇧🇾", ["Gemini", "ElevenLabs v3"]),
    L("ceb", "Cebuano", "Cebuano", "🇵🇭", ["Gemini", "ElevenLabs v3"]),
    L("es-419", "Spanish (Latin America)", "Español (LATAM)", "🌎", ["Gemini"]),
    L("es-MX", "Spanish (Mexico)", "Español (México)", "🇲🇽", ["Gemini"]),
    L("fa", "Persian (Farsi)", "فارسی", "🇮🇷", ["Gemini", "ElevenLabs v3"]),
    L("hr", "Croatian", "Hrvatski", "🇭🇷", ["Gemini", "Chirp3 HD", "ElevenLabs v3"]),
    L("ht", "Haitian Creole", "Kreyòl ayisyen", "🇭🇹", ["Gemini", "ElevenLabs v3"]),
    L("hy", "Armenian", "Հայերեն", "🇦🇲", ["Gemini", "ElevenLabs v3"]),
    L("jv", "Javanese", "Basa Jawa", "🇮🇩", ["Gemini", "ElevenLabs v3"]),
    L("ka", "Georgian", "ქართული", "🇬🇪", ["Gemini", "ElevenLabs v3"]),
    L("kok", "Konkani", "कोंकणी", "🇮🇳", ["Gemini", "ElevenLabs v3"]),
    L("la", "Latin", "Latina", "🇻🇦", ["Gemini", "ElevenLabs v3"]),
    L("lb", "Luxembourgish", "Lëtzebuergesch", "🇱🇺", ["Gemini", "ElevenLabs v3"]),
    L("lo", "Lao", "ພາສາລາວ", "🇱🇦", ["Gemini", "ElevenLabs v3"]),
    L("mai", "Maithili", "मैथिली", "🇮🇳", ["Gemini", "ElevenLabs v3"]),
    L("mg", "Malagasy", "Malagasy", "🇲🇬", ["Gemini", "ElevenLabs v3"]),
    L("mk", "Macedonian", "Македонски", "🇲🇰", ["Gemini", "ElevenLabs v3"]),
    L("mn", "Mongolian", "Монгол", "🇲🇳", ["Gemini", "ElevenLabs v3"]),
    L("my", "Burmese", "မြန်မာဘာသာ", "🇲🇲", ["Gemini", "ElevenLabs v3"]),
    L("ne", "Nepali", "नेपाली", "🇳🇵", ["Gemini", "ElevenLabs v3"]),
    L("nn", "Norwegian (Nynorsk)", "Norsk Nynorsk", "🇳🇴", ["Gemini", "ElevenLabs v3"]),
    L("or", "Odia (Oriya)", "ଓଡ଼ିଆ", "🇮🇳", ["Gemini", "ElevenLabs v3"]),
    L("ps", "Pashto", "پښتو", "🇦🇫", ["Gemini", "ElevenLabs v3"]),
    L("sd", "Sindhi", "سنڌي", "🇮🇳", ["Gemini", "ElevenLabs v3"]),
    L("si", "Sinhala", "සිංහල", "🇱🇰", ["Gemini", "ElevenLabs v3"]),
    L("sl", "Slovenian", "Slovenščina", "🇸🇮", ["Gemini", "Chirp3 HD", "ElevenLabs v3"]),
    L("sq", "Albanian", "Shqip", "🇦🇱", ["Gemini", "ElevenLabs v3"]),
    L("sw", "Swahili", "Kiswahili", "🇰🇪", ["Gemini", "Chirp3 HD", "ElevenLabs v3"]),

    // ── Unlimited (ElevenLabs only — not in any Google tier) ──────────────────
    L("zh", "Chinese (ElevenLabs)", "中文 (EL)", "🇨🇳", ["ElevenLabs v3", "ElevenLabs Flash"]),
];

// ── Plan config ────────────────────────────────────────────────────────────────
const PLAN_CONFIG: Record<PlanTier, {
    icon: string; color: string; bg: string; border: string; text: string; desc: string;
}> = {
    Starter: {
        icon: "✦", color: "#059669",
        bg: "bg-emerald-500/20", border: "border-emerald-500/40", text: "text-emerald-300",
        desc: "60 Standard languages · clear, reliable AI voices",
    },
    Pro: {
        icon: "⭐", color: "#7C3AED",
        bg: "bg-purple-500/20", border: "border-purple-500/40", text: "text-purple-300",
        desc: "87 Gemini + 53 Chirp3 HD · expressive neural voices",
    },
    Unlimited: {
        icon: "💎", color: "#DC2626",
        bg: "bg-red-500/20", border: "border-red-500/40", text: "text-red-300",
        desc: "75 ElevenLabs + all Google tiers · world's best voice AI",
    },
};

const ENGINE_BADGE: Record<TierName, string> = {
    "Gemini": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "Chirp3 HD": "bg-blue-500/20   text-blue-300   border-blue-500/30",
    "Neural2": "bg-cyan-500/20   text-cyan-300   border-cyan-500/30",
    "Standard": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "ElevenLabs v3": "bg-red-500/20    text-red-300    border-red-500/30",
    "ElevenLabs Flash": "bg-amber-500/20  text-amber-300  border-amber-500/30",
};

const ENGINE_LABEL: Record<TierName, string> = {
    "Gemini": "Gemini", "Chirp3 HD": "Chirp3", "Neural2": "Neural2",
    "Standard": "Std", "ElevenLabs v3": "EL v3", "ElevenLabs Flash": "Flash",
};

/* ─── Language Card ── */
const LanguageCard = ({ lang, index, inView, dimmed }: {
    lang: Language; index: number; inView: boolean; dimmed: boolean;
}) => {
    const cfg = PLAN_CONFIG[lang.plan];
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.01, 0.4) }}
            className={`relative rounded-xl border p-3 transition-all duration-300
                ${dimmed
                    ? "bg-white/[0.02] border-white/5 opacity-25 saturate-0"
                    : "bg-white/[0.07] border-white/10 hover:bg-white/[0.11] hover:border-white/20"
                }`}
        >
            {/* Plan badge top-right */}
            <span className={`absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded-md border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                {cfg.icon}
            </span>

            {/* Flag + Name */}
            <div className="flex items-start gap-2 mb-2.5 pr-8">
                <span className="text-xl leading-none flex-shrink-0 mt-0.5">{lang.flag}</span>
                <div className="min-w-0">
                    <p className="text-sm font-bold text-white leading-tight truncate">{lang.name}</p>
                    <p className="text-[10px] text-white/45 truncate mt-0.5">{lang.nativeName}</p>
                </div>
            </div>

            {/* Engine badges (up to 3, then +N) */}
            <div className="flex flex-wrap gap-1">
                {lang.tiers.slice(0, 3).map(t => (
                    <span key={t} className={`text-[8px] font-bold px-1 py-0.5 rounded border ${ENGINE_BADGE[t]}`}>
                        {ENGINE_LABEL[t]}
                    </span>
                ))}
                {lang.tiers.length > 3 && (
                    <span className="text-[8px] font-bold px-1 py-0.5 rounded border bg-white/10 text-white/40 border-white/10">
                        +{lang.tiers.length - 3}
                    </span>
                )}
            </div>
        </motion.div>
    );
};

/* ─── Plan Selector Card ── */
const PlanCard = ({ planKey, count, isActive, onClick }: {
    planKey: PlanTier | "All"; count: number; isActive: boolean; onClick: () => void;
}) => {
    if (planKey === "All") {
        return (
            <button onClick={onClick}
                className={`flex flex-col items-center px-5 py-4 rounded-2xl border transition-all text-center min-w-[110px]
                    ${isActive ? "bg-white/20 border-white/40 shadow-lg" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
                <span className="text-2xl mb-1">🌐</span>
                <span className="text-sm font-bold text-white">All Plans</span>
                <span className="text-xs text-white/50 mt-0.5">{count} langs</span>
            </button>
        );
    }
    const cfg = PLAN_CONFIG[planKey];
    return (
        <button onClick={onClick}
            style={isActive ? { borderColor: cfg.color, backgroundColor: `${cfg.color}22` } : {}}
            className={`flex flex-col items-center px-5 py-4 rounded-2xl border transition-all text-center min-w-[140px]
                ${isActive ? "shadow-lg" : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"}`}>
            <span className="text-2xl mb-1">{cfg.icon}</span>
            <span className="text-sm font-bold text-white">{planKey}</span>
            <span className="text-xs mt-0.5 font-semibold" style={{ color: cfg.color }}>{count} languages</span>
            <span className="text-[10px] text-white/40 mt-1 leading-tight max-w-[130px]">
                {cfg.desc.split("·")[0].trim()}
            </span>
        </button>
    );
};

/* ─── Main ── */
export default function LanguagesShowcase() {
    const [activePlan, setActivePlan] = useState<PlanTier | "All">("All");
    const [search, setSearch] = useState("");
    const { ref, inView } = useInView({ threshold: 0.04, triggerOnce: false });

    const q = search.toLowerCase();
    const matchesSearch = (l: Language) =>
        q === "" || l.name.toLowerCase().includes(q) || l.nativeName.toLowerCase().includes(q) || l.code.toLowerCase().includes(q);

    const inPlan = (l: Language): boolean => {
        if (activePlan === "All") return true;
        if (activePlan === "Starter") return l.plan === "Starter";
        if (activePlan === "Pro") return l.plan === "Starter" || l.plan === "Pro";
        return true; // Unlimited = all
    };

    const displayed = ALL_LANGUAGES.filter(matchesSearch);
    // Sort: plan-included first, dimmed last
    const sorted = activePlan === "All" ? displayed : [
        ...displayed.filter(l => inPlan(l)),
        ...displayed.filter(l => !inPlan(l)),
    ];

    const counts = {
        All: ALL_LANGUAGES.length,
        Starter: ALL_LANGUAGES.filter(l => l.plan === "Starter").length,
        Pro: ALL_LANGUAGES.filter(l => l.plan === "Starter" || l.plan === "Pro").length,
        Unlimited: ALL_LANGUAGES.length,
    };

    return (
        <section ref={ref} className="relative bg-[#0F0B15] py-24 md:py-32 overflow-hidden">
            <DarkAuroraBackground />
            <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">

                {/* Header */}
                <motion.div className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-bold mb-5 border border-white/10">
                        🗣 LANGUAGES WITH VOICE
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                        AI Voices for Every Plan
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        All tiers include high-quality voice support. Choose your plan to access our full library of 90+ languages and premium AI models.
                    </p>
                </motion.div>

                {/* Engine counts bar */}
                <motion.div className="flex flex-wrap justify-center gap-2 mb-10"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.1 }}>
                    {(Object.entries(AUTH_COUNTS) as [TierName, number][]).map(([tier, count]) => (
                        <span key={tier} className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${ENGINE_BADGE[tier]}`}>
                            {tier} · {count} langs
                        </span>
                    ))}
                </motion.div>

                {/* Plan selector */}
                <motion.div className="mb-10" initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ delay: 0.15 }}>
                    <p className="text-center text-[10px] text-white/35 uppercase tracking-widest mb-3 font-bold">Filter by your plan</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <PlanCard planKey="All" count={counts.All} isActive={activePlan === "All"} onClick={() => setActivePlan("All")} />
                        <PlanCard planKey="Starter" count={counts.Starter} isActive={activePlan === "Starter"} onClick={() => setActivePlan("Starter")} />
                        <PlanCard planKey="Pro" count={counts.Pro} isActive={activePlan === "Pro"} onClick={() => setActivePlan("Pro")} />
                        <PlanCard planKey="Unlimited" count={counts.Unlimited} isActive={activePlan === "Unlimited"} onClick={() => setActivePlan("Unlimited")} />
                    </div>
                    {activePlan !== "All" && (
                        <motion.div key={activePlan} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                            className="text-center mt-5 flex flex-col items-center gap-2">
                            <p className="text-sm text-white/60 max-w-lg mx-auto">
                                <span className="font-bold text-white">{PLAN_CONFIG[activePlan].icon} {activePlan}:</span>{" "}
                                {PLAN_CONFIG[activePlan].desc}
                            </p>
                            {activePlan !== "Unlimited" && (
                                <a href="/pricing"
                                    style={{ color: PLAN_CONFIG[activePlan].color, borderColor: `${PLAN_CONFIG[activePlan].color}50`, backgroundColor: `${PLAN_CONFIG[activePlan].color}15` }}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full border transition-all hover:opacity-80">
                                    Upgrade to {activePlan === "Starter" ? "Pro" : "Unlimited"} for more languages →
                                </a>
                            )}
                        </motion.div>
                    )}
                </motion.div>

                {/* Search */}
                <motion.div className="flex justify-center mb-7"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.2 }}>
                    <input type="text" placeholder="Search language..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full sm:w-72 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 transition-colors" />
                </motion.div>

                {/* Grid */}
                <AnimatePresence mode="popLayout">
                    <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
                        {sorted.map((lang, idx) => (
                            <LanguageCard
                                key={lang.code} lang={lang} index={idx} inView={inView}
                                dimmed={activePlan !== "All" && !inPlan(lang)}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Plan legend */}
                <motion.div className="flex flex-wrap justify-center gap-4 mt-10"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.6 }}>
                    {(["Starter", "Pro", "Unlimited"] as PlanTier[]).map(p => {
                        const cfg = PLAN_CONFIG[p];
                        return (
                            <div key={p} className="flex items-center gap-2">
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                                    {cfg.icon} {p}
                                </span>
                                <span className="text-[11px] text-white/40">{cfg.desc}</span>
                            </div>
                        );
                    })}
                </motion.div>

                <motion.p className="text-center text-xs text-white/25 mt-4"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.7 }}>
                    Showing {sorted.length} of {ALL_LANGUAGES.length} languages.
                    All plans include real-time translation. Voice tier determines quality and expressiveness.
                </motion.p>
            </div>
        </section>
    );
}
