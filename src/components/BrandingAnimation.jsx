import { useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * BrandingAnimation Component
 * Converted from something.html
 * A custom SVG and CSS-driven animation showcase for Ayojon Event Management.
 */
// ── Animation constants ──
const OX = 490, OY = 3, BY = 312;
const BANDS_DATA = [
  { id: 'bRed', lx: 0, rx: 210 },
  { id: 'bBlue', lx: 215, rx: 388 },
  { id: 'bYellow', lx: 393, rx: 470 },
  { id: 'bGreen', lx: 475, rx: 648 },
  { id: 'bPink', lx: 653, rx: 980 },
];

/**
 * BrandingAnimation Component
 * Converted from something.html
 */
export default function BrandingAnimation({ isActive = true }) {
  // ── Refs for DOM elements ──
  const taglineRef = useRef(null);
  const logoAreaRef = useRef(null);
  const brandBigRef = useRef(null);
  const bannerRef = useRef(null);

  const bRedRef    = useRef(null);
  const bBlueRef   = useRef(null);
  const bYellowRef = useRef(null);
  const bGreenRef  = useRef(null);
  const bPinkRef   = useRef(null);

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);
  const box5Ref = useRef(null);

  const bandRefs = useMemo(() => [bRedRef, bBlueRef, bYellowRef, bGreenRef, bPinkRef], []);
  const boxRefsArray = useMemo(() => [box1Ref, box2Ref, box3Ref, box4Ref, box5Ref], []);

  // ── Animation state management ──
  const timers = useRef([]);
  const frameRequests = useRef([]);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    frameRequests.current.forEach(cancelAnimationFrame);
    timers.current = [];
    frameRequests.current = [];
  }, []);

  const after = useCallback((fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }, []);

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animBand = useCallback((index, lx, rx, dur, delay) => {
    after(() => {
      const el = bandRefs[index].current;
      if (!el) return;
      const t0 = performance.now();
      function fr(now) {
        const t = Math.min(1, (now - t0) / dur);
        const p = easeOutCubic(t);
        const clx = (OX + (lx - OX) * p).toFixed(1);
        const crx = (OX + (rx - OX) * p).toFixed(1);
        const cby = (OY + (BY - OY) * p).toFixed(1);
        el.setAttribute('points', `${OX},${OY} ${clx},${cby} ${crx},${cby}`);
        if (t < 1) {
          const r = requestAnimationFrame(fr);
          frameRequests.current.push(r);
        } else {
          el.setAttribute('points', `${OX},${OY} ${lx},${BY} ${rx},${BY}`);
        }
      }
      frameRequests.current.push(requestAnimationFrame(fr));
    }, delay);
  }, [after, bandRefs]);

  const animBox = useCallback((index, delay) => {
    after(() => {
      const el = boxRefsArray[index].current;
      if (!el) return;
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = 'boxIn 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards';
    }, delay);
  }, [after, boxRefsArray]);

  const runAnim = useCallback(() => {
    clearAll();

    // ── Reset tagline ──
    if (taglineRef.current) {
      taglineRef.current.style.cssText = 'opacity:0;transform:translateY(-14px);transition:none;';
    }

    // ── Reset bands ──
    bandRefs.forEach((ref) => {
      const el = ref.current;
      if (el) el.setAttribute('points', `${OX},${OY} ${OX},${OY} ${OX},${OY}`);
    });

    // ── Reset boxes ──
    boxRefsArray.forEach((ref) => {
      if (ref.current) {
        ref.current.style.cssText = 'opacity:0;transform:translateY(28px) scale(0.88);animation:none;';
      }
    });

    // ── Reset logo area ──
    if (logoAreaRef.current) {
      logoAreaRef.current.style.cssText = 'opacity:0;transform:scale(0.68) translateY(18px);animation:none;';
    }

    // ── Reset banner ──
    if (bannerRef.current) {
      bannerRef.current.style.cssText = 'opacity:0;transform:translateY(32px);animation:none;';
    }

    // ── Reset glow ──
    if (brandBigRef.current) {
      brandBigRef.current.style.animation = 'none';
    }

    // ── Sequence ──
    
    // Step 1: Tagline
    after(() => {
      if (taglineRef.current) {
        taglineRef.current.style.transition = 'opacity 0.78s ease, transform 0.78s ease';
        taglineRef.current.style.opacity = '1';
        taglineRef.current.style.transform = 'translateY(0)';
      }
    }, 250);

    // Step 2: Bands
    const BAND_ORDER = [2, 1, 3, 0, 4]; 
    const B0 = 650, BS = 240, BD = 580;
    BAND_ORDER.forEach((bi, i) => {
      const b = BANDS_DATA[bi];
      animBand(bi, b.lx, b.rx, BD, B0 + i * BS);
    });

    // Step 3: Boxes
    const BOX_ORDER_INDICES = [2, 1, 3, 0, 4];
    const BX0 = B0 + BAND_ORDER.length * BS + 280, BXS = 215;
    BOX_ORDER_INDICES.forEach((idx, i) => animBox(idx, BX0 + i * BXS));

    // Step 4: Crown logo
    const LT = BX0 + BOX_ORDER_INDICES.length * BXS + 300;
    after(() => {
      if (logoAreaRef.current) {
        logoAreaRef.current.style.animation = 'logoIn 0.95s cubic-bezier(0.34,1.56,0.64,1) forwards';
      }
    }, LT);

    // Step 5: Glow
    after(() => {
      if (brandBigRef.current) {
        brandBigRef.current.style.animation = 'glow 2.4s ease-in-out infinite';
      }
    }, LT + 880);

    // Step 6: Banner
    const BNT = LT + 940;
    after(() => {
      if (bannerRef.current) {
        bannerRef.current.style.animation = 'bannerIn 0.78s cubic-bezier(0.34,1.56,0.64,1) forwards';
      }
    }, BNT);

  }, [clearAll, after, animBand, animBox, bandRefs, boxRefsArray]);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(runAnim, 400);
      return () => {
        clearTimeout(t);
        clearAll();
      };
    } else {
      // If not active, we should ideally reset it so it's ready for next time
      clearAll();
    }
  }, [runAnim, clearAll, isActive]);

  return (
    <div className="branding-animation-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lilita+One&family=Poppins:wght@700;800;900&display=swap');

        .branding-animation-root {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          background:
            radial-gradient(ellipse 65% 55% at 50% 78%, rgba(255,170,185,0.42) 0%, transparent 68%),
            radial-gradient(ellipse 100% 65% at 50% 0%,
              #fff8e8 0%, #ffe8cc 35%, #ffd5e0 70%, #ffd0dd 100%);
          margin: 0;
          padding: 0;
        }

        .mandala {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 175px;
          height: 580px;
          opacity: 0.08;
          pointer-events: none;
        }
        .mandala.L { left: -25px; }
        .mandala.R { right: -25px; transform: translateY(-50%) scaleX(-1); }

        .scene {
          width: 100%;
          max-width: 980px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 15px;
          margin-top: 60px; /* Accounts for navbar overlap */
          transform-origin: top center;
        }

        /* Squeeze the scene vertically on short screens (e.g. laptops) */
        @media (max-height: 850px) and (min-width: 769px) {
          .scene {
            transform: scale(0.85);
            margin-top: 25vh;
          }
        }
        @media (max-height: 720px) and (min-width: 769px) {
          .scene {
            transform: scale(0.75);
            margin-top: 25px;
          }
        }

        @media (max-width: 1024px) {
          .scene {
            padding: 40px 40px;
          }
        }

        @media (max-width: 768px) {
          .scene {
            margin-top: 30px;
            padding: 20px 35px; /* Increased padding to avoid side arrows */
          }
        }
        
        @media (max-width: 480px) {
          .scene {
            padding: 15px 35px;
          }
        }

        .tagline {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(18px, 2.8vw, 34px);
          color: #38006a;
          text-align: center;
          letter-spacing: 0.2px;
          opacity: 0;
          transform: translateY(-14px);
          margin-bottom: 2px;
        }

        .bands-wrap { width: 100%; }
        .bands-wrap svg { display: block; width: 100%; }

        .boxes-row {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: clamp(4px, 1vw, 13px);
          width: 100%;
          padding: 0;
          margin-top: -3px;
        }

        .sbox {
          border-radius: clamp(6px, 1.2vw, 13px);
          padding: clamp(4px, 1vw, 7px) clamp(2px, 0.5vw, 13px);
          text-align: center;
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transform: translateY(28px) scale(0.88);
          box-shadow: 0 5px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.14);
          cursor: default;
        }
        .sbox:hover {
          transform: translateY(-4px) scale(1.05) !important;
          opacity: 1 !important;
          box-shadow: 0 14px 30px rgba(0,0,0,0.28) !important;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .sbox-brand {
          display: block;
          font-family: 'Lilita One', cursive;
          font-size: clamp(7px, 1.5vw, 15px);
          color: #FFE000;
          -webkit-text-stroke: 1px #aa0000;
          paint-order: stroke fill;
          letter-spacing: 0.5px;
          margin-bottom: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: clip;
        }

        .sbox-name {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: clamp(7px, 1.7vw, 20px);
          line-height: 1.15;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: clip;
        }

        .bx-red    { background: #cc1800; border: 3px solid #ee3311; }
        .bx-blue   { background: #1b2b88; border: 3px solid #2244bb; }
        .bx-yellow { background: #f8e800; border: 3px solid #ddcc00; }
        .bx-yellow .sbox-brand { color: #cc1800; -webkit-text-stroke: 1.2px #880000; }
        .bx-yellow .sbox-name  { color: #cc1800; }
        .bx-green  { background: #0a6b28; border: 3px solid #169940; }
        .bx-pink   { background: #cc0077; border: 3px solid #ff1199; }

        .logo-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 14px;
          opacity: 0;
          transform: scale(0.68) translateY(18px);
        }

        .crown-svg { width: clamp(195px, 37vw, 365px); }

        .brand-big {
          font-family: 'Lilita One', cursive;
          font-size: clamp(34px, 6.5vw, 68px);
          color: #FFE000;
          -webkit-text-stroke: 2px #bb0000;
          paint-order: stroke fill;
          text-shadow: 2px 4px 0 rgba(0,0,0,0.18);
          letter-spacing: 3px;
          margin-right: -3px;
          line-height: 1;
          margin-top: clamp(-82px, -11vw, -40px);
          position: relative;
          z-index: 10;
        }

        .banner-outer {
          margin-top: clamp(2px, 1.5vw, 18px);
          opacity: 0;
          transform: translateY(32px);
        }
        .banner-pill {
          background: linear-gradient(90deg, #bc2900 0%, #dc5000 48%, #bc2900 100%);
          border-radius: 60px;
          padding: clamp(6px, 1.5vw, 10px) clamp(16px, 4vw, 44px) clamp(8px, 1.8vw, 13px);
          border: clamp(1px, 0.5vw, 3px) solid rgba(255,205,115,0.32);
          box-shadow: 0 7px 22px rgba(155,28,0,0.36), inset 0 1px 0 rgba(255,255,255,0.14);
        }
        .banner-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: clamp(11px, 2.2vw, 27px);
          color: #ffffff;
          letter-spacing: clamp(1px, 0.5vw, 3px);
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0,0,0,0.28);
          white-space: nowrap;
        }

        @keyframes boxIn {
          0%   { opacity:0; transform:translateY(28px) scale(0.82); }
          60%  { transform:translateY(-6px) scale(1.06); }
          82%  { transform:translateY(3px) scale(0.98); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes logoIn {
          0%   { opacity:0; transform:scale(0.62) translateY(20px); }
          62%  { transform:scale(1.07) translateY(-6px); }
          82%  { transform:scale(0.98) translateY(2px); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes bannerIn {
          0%   { opacity:0; transform:translateY(32px); }
          66%  { transform:translateY(-7px); }
          100% { opacity:1; transform:translateY(0); }
        }
        @keyframes glow {
          0%,100% { filter:drop-shadow(0 0 6px rgba(255,218,0,.45)); }
          50%      { filter:drop-shadow(0 0 28px rgba(255,218,0,.95)); }
        }
      `}</style>

      {/* Side mandalas */}
      <svg className="mandala L" viewBox="0 0 175 580" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#8b0000" fill="none" strokeWidth="1">
          <ellipse cx="88" cy="290" rx="78" ry="270"/>
          <ellipse cx="88" cy="290" rx="58" ry="200"/>
          <ellipse cx="88" cy="290" rx="38" ry="132"/>
          <ellipse cx="88" cy="290" rx="18" ry="65"/>
          <line x1="88" y1="20" x2="88" y2="560"/>
          <line x1="10" y1="290" x2="166" y2="290"/>
          <line x1="25" y1="88" x2="151" y2="492"/>
          <line x1="151" y1="88" x2="25" y2="492"/>
          <path d="M88,95 Q138,192 88,290 Q38,192 88,95Z" opacity="0.45"/>
          <path d="M88,290 Q138,388 88,485 Q38,388 88,290Z" opacity="0.45"/>
          <path d="M18,196 Q88,246 158,196 Q88,146 18,196Z" opacity="0.45"/>
          <path d="M18,384 Q88,334 158,384 Q88,434 18,384Z" opacity="0.45"/>
        </g>
      </svg>
      <svg className="mandala R" viewBox="0 0 175 580" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#8b0000" fill="none" strokeWidth="1">
          <ellipse cx="88" cy="290" rx="78" ry="270"/>
          <ellipse cx="88" cy="290" rx="58" ry="200"/>
          <ellipse cx="88" cy="290" rx="38" ry="132"/>
          <ellipse cx="88" cy="290" rx="18" ry="65"/>
          <line x1="88" y1="20" x2="88" y2="560"/>
          <line x1="10" y1="290" x2="166" y2="290"/>
          <line x1="25" y1="88" x2="151" y2="492"/>
          <line x1="151" y1="88" x2="25" y2="492"/>
          <path d="M88,95 Q138,192 88,290 Q38,192 88,95Z" opacity="0.45"/>
          <path d="M88,290 Q138,388 88,485 Q38,388 88,290Z" opacity="0.45"/>
          <path d="M18,196 Q88,246 158,196 Q88,146 18,196Z" opacity="0.45"/>
          <path d="M18,384 Q88,334 158,384 Q88,434 18,384Z" opacity="0.45"/>
        </g>
      </svg>

      <div className="scene">
        <div className="tagline" ref={taglineRef}>One Stop Event Solution</div>

        <div className="bands-wrap">
          <svg viewBox="0 0 980 314" preserveAspectRatio="none">
            <rect width="980" height="314" fill="rgba(255, 248, 230, 0)"/>
            <polygon ref={bRedRef} fill="#e81018" points="490,3 490,3 490,3"/>
            <polygon ref={bBlueRef} fill="#1c2b96" points="490,3 490,3 490,3"/>
            <polygon ref={bYellowRef} fill="#f5e300" points="490,3 490,3 490,3"/>
            <polygon ref={bGreenRef} fill="#0d8c2c" points="490,3 490,3 490,3"/>
            <polygon ref={bPinkRef} fill="#e0006e" points="490,3 490,3 490,3"/>
          </svg>
        </div>

        <div className="boxes-row">
          {[
            { id: 'sb1', class: 'bx-red', brand: 'AYOJON', name: 'Catering', ref: box1Ref },
            { id: 'sb2', class: 'bx-blue', brand: 'AYOJON', name: 'Photography', ref: box2Ref },
            { id: 'sb3', class: 'bx-yellow', brand: 'AYOJON', name: 'Entertainment', ref: box3Ref },
            { id: 'sb4', class: 'bx-green', brand: 'AYOJON', name: 'Decoration', ref: box4Ref },
            { id: 'sb5', class: 'bx-pink', brand: 'AYOJON', name: 'Hospitality', ref: box5Ref },
          ].map((box) => (
            <div key={box.id} className={`sbox ${box.class}`} ref={box.ref}>
              <span className="sbox-brand">{box.brand}</span>
              <span className="sbox-name">{box.name}</span>
            </div>
          ))}
        </div>

        <div className="logo-area" ref={logoAreaRef}>
          <svg className="crown-svg" viewBox="0 0 430 280" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" fill="#7a1414" d="
              M 25,185
              C 25,160 30,150 40,140
              C 30,110 15,90 10,70
              C 35,75 55,100 70,115
              C 95,95 125,65 145,45
              C 165,65 190,95 215,105
              C 240,95 265,65 285,45
              C 305,65 335,95 360,115
              C 375,100 395,75 420,70
              C 415,90 400,110 390,140
              C 400,150 405,160 405,185
              C 405,250 385,270 360,270
              L 70,270
              C 45,270 25,250 25,185 Z

              M 95,165
              C 115,130 130,105 145,85
              C 160,105 175,130 190,165
              C 160,185 125,185 95,165 Z

              M 240,165
              C 255,130 270,105 285,85
              C 300,105 315,130 335,165
              C 305,185 270,185 240,165 Z
            "/>
            <circle cx="70"  cy="80" r="24" fill="#0d8c2c"/>
            <circle cx="215" cy="70" r="28" fill="#e81018"/>
            <circle cx="360" cy="80" r="24" fill="#1c2b96"/>
          </svg>
          <div className="brand-big" ref={brandBigRef}>AYOJON</div>
          
          <div className="banner-outer" ref={bannerRef}>
            <div className="banner-pill">
              <span className="banner-text">Event Management Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
