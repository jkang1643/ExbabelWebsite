'use client';

import React from 'react';

export default function UnlimitedLanguagesGraphic() {
  return (
    <div className="relative z-10 w-full h-[400px] flex items-center justify-center overflow-hidden rounded-[24px]">
      <style dangerouslySetInnerHTML={{__html: `
        .ul-aurora-bg {
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
              radial-gradient(circle at 20% 10%, rgba(255, 214, 229, 0.18), transparent 55%),
              radial-gradient(circle at 75% 35%, rgba(234, 214, 255, 0.18), transparent 60%),
              radial-gradient(circle at 60% 85%, rgba(214, 245, 255, 0.16), transparent 60%);
            z-index: 0;
        }
        .ul-orb-center {
            width: 120px;
            height: 120px;
            background: #0B1220;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 1.2rem;
            box-shadow: 0 0 40px rgba(11, 18, 32, 0.2);
            position: relative;
            z-index: 10;
        }
        .ul-orb-lang {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            color: #0B1220;
            box-shadow: 0 12px 45px rgba(234, 214, 255, 0.22);
            animation: ul-float 6s ease-in-out infinite alternate;
            z-index: 10;
        }
        .ul-lang-es { background: #FFD6E5; top: 15%; left: 20%; animation-delay: 0s; }
        .ul-lang-ko { background: #D6F5FF; top: 20%; right: 20%; animation-delay: -1s; }
        .ul-lang-pt { background: #EAD6FF; bottom: 15%; left: 30%; animation-delay: -2s; }
        .ul-lang-fr { background: #FFF7D1; bottom: 20%; right: 30%; animation-delay: -3s; }

        @keyframes ul-float {
            0% { transform: translateY(0px) scale(1); box-shadow: 0 12px 45px rgba(234, 214, 255, 0.22); }
            100% { transform: translateY(-20px) scale(1.05); box-shadow: 0 30px 110px rgba(214, 245, 255, 0.3); }
        }
        
        .ul-pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid #0B1220;
            animation: ul-pulse 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            opacity: 0;
        }
        
        @keyframes ul-pulse {
            0% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(2.5); opacity: 0; }
        }
      `}} />
      <div className="ul-aurora-bg"></div>
      
      <div className="relative w-full h-full flex items-center justify-center">
          <div className="ul-orb-lang ul-lang-es">ES</div>
          <div className="ul-orb-lang ul-lang-ko">KO</div>
          <div className="ul-orb-lang ul-lang-pt">PT</div>
          <div className="ul-orb-lang ul-lang-fr">FR</div>
          
          <div className="ul-orb-center">
              <div className="ul-pulse-ring"></div>
              EN
          </div>
      </div>
    </div>
  );
}
