"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

// ── Types ─────────────────────────────────────────────────────────────────
type SupportType = "voice" | "captions";

interface Language {
    code: string;
    name: string;
    country: string; // 2-letter ISO for flagcdn
    support: SupportType;
}

// ── 90 Voice + Captions Languages ─────────────────────────────────────────
const VOICE_LANGUAGES: Language[] = [
    { code: 'AF', name: 'Afrikaans', country: 'za', support: 'voice' },
    { code: 'AM', name: 'Amharic', country: 'et', support: 'voice' },
    { code: 'AR', name: 'Arabic', country: 'sa', support: 'voice' },
    { code: 'AZ', name: 'Azerbaijani', country: 'az', support: 'voice' },
    { code: 'BE', name: 'Belarusian', country: 'by', support: 'voice' },
    { code: 'BG', name: 'Bulgarian', country: 'bg', support: 'voice' },
    { code: 'BN', name: 'Bengali', country: 'bd', support: 'voice' },
    { code: 'BS', name: 'Bosnian', country: 'ba', support: 'voice' },
    { code: 'CA', name: 'Catalan', country: 'es', support: 'voice' },
    { code: 'CEB', name: 'Cebuano', country: 'ph', support: 'voice' },
    { code: 'ZH', name: 'Chinese (Simplified)', country: 'cn', support: 'voice' },
    { code: 'TW', name: 'Chinese (Traditional)', country: 'tw', support: 'voice' },
    { code: 'HR', name: 'Croatian', country: 'hr', support: 'voice' },
    { code: 'CS', name: 'Czech', country: 'cz', support: 'voice' },
    { code: 'DA', name: 'Danish', country: 'dk', support: 'voice' },
    { code: 'NL', name: 'Dutch', country: 'nl', support: 'voice' },
    { code: 'EN', name: 'English', country: 'gb', support: 'voice' },
    { code: 'ET', name: 'Estonian', country: 'ee', support: 'voice' },
    { code: 'EU', name: 'Basque', country: 'es', support: 'voice' },
    { code: 'FA', name: 'Persian', country: 'ir', support: 'voice' },
    { code: 'FI', name: 'Finnish', country: 'fi', support: 'voice' },
    { code: 'TL', name: 'Filipino', country: 'ph', support: 'voice' },
    { code: 'FR', name: 'French', country: 'fr', support: 'voice' },
    { code: 'GL', name: 'Galician', country: 'es', support: 'voice' },
    { code: 'KA', name: 'Georgian', country: 'ge', support: 'voice' },
    { code: 'DE', name: 'German', country: 'de', support: 'voice' },
    { code: 'EL', name: 'Greek', country: 'gr', support: 'voice' },
    { code: 'GU', name: 'Gujarati', country: 'in', support: 'voice' },
    { code: 'HT', name: 'Haitian Creole', country: 'ht', support: 'voice' },
    { code: 'IW', name: 'Hebrew', country: 'il', support: 'voice' },
    { code: 'HI', name: 'Hindi', country: 'in', support: 'voice' },
    { code: 'HU', name: 'Hungarian', country: 'hu', support: 'voice' },
    { code: 'HY', name: 'Armenian', country: 'am', support: 'voice' },
    { code: 'IS', name: 'Icelandic', country: 'is', support: 'voice' },
    { code: 'ID', name: 'Indonesian', country: 'id', support: 'voice' },
    { code: 'IT', name: 'Italian', country: 'it', support: 'voice' },
    { code: 'JA', name: 'Japanese', country: 'jp', support: 'voice' },
    { code: 'JW', name: 'Javanese', country: 'id', support: 'voice' },
    { code: 'KN', name: 'Kannada', country: 'in', support: 'voice' },
    { code: 'KO', name: 'Korean', country: 'kr', support: 'voice' },
    { code: 'LA', name: 'Latin', country: 'va', support: 'voice' },
    { code: 'LO', name: 'Lao', country: 'la', support: 'voice' },
    { code: 'LV', name: 'Latvian', country: 'lv', support: 'voice' },
    { code: 'LT', name: 'Lithuanian', country: 'lt', support: 'voice' },
    { code: 'LB', name: 'Luxembourgish', country: 'lu', support: 'voice' },
    { code: 'MK', name: 'Macedonian', country: 'mk', support: 'voice' },
    { code: 'MG', name: 'Malagasy', country: 'mg', support: 'voice' },
    { code: 'MS', name: 'Malay', country: 'my', support: 'voice' },
    { code: 'ML', name: 'Malayalam', country: 'in', support: 'voice' },
    { code: 'MR', name: 'Marathi', country: 'in', support: 'voice' },
    { code: 'MN', name: 'Mongolian', country: 'mn', support: 'voice' },
    { code: 'MY', name: 'Burmese', country: 'mm', support: 'voice' },
    { code: 'NE', name: 'Nepali', country: 'np', support: 'voice' },
    { code: 'NO', name: 'Norwegian', country: 'no', support: 'voice' },
    { code: 'OR', name: 'Odia', country: 'in', support: 'voice' },
    { code: 'PS', name: 'Pashto', country: 'af', support: 'voice' },
    { code: 'PL', name: 'Polish', country: 'pl', support: 'voice' },
    { code: 'PT', name: 'Portuguese', country: 'pt', support: 'voice' },
    { code: 'PA', name: 'Punjabi', country: 'in', support: 'voice' },
    { code: 'RO', name: 'Romanian', country: 'ro', support: 'voice' },
    { code: 'RU', name: 'Russian', country: 'ru', support: 'voice' },
    { code: 'SR', name: 'Serbian', country: 'rs', support: 'voice' },
    { code: 'SD', name: 'Sindhi', country: 'pk', support: 'voice' },
    { code: 'SI', name: 'Sinhala', country: 'lk', support: 'voice' },
    { code: 'SK', name: 'Slovak', country: 'sk', support: 'voice' },
    { code: 'SL', name: 'Slovenian', country: 'si', support: 'voice' },
    { code: 'SQ', name: 'Albanian', country: 'al', support: 'voice' },
    { code: 'ES', name: 'Spanish', country: 'es', support: 'voice' },
    { code: 'SW', name: 'Swahili', country: 'ke', support: 'voice' },
    { code: 'SV', name: 'Swedish', country: 'se', support: 'voice' },
    { code: 'TA', name: 'Tamil', country: 'in', support: 'voice' },
    { code: 'TE', name: 'Telugu', country: 'in', support: 'voice' },
    { code: 'TH', name: 'Thai', country: 'th', support: 'voice' },
    { code: 'TR', name: 'Turkish', country: 'tr', support: 'voice' },
    { code: 'UK', name: 'Ukrainian', country: 'ua', support: 'voice' },
    { code: 'UR', name: 'Urdu', country: 'pk', support: 'voice' },
    { code: 'VI', name: 'Vietnamese', country: 'vn', support: 'voice' },
    { code: 'CY', name: 'Welsh', country: 'gb', support: 'voice' },
    { code: 'YI', name: 'Yiddish', country: 'il', support: 'voice' },
    { code: 'YO', name: 'Yoruba', country: 'ng', support: 'voice' },
    { code: 'ZU', name: 'Zulu', country: 'za', support: 'voice' },
    { code: 'EN-US', name: 'English (US)', country: 'us', support: 'voice' },
    { code: 'EN-AU', name: 'English (Australia)', country: 'au', support: 'voice' },
    { code: 'ES-MX', name: 'Spanish (Mexico)', country: 'mx', support: 'voice' },
    { code: 'FR-CA', name: 'French (Canada)', country: 'ca', support: 'voice' },
    { code: 'PT-BR', name: 'Portuguese (Brazil)', country: 'br', support: 'voice' },
    { code: 'YUE', name: 'Cantonese', country: 'hk', support: 'voice' },
    { code: 'NN', name: 'Norwegian (Nynorsk)', country: 'no', support: 'voice' },
    { code: 'KOK', name: 'Konkani', country: 'in', support: 'voice' },
    { code: 'MAI', name: 'Maithili', country: 'in', support: 'voice' },
];

// ── Caption-Only Languages (additional 106 to reach 196 total) ────────────
const CAPTION_LANGUAGES: Language[] = [
    { code: 'EO', name: 'Esperanto', country: 'eu', support: 'captions' },
    { code: 'FY', name: 'Frisian', country: 'nl', support: 'captions' },
    { code: 'GA', name: 'Irish', country: 'ie', support: 'captions' },
    { code: 'GD', name: 'Scots Gaelic', country: 'gb', support: 'captions' },
    { code: 'HA', name: 'Hausa', country: 'ng', support: 'captions' },
    { code: 'HW', name: 'Hawaiian', country: 'us', support: 'captions' },
    { code: 'HM', name: 'Hmong', country: 'cn', support: 'captions' },
    { code: 'IG', name: 'Igbo', country: 'ng', support: 'captions' },
    { code: 'KK', name: 'Kazakh', country: 'kz', support: 'captions' },
    { code: 'KM', name: 'Khmer', country: 'kh', support: 'captions' },
    { code: 'KU', name: 'Kurdish', country: 'tr', support: 'captions' },
    { code: 'KY', name: 'Kyrgyz', country: 'kg', support: 'captions' },
    { code: 'MT', name: 'Maltese', country: 'mt', support: 'captions' },
    { code: 'MI', name: 'Maori', country: 'nz', support: 'captions' },
    { code: 'RW', name: 'Kinyarwanda', country: 'rw', support: 'captions' },
    { code: 'CO', name: 'Corsican', country: 'fr', support: 'captions' },
    { code: 'NY', name: 'Chichewa', country: 'mw', support: 'captions' },
    { code: 'SM', name: 'Samoan', country: 'ws', support: 'captions' },
    { code: 'ST', name: 'Sesotho', country: 'ls', support: 'captions' },
    { code: 'SN', name: 'Shona', country: 'zw', support: 'captions' },
    { code: 'SO', name: 'Somali', country: 'so', support: 'captions' },
    { code: 'SU', name: 'Sundanese', country: 'id', support: 'captions' },
    { code: 'TG', name: 'Tajik', country: 'tj', support: 'captions' },
    { code: 'TT', name: 'Tatar', country: 'ru', support: 'captions' },
    { code: 'TK', name: 'Turkmen', country: 'tm', support: 'captions' },
    { code: 'UG', name: 'Uyghur', country: 'cn', support: 'captions' },
    { code: 'UZ', name: 'Uzbek', country: 'uz', support: 'captions' },
    { code: 'XH', name: 'Xhosa', country: 'za', support: 'captions' },
    { code: 'AF2', name: 'Dari', country: 'af', support: 'captions' },
    { code: 'TI', name: 'Tigrinya', country: 'er', support: 'captions' },
    { code: 'WO', name: 'Wolof', country: 'sn', support: 'captions' },
    { code: 'FF', name: 'Fulani', country: 'ng', support: 'captions' },
    { code: 'LN', name: 'Lingala', country: 'cd', support: 'captions' },
    { code: 'OM', name: 'Oromo', country: 'et', support: 'captions' },
    { code: 'TI2', name: 'Twi', country: 'gh', support: 'captions' },
    { code: 'BM', name: 'Bambara', country: 'ml', support: 'captions' },
    { code: 'LG', name: 'Luganda', country: 'ug', support: 'captions' },
    { code: 'AK', name: 'Akan', country: 'gh', support: 'captions' },
    { code: 'TS', name: 'Tsonga', country: 'za', support: 'captions' },
    { code: 'TN', name: 'Tswana', country: 'bw', support: 'captions' },
    { code: 'SS', name: 'Swazi', country: 'sz', support: 'captions' },
    { code: 'RN', name: 'Kirundi', country: 'bi', support: 'captions' },
    { code: 'DZ', name: 'Dzongkha', country: 'bt', support: 'captions' },
    { code: 'KMR', name: 'Kurmanji', country: 'iq', support: 'captions' },
    { code: 'CKB', name: 'Sorani', country: 'iq', support: 'captions' },
    { code: 'HB', name: 'Haitian French', country: 'ht', support: 'captions' },
    { code: 'AS', name: 'Assamese', country: 'in', support: 'captions' },
    { code: 'BHO', name: 'Bhojpuri', country: 'in', support: 'captions' },
    { code: 'DOI', name: 'Dogri', country: 'in', support: 'captions' },
    { code: 'GON', name: 'Gondi', country: 'in', support: 'captions' },
    { code: 'KS', name: 'Kashmiri', country: 'in', support: 'captions' },
    { code: 'MAI2', name: 'Maithili', country: 'in', support: 'captions' },
    { code: 'MNI', name: 'Manipuri', country: 'in', support: 'captions' },
    { code: 'SAT', name: 'Santali', country: 'in', support: 'captions' },
    { code: 'SA', name: 'Sanskrit', country: 'in', support: 'captions' },
    { code: 'KOK', name: 'Konkani', country: 'in', support: 'captions' },
    { code: 'BO', name: 'Tibetan', country: 'cn', support: 'captions' },
    { code: 'II', name: 'Yi', country: 'cn', support: 'captions' },
    { code: 'ZH2', name: 'Cantonese', country: 'hk', support: 'captions' },
    { code: 'MIN', name: 'Minangkabau', country: 'id', support: 'captions' },
    { code: 'MAD', name: 'Madurese', country: 'id', support: 'captions' },
    { code: 'BUG', name: 'Buginese', country: 'id', support: 'captions' },
    { code: 'ACE', name: 'Acehnese', country: 'id', support: 'captions' },
    { code: 'BAL', name: 'Balinese', country: 'id', support: 'captions' },
    { code: 'WAR', name: 'Waray', country: 'ph', support: 'captions' },
    { code: 'ILO', name: 'Ilocano', country: 'ph', support: 'captions' },
    { code: 'PAM', name: 'Kapampangan', country: 'ph', support: 'captions' },
    { code: 'BIK', name: 'Bikol', country: 'ph', support: 'captions' },
    { code: 'TTO', name: 'Tetun', country: 'tl', support: 'captions' },
    { code: 'DIV', name: 'Dhivehi', country: 'mv', support: 'captions' },
    { code: 'FJ', name: 'Fijian', country: 'fj', support: 'captions' },
    { code: 'TO', name: 'Tongan', country: 'to', support: 'captions' },
    { code: 'TPI', name: 'Tok Pisin', country: 'pg', support: 'captions' },
    { code: 'BI', name: 'Bislama', country: 'vu', support: 'captions' },
    { code: 'MH', name: 'Marshallese', country: 'mh', support: 'captions' },
    { code: 'GIL', name: 'Gilbertese', country: 'ki', support: 'captions' },
    { code: 'PAU', name: 'Palauan', country: 'pw', support: 'captions' },
    { code: 'NAU', name: 'Nauruan', country: 'nr', support: 'captions' },
    { code: 'TVL', name: 'Tuvaluan', country: 'tv', support: 'captions' },
    { code: 'GN', name: 'Guarani', country: 'py', support: 'captions' },
    { code: 'QU', name: 'Quechua', country: 'pe', support: 'captions' },
    { code: 'AY', name: 'Aymara', country: 'bo', support: 'captions' },
    { code: 'SR2', name: 'Sranan Tongo', country: 'sr', support: 'captions' },
    { code: 'CR', name: 'Greenlandic', country: 'gl', support: 'captions' },
    { code: 'KR', name: 'Kreol', country: 'sc', support: 'captions' },
    { code: 'MFE', name: 'Morisyen', country: 'mu', support: 'captions' },
    { code: 'KAB', name: 'Kabyle', country: 'dz', support: 'captions' },
    { code: 'BER', name: 'Berber', country: 'ma', support: 'captions' },
    { code: 'PT2', name: 'Portuguese (Brazil)', country: 'br', support: 'captions' },
    { code: 'FR2', name: 'French (Canada)', country: 'ca', support: 'captions' },
    { code: 'EN2', name: 'English (Australia)', country: 'au', support: 'captions' },
    { code: 'EN3', name: 'English (India)', country: 'in', support: 'captions' },
    { code: 'ES2', name: 'Spanish (Latin America)', country: 'mx', support: 'captions' },
    { code: 'NL2', name: 'Dutch (Belgium)', country: 'be', support: 'captions' },
    { code: 'DE2', name: 'German (Austria)', country: 'at', support: 'captions' },
    { code: 'DE3', name: 'German (Switzerland)', country: 'ch', support: 'captions' },
    { code: 'FR3', name: 'French (Belgium)', country: 'be', support: 'captions' },
    { code: 'FR4', name: 'French (Switzerland)', country: 'ch', support: 'captions' },
    { code: 'IT2', name: 'Italian (Switzerland)', country: 'ch', support: 'captions' },
    { code: 'PT3', name: 'Portuguese (Angola)', country: 'ao', support: 'captions' },
    { code: 'PT4', name: 'Portuguese (Mozambique)', country: 'mz', support: 'captions' },
    { code: 'AR2', name: 'Arabic (Egypt)', country: 'eg', support: 'captions' },
    { code: 'AR3', name: 'Arabic (Morocco)', country: 'ma', support: 'captions' },
    { code: 'AR4', name: 'Arabic (Iraq)', country: 'iq', support: 'captions' },
    { code: 'AR5', name: 'Arabic (UAE)', country: 'ae', support: 'captions' },
    { code: 'SW2', name: 'Swahili (Tanzania)', country: 'tz', support: 'captions' },
];

const ALL_LANGUAGES = [...VOICE_LANGUAGES, ...CAPTION_LANGUAGES];

// Split into two columns for the scrolling effect (voice languages only)
const COL1 = VOICE_LANGUAGES.slice(0, Math.ceil(VOICE_LANGUAGES.length / 2));
const COL2 = VOICE_LANGUAGES.slice(Math.ceil(VOICE_LANGUAGES.length / 2));

type FilterType = "all" | "voice" | "captions";

const FILTERS: { key: FilterType; label: string; count: number; icon: string; color: string }[] = [
    { key: "all", label: "All Languages", count: ALL_LANGUAGES.length, icon: "🌍", color: "#394DFE" },
    { key: "voice", label: "Voice + Captions", count: VOICE_LANGUAGES.length, icon: "🗣", color: "#059669" },
    { key: "captions", label: "Captions Only", count: CAPTION_LANGUAGES.length, icon: "📝", color: "#8B5CF6" },
];

export default function InterfacePreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const filteredLanguages = ALL_LANGUAGES
    .filter(l => {
      if (filter === "voice") return l.support === "voice";
      if (filter === "captions") return l.support === "captions";
      return true;
    })
    .filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  // Framer Motion staggered variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="section-pad bg-transparent relative overflow-hidden min-h-[850px] md:h-screen py-16 md:py-0 flex items-center justify-center">
      
      {/* CSS overrides for SVG Map and scroll animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-up {
          animation: scroll-up 60s linear infinite;
        }
        .animate-scroll-down {
          animation: scroll-down 60s linear infinite;
        }
        .mask-vertical-fade {
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
      `}} />

      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 opacity-40 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFD6E5] rounded-full mix-blend-multiply filter blur-[100px] animate-[pulse_6s_ease-in-out_infinite] hidden lg:block"></div>
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#EAD6FF] rounded-full mix-blend-multiply filter blur-[100px] animate-[pulse_8s_ease-in-out_infinite] hidden lg:block" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-[#D6F5FF] rounded-full mix-blend-multiply filter blur-[100px] animate-[pulse_7s_ease-in-out_infinite] hidden lg:block" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Top and Bottom Gradient Blends for Seamless Transitions */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F8F9FA] to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F9FA] to-transparent pointer-events-none z-20" />

      {/* Interactive World Map Background SVG */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none md:ml-[-10%] ml-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/world-map.svg"
          alt=""
          className="w-[90%] max-w-[1400px] h-auto opacity-[0.08]"
          loading="lazy"
          width={950}
          height={620}
          aria-hidden="true"
        />
      </motion.div>

      <div className="relative z-30 flex flex-col md:flex-row w-full max-w-[1400px] mx-auto px-6 md:px-12 h-auto md:h-full items-center">
        
        {/* Left Side: Central Content */}
        <div className="w-full md:w-[60%] flex flex-col items-center md:items-start text-center md:text-left md:pr-16">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col items-center md:items-start w-full"
            >
              <motion.div variants={itemVariants} className="relative mb-8">
                  <div className="w-20 h-20 bg-[#0B1220] rounded-full flex items-center justify-center text-white text-xl font-bold shadow-[0_0_40px_rgba(11,18,32,0.2)] relative z-10">
                      EN
                  </div>
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 border-2 border-[#0B1220] rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-[-10px] border border-[#0B1220] rounded-full animate-ping opacity-10" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
              </motion.div>
              
              <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-[#0B1220] tracking-tight mb-6 max-w-lg">
                  One message.<br/>Every language.
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                  Exbabel translates your content into 196 languages and dialects as it&apos;s happening, so everyone can follow along.
              </motion.p>

              <motion.button 
                variants={itemVariants}
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-white/70 backdrop-blur-md border border-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden pointer-events-auto"
              >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD6E5]/40 via-[#EAD6FF]/40 to-[#D6F5FF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-[#0B1220] font-semibold text-lg flex items-center gap-2">
                      Browse 196 Languages
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
              </motion.button>
            </motion.div>
        </div>

        {/* Right Side: Scrolling Language Bubbles */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="hidden md:flex w-[40%] h-full relative overflow-hidden mask-vertical-fade items-start gap-6 justify-end pr-4 pointer-events-none select-none"
        >
          {/* Column 1 (Scrolls Up) */}
          <div className="flex flex-col gap-4 animate-scroll-up pt-4">
            {[...COL1, ...COL1].map((lang, i) => (
              <div key={`col1-${i}`} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-[#0B1220] flex-shrink-0">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-gray-100/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={`https://flagcdn.com/${lang.country}.svg`} 
                        alt={`${lang.name} flag`} 
                        className="w-full h-full object-cover" 
                        loading="lazy" 
                        decoding="async"
                      />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">{lang.name}</span>
              </div>
            ))}
          </div>

          {/* Column 2 (Scrolls Down) */}
          <div className="flex flex-col gap-4 animate-scroll-down pt-4">
            {[...COL2, ...COL2].map((lang, i) => (
              <div key={`col2-${i}`} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-[#0B1220] flex-shrink-0">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-gray-100/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={`https://flagcdn.com/${lang.country}.svg`} 
                        alt={`${lang.name} flag`} 
                        className="w-full h-full object-cover" 
                        loading="lazy" 
                        decoding="async"
                      />
                  </div>
                  <span className="font-semibold text-sm tracking-wide">{lang.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Overlay / Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#100924]/95 backdrop-blur-2xl flex flex-col pt-16 px-6 sm:px-12 pb-12 overflow-hidden pointer-events-auto"
          >
            <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col h-full">
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">196 Supported Languages</h2>
                        <p className="text-gray-400">Real-time captions across all 196 languages. Voice translation for 90.</p>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white border border-white/10 cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 shrink-0">
                    {FILTERS.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border transition-all cursor-pointer
                                ${filter === f.key 
                                    ? "bg-white/15 border-white/40 text-white shadow-lg" 
                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80"
                                }`}
                            style={filter === f.key ? { borderColor: f.color, backgroundColor: `${f.color}22` } : {}}
                        >
                            <span>{f.icon}</span>
                            <span>{f.label}</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10">{f.count}</span>
                        </button>
                    ))}
                </div>
                
                <div className="relative mb-6 max-w-md shrink-0">
                    <input 
                      type="text" 
                      placeholder="Search languages..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full px-6 py-4 rounded-full bg-[#1A1137] text-white border border-white/10 focus:outline-none focus:border-[#EAD6FF] focus:ring-1 focus:ring-[#EAD6FF] placeholder-gray-500 transition-all shadow-inner" 
                    />
                    <svg className="w-5 h-5 absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>

                {/* Languages Grid */}
                <div className="flex-1 overflow-y-auto pr-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 content-start pb-12 custom-scrollbar">
                    <style dangerouslySetInnerHTML={{__html: `
                      .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                      .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 4px; }
                      .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
                      .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
                    `}} />
                    {filteredLanguages.map(lang => (
                        <div key={lang.code} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all cursor-pointer group select-none hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 bg-white/10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                  src={`https://flagcdn.com/${lang.country}.svg`} 
                                  alt={`${lang.name} flag`} 
                                  className="w-full h-full object-cover" 
                                  loading="lazy" 
                                  decoding="async"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="font-medium text-sm tracking-wide truncate block" title={lang.name}>{lang.name}</span>
                                <span className={`text-[9px] font-bold ${lang.support === 'voice' ? 'text-emerald-400' : 'text-purple-400'}`}>
                                    {lang.support === 'voice' ? '🗣 Voice + Captions' : '📝 Captions'}
                                </span>
                            </div>
                        </div>
                    ))}
                    {filteredLanguages.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-500">
                          No languages found matching &quot;{search}&quot;.
                        </div>
                    )}
                </div>

                {/* Footer count */}
                <div className="shrink-0 pt-4 text-center text-xs text-white/30">
                    Showing {filteredLanguages.length} of {ALL_LANGUAGES.length} languages.
                    {filter === "all" && ` ${VOICE_LANGUAGES.length} with voice + captions · ${CAPTION_LANGUAGES.length} captions only.`}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
