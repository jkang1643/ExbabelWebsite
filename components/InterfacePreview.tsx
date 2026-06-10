"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LANGUAGES = [
    { code: 'AF', name: 'Afrikaans', country: 'za' }, { code: 'SQ', name: 'Albanian', country: 'al' }, { code: 'AM', name: 'Amharic', country: 'et' }, { code: 'AR', name: 'Arabic', country: 'sa' }, { code: 'HY', name: 'Armenian', country: 'am' },
    { code: 'AZ', name: 'Azerbaijani', country: 'az' }, { code: 'EU', name: 'Basque', country: 'es' }, { code: 'BE', name: 'Belarusian', country: 'by' }, { code: 'BN', name: 'Bengali', country: 'bd' }, { code: 'BS', name: 'Bosnian', country: 'ba' },
    { code: 'BG', name: 'Bulgarian', country: 'bg' }, { code: 'CA', name: 'Catalan', country: 'es' }, { code: 'CEB', name: 'Cebuano', country: 'ph' }, { code: 'NY', name: 'Chichewa', country: 'mw' }, { code: 'ZH', name: 'Chinese (Simp)', country: 'cn' },
    { code: 'TW', name: 'Chinese (Trad)', country: 'tw' }, { code: 'CO', name: 'Corsican', country: 'fr' }, { code: 'HR', name: 'Croatian', country: 'hr' }, { code: 'CS', name: 'Czech', country: 'cz' }, { code: 'DA', name: 'Danish', country: 'dk' },
    { code: 'NL', name: 'Dutch', country: 'nl' }, { code: 'EN', name: 'English', country: 'gb' }, { code: 'EO', name: 'Esperanto', country: 'un' }, { code: 'ET', name: 'Estonian', country: 'ee' }, { code: 'TL', name: 'Filipino', country: 'ph' },
    { code: 'FI', name: 'Finnish', country: 'fi' }, { code: 'FR', name: 'French', country: 'fr' }, { code: 'FY', name: 'Frisian', country: 'nl' }, { code: 'GL', name: 'Galician', country: 'es' }, { code: 'KA', name: 'Georgian', country: 'ge' },
    { code: 'DE', name: 'German', country: 'de' }, { code: 'EL', name: 'Greek', country: 'gr' }, { code: 'GU', name: 'Gujarati', country: 'in' }, { code: 'HT', name: 'Haitian Creole', country: 'ht' }, { code: 'HA', name: 'Hausa', country: 'ng' },
    { code: 'HW', name: 'Hawaiian', country: 'us' }, { code: 'IW', name: 'Hebrew', country: 'il' }, { code: 'HI', name: 'Hindi', country: 'in' }, { code: 'HM', name: 'Hmong', country: 'cn' }, { code: 'HU', name: 'Hungarian', country: 'hu' },
    { code: 'IS', name: 'Icelandic', country: 'is' }, { code: 'IG', name: 'Igbo', country: 'ng' }, { code: 'ID', name: 'Indonesian', country: 'id' }, { code: 'GA', name: 'Irish', country: 'ie' }, { code: 'IT', name: 'Italian', country: 'it' },
    { code: 'JA', name: 'Japanese', country: 'jp' }, { code: 'JW', name: 'Javanese', country: 'id' }, { code: 'KN', name: 'Kannada', country: 'in' }, { code: 'KK', name: 'Kazakh', country: 'kz' }, { code: 'KM', name: 'Khmer', country: 'kh' },
    { code: 'RW', name: 'Kinyarwanda', country: 'rw' }, { code: 'KO', name: 'Korean', country: 'kr' }, { code: 'KU', name: 'Kurdish', country: 'tr' }, { code: 'KY', name: 'Kyrgyz', country: 'kg' }, { code: 'LO', name: 'Lao', country: 'la' },
    { code: 'LA', name: 'Latin', country: 'va' }, { code: 'LV', name: 'Latvian', country: 'lv' }, { code: 'LT', name: 'Lithuanian', country: 'lt' }, { code: 'LB', name: 'Luxembourgish', country: 'lu' }, { code: 'MK', name: 'Macedonian', country: 'mk' },
    { code: 'MG', name: 'Malagasy', country: 'mg' }, { code: 'MS', name: 'Malay', country: 'my' }, { code: 'ML', name: 'Malayalam', country: 'in' }, { code: 'MT', name: 'Maltese', country: 'mt' }, { code: 'MI', name: 'Maori', country: 'nz' },
    { code: 'MR', name: 'Marathi', country: 'in' }, { code: 'MN', name: 'Mongolian', country: 'mn' }, { code: 'MY', name: 'Myanmar', country: 'mm' }, { code: 'NE', name: 'Nepali', country: 'np' }, { code: 'NO', name: 'Norwegian', country: 'no' },
    { code: 'OR', name: 'Odia', country: 'in' }, { code: 'PS', name: 'Pashto', country: 'af' }, { code: 'FA', name: 'Persian', country: 'ir' }, { code: 'PL', name: 'Polish', country: 'pl' }, { code: 'PT', name: 'Portuguese', country: 'pt' },
    { code: 'PA', name: 'Punjabi', country: 'in' }, { code: 'RO', name: 'Romanian', country: 'ro' }, { code: 'RU', name: 'Russian', country: 'ru' }, { code: 'SM', name: 'Samoan', country: 'ws' }, { code: 'GD', name: 'Scots Gaelic', country: 'gb-sct' },
    { code: 'SR', name: 'Serbian', country: 'rs' }, { code: 'ST', name: 'Sesotho', country: 'ls' }, { code: 'SN', name: 'Shona', country: 'zw' }, { code: 'SD', name: 'Sindhi', country: 'pk' }, { code: 'SI', name: 'Sinhala', country: 'lk' },
    { code: 'SK', name: 'Slovak', country: 'sk' }, { code: 'SL', name: 'Slovenian', country: 'si' }, { code: 'SO', name: 'Somali', country: 'so' }, { code: 'ES', name: 'Spanish', country: 'es' }, { code: 'SU', name: 'Sundanese', country: 'id' },
    { code: 'SW', name: 'Swahili', country: 'ke' }, { code: 'SV', name: 'Swedish', country: 'se' }, { code: 'TG', name: 'Tajik', country: 'tj' }, { code: 'TA', name: 'Tamil', country: 'in' }, { code: 'TT', name: 'Tatar', country: 'ru' },
    { code: 'TE', name: 'Telugu', country: 'in' }, { code: 'TH', name: 'Thai', country: 'th' }, { code: 'TR', name: 'Turkish', country: 'tr' }, { code: 'TK', name: 'Turkmen', country: 'tm' }, { code: 'UK', name: 'Ukrainian', country: 'ua' },
    { code: 'UR', name: 'Urdu', country: 'pk' }, { code: 'UG', name: 'Uyghur', country: 'cn' }, { code: 'UZ', name: 'Uzbek', country: 'uz' }, { code: 'VI', name: 'Vietnamese', country: 'vn' }, { code: 'CY', name: 'Welsh', country: 'gb-wls' },
    { code: 'XH', name: 'Xhosa', country: 'za' }, { code: 'YI', name: 'Yiddish', country: 'il' }, { code: 'YO', name: 'Yoruba', country: 'ng' }, { code: 'ZU', name: 'Zulu', country: 'za' }
];

// Split into two columns for the scrolling effect
const COL1 = LANGUAGES.slice(0, 45);
const COL2 = LANGUAGES.slice(45, 90);

export default function InterfacePreview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

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

  const filteredLanguages = LANGUAGES.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="section-pad bg-white relative overflow-hidden h-[800px] flex items-center justify-center">
      
      {/* CSS for infinite vertical scrolling */}
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
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFD6E5] rounded-full mix-blend-multiply filter blur-[100px] animate-[pulse_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#EAD6FF] rounded-full mix-blend-multiply filter blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-[#D6F5FF] rounded-full mix-blend-multiply filter blur-[100px] animate-[pulse_7s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* World Map Background Image */}
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-[0.2] pointer-events-none select-none ml-[20%]">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" alt="World Map" className="w-[85%] max-w-[1400px] object-contain filter grayscale" />
      </div>

      <div className="relative z-30 flex flex-col md:flex-row w-full max-w-[1400px] mx-auto px-6 md:px-12 h-full items-center">
        
        {/* Left Side: Scrolling Language Bubbles */}
        <div className="hidden md:flex w-[40%] h-full relative overflow-hidden mask-vertical-fade items-center gap-6 justify-start pl-4 pointer-events-none select-none">
          
          {/* Column 1 (Scrolls Up) */}
          <div className="flex flex-col gap-4 animate-scroll-up pt-4">
            {/* Render twice for infinite loop effect */}
            {[...COL1, ...COL1].map((lang, i) => (
              <div key={`col1-${i}`} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-[#0B1220]">
                  {lang.country === 'un' ? (
                      <span className="text-xl leading-none">🌐</span>
                  ) : (
                      <img src={`https://flagcdn.com/w40/${lang.country}.png`} alt={lang.name} className="w-5 h-auto rounded-[2px] shadow-sm object-cover" />
                  )}
                  <span className="font-semibold text-sm tracking-wide">{lang.name}</span>
              </div>
            ))}
          </div>

          {/* Column 2 (Scrolls Down) */}
          <div className="flex flex-col gap-4 animate-scroll-down pt-4">
            {[...COL2, ...COL2].map((lang, i) => (
              <div key={`col2-${i}`} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_4px_15px_rgba(0,0,0,0.05)] text-[#0B1220]">
                  {lang.country === 'un' ? (
                      <span className="text-xl leading-none">🌐</span>
                  ) : (
                      <img src={`https://flagcdn.com/w40/${lang.country}.png`} alt={lang.name} className="w-5 h-auto rounded-[2px] shadow-sm object-cover" />
                  )}
                  <span className="font-semibold text-sm tracking-wide">{lang.name}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Central Content */}
        <div className="w-full md:w-[60%] flex flex-col items-center md:items-end text-center md:text-right">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-end"
            >
              <div className="relative mb-8">
                  <div className="w-20 h-20 bg-[#0B1220] rounded-full flex items-center justify-center text-white text-xl font-bold shadow-[0_0_40px_rgba(11,18,32,0.2)] relative z-10">
                      EN
                  </div>
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 border-2 border-[#0B1220] rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-[-10px] border border-[#0B1220] rounded-full animate-ping opacity-10" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-[#0B1220] tracking-tight mb-6 max-w-xl">
                  One message.<br/>Every language.
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-xl">
                  Exbabel translates your content into 90+ languages as it&apos;s happening, so everyone can follow along.
              </p>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative px-8 py-4 bg-white/70 backdrop-blur-md border border-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden pointer-events-auto"
              >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD6E5]/40 via-[#EAD6FF]/40 to-[#D6F5FF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 text-[#0B1220] font-semibold text-lg flex items-center gap-2">
                      Browse 90+ Languages
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
              </button>
            </motion.div>
        </div>
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
                <div className="flex justify-between items-center mb-10 shrink-0">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">Supported Languages</h2>
                        <p className="text-gray-400">Available across all platforms and captions instantly.</p>
                    </div>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white border border-white/10 cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
                <div className="relative mb-8 max-w-md shrink-0">
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
                        <div key={lang.code} className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all cursor-pointer group select-none hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            {lang.country === 'un' ? (
                                <span className="text-xl leading-none flex-shrink-0 group-hover:scale-110 transition-transform">🌐</span>
                            ) : (
                                <img src={`https://flagcdn.com/w40/${lang.country}.png`} alt={lang.name} className="w-5 h-auto rounded-[2px] shadow-sm object-cover flex-shrink-0 group-hover:scale-110 transition-transform" />
                            )}
                            <span className="font-medium text-sm tracking-wide truncate w-full" title={lang.name}>{lang.name}</span>
                        </div>
                    ))}
                    {filteredLanguages.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-500">
                          No languages found matching &quot;{search}&quot;.
                        </div>
                    )}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
