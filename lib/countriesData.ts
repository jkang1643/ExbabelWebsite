/**
 * Authoritative country data — sourced from COUNTRIES.md
 * 196 countries total, 171 voice-supported (87% of world by primary language)
 *
 * Voice support = union of all tiers:
 * Gemini (87 langs), Chirp3 HD (53), Neural2 (48), Standard (60), ElevenLabs v3 (75), ElevenLabs Flash (29)
 *
 * Breakdown:
 *   Africa:        47 / 54 supported
 *   Europe:        38 / 44 supported
 *   Asia:          38 / 49 supported
 *   North America: 22 / 23 supported
 *   South America: 12 / 12 supported
 *   Oceania:       14 / 14 supported
 *   TOTAL:        171 / 196 supported
 */

export type Continent = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

export interface CountryData {
    name: string;
    code: string;            // ISO 3166-1 alpha-2
    flag: string;            // Emoji flag
    fact: string;            // Fun / interesting fact
    continent: Continent;
    hasVoice: boolean;       // Voice TTS supported
    primaryLanguage: string; // Primary language per COUNTRIES.md
}

export const COUNTRIES: CountryData[] = [

    // ════════════════════════════════════════════════════════
    // AFRICA — 54 countries, 47 supported
    // ════════════════════════════════════════════════════════

    {
        name: "Algeria", code: "DZ", flag: "🇩🇿", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "The largest country in Africa — bigger than all of Western Europe combined"
    },
    {
        name: "Angola", code: "AO", flag: "🇦🇴", primaryLanguage: "Portuguese", hasVoice: true, continent: "Africa",
        fact: "Has the second-largest Portuguese-speaking population in the world after Brazil"
    },
    {
        name: "Benin", code: "BJ", flag: "🇧🇯", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "The birthplace of Vodún (Voodoo), which spread across the Atlantic during the slave trade"
    },
    {
        name: "Botswana", code: "BW", flag: "🇧🇼", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Transformed from one of the world's poorest nations to an upper-middle-income country in just two generations"
    },
    {
        name: "Burkina Faso", code: "BF", flag: "🇧🇫", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "The name literally means 'Land of Honest People' — chosen to reflect the nation's core values"
    },
    {
        name: "Burundi", code: "BI", flag: "🇧🇮", primaryLanguage: "Kirundi", hasVoice: false, continent: "Africa",
        fact: "One of the world's most densely populated countries and home to Lake Tanganyika, the world's longest freshwater lake"
    },
    {
        name: "Cabo Verde", code: "CV", flag: "🇨🇻", primaryLanguage: "Portuguese", hasVoice: true, continent: "Africa",
        fact: "An archipelago nation that was completely uninhabited when the Portuguese arrived in 1456"
    },
    {
        name: "Cameroon", code: "CM", flag: "🇨🇲", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "Known as 'Africa in miniature' — every major African climate zone and over 280 languages exist here"
    },
    {
        name: "Central African Republic", code: "CF", flag: "🇨🇫", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "Sits at the geographic heart of Africa and has one of the world's most untouched rainforests"
    },
    {
        name: "Chad", code: "TD", flag: "🇹🇩", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "Lake Chad, which once gave the country its name, has shrunk by 90% since the 1960s due to climate change"
    },
    {
        name: "Comoros", code: "KM", flag: "🇰🇲", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "The world's largest producer of ylang-ylang — the flower essential to Chanel No. 5 perfume"
    },
    {
        name: "DR Congo", code: "CD", flag: "🇨🇩", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "The Congo River is the world's deepest river at over 220 meters and generates more hydroelectric potential than any other"
    },
    {
        name: "Republic of Congo", code: "CG", flag: "🇨🇬", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "One of Africa's most forested countries — over 65% of its territory is covered by equatorial rainforest"
    },
    {
        name: "Djibouti", code: "DJ", flag: "🇩🇯", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "Sits at one of the world's busiest shipping lanes — nearly every ship heading to or from the Suez Canal passes here"
    },
    {
        name: "Egypt", code: "EG", flag: "🇪🇬", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "The Great Pyramid of Giza was the world's tallest structure for 3,800 years"
    },
    {
        name: "Equatorial Guinea", code: "GQ", flag: "🇬🇶", primaryLanguage: "Spanish", hasVoice: true, continent: "Africa",
        fact: "The only country in Africa where Spanish is an official language and one of its top exports"
    },
    {
        name: "Eritrea", code: "ER", flag: "🇪🇷", primaryLanguage: "Tigrinya", hasVoice: false, continent: "Africa",
        fact: "Has one of the world's oldest ports — the Red Sea port of Massawa has been active for over 1,000 years"
    },
    {
        name: "Eswatini", code: "SZ", flag: "🇸🇿", primaryLanguage: "Swazi", hasVoice: false, continent: "Africa",
        fact: "One of the world's last absolute monarchies, renamed from Swaziland in 2018 to honor its indigenous identity"
    },
    {
        name: "Ethiopia", code: "ET", flag: "🇪🇹", primaryLanguage: "Amharic", hasVoice: true, continent: "Africa",
        fact: "Uses its own calendar — 13 months in a year — and was about 7 years 'behind' at the turn of the millennium"
    },
    {
        name: "Gabon", code: "GA", flag: "🇬🇦", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "Over 80% of the country is covered by pristine rainforest, home to forest elephants and western lowland gorillas"
    },
    {
        name: "Gambia", code: "GM", flag: "🇬🇲", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "The smallest country on mainland Africa — a thin strip of land entirely surrounded by Senegal"
    },
    {
        name: "Ghana", code: "GH", flag: "🇬🇭", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Named after the ancient Ghana Empire, though the empire was located far to the northwest of modern Ghana"
    },
    {
        name: "Guinea", code: "GN", flag: "🇬🇳", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "Contains some of the world's largest deposits of bauxite — the mineral used to make aluminum"
    },
    {
        name: "Guinea-Bissau", code: "GW", flag: "🇬🇼", primaryLanguage: "Portuguese", hasVoice: true, continent: "Africa",
        fact: "Made up of the mainland and 88 islands — only a third of the country's territory is on the mainland"
    },
    {
        name: "Ivory Coast", code: "CI", flag: "🇨🇮", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "Produces about 40% of the world's cocoa — more than any other country on Earth"
    },
    {
        name: "Kenya", code: "KE", flag: "🇰🇪", primaryLanguage: "Swahili", hasVoice: true, continent: "Africa",
        fact: "Kenyan runners have dominated long-distance running for decades — the country has produced over 20 world record holders"
    },
    {
        name: "Lesotho", code: "LS", flag: "🇱🇸", primaryLanguage: "Sesotho", hasVoice: false, continent: "Africa",
        fact: "One of only three countries in the world that is completely surrounded by another single country (South Africa)"
    },
    {
        name: "Liberia", code: "LR", flag: "🇱🇷", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Founded in 1847 by formerly enslaved Americans — its capital Monrovia is named after US President James Monroe"
    },
    {
        name: "Libya", code: "LY", flag: "🇱🇾", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "Has the longest coastline of any African country on the Mediterranean Sea"
    },
    {
        name: "Madagascar", code: "MG", flag: "🇲🇬", primaryLanguage: "Malagasy", hasVoice: true, continent: "Africa",
        fact: "Over 90% of its wildlife is found nowhere else on Earth — including all 100+ species of lemurs"
    },
    {
        name: "Malawi", code: "MW", flag: "🇲🇼", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Known as the 'Warm Heart of Africa' for the friendliness of its people toward visitors"
    },
    {
        name: "Mali", code: "ML", flag: "🇲🇱", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "Timbuktu was once the richest city in the world and home to one of the earliest universities in Sub-Saharan Africa"
    },
    {
        name: "Mauritania", code: "MR", flag: "🇲🇷", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "The Sahara Desert covers over 90% of its territory — one of the most sparsely inhabited countries on Earth"
    },
    {
        name: "Mauritius", code: "MU", flag: "🇲🇺", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "The only country in Africa where Hinduism is the largest religion, and home of the now-extinct dodo bird"
    },
    {
        name: "Morocco", code: "MA", flag: "🇲🇦", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "Home to the University of al-Qarawiyyin, founded in 859 AD — the world's oldest continuously operating university"
    },
    {
        name: "Mozambique", code: "MZ", flag: "🇲🇿", primaryLanguage: "Portuguese", hasVoice: true, continent: "Africa",
        fact: "The only country whose national flag features a modern weapon — an AK-47 with a bayonet"
    },
    {
        name: "Namibia", code: "NA", flag: "🇳🇦", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Home to the Namib Desert — at over 55 million years old, it is the world's oldest desert"
    },
    {
        name: "Niger", code: "NE", flag: "🇳🇪", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "Contains the largest protected area in Africa — the Aïr and Ténéré Natural Reserves"
    },
    {
        name: "Nigeria", code: "NG", flag: "🇳🇬", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Africa's most populous nation — home to over 520 living languages and the largest film industry on the continent (Nollywood)"
    },
    {
        name: "Rwanda", code: "RW", flag: "🇷🇼", primaryLanguage: "Kinyarwanda", hasVoice: false, continent: "Africa",
        fact: "Has the highest proportion of women in parliament of any country in the world — over 60%"
    },
    {
        name: "São Tomé and Príncipe", code: "ST", flag: "🇸🇹", primaryLanguage: "Portuguese", hasVoice: true, continent: "Africa",
        fact: "The second-smallest African country by area and the first in sub-Saharan Africa to have multi-party elections"
    },
    {
        name: "Senegal", code: "SN", flag: "🇸🇳", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "Wolof, its dominant local language, is spoken by 80% of Senegalese even though French is the official language"
    },
    {
        name: "Seychelles", code: "SC", flag: "🇸🇨", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Home to the coco de mer palm, which produces the largest seed of any plant — a single nut can weigh 25 kg"
    },
    {
        name: "Sierra Leone", code: "SL", flag: "🇸🇱", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Freetown, its capital, was founded as a home for repatriated and freed slaves in 1787"
    },
    {
        name: "Somalia", code: "SO", flag: "🇸🇴", primaryLanguage: "Somali", hasVoice: false, continent: "Africa",
        fact: "Has one of the world's most sophisticated oral literary traditions — Somali poetry is an art form passed for centuries"
    },
    {
        name: "South Africa", code: "ZA", flag: "🇿🇦", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Has 11 official languages — more than any other country in Africa"
    },
    {
        name: "South Sudan", code: "SS", flag: "🇸🇸", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "The world's youngest country, gaining independence from Sudan in 2011 after a long civil war"
    },
    {
        name: "Sudan", code: "SD", flag: "🇸🇩", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "Has more ancient pyramids than Egypt — over 200 Nubian pyramids are scattered across its desert landscape"
    },
    {
        name: "Tanzania", code: "TZ", flag: "🇹🇿", primaryLanguage: "Swahili", hasVoice: true, continent: "Africa",
        fact: "Home to Kilimanjaro (Africa's highest peak), the Serengeti, and the Ngorongoro Crater — a UNESCO world heritage site"
    },
    {
        name: "Togo", code: "TG", flag: "🇹🇬", primaryLanguage: "French", hasVoice: true, continent: "Africa",
        fact: "One of Africa's narrowest countries — at its slimmest point only 115 km wide from east to west"
    },
    {
        name: "Tunisia", code: "TN", flag: "🇹🇳", primaryLanguage: "Arabic", hasVoice: true, continent: "Africa",
        fact: "Ancient Carthage — Rome's greatest rival for dominance of the Mediterranean — was located here"
    },
    {
        name: "Uganda", code: "UG", flag: "🇺🇬", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Uganda is home to half the world's remaining mountain gorilla population, found in Bwindi Impenetrable Forest"
    },
    {
        name: "Zambia", code: "ZM", flag: "🇿🇲", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Victoria Falls, on the Zambia-Zimbabwe border, creates the world's largest sheet of falling water"
    },
    {
        name: "Zimbabwe", code: "ZW", flag: "🇿🇼", primaryLanguage: "English", hasVoice: true, continent: "Africa",
        fact: "Has 16 official languages — the second-most of any country in the world after Bolivia"
    },

    // ════════════════════════════════════════════════════════
    // EUROPE — 44 countries, 38 supported
    // ════════════════════════════════════════════════════════

    {
        name: "Albania", code: "AL", flag: "🇦🇱", primaryLanguage: "Albanian", hasVoice: false, continent: "Europe",
        fact: "Albanian forms its own branch in the Indo-European family — unrelated to any neighboring language"
    },
    {
        name: "Andorra", code: "AD", flag: "🇦🇩", primaryLanguage: "Catalan", hasVoice: true, continent: "Europe",
        fact: "The only country in the world where Catalan is the sole official language, nestled between France and Spain"
    },
    {
        name: "Austria", code: "AT", flag: "🇦🇹", primaryLanguage: "German", hasVoice: true, continent: "Europe",
        fact: "Austrian German contains over 200 unique words not used in standard German — it's practically its own dialect"
    },
    {
        name: "Belarus", code: "BY", flag: "🇧🇾", primaryLanguage: "Belarusian", hasVoice: true, continent: "Europe",
        fact: "Surprisingly, Russian is used more widely day-to-day than Belarusian, the nation's own language"
    },
    {
        name: "Belgium", code: "BE", flag: "🇧🇪", primaryLanguage: "Dutch", hasVoice: true, continent: "Europe",
        fact: "Has three official languages (Dutch, French, German) and hosts the headquarters of NATO and the EU"
    },
    {
        name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦", primaryLanguage: "Bosnian", hasVoice: false, continent: "Europe",
        fact: "Bosnian, Croatian, and Serbian are spoken here — linguists debate whether they're the same language or three distinct ones"
    },
    {
        name: "Bulgaria", code: "BG", flag: "🇧🇬", primaryLanguage: "Bulgarian", hasVoice: true, continent: "Europe",
        fact: "The Cyrillic alphabet was actually created in Bulgaria in the 9th century — not in Russia as widely assumed"
    },
    {
        name: "Croatia", code: "HR", flag: "🇭🇷", primaryLanguage: "Croatian", hasVoice: true, continent: "Europe",
        fact: "The necktie was invented here — 'cravat' comes from the French word for Croatian, 'Croate'"
    },
    {
        name: "Cyprus", code: "CY", flag: "🇨🇾", primaryLanguage: "Greek", hasVoice: true, continent: "Europe",
        fact: "The only EU member state with a divided capital — Nicosia is split between Greek and Turkish Cypriot zones"
    },
    {
        name: "Czech Republic", code: "CZ", flag: "🇨🇿", primaryLanguage: "Czech", hasVoice: true, continent: "Europe",
        fact: "The letter 'ř' is unique to Czech — a sound so complex that even neighboring Slovaks struggle to pronounce it"
    },
    {
        name: "Denmark", code: "DK", flag: "🇩🇰", primaryLanguage: "Danish", hasVoice: true, continent: "Europe",
        fact: "Danish numbers are built on a base-20 system — 70 literally means 'three and a half times twenty'"
    },
    {
        name: "Estonia", code: "EE", flag: "🇪🇪", primaryLanguage: "Estonian", hasVoice: true, continent: "Europe",
        fact: "Estonian has 14 grammatical cases and was the first country to use internet voting in a national election"
    },
    {
        name: "Finland", code: "FI", flag: "🇫🇮", primaryLanguage: "Finnish", hasVoice: true, continent: "Europe",
        fact: "Finnish has 15 grammatical cases — the same noun can take 15 completely different forms"
    },
    {
        name: "France", code: "FR", flag: "🇫🇷", primaryLanguage: "French", hasVoice: true, continent: "Europe",
        fact: "French was the language of international diplomacy for over 300 years, until English took over after World War I"
    },
    {
        name: "Germany", code: "DE", flag: "🇩🇪", primaryLanguage: "German", hasVoice: true, continent: "Europe",
        fact: "German can create arbitrarily long compound words — one documented word contains 80 letters"
    },
    {
        name: "Greece", code: "GR", flag: "🇬🇷", primaryLanguage: "Greek", hasVoice: true, continent: "Europe",
        fact: "The Greek alphabet was the first writing system to include vowels — the direct ancestor of Latin and Cyrillic scripts"
    },
    {
        name: "Hungary", code: "HU", flag: "🇭🇺", primaryLanguage: "Hungarian", hasVoice: true, continent: "Europe",
        fact: "Hungarian is completely unrelated to its neighbors' languages — it belongs to the Finno-Ugric family from Siberia"
    },
    {
        name: "Iceland", code: "IS", flag: "🇮🇸", primaryLanguage: "Icelandic", hasVoice: false, continent: "Europe",
        fact: "Icelanders can still read 800-year-old medieval sagas with ease — the language has barely changed since Viking times"
    },
    {
        name: "Ireland", code: "IE", flag: "🇮🇪", primaryLanguage: "Irish", hasVoice: true, continent: "Europe",
        fact: "Irish (Gaelic) is the first official language, yet English is spoken by over 98% of the population daily"
    },
    {
        name: "Italy", code: "IT", flag: "🇮🇹", primaryLanguage: "Italian", hasVoice: true, continent: "Europe",
        fact: "Standard Italian was shaped by the Tuscan dialect — largely due to Dante's 14th-century masterpiece, the Divine Comedy"
    },
    {
        name: "Kosovo", code: "XK", flag: "🇽🇰", primaryLanguage: "Albanian", hasVoice: false, continent: "Europe",
        fact: "One of the world's newest countries, declaring independence in 2008 — still not recognized by all UN members"
    },
    {
        name: "Latvia", code: "LV", flag: "🇱🇻", primaryLanguage: "Latvian", hasVoice: true, continent: "Europe",
        fact: "Latvian is one of only two surviving Baltic languages, descended from ancient Proto-Baltic spoken 3,000 years ago"
    },
    {
        name: "Liechtenstein", code: "LI", flag: "🇱🇮", primaryLanguage: "German", hasVoice: true, continent: "Europe",
        fact: "One of only two doubly-landlocked countries — and the world's largest producer of false teeth"
    },
    {
        name: "Lithuania", code: "LT", flag: "🇱🇹", primaryLanguage: "Lithuanian", hasVoice: true, continent: "Europe",
        fact: "Lithuanian is the most archaic living Indo-European language — linguists use it to study ancient Proto-Indo-European"
    },
    {
        name: "Luxembourg", code: "LU", flag: "🇱🇺", primaryLanguage: "Luxembourgish", hasVoice: true, continent: "Europe",
        fact: "Luxembourgish only became an official national language in 1984 — before that only French and German were official"
    },
    {
        name: "Malta", code: "MT", flag: "🇲🇹", primaryLanguage: "Maltese", hasVoice: false, continent: "Europe",
        fact: "Maltese is the only Semitic language written in Latin script — a unique fusion of Arabic, Italian, and English"
    },
    {
        name: "Moldova", code: "MD", flag: "🇲🇩", primaryLanguage: "Romanian", hasVoice: true, continent: "Europe",
        fact: "Has the world's largest wine cellar — Mileștii Mici has 200 km of tunnels holding 2 million bottles"
    },
    {
        name: "Monaco", code: "MC", flag: "🇲🇨", primaryLanguage: "French", hasVoice: true, continent: "Europe",
        fact: "The world's most densely populated country and second-smallest — at just 2 km², smaller than Central Park"
    },
    {
        name: "Montenegro", code: "ME", flag: "🇲🇪", primaryLanguage: "Montenegrin", hasVoice: false, continent: "Europe",
        fact: "Its name literally means 'Black Mountain' in Italian, referring to the dark appearance of Mount Lovćen"
    },
    {
        name: "Netherlands", code: "NL", flag: "🇳🇱", primaryLanguage: "Dutch", hasVoice: true, continent: "Europe",
        fact: "About 23% of the Netherlands sits below sea level — the country engineered an entire landscape out of the ocean"
    },
    {
        name: "North Macedonia", code: "MK", flag: "🇲🇰", primaryLanguage: "Macedonian", hasVoice: true, continent: "Europe",
        fact: "Macedonian was the last South Slavic language to be standardized, only in 1945"
    },
    {
        name: "Norway", code: "NO", flag: "🇳🇴", primaryLanguage: "Norwegian", hasVoice: true, continent: "Europe",
        fact: "Has two official written forms of Norwegian — Bokmål and Nynorsk — and every student must learn both"
    },
    {
        name: "Poland", code: "PL", flag: "🇵🇱", primaryLanguage: "Polish", hasVoice: true, continent: "Europe",
        fact: "The Polish alphabet has 32 letters including 9 unique characters — the combination 'szcz' is a single sound"
    },
    {
        name: "Portugal", code: "PT", flag: "🇵🇹", primaryLanguage: "Portuguese", hasVoice: true, continent: "Europe",
        fact: "Portuguese is spoken on six continents and is the 6th most-spoken language in the world by native speakers"
    },
    {
        name: "Romania", code: "RO", flag: "🇷🇴", primaryLanguage: "Romanian", hasVoice: true, continent: "Europe",
        fact: "Romanian is the closest living language to ancient Latin — more conservative than Italian, French, or Spanish"
    },
    {
        name: "Russia", code: "RU", flag: "🇷🇺", primaryLanguage: "Russian", hasVoice: true, continent: "Europe",
        fact: "Russian has no grammatical articles — there's no word for 'the' or 'a', yet speakers understand context perfectly"
    },
    {
        name: "San Marino", code: "SM", flag: "🇸🇲", primaryLanguage: "Italian", hasVoice: true, continent: "Europe",
        fact: "Founded in 301 AD, San Marino is the world's oldest surviving republic — it has never been conquered"
    },
    {
        name: "Serbia", code: "RS", flag: "🇷🇸", primaryLanguage: "Serbian", hasVoice: true, continent: "Europe",
        fact: "The only European language that officially uses two alphabets interchangeably — both Cyrillic and Latin"
    },
    {
        name: "Slovakia", code: "SK", flag: "🇸🇰", primaryLanguage: "Slovak", hasVoice: true, continent: "Europe",
        fact: "Slovak is so mutually intelligible with other Slavic languages that it is sometimes called the 'Slavic Esperanto'"
    },
    {
        name: "Slovenia", code: "SI", flag: "🇸🇮", primaryLanguage: "Slovenian", hasVoice: true, continent: "Europe",
        fact: "Slovenian has a rare 'dual' number — special grammatical forms exist specifically for referring to exactly two things"
    },
    {
        name: "Spain", code: "ES", flag: "🇪🇸", primaryLanguage: "Spanish", hasVoice: true, continent: "Europe",
        fact: "Spanish has more native speakers than English worldwide — over 500 million people across 20 countries"
    },
    {
        name: "Sweden", code: "SE", flag: "🇸🇪", primaryLanguage: "Swedish", hasVoice: true, continent: "Europe",
        fact: "Swedish has pitch accent — the same word spoken with different melodies can have completely different meanings"
    },
    {
        name: "Switzerland", code: "CH", flag: "🇨🇭", primaryLanguage: "German", hasVoice: true, continent: "Europe",
        fact: "Has four official languages (German, French, Italian, Romansh) — its country code CH comes from Latin 'Confoederatio Helvetica'"
    },
    {
        name: "Ukraine", code: "UA", flag: "🇺🇦", primaryLanguage: "Ukrainian", hasVoice: true, continent: "Europe",
        fact: "Ukrainian is highly phonetic — unlike English, every letter is always pronounced the same way regardless of context"
    },
    {
        name: "United Kingdom", code: "GB", flag: "🇬🇧", primaryLanguage: "English", hasVoice: true, continent: "Europe",
        fact: "English has more words than any other language — over 250,000 distinct words in active use"
    },
    {
        name: "Vatican City", code: "VA", flag: "🇻🇦", primaryLanguage: "Italian", hasVoice: true, continent: "Europe",
        fact: "Latin is still the official language — the ATM machines at the Vatican offer instructions in Latin"
    },

    // ════════════════════════════════════════════════════════
    // ASIA — 49 countries, 38 supported
    // ════════════════════════════════════════════════════════

    {
        name: "Afghanistan", code: "AF", flag: "🇦🇫", primaryLanguage: "Pashto", hasVoice: true, continent: "Asia",
        fact: "Pashto is one of the oldest Indo-European languages, with a rich literary tradition stretching over 1,000 years"
    },
    {
        name: "Armenia", code: "AM", flag: "🇦🇲", primaryLanguage: "Armenian", hasVoice: false, continent: "Asia",
        fact: "The Armenian alphabet, created in 405 AD, has its own unique branch of the script family — used continuously for 1,600 years"
    },
    {
        name: "Azerbaijan", code: "AZ", flag: "🇦🇿", primaryLanguage: "Azerbaijani", hasVoice: true, continent: "Asia",
        fact: "Known as the 'Land of Fire' — natural gas vents have been burning here for millennia, inspiring ancient Zoroastrian fire worship"
    },
    {
        name: "Bahrain", code: "BH", flag: "🇧🇭", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "Believed to be the location of the ancient paradise of Dilmun, mentioned in the world's oldest written story, the Epic of Gilgamesh"
    },
    {
        name: "Bangladesh", code: "BD", flag: "🇧🇩", primaryLanguage: "Bengali", hasVoice: true, continent: "Asia",
        fact: "The Bengali Language Movement of 1952 directly inspired February 21st to become International Mother Language Day"
    },
    {
        name: "Bhutan", code: "BT", flag: "🇧🇹", primaryLanguage: "Dzongkha", hasVoice: false, continent: "Asia",
        fact: "The only country in the world that measures progress by Gross National Happiness instead of GDP"
    },
    {
        name: "Brunei", code: "BN", flag: "🇧🇳", primaryLanguage: "Malay", hasVoice: true, continent: "Asia",
        fact: "One of only two countries in the world where the sale and public consumption of alcohol is completely illegal"
    },
    {
        name: "Cambodia", code: "KH", flag: "🇰🇭", primaryLanguage: "Khmer", hasVoice: false, continent: "Asia",
        fact: "The Khmer alphabet has 74 letters — it holds the Guinness World Record as the world's largest alphabet"
    },
    {
        name: "China", code: "CN", flag: "🇨🇳", primaryLanguage: "Mandarin", hasVoice: true, continent: "Asia",
        fact: "Chinese characters have been in continuous use for over 3,400 years — the longest unbroken writing tradition on Earth"
    },
    {
        name: "Georgia", code: "GE", flag: "🇬🇪", primaryLanguage: "Georgian", hasVoice: true, continent: "Asia",
        fact: "Considered the birthplace of wine — archaeological evidence of winemaking here dates back 8,000 years"
    },
    {
        name: "India", code: "IN", flag: "🇮🇳", primaryLanguage: "Hindi", hasVoice: true, continent: "Asia",
        fact: "Has 22 constitutionally recognized languages and over 19,500 dialects and mother tongues spoken across its states"
    },
    {
        name: "Indonesia", code: "ID", flag: "🇮🇩", primaryLanguage: "Indonesian", hasVoice: true, continent: "Asia",
        fact: "The world's largest archipelago — made up of over 17,000 islands spanning more than 5,000 km across the ocean"
    },
    {
        name: "Iran", code: "IR", flag: "🇮🇷", primaryLanguage: "Persian", hasVoice: true, continent: "Asia",
        fact: "Persian (Farsi) poetry is considered among the world's greatest — Rumi, Hafez, and Omar Khayyam all wrote in Farsi"
    },
    {
        name: "Iraq", code: "IQ", flag: "🇮🇶", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "Ancient Mesopotamia, in modern-day Iraq, is where writing was invented — the cuneiform script, around 3400 BC"
    },
    {
        name: "Israel", code: "IL", flag: "🇮🇱", primaryLanguage: "Hebrew", hasVoice: true, continent: "Asia",
        fact: "Hebrew was revived as a spoken language after 1,700 years of dormancy — the only successfully revived dead language in history"
    },
    {
        name: "Japan", code: "JP", flag: "🇯🇵", primaryLanguage: "Japanese", hasVoice: true, continent: "Asia",
        fact: "Japan has three writing systems used simultaneously — hiragana, katakana, and kanji — often in the same sentence"
    },
    {
        name: "Jordan", code: "JO", flag: "🇯🇴", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "Petra, carved directly into rose-red cliff faces over 2,000 years ago, is one of the New Seven Wonders of the World"
    },
    {
        name: "Kazakhstan", code: "KZ", flag: "🇰🇿", primaryLanguage: "Kazakh", hasVoice: true, continent: "Asia",
        fact: "The world's largest landlocked country — and Kazakhstan is slowly switching its alphabet from Cyrillic to Latin"
    },
    {
        name: "Kuwait", code: "KW", flag: "🇰🇼", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "One of the oldest seafaring cultures in the Gulf — Kuwaiti dhow boats have been sailing trade routes for centuries"
    },
    {
        name: "Kyrgyzstan", code: "KG", flag: "🇰🇬", primaryLanguage: "Kyrgyz", hasVoice: false, continent: "Asia",
        fact: "The Epic of Manas is the world's longest epic poem at over 500,000 lines — 20 times the length of the Iliad and Odyssey combined"
    },
    {
        name: "Laos", code: "LA", flag: "🇱🇦", primaryLanguage: "Lao", hasVoice: false, continent: "Asia",
        fact: "The most heavily bombed country per capita in history — more bombs were dropped here in 9 years than in all of World War II"
    },
    {
        name: "Lebanon", code: "LB", flag: "🇱🇧", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "The ancient Phoenicians of Lebanon invented the first true alphabet — the ancestor of Greek, Latin, Arabic, and Hebrew scripts"
    },
    {
        name: "Malaysia", code: "MY", flag: "🇲🇾", primaryLanguage: "Malay", hasVoice: true, continent: "Asia",
        fact: "Contains one of the world's oldest rainforests — Taman Negara is over 130 million years old"
    },
    {
        name: "Maldives", code: "MV", flag: "🇲🇻", primaryLanguage: "Dhivehi", hasVoice: true, continent: "Asia",
        fact: "The lowest-lying country on Earth — its highest natural point is just 2.4 meters above sea level"
    },
    {
        name: "Mongolia", code: "MN", flag: "🇲🇳", primaryLanguage: "Mongolian", hasVoice: false, continent: "Asia",
        fact: "The least densely populated country in the world — with an average of just 2 people per square kilometer"
    },
    {
        name: "Myanmar", code: "MM", flag: "🇲🇲", primaryLanguage: "Burmese", hasVoice: false, continent: "Asia",
        fact: "One of only three countries in the world that has not officially adopted the metric system for everyday use"
    },
    {
        name: "Nepal", code: "NP", flag: "🇳🇵", primaryLanguage: "Nepali", hasVoice: true, continent: "Asia",
        fact: "The only country in the world with a non-rectangular flag — it consists of two stacked triangular pennants"
    },
    {
        name: "North Korea", code: "KP", flag: "🇰🇵", primaryLanguage: "Korean", hasVoice: false, continent: "Asia",
        fact: "North Korean workers have their own standard time zone — Pyongyang Time (UTC+8:30) was created in 2015 to differ from Japan"
    },
    {
        name: "Oman", code: "OM", flag: "🇴🇲", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "Once commanded a maritime empire stretching from East Africa to India — Omani sailors were among the world's finest"
    },
    {
        name: "Pakistan", code: "PK", flag: "🇵🇰", primaryLanguage: "Urdu", hasVoice: true, continent: "Asia",
        fact: "Home to K2, the world's second-highest mountain — considered far deadlier to climb than Everest"
    },
    {
        name: "Philippines", code: "PH", flag: "🇵🇭", primaryLanguage: "Filipino", hasVoice: true, continent: "Asia",
        fact: "Home to 175 distinct living languages — Filipino (Tagalog) and English are its two official languages"
    },
    {
        name: "Qatar", code: "QA", flag: "🇶🇦", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "Consistently ranks at or near the top of the world for GDP per capita, largely due to its massive natural gas reserves"
    },
    {
        name: "Saudi Arabia", code: "SA", flag: "🇸🇦", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "Arabic has over 12 million possible word forms — and is the only official language of the world's largest oil exporter"
    },
    {
        name: "Singapore", code: "SG", flag: "🇸🇬", primaryLanguage: "English", hasVoice: true, continent: "Asia",
        fact: "Has four official languages (English, Mandarin, Malay, Tamil) and its own unique English creole called Singlish"
    },
    {
        name: "South Korea", code: "KR", flag: "🇰🇷", primaryLanguage: "Korean", hasVoice: true, continent: "Asia",
        fact: "King Sejong created the Hangul alphabet in 1443 so that ordinary people could read — he designed it as a scientific system"
    },
    {
        name: "Sri Lanka", code: "LK", flag: "🇱🇰", primaryLanguage: "Sinhala", hasVoice: true, continent: "Asia",
        fact: "Known as the 'Pearl of the Indian Ocean' and one of the world's oldest cinnamon producers — over 2,000 years of history"
    },
    {
        name: "Syria", code: "SY", flag: "🇸🇾", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "Damascus is one of the world's oldest continuously inhabited cities — people have lived there for at least 11,000 years"
    },
    {
        name: "Taiwan", code: "TW", flag: "🇹🇼", primaryLanguage: "Mandarin", hasVoice: true, continent: "Asia",
        fact: "Has more convenience stores per square kilometer than almost anywhere else on Earth"
    },
    {
        name: "Tajikistan", code: "TJ", flag: "🇹🇯", primaryLanguage: "Tajik", hasVoice: false, continent: "Asia",
        fact: "Over 90% of its territory is mountainous — making it the most mountainous country in Central Asia"
    },
    {
        name: "Thailand", code: "TH", flag: "🇹🇭", primaryLanguage: "Thai", hasVoice: true, continent: "Asia",
        fact: "The only country in Southeast Asia that was never colonized by a European power"
    },
    {
        name: "Timor-Leste", code: "TL", flag: "🇹🇱", primaryLanguage: "Tetum", hasVoice: true, continent: "Asia",
        fact: "One of the youngest nations — gained independence in 2002 after 24 years of brutal Indonesian occupation"
    },
    {
        name: "Turkey", code: "TR", flag: "🇹🇷", primaryLanguage: "Turkish", hasVoice: true, continent: "Asia",
        fact: "In 1928, Turkey switched from Arabic script to Latin script practically overnight — an entire country learned a new alphabet"
    },
    {
        name: "Turkmenistan", code: "TM", flag: "🇹🇲", primaryLanguage: "Turkmen", hasVoice: false, continent: "Asia",
        fact: "Home to the 'Gates of Hell' — a natural gas crater that has been burning continuously since it was accidentally ignited in 1971"
    },
    {
        name: "United Arab Emirates", code: "AE", flag: "🇦🇪", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "Over 200 nationalities live in the UAE — fewer than 15% of residents are Emirati citizens"
    },
    {
        name: "Uzbekistan", code: "UZ", flag: "🇺🇿", primaryLanguage: "Uzbek", hasVoice: false, continent: "Asia",
        fact: "Home to Samarkand — one of the oldest continuously inhabited cities in the world, covering the ancient Silk Road"
    },
    {
        name: "Vietnam", code: "VN", flag: "🇻🇳", primaryLanguage: "Vietnamese", hasVoice: true, continent: "Asia",
        fact: "Vietnamese is the only major East Asian language written in a Latin-based script — the result of French colonial influence"
    },
    {
        name: "Yemen", code: "YE", flag: "🇾🇪", primaryLanguage: "Arabic", hasVoice: true, continent: "Asia",
        fact: "Coffee was first cultivated for drinking in Yemen — the port of Mocha gave its name to the chocolate-coffee flavor we know today"
    },

    // ════════════════════════════════════════════════════════
    // AMERICAS — North America 23 countries (22 supported)
    //             South America 12 countries (12 supported)
    // ════════════════════════════════════════════════════════

    // ── North America ──
    {
        name: "United States", code: "US", flag: "🇺🇸", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "The US has no official national language — English is dominant but never legally required"
    },
    {
        name: "Canada", code: "CA", flag: "🇨🇦", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "Has the world's longest coastline at over 202,000 km — longer than the next four longest countries combined"
    },
    {
        name: "Mexico", code: "MX", flag: "🇲🇽", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Has the largest number of Spanish speakers of any country in the world — over 130 million native speakers"
    },
    {
        name: "Guatemala", code: "GT", flag: "🇬🇹", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "The Maya civilization originated here — 21 distinct Mayan languages are still spoken by millions of Guatemalans"
    },
    {
        name: "Belize", code: "BZ", flag: "🇧🇿", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "The only country in Central America where English is the official language and home to the world's second-largest barrier reef"
    },
    {
        name: "Honduras", code: "HN", flag: "🇭🇳", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Home to the ancient Maya city of Copán, famous for its remarkable 2,500-glyph hieroglyphic stairway"
    },
    {
        name: "El Salvador", code: "SV", flag: "🇸🇻", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "The first country in the world to adopt Bitcoin as legal tender alongside the US dollar"
    },
    {
        name: "Nicaragua", code: "NI", flag: "🇳🇮", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Home to the only freshwater lake in the world that contains oceanic wildlife — sharks and swordfish swim Lake Nicaragua"
    },
    {
        name: "Costa Rica", code: "CR", flag: "🇨🇷", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Abolished its military in 1948 and redirected the funds to education and healthcare — with remarkable results"
    },
    {
        name: "Panama", code: "PA", flag: "🇵🇦", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "The only place on Earth where you can watch the sun rise over the Pacific Ocean and set over the Atlantic"
    },
    {
        name: "Cuba", code: "CU", flag: "🇨🇺", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Achieved a 99.8% literacy rate — one of the highest in the world — through a massive national campaign in 1961"
    },
    {
        name: "Jamaica", code: "JM", flag: "🇯🇲", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "The only country whose flag contains neither red, white, nor blue — it uses gold, black, and green"
    },
    {
        name: "Haiti", code: "HT", flag: "🇭🇹", primaryLanguage: "Haitian Creole", hasVoice: false, continent: "Americas",
        fact: "The world's first Black republic and the first country to abolish slavery permanently, following a successful slave revolution in 1804"
    },
    {
        name: "Dominican Republic", code: "DO", flag: "🇩🇴", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Home to the first permanent European settlement in the Americas — Santo Domingo was founded in 1496"
    },
    {
        name: "Trinidad and Tobago", code: "TT", flag: "🇹🇹", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "Birthplace of the steelpan — the only acoustic musical instrument invented in the 20th century"
    },
    {
        name: "Barbados", code: "BB", flag: "🇧🇧", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "Generally credited with inventing rum as we know it — sugarcane distillation traditions here date to the 1620s"
    },
    {
        name: "Saint Lucia", code: "LC", flag: "🇱🇨", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "The only country in the world named after a woman — Saint Lucy of Syracuse"
    },
    {
        name: "Grenada", code: "GD", flag: "🇬🇩", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "Known as the 'Spice Isle' — a tiny island that produces 20% of the world's nutmeg supply"
    },
    {
        name: "Saint Vincent and the Grenadines", code: "VC", flag: "🇻🇨", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "Several Pirates of the Caribbean films were shot here — its volcanic landscapes became the fictional Isla de Muerta"
    },
    {
        name: "Antigua and Barbuda", code: "AG", flag: "🇦🇬", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "Has a beach for every day of the year — the 365 beaches were originally carved by coral reef systems"
    },
    {
        name: "Dominica", code: "DM", flag: "🇩🇲", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "The only country in the world whose flag features the color purple — represented by its rare Sisserou parrot"
    },
    {
        name: "Guyana", code: "GY", flag: "🇬🇾", primaryLanguage: "English", hasVoice: true, continent: "Americas",
        fact: "The only English-speaking country in South America — and home to Kaieteur Falls, five times taller than Niagara"
    },
    {
        name: "Suriname", code: "SR", flag: "🇸🇷", primaryLanguage: "Dutch", hasVoice: true, continent: "Americas",
        fact: "The smallest sovereign country in South America and the only one where Dutch is the official language"
    },

    // ── South America (all 12 supported) ──
    {
        name: "Brazil", code: "BR", flag: "🇧🇷", primaryLanguage: "Portuguese", hasVoice: true, continent: "Americas",
        fact: "Home to the largest Japanese diaspora outside Japan — over 1.5 million Japanese Brazilians"
    },
    {
        name: "Colombia", code: "CO", flag: "🇨🇴", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "The only South American country with coastlines on both the Pacific and Atlantic (Caribbean) oceans"
    },
    {
        name: "Venezuela", code: "VE", flag: "🇻🇪", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Angel Falls — the world's highest uninterrupted waterfall at 979 meters — is 15 times the height of Niagara Falls"
    },
    {
        name: "Peru", code: "PE", flag: "🇵🇪", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "The stones of Machu Picchu were fitted together so precisely that a credit card cannot fit between them — with no mortar used"
    },
    {
        name: "Ecuador", code: "EC", flag: "🇪🇨", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Ecuador's Chimborazo is actually the farthest point from Earth's center — not Mount Everest — due to the planet's equatorial bulge"
    },
    {
        name: "Bolivia", code: "BO", flag: "🇧🇴", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Has 37 official languages — the most of any country in the Americas — reflecting its extraordinary indigenous diversity"
    },
    {
        name: "Chile", code: "CL", flag: "🇨🇱", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Stretches 4,300 km from north to south but averages only 177 km wide — the world's most elongated country"
    },
    {
        name: "Argentina", code: "AR", flag: "🇦🇷", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "Buenos Aires's Avenida 9 de Julio is considered the world's widest avenue — spanning 16 lanes of traffic"
    },
    {
        name: "Paraguay", code: "PY", flag: "🇵🇾", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "One of the only countries in the Americas where more people speak an indigenous language (Guaraní) than the colonial one"
    },
    {
        name: "Uruguay", code: "UY", flag: "🇺🇾", primaryLanguage: "Spanish", hasVoice: true, continent: "Americas",
        fact: "The first country in South America to legalize same-sex marriage and host the FIFA World Cup (1930)"
    },

    // ════════════════════════════════════════════════════════
    // OCEANIA — 14 countries, 14 supported
    // ════════════════════════════════════════════════════════

    {
        name: "Australia", code: "AU", flag: "🇦🇺", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "Home to 250+ indigenous language groups — representing extraordinary linguistic diversity across the continent"
    },
    {
        name: "New Zealand", code: "NZ", flag: "🇳🇿", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "Māori was the world's first indigenous language to be declared an official language by a modern nation, in 1987"
    },
    {
        name: "Papua New Guinea", code: "PG", flag: "🇵🇬", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "The most linguistically diverse country on Earth — home to over 840 living languages, or 12% of all the world's languages"
    },
    {
        name: "Fiji", code: "FJ", flag: "🇫🇯", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "Has three official languages (English, Fijian, and Hindi) in a nation of fewer than a million people"
    },
    {
        name: "Solomon Islands", code: "SB", flag: "🇸🇧", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "Over 70 distinct languages are spoken among fewer than 700,000 people"
    },
    {
        name: "Vanuatu", code: "VU", flag: "🇻🇺", primaryLanguage: "French", hasVoice: true, continent: "Oceania",
        fact: "Has the highest language density of any nation — over 100 languages for a population of just 300,000"
    },
    {
        name: "Samoa", code: "WS", flag: "🇼🇸", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "One of the first countries on Earth to see each new day's sunrise — situated just west of the Date Line"
    },
    {
        name: "Kiribati", code: "KI", flag: "🇰🇮", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "The only country in the world that spans all four hemispheres and straddles the International Date Line"
    },
    {
        name: "Tonga", code: "TO", flag: "🇹🇴", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "The only Pacific island nation never formally colonized by a European power"
    },
    {
        name: "Micronesia", code: "FM", flag: "🇫🇲", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "Consists of over 600 islands scattered across 2,900 km of the western Pacific Ocean"
    },
    {
        name: "Palau", code: "PW", flag: "🇵🇼", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "Created the world's first shark sanctuary in 2009, protecting 600,000 km² of ocean from shark fishing"
    },
    {
        name: "Marshall Islands", code: "MH", flag: "🇲🇭", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "Bikini Atoll — where the US tested 23 nuclear weapons between 1946–1958 — is now a UNESCO World Heritage Site"
    },
    {
        name: "Tuvalu", code: "TV", flag: "🇹🇻", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "Earns millions of dollars by licensing its '.tv' internet domain to television networks and streaming services worldwide"
    },
    {
        name: "Nauru", code: "NR", flag: "🇳🇷", primaryLanguage: "English", hasVoice: true, continent: "Oceania",
        fact: "The world's smallest republic at just 21 km² — roughly the size of a large airport"
    },
];

// ── Derived constants ──
export const VOICE_SUPPORTED_COUNT = COUNTRIES.filter(c => c.hasVoice).length;
export const TOTAL_COUNTRIES = COUNTRIES.length;
export const CONTINENTS: Continent[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

// ── Voice tier data for the Voices Showcase section ──
export interface VoiceTier {
    name: string;
    provider: string;
    languageCount: number;
    quality: string;
    description: string;
    accentColor: string;
}

export const VOICE_TIERS: VoiceTier[] = [
    {
        name: "Gemini",
        provider: "Google Vertex AI",
        languageCount: 87,
        quality: "Highest",
        description: "Latest AI voices with natural prosody and style control. Supports tone and emotion prompts.",
        accentColor: "#7C3AED",
    },
    {
        name: "Chirp3 HD",
        provider: "Google Cloud TTS",
        languageCount: 53,
        quality: "Premium",
        description: "High-definition, studio-quality voices — the most natural and expressive in the Google stack.",
        accentColor: "#2563EB",
    },
    {
        name: "Neural2",
        provider: "Google Cloud TTS",
        languageCount: 48,
        quality: "Premium",
        description: "Natural, human-like synthesis with Wavenet, Polyglot, and Studio voice models included.",
        accentColor: "#0891B2",
    },
    {
        name: "Standard",
        provider: "Google Cloud TTS",
        languageCount: 60,
        quality: "Standard",
        description: "Clear, reliable speech in 60 languages. Fast and cost-effective for high-volume needs.",
        accentColor: "#059669",
    },
    {
        name: "ElevenLabs v3",
        provider: "ElevenLabs",
        languageCount: 75,
        quality: "Ultra-Premium",
        description: "State-of-the-art voice cloning and multilingual synthesis with the widest emotional range.",
        accentColor: "#DC2626",
    },
    {
        name: "ElevenLabs Flash",
        provider: "ElevenLabs",
        languageCount: 29,
        quality: "Fast",
        description: "Ultra-low-latency voice synthesis built for real-time streaming applications.",
        accentColor: "#D97706",
    },
];
