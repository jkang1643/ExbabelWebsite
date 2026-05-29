'use client';

import React from 'react';

export default function LiveCaptionsGraphic() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-white rounded-[24px] border border-[rgba(234,214,255,0.28)] shadow-[0_12px_45px_rgba(234,214,255,0.22)]">
      <style dangerouslySetInnerHTML={{__html: `
        .lc-aurora-bg {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background-image: radial-gradient(circle at 50% 50%, rgba(234, 214, 255, 0.25), transparent 60%);
            z-index: 0;
        }
        .lc-video-box {
            width: 100%; max-width: 440px; height: 280px;
            background: #0B1220;
            border-radius: 24px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 30px 110px rgba(214, 245, 255, 0.3);
            border: 1px solid rgba(234, 214, 255, 0.28);
            z-index: 10;
        }
        .lc-caption-bar {
            position: absolute;
            bottom: 20px; left: 20px; right: 20px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 12px;
            text-align: center;
            color: white;
            font-weight: 500;
        }
        .lc-text-reveal {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            animation: lc-typing 3s steps(30, end) infinite;
        }
        .lc-waveform {
            position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);
            display: flex; gap: 4px; height: 40px; align-items: center;
        }
        .lc-bar {
            width: 6px; background: #D6F5FF; border-radius: 4px;
            animation: lc-bounce 1s infinite alternate;
        }
        .lc-bar:nth-child(2) { animation-delay: 0.2s; background: #EAD6FF; }
        .lc-bar:nth-child(3) { animation-delay: 0.4s; background: #FFD6E5; }
        .lc-bar:nth-child(4) { animation-delay: 0.1s; }
        .lc-bar:nth-child(5) { animation-delay: 0.3s; background: #EAD6FF; }

        @keyframes lc-bounce {
            0% { height: 10px; }
            100% { height: 40px; }
        }
        @keyframes lc-typing {
            0% { width: 0; }
            50% { width: 100%; }
            100% { width: 100%; }
        }
      `}} />
      <div className="lc-aurora-bg"></div>
      
      <div className="lc-video-box flex flex-col items-center justify-center">
          <div className="lc-waveform">
              <div className="lc-bar"></div>
              <div className="lc-bar"></div>
              <div className="lc-bar"></div>
              <div className="lc-bar"></div>
              <div className="lc-bar"></div>
          </div>
          <div className="lc-caption-bar">
              <span className="lc-text-reveal">Bienvenidos a nuestra iglesia</span>
          </div>
      </div>
    </div>
  );
}
