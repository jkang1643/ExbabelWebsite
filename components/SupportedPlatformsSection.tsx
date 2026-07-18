'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecorativeWisp from '@/components/DecorativeWisp';

const POPULAR_PLATFORMS = [
  { label: 'YouTube', domain: 'youtube.com' },
  { label: 'Twitch', domain: 'twitch.tv' },
  { label: 'Facebook', domain: 'facebook.com' },
  { label: 'Vimeo', domain: 'vimeo.com' },
  { label: 'X (Twitter)', domain: 'x.com' },
  { label: 'Instagram', domain: 'instagram.com' },
  { label: 'LinkedIn', domain: 'linkedin.com' },
  { label: 'TikTok', domain: 'tiktok.com' },
  { label: 'Reddit', domain: 'reddit.com' },
  { label: 'BBC', domain: 'bbc.co.uk' },
  { label: 'CNN', domain: 'cnn.com' },
  { label: 'ESPN', domain: 'espn.com' },
  { label: 'Fox News', domain: 'foxnews.com' },
  { label: 'TED', domain: 'ted.com' },
  { label: 'SoundCloud', domain: 'soundcloud.com' },
  { label: 'Bloomberg', domain: 'bloomberg.com' },
  { label: 'Crunchyroll', domain: 'crunchyroll.com' },
  { label: 'TwitCasting', domain: 'twitcasting.tv' },
];

const EXTRA_PLATFORMS = [
    { label: '17LIVE', domain: '17.live' },
    { label: '3sat', domain: '3sat.de' },
    { label: '7plus', domain: '7plus.com.au' },
    { label: '9GAG', domain: '9gag.com' },
    { label: '9Now', domain: '9now.com.au' },
    { label: 'A&E', domain: 'aetv.com' },
    { label: 'ABC Australia', domain: 'abc.net.au' },
    { label: 'ABC News', domain: 'abcnews.go.com' },
    { label: 'AbemaTV', domain: 'abema.tv' },
    { label: 'Acast', domain: 'acast.com' },
    { label: 'AcFun', domain: 'acfun.cn' },
    { label: 'Adult Swim', domain: 'adultswim.com' },
    { label: 'Al Jazeera', domain: 'aljazeera.com' },
    { label: 'Allociné', domain: 'allocine.fr' },
    { label: 'AMC', domain: 'amc.com' },
    { label: 'Angel Studios', domain: 'angel.com' },
    { label: 'Animal Planet', domain: 'animalplanet.com' },
    { label: 'Apple Podcasts', domain: 'podcasts.apple.com' },
    { label: 'Apple Trailers', domain: 'trailers.apple.com' },
    { label: 'Archive.org', domain: 'archive.org' },
    { label: 'ARD', domain: 'ard.de' },
    { label: 'Arte', domain: 'arte.tv' },
    { label: 'Audiomack', domain: 'audiomack.com' },
    { label: 'Audius', domain: 'audius.co' },
    { label: 'Bandcamp', domain: 'bandcamp.com' },
    { label: 'BBC', domain: 'bbc.co.uk' },
    { label: 'BET', domain: 'bet.com' },
    { label: 'Bigo Live', domain: 'bigo.tv' },
    { label: 'Bilibili', domain: 'bilibili.com' },
    { label: 'BitChute', domain: 'bitchute.com' },
    { label: 'Bloomberg', domain: 'bloomberg.com' },
    { label: 'Bluesky', domain: 'bsky.app' },
    { label: 'Boston Globe', domain: 'bostonglobe.com' },
    { label: 'CBC', domain: 'cbc.ca' },
    { label: 'CBS News', domain: 'cbsnews.com' },
    { label: 'CNN', domain: 'cnn.com' },
    { label: 'Crunchyroll', domain: 'crunchyroll.com' },
    { label: 'Dailymotion', domain: 'dailymotion.com' },
    { label: 'DAZN', domain: 'dazn.com' },
    { label: 'DW', domain: 'dw.com' },
    { label: 'ESPN', domain: 'espn.com' },
    { label: 'Faithlife', domain: 'faithlife.com' },
    { label: 'Fox News', domain: 'foxnews.com' },
    { label: 'France 24', domain: 'france24.com' },
    { label: 'France TV', domain: 'france.tv' },
    { label: 'History', domain: 'history.com' },
    { label: 'Kaltura', domain: 'kaltura.com' },
    { label: 'Khan Academy', domain: 'khanacademy.org' },
    { label: 'Mixcloud', domain: 'mixcloud.com' },
    { label: 'MSNBC', domain: 'msnbc.com' },
    { label: 'NBC News', domain: 'nbcnews.com' },
    { label: 'NHK', domain: 'nhk.or.jp' },
    { label: 'NRK', domain: 'nrk.no' },
    { label: 'Odysee', domain: 'odysee.com' },
    { label: 'Radio Canada', domain: 'ici.radio-canada.ca' },
    { label: 'RAI', domain: 'rai.it' },
    { label: 'Red Bull TV', domain: 'redbull.com' },
    { label: 'Reddit', domain: 'reddit.com' },
    { label: 'RightNow Media', domain: 'rightnowmedia.org' },
    { label: 'Rokfin', domain: 'rokfin.com' },
    { label: 'Rotten Tomatoes', domain: 'rottentomatoes.com' },
    { label: 'RT', domain: 'rt.com' },
    { label: 'RTÉ', domain: 'rte.ie' },
    { label: 'RTP', domain: 'rtp.pt' },
    { label: 'RTVE', domain: 'rtve.es' },
    { label: 'Rutube', domain: 'rutube.ru' },
    { label: 'SBS Australia', domain: 'sbs.com.au' },
    { label: 'Science Channel', domain: 'sciencechannel.com' },
    { label: 'SermonAudio', domain: 'sermonaudio.com' },
    { label: 'SharePoint', domain: 'sharepoint.com' },
    { label: 'Simplecast', domain: 'simplecast.com' },
    { label: 'SlideShare', domain: 'slideshare.net' },
    { label: 'Snapchat', domain: 'snapchat.com' },
    { label: 'SoundCloud', domain: 'soundcloud.com' },
    { label: 'Spiegel', domain: 'spiegel.de' },
    { label: 'Spreaker', domain: 'spreaker.com' },
    { label: 'Steam', domain: 'store.steampowered.com' },
    { label: 'Streamable', domain: 'streamable.com' },
    { label: 'SVT', domain: 'svt.se' },
    { label: 'Syfy', domain: 'syfy.com' },
    { label: 'TED', domain: 'ted.com' },
    { label: 'Telegram', domain: 'telegram.org' },
    { label: 'TF1', domain: 'tf1.fr' },
    { label: 'The Guardian', domain: 'theguardian.com' },
    { label: 'The Sun', domain: 'thesun.co.uk' },
    { label: 'TikTok', domain: 'tiktok.com' },
    { label: 'TLC', domain: 'tlc.com' },
    { label: 'TMZ', domain: 'tmz.com' },
    { label: 'Travel Channel', domain: 'travelchannel.com' },
    { label: 'Triller', domain: 'triller.co' },
    { label: 'Trovo', domain: 'trovo.live' },
    { label: 'Truth Social', domain: 'truthsocial.com' },
    { label: 'Tubi', domain: 'tubitv.com' },
    { label: 'Tumblr', domain: 'tumblr.com' },
    { label: 'TuneIn', domain: 'tunein.com' },
    { label: 'TV2 Denmark', domain: 'tv2.dk' },
    { label: 'TV4 Sweden', domain: 'tv4.se' },
    { label: 'TwitCasting', domain: 'twitcasting.tv' },
    { label: 'Udemy', domain: 'udemy.com' },
    { label: 'UFC', domain: 'ufc.com' },
    { label: 'USA Network', domain: 'usanetwork.com' },
    { label: 'USA Today', domain: 'usatoday.com' },
    { label: 'Vevo', domain: 'vevo.com' },
    { label: 'VH1', domain: 'vh1.com' },
    { label: 'Vidyard', domain: 'vidyard.com' },
    { label: 'VK', domain: 'vk.com' },
    { label: 'Washington Post', domain: 'washingtonpost.com' },
    { label: 'Weibo', domain: 'weibo.com' },
    { label: 'Weverse', domain: 'weverse.io' },
    { label: 'Wikimedia', domain: 'commons.wikimedia.org' },
    { label: 'Wistia', domain: 'wistia.com' },
    { label: 'WWE', domain: 'wwe.com' },
    { label: 'X (Twitter)', domain: 'x.com' },
    { label: 'Yahoo', domain: 'yahoo.com' },
    { label: 'Yandex', domain: 'yandex.ru' },
    { label: 'Youku', domain: 'youku.com' },
    { label: 'ZDF', domain: 'zdf.de' },
    { label: 'Zee5', domain: 'zee5.com' }
];

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.1 }
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function SupportedPlatformsSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="py-24 px-6 relative z-10 bg-white overflow-hidden">
      <DecorativeWisp className="absolute top-0 right-1/4 w-[600px] h-[600px] -z-10 opacity-30 rotate-45" colorPrimary="#EAD6FF" colorSecondary="#D6F5FF" delay={1} />
      
      <motion.div className="max-w-5xl mx-auto" initial="initial" whileInView="whileInView" variants={staggerContainer}>
        <div className="text-center mb-16 space-y-4">
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-base-content tracking-tight" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
            Universal Link Ingestion
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-base-content/70 max-w-2xl mx-auto font-medium">
            Paste almost any URL to restream it directly into Exbabel Live. We natively support over 1,800 different streaming platforms and websites.
          </motion.p>
        </div>

        <motion.div variants={fadeInUp} className="bg-slate-50/50 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 transition-all">
          
          {/* Popular Platforms Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {POPULAR_PLATFORMS.map((p, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-default"
              >
                <img
                  src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=32`}
                  alt={p.label}
                  width="20"
                  height="20"
                  className="rounded-md"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <span className="text-xs font-semibold text-slate-700">{p.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors py-2"
            >
              {showAll ? 'Hide Full List' : 'View All 1,800+ Supported Platforms'}
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {showAll && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden mt-6"
                >
                  <div className="flex flex-wrap gap-2 justify-center max-h-[500px] overflow-y-auto p-2" style={{ scrollbarWidth: 'thin' }}>
                    {EXTRA_PLATFORMS.map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-lg px-2.5 py-1.5 shadow-sm text-[11px] text-gray-500 hover:text-slate-700 transition-colors"
                      >
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=16`}
                          alt={p.label}
                          width="14"
                          height="14"
                          className="rounded-sm opacity-60"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                        <span className="font-medium">{p.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-6 italic font-medium">
                    + hundreds more domains. Universal ingestion powered by yt-dlp.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
