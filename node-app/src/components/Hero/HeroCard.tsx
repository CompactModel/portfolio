import { useEffect, useRef, useState } from 'react';

const CFG = {
  tiltMax:      14,
  perspective:  1100,
  hoverScale:   1.03,
  smoothing:    0.10,
  parallax:     10,
  specSize:     60,
  specInt:      0.85,
  iridInt:      0.30,
  iridAngle:    90,
  iridBlur:     20,
  glowInt:      0.75,
  glowRadius:   80,
  rim:          true,
  noiseOpacity: 0.10,
  noiseScale:   0.85,
};

function CodeBody() {
  const C = {
    com:  { color: 'rgba(41,38,27,.42)' },
    kw:   { color: '#6f5fa0' },
    str:  { color: '#c47842' },
    pun:  { color: 'rgba(41,38,27,.55)' },
    base: { color: 'rgba(41,38,27,.92)' },
    bool: { color: '#5a7fa0' },
  };
  return (
    <pre style={{ margin: 0, font: "500 12.5px/1.65 'JetBrains Mono',monospace", letterSpacing: '-0.005em', ...C.base }}>
      <span style={C.com}>{'// tech stack'}</span>{'\n'}
      <span style={C.kw}>const</span>{' stack '}<span style={C.pun}>= {'{'}</span>{'\n'}
      {'  '}{'frontend'}<span style={C.pun}>:</span>{' '}<span style={C.str}>'React + TypeScript'</span><span style={C.pun}>,</span>{'\n'}
      {'  '}{'backend'}<span style={C.pun}>:</span>{'  '}<span style={C.str}>'PHP + Symfony'</span><span style={C.pun}>,</span>{'\n'}
      {'  '}{'database'}<span style={C.pun}>:</span>{' '}<span style={C.str}>'MySQL'</span><span style={C.pun}>,</span>{'\n'}
      {'  '}{'infra'}<span style={C.pun}>:</span>{'    '}<span style={C.str}>'Docker + Nginx'</span><span style={C.pun}>,</span>{'\n'}
      <span style={C.pun}>{'}'}</span>{'\n\n'}
      <span style={C.kw}>const</span>{' available '}<span style={C.pun}>=</span>{' '}<span style={C.bool}>true</span>
      {' '}<span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 99, background: '#4dbb73', boxShadow: '0 0 8px #4dbb73', verticalAlign: 'middle', marginLeft: 4, marginBottom: 2 }} />
    </pre>
  );
}

function ErrorBody() {
  const E = {
    base: { color: 'rgba(245,210,200,.90)' },
    dim:  { color: 'rgba(245,210,200,.45)' },
    red:  { color: '#ff8a6c' },
    soft: { color: '#e8a48c' },
    fn:   { color: '#dfb472' },
  };
  return (
    <pre style={{ margin: 0, font: "500 12px/1.7 'JetBrains Mono',monospace", letterSpacing: '.005em', ...E.base }}>
      <span style={E.red}>{'[FATAL]'}</span>{' '}<span style={E.dim}>uncaught exception</span>{'\n\n'}
      <span style={E.red}>×</span>{' '}<span style={E.soft}>cannot</span>{' '}<span style={E.fn}>serialize</span><span style={E.dim}>(</span>profile<span style={E.dim}>)</span>{'\n'}
      {'    '}<span style={E.dim}>at</span>{' '}<span style={E.fn}>runtime</span><span style={E.dim}>.js:</span>42{'\n'}
      {'    '}<span style={E.dim}>at</span>{' '}<span style={E.fn}>iridescent</span><span style={E.dim}>(</span>0.84<span style={E.dim}>)</span>{'\n'}
      {'    '}<span style={E.dim}>at</span>{' stack.'}<span style={E.dim}>frontend</span>{'\n'}
      {'    '}<span style={E.dim}>at Vibe.</span><span style={E.fn}>focused</span>
    </pre>
  );
}

const dot = (c: string) => ({
  width: 10, height: 10, borderRadius: 99, background: c, opacity: .85,
  boxShadow: `inset 0 0 0 .5px rgba(0,0,0,.35), 0 0 8px ${c}aa`,
  display: 'inline-block',
});

export function HeroCard() {
  const cardRef      = useRef<HTMLDivElement>(null);
  const specRef      = useRef<HTMLDivElement>(null);
  const iridRef      = useRef<HTMLDivElement>(null);
  const rimRef       = useRef<HTMLDivElement>(null);
  const innerRef     = useRef<HTMLDivElement>(null);
  const backInnerRef = useRef<HTMLDivElement>(null);
  const stateRef     = useRef({ rx: 0, ry: 0, sx: 0.5, sy: 0.5, hov: 0, flip: 0 });
  const [flipped, setFlipped] = useState(false);
  const flippedRef = useRef(false);
  flippedRef.current = flipped;

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const card = cardRef.current;
      if (!card) { raf = requestAnimationFrame(tick); return; }

      const r  = card.getBoundingClientRect();
      const wp = window.__wp_state;
      const mx = (wp ? wp.targetMouse[0] : 0.5) * window.innerWidth;
      const my = (1 - (wp ? wp.targetMouse[1] : 0.5)) * window.innerHeight;
      const lx = (mx - r.left) / r.width;
      const ly = (my - r.top)  / r.height;
      const isHover = lx > -0.1 && lx < 1.1 && ly > -0.1 && ly < 1.1;

      const now = performance.now() / 1000;
      const s   = stateRef.current;
      const k   = CFG.smoothing;

      const tRY = isHover ? (lx - 0.5) * 2 * CFG.tiltMax : 0;
      const tRX = isHover ? -(ly - 0.5) * 2 * CFG.tiltMax : 0;
      const tSX = isHover ? Math.min(1, Math.max(0, lx)) : 0.5;
      const tSY = isHover ? Math.min(1, Math.max(0, ly)) : 0.5;
      const tH  = isHover ? 1 : 0;

      s.rx  += (tRX - s.rx)  * k;
      s.ry  += (tRY - s.ry)  * k;
      s.sx  += (tSX - s.sx)  * k;
      s.sy  += (tSY - s.sy)  * k;
      s.hov += (tH  - s.hov) * k;
      s.flip += ((flippedRef.current ? 180 : 0) - s.flip) * 0.08;

      card.style.transform = `rotateY(${s.flip + s.ry}deg) rotateX(${s.rx}deg) scale(${1 + s.hov * (CFG.hoverScale - 1)})`;

      const fx = Math.sin(now * 0.7)  * 2.6;
      const fy = Math.cos(now * 0.95) * 2.0;
      if (innerRef.current)
        innerRef.current.style.transform = `translate3d(${-s.ry * CFG.parallax * 0.6 + fx}px, ${s.rx * CFG.parallax * 0.6 + fy}px, 16px)`;
      if (backInnerRef.current)
        backInnerRef.current.style.transform = `translate3d(${fx * 0.6}px, ${fy * 0.6}px, 16px)`;

      if (specRef.current)
        specRef.current.style.background = `radial-gradient(circle ${CFG.specSize}% at ${s.sx*100}% ${s.sy*100}%, rgba(255,247,232,${0.45 * CFG.specInt * Math.max(s.hov, 0.25)}), rgba(255,247,232,0) 60%)`;

      if (iridRef.current) {
        const ang = Math.atan2(s.sy - 0.5, s.sx - 0.5) * 180 / Math.PI + CFG.iridAngle;
        iridRef.current.style.background = `conic-gradient(from ${ang}deg at ${s.sx*100}% ${s.sy*100}%, #c08664, #efe6d6, #a890b8, #7a8aa8, #dfb472, #c08664)`;
        iridRef.current.style.opacity    = String(CFG.iridInt * (0.30 + 0.70 * s.hov));
        const mask = `radial-gradient(circle ${Math.max(40, CFG.specSize * 1.8)}% at ${s.sx*100}% ${s.sy*100}%, #000, transparent 70%)`;
        iridRef.current.style.maskImage = mask;
        (iridRef.current.style as any).webkitMaskImage = mask;
      }

      if (rimRef.current) {
        const hueT = (s.sx + s.sy) * 180 + CFG.iridAngle;
        card.style.boxShadow =
          `0 ${14 + 22*s.hov}px ${CFG.glowRadius}px -14px hsla(${(hueT+25)%360},60%,70%,${0.32*CFG.glowInt*Math.max(0.4,s.hov)}),` +
          `0 ${8  + 16*s.hov}px ${CFG.glowRadius*.7}px -22px hsla(${(hueT+200)%360},50%,60%,${0.22*CFG.glowInt*Math.max(0.4,s.hov)}),` +
          `0 12px 36px rgba(80,50,30,.10),` +
          `0 1px 0 rgba(255,255,255,.7) inset,` +
          `0 0 0 .5px rgba(120,90,60,.10) inset`;
        rimRef.current.style.opacity = String(CFG.rim ? 0.45 + 0.55 * s.hov : 0);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${CFG.noiseScale}' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='1'/></svg>`;
  const noiseUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(noiseSvg)}")`;

  return (
    <div style={{ perspective: `${CFG.perspective}px`, transformStyle: 'preserve-3d', width: 320, maxWidth: '92vw', flexShrink: 0 }}>
      <div
        ref={cardRef}
        onClick={() => setFlipped(f => !f)}
        style={{ position: 'relative', width: '100%', aspectRatio: '1 / 0.92', borderRadius: 18, transformStyle: 'preserve-3d', willChange: 'transform, box-shadow', cursor: 'pointer' }}
      >
        {/* ── FRONT ── */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: 'linear-gradient(180deg,#fcf7ef 0%,#f4ead9 100%)', border: '.5px solid rgba(120,90,60,.14)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', overflow: 'hidden' }}>
          <div ref={iridRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'overlay', filter: `blur(${CFG.iridBlur}px) saturate(150%)` }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: noiseUrl, backgroundSize: '160px 160px', opacity: CFG.noiseOpacity, mixBlendMode: 'multiply' }} />
          <div ref={specRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'screen' }} />
          <div ref={rimRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 18, padding: '.5px', background: 'linear-gradient(135deg,#c08664,#efe6d6 30%,#a890b8 55%,#7a8aa8 80%,#c08664)', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', opacity: 0.5, transition: 'opacity 200ms' }} />
          <div ref={innerRef} style={{ position: 'relative', padding: '22px 24px', transformStyle: 'preserve-3d', willChange: 'transform' }}>
            <CodeBody />
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: 'linear-gradient(160deg,#2a1410 0%,#160a07 100%)', border: '.5px solid rgba(255,100,80,.22)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', overflow: 'hidden', boxShadow: '0 0 70px rgba(226,90,70,.18) inset' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg,rgba(226,90,70,.06) 0,rgba(226,90,70,.06) 1px,transparent 1px,transparent 3px)', mixBlendMode: 'screen', opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: noiseUrl, backgroundSize: '160px 160px', opacity: CFG.noiseOpacity * 1.2, mixBlendMode: 'overlay' }} />
          <div style={{ position: 'absolute', inset: '-30%', pointerEvents: 'none', background: 'radial-gradient(circle at 50% 50%,rgba(226,90,70,.35),transparent 55%)', animation: 'errPulse 2.8s ease-in-out infinite' }} />
          <div ref={backInnerRef} style={{ position: 'relative', padding: '22px 24px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transformStyle: 'preserve-3d', willChange: 'transform' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 7 }}>
                <span style={dot('#ff8a6c')} /><span style={dot('#dfb472')} /><span style={dot('#9cc7a4')} />
              </div>
              <span style={{ font: "600 9.5px/1 'JetBrains Mono',monospace", letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,138,108,.85)' }}>ERROR · 0xDEADBEEF</span>
            </div>
            <div style={{ margin: '4px 0' }}>
              <div style={{ font: "700 38px/1 'JetBrains Mono',monospace", letterSpacing: '-.02em', color: '#ff8a6c', textShadow: '0 0 24px rgba(255,138,108,.4)', marginBottom: 12 }}>ERROR</div>
              <ErrorBody />
            </div>
            <div style={{ font: "500 9.5px/1 'JetBrains Mono',monospace", letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,180,160,.55)', display: 'flex', justifyContent: 'space-between' }}>
              <span>↻ click to retry</span><span>· v 2.026</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes errPulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:.85;transform:scale(1.06)}}`}</style>
    </div>
  );
}
