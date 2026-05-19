import { useEffect, useState, useRef, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

interface Profile    { id:number; name:string; title:string; bio:string; avatar:string|null; }
interface Project    { id:number; title:string; description:string; link:string|null; image:string|null; }
interface Skill      { id:number; name:string; level:string|null; category:string|null; }
interface Experience { id:number; company:string; position:string; startDate:string; endDate:string|null; description:string|null; }
interface Education  { id:number; institution:string; degree:string; startDate:string; endDate:string|null; description:string|null; }

const API       = `http://${window.location.hostname}:8080/api`;
const GOLD      = '#ffffff';
const GOLD2     = '#888888';
const GOLD_GLOW = 'rgba(255,255,255,0.2)';
const BORDER    = 'rgba(255,255,255,0.08)';
const CARD      = 'rgba(255,255,255,0.04)';
const PINK      = GOLD;
const PURPLE    = GOLD2;
const PINK_GLOW = GOLD_GLOW;
const PURP_GLOW = 'rgba(120,120,120,0.3)';

/* ─── Scroll reveal ─────────────────────────────────────────────── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

/* ─── Hero visual (animated orb) ───────────────────────────────── */
function HeroVisual() {
  const dots = [
    { top:'8%',  left:'78%', s:6, delay:'0s' },
    { top:'22%', left:'4%',  s:4, delay:'0.6s' },
    { top:'72%', left:'82%', s:5, delay:'1.1s' },
    { top:'88%', left:'12%', s:4, delay:'1.6s' },
    { top:'48%', left:'94%', s:3, delay:'0.9s' },
    { top:'62%', left:'2%',  s:5, delay:'0.3s' },
  ];
  return (
    <div style={{ position:'relative', width:320, height:320, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'absolute', inset:-40, background:'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(120,120,120,0.07) 50%, transparent 70%)', filter:'blur(30px)' }}/>
      <div style={{ position:'absolute', width:290, height:290, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.1)', animation:'spin1 25s linear infinite' }}/>
      <div style={{ position:'absolute', width:230, height:82, borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.35)', boxShadow:`0 0 20px rgba(255,255,255,0.12)`, animation:'spin2 8s linear infinite', transform:'rotateX(72deg)' }}/>
      <div style={{ position:'absolute', width:185, height:62, borderRadius:'50%', border:'1px solid rgba(120,120,120,0.5)', boxShadow:`0 0 14px rgba(120,120,120,0.25)`, animation:'spin3 13s linear infinite reverse', transform:'rotateX(72deg) rotateZ(55deg)' }}/>
      <div style={{ width:130, height:130, borderRadius:'50%', background:'radial-gradient(circle at 35% 35%, rgba(230,230,230,0.4) 0%, rgba(130,130,130,0.6) 42%, rgba(25,0,45,0.92) 78%, #000 100%)', boxShadow:`0 0 45px rgba(255,255,255,0.5), 0 0 90px rgba(120,120,120,0.4), 0 0 140px rgba(120,120,120,0.15)`, border:'1px solid rgba(255,255,255,0.35)', position:'relative' }}>
        <div style={{ position:'absolute', top:'14%', left:'18%', width:'28%', height:'18%', background:'rgba(255,255,255,0.18)', borderRadius:'50%', filter:'blur(5px)' }}/>
      </div>
      {dots.map((d, i) => (
        <div key={i} style={{ position:'absolute', width:d.s, height:d.s, borderRadius:'50%', background: i%2===0 ? PINK : PURPLE, boxShadow:`0 0 ${d.s*2}px ${i%2===0 ? PINK_GLOW : PURP_GLOW}`, top:d.top, left:d.left, animation:`floatDot 3s ease-in-out ${d.delay} infinite alternate` }}/>
      ))}
    </div>
  );
}

/* ─── Ticker ────────────────────────────────────────────────────── */
function Ticker() {
  const items = ['• FULL STACK DEVELOPER', '• PHP & SYMFONY', '• REACT & TYPESCRIPT', '• DOCKER & DEVOPS', '• REST API'];
  const track = [...items, ...items, ...items];
  return (
    <div style={{ overflow:'hidden', background:'rgba(255,255,255,0.03)', borderTop:`1px solid #1a1a1a`, borderBottom:`1px solid #1a1a1a`, padding:'12px 0' }}>
      <div style={{ display:'flex', gap:56, animation:'ticker 22s linear infinite', whiteSpace:'nowrap', width:'max-content' }}>
        {track.map((item, i) => (
          <span key={i} style={{ fontSize:13, fontWeight:700, color:PINK, letterSpacing:2, flexShrink:0, opacity:0.7 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Tech color map ────────────────────────────────────────────── */
const TECH_COLORS: Record<string, string> = {
  react:'#61DAFB', typescript:'#3178C6', javascript:'#F7DF1E', php:'#8892BF',
  symfony:PINK, docker:'#2496ED', mysql:'#4479A1', nginx:'#009639',
  git:'#F05032', github:'#e0e0e0', easyadmin:PINK, tailwind:'#06B6D4',
  node:'#339933', css:'#1572B6', html:'#E34F26', linux:'#FCC624',
  api:PINK, devops:'#ff80bf', rest:PINK,
};
function techColor(name: string): string {
  const low = name.toLowerCase();
  for (const k of Object.keys(TECH_COLORS)) if (low.includes(k)) return TECH_COLORS[k];
  return PINK;
}

/* ─── Map project to screenshot ─────────────────────────────────── */
function projectImage(title: string, fallback: string): string {
  const t = title.toLowerCase();
  if (t.includes('auto') || t.includes('apex') || t.includes('motor') || t.includes('car')) return '/screenshots/autoservice.png';
  if (t.includes('barber') || t.includes('hair') || t.includes('cut'))                      return '/screenshots/barbershop.png';
  if (t.includes('restaurant') || t.includes('food') || t.includes('cafe'))                 return '/screenshots/restaurant.png';
  return fallback;
}

/* ─── Infer tags from project title/description ─────────────────── */
function inferTags(title: string, desc: string): string[] {
  const text = (title + ' ' + desc).toLowerCase();
  const tags: string[] = [];
  if (text.includes('react') || text.includes('typescript')) tags.push('React');
  if (text.includes('symfony') || text.includes('php'))      tags.push('Symfony');
  if (text.includes('docker'))                               tags.push('Docker');
  if (!tags.length)                                          tags.push('HTML/CSS', 'JavaScript');
  return tags.slice(0, 3);
}

/* ─── App ────────────────────────────────────────────────────────── */
function App() {
  const { t, i18n } = useTranslation();
  const [profile,    setProfile]    = useState<Profile|null>(null);
  const [projects,   setProjects]   = useState<Project[]>([]);
  const [skills,     setSkills]     = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education,  setEducation]  = useState<Education[]>([]);
  const [form,       setForm]       = useState({ name:'', email:'', message:'' });
  const [formStatus, setFormStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle');
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    fetch(`${API}/profile`).then(r=>r.json()).then(setProfile).catch(()=>{});
    fetch(`${API}/projects`).then(r=>r.json()).then(setProjects).catch(()=>{});
    fetch(`${API}/skills`).then(r=>r.json()).then(setSkills).catch(()=>{});
    fetch(`${API}/experience`).then(r=>r.json()).then(setExperience).catch(()=>{});
    fetch(`${API}/education`).then(r=>r.json()).then(setEducation).catch(()=>{});
  }, []);

  const handleContact = async (e: FormEvent) => {
    e.preventDefault(); setFormStatus('sending');
    try {
      const res = await fetch(`${API}/contact`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      if (res.ok) { setFormStatus('ok'); setForm({name:'',email:'',message:''}); } else setFormStatus('error');
    } catch { setFormStatus('error'); }
  };

  const formatDate = (d: string|null) => d ? new Date(d).toLocaleDateString(i18n.language, {year:'numeric',month:'short'}) : t('present');

  const navLinks = [
    {href:'#skills',  label:t('nav_skills')},
    {href:'#projects',label:t('nav_projects')},
    {href:'#contact', label:t('nav_contact')},
  ];

const sectionHead = (label: string) => (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
      <div style={{ width:3, height:24, background:`linear-gradient(${GOLD},${GOLD2})`, borderRadius:2 }}/>
      <h2 style={{ fontSize:20, fontWeight:700, color:'#ffffff', margin:0 }}>{label}</h2>
    </div>
  );

  const inputStyle: React.CSSProperties = {
    background:'transparent', border:'none', borderBottom:`1px solid rgba(255,255,255,0.12)`,
    padding:'10px 0', color:'#ffffff', fontSize:14, outline:'none', width:'100%',
    transition:'border-color 0.2s',
  };

  const projectGrads = [
    'linear-gradient(135deg,#1a0011,#2d0022)',
    'linear-gradient(135deg,#0d001a,#1a0033)',
    'linear-gradient(135deg,#1a0016,#330011)',
  ];

  return (
    <div style={{ fontFamily:'"Inter",system-ui,sans-serif', background:'#0e0e0e', minHeight:'100vh', color:'#ffffff' }}>

      {/* Fluid gradient bg */}
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'70%', height:'65%', top:'-10%', left:'-5%', background:'radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, rgba(120,120,120,0.07) 50%, transparent 70%)', filter:'blur(100px)', animation:'blobFloat1 18s ease-in-out infinite' }}/>
        <div style={{ position:'absolute', width:'70%', height:'65%', bottom:'-10%', right:'-5%', background:'radial-gradient(ellipse at center, rgba(120,120,120,0.18) 0%, rgba(80,80,80,0.08) 50%, transparent 70%)', filter:'blur(100px)', animation:'blobFloat2 22s ease-in-out infinite' }}/>
      </div>


      {/* NAV */}
      <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(14,14,14,0.9)', backdropFilter:'blur(20px)', borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ display:'flex', alignItems:'center', padding:'0 32px', height:60, maxWidth:1200, margin:'0 auto' }}>
          <span style={{ fontWeight:800, fontSize:17, color:'#ffffff', flex:1 }}>{profile?.name ?? 'Yan Oleksiuk'}</span>
          <div style={{ display:'flex', gap:4 }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{ color:'#888', textDecoration:'none', padding:'6px 14px', borderRadius:8, fontSize:12, fontWeight:500, transition:'color 0.2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.color=GOLD; }}
                onMouseLeave={e=>{ e.currentTarget.style.color='#888'; }}
              >{l.label}</a>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, flex:1, justifyContent:'flex-end' }}>
            {['en','de','uk'].map(lang => (
              <button key={lang} onClick={()=>i18n.changeLanguage(lang)} style={{ background:i18n.language===lang?GOLD:'transparent', color:i18n.language===lang?'#000':'#888', border:`1px solid ${i18n.language===lang?GOLD:BORDER}`, padding:'3px 10px', borderRadius:6, cursor:'pointer', fontWeight:600, fontSize:11, transition:'all 0.2s' }}>{lang.toUpperCase()}</button>
            ))}
            <button onClick={()=>setMenuOpen(!menuOpen)} style={{ background:'transparent', border:`1px solid ${BORDER}`, color:'#888', padding:'6px 10px', borderRadius:8, cursor:'pointer', fontSize:16 }}>☰</button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:'#0e0e0e', borderTop:`1px solid ${BORDER}`, padding:'8px 20px 16px' }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setMenuOpen(false)} style={{ display:'block', color:'#888', textDecoration:'none', padding:'10px 0', fontSize:15, fontWeight:500, borderBottom:`1px solid ${BORDER}` }}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      <div style={{ position:'relative', zIndex:1 }}>

        {/* HERO */}
        <header style={{ maxWidth:1200, margin:'0 auto', padding:'70px 32px 56px', position:'relative' }}>
          <div className="hero-layout" style={{ display:'flex', alignItems:'center', gap:40 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <Reveal>
                <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`rgba(255,255,255,0.08)`, border:`1px solid rgba(255,255,255,0.25)`, color:GOLD, padding:'5px 14px', borderRadius:24, fontSize:11, fontWeight:600, marginBottom:24, letterSpacing:0.5 }}>
                  <span style={{ width:6, height:6, background:'#4ade80', borderRadius:'50%', display:'inline-block' }}/>
                  {t('available')}
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 style={{ fontSize:'clamp(36px,6vw,68px)', fontWeight:900, lineHeight:1.04, margin:'0 0 16px', color:'#ffffff' }}>
                  {t('hero_title')}{' '}
                </h1>
                <div style={{ fontSize:'clamp(28px,5vw,52px)', fontWeight:900, lineHeight:1.1, margin:'0 0 20px', background:`linear-gradient(135deg,${GOLD},${PURPLE})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', filter:`drop-shadow(0 0 24px rgba(255,255,255,0.5))` }}>
                  {profile?.title ?? t('hero_highlight')}
                </div>
              </Reveal>
              <Reveal delay={160}>
                <p style={{ fontSize:15, color:'#888', maxWidth:480, lineHeight:1.8, margin:'0 0 8px' }}>{profile?.bio ?? t('hero_description')}</p>
                <a href="mailto:yan.oleksuyk7@gmail.com" style={{ color:GOLD, fontSize:13, textDecoration:'none', fontWeight:500 }}>✉ yan.oleksuyk7@gmail.com</a>
              </Reveal>
              <Reveal delay={240}>
                <div style={{ marginTop:28, display:'flex', gap:14, flexWrap:'wrap' }}>
                  <a href="#projects"
                    style={{ background:`linear-gradient(135deg,${GOLD},${PURPLE})`, color:'#0e0e0e', padding:'14px 34px', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:14, boxShadow:`0 4px 22px ${GOLD_GLOW}`, transition:'box-shadow 0.2s' }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.boxShadow=`0 6px 32px rgba(255,255,255,0.55)`; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.boxShadow=`0 4px 22px ${GOLD_GLOW}`; }}
                  >{t('view_projects')}</a>
                  <a href="#contact" style={{ border:`1px solid ${BORDER}`, color:'#aaa', padding:'14px 34px', borderRadius:12, textDecoration:'none', fontWeight:600, fontSize:14, background:CARD, backdropFilter:'blur(8px)', transition:'border-color 0.2s' }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=GOLD; (e.currentTarget as HTMLElement).style.color=GOLD; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor=BORDER; (e.currentTarget as HTMLElement).style.color='#aaa'; }}
                  >{t('contact_me')}</a>
                </div>
              </Reveal>
            </div>
            <div className="hero-visual"><HeroVisual /></div>
          </div>
        </header>

        <Ticker />

        {/* SKILLS */}
        <section id="skills" style={{ background:'rgba(255,255,255,0.02)' }}>
          <div style={{ maxWidth:1200, margin:'0 auto', padding:'48px 32px' }}>
            {sectionHead(t('nav_skills'))}
            {skills.length === 0
              ? <p style={{ color:'rgba(255,255,255,0.35)' }}>{t('no_skills')}</p>
              : (() => {
                  const order = ['Frontend', 'Backend', 'Database', 'Tools'];
                  const grouped = order.reduce<Record<string, Skill[]>>((acc, cat) => {
                    const items = skills.filter(s => s.category === cat);
                    if (items.length) acc[cat] = items;
                    return acc;
                  }, {});
                  const uncategorized = skills.filter(s => !s.category || !order.includes(s.category));
                  if (uncategorized.length) grouped['Other'] = uncategorized;
                  return (
                    <div style={{ display:'flex', flexWrap:'wrap', gap:32, alignItems:'flex-start' }}>
                      {Object.entries(grouped).map(([cat, items]) => (
                        <Reveal key={cat}>
                          <div>
                            <div style={{ fontSize:10, fontWeight:700, letterSpacing:2.5, color:GOLD, textTransform:'uppercase', marginBottom:12, opacity:0.8 }}>{cat}</div>
                            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                              {items.map(s => {
                                const color = techColor(s.name);
                                return (
                                  <div key={s.id}
                                    style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:12, padding:'16px 10px', textAlign:'center', cursor:'default', transition:'transform 0.2s, border-color 0.2s, box-shadow 0.2s', width:100, flexShrink:0, backdropFilter:'blur(8px)' }}
                                    onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=color; el.style.boxShadow=`0 4px 20px ${color}44`; el.style.transform='translateY(-3px)'; }}
                                    onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.borderColor=BORDER; el.style.boxShadow='none'; el.style.transform='translateY(0)'; }}
                                  >
                                    <div style={{ width:34, height:34, borderRadius:'50%', background:`${color}14`, border:`1.5px solid ${color}44`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 8px', color, fontWeight:800, fontSize:10 }}>
                                      {s.name.slice(0,3).toUpperCase()}
                                    </div>
                                    <div style={{ fontSize:11, fontWeight:500, color:'#aaa', lineHeight:1.3 }}>{s.name}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  );
                })()
            }
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div style={{ maxWidth:1200, margin:'0 auto', padding:'48px 32px' }}>
            {sectionHead(t('nav_projects'))}
            {projects.length === 0
              ? <p style={{ color:'rgba(255,255,255,0.35)' }}>{t('no_projects')}</p>
              : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
                  {projects.map((p, i) => {
                    const tags   = inferTags(p.title, p.description);
                    const imgSrc = p.image ?? projectImage(p.title, '');
                    return (
                      <Reveal key={p.id} delay={i*100}>
                        <div
                          style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:18, overflow:'hidden', backdropFilter:'blur(12px)', transition:'transform 0.2s, box-shadow 0.2s' }}
                          onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform='translateY(-5px)'; el.style.boxShadow=`0 12px 40px ${GOLD_GLOW}`; el.style.borderColor=`rgba(255,255,255,0.3)`; }}
                          onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform='translateY(0)'; el.style.boxShadow='none'; el.style.borderColor=BORDER; }}
                        >
                          <div style={{ background:'rgba(255,255,255,0.03)', padding:'7px 12px', display:'flex', alignItems:'center', gap:5, borderBottom:`1px solid ${BORDER}` }}>
                            {['#ff5f57','#febc2e','#28c840'].map((c,j) => <div key={j} style={{ width:8, height:8, borderRadius:'50%', background:c, opacity:0.7 }}/>)}
                            <div style={{ flex:1, height:13, background:'rgba(255,255,255,0.05)', borderRadius:3, marginLeft:6, border:`1px solid ${BORDER}` }}/>
                          </div>
                          <div style={{ height:150, overflow:'hidden' }}>
                            {imgSrc
                              ? <img src={imgSrc} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block' }}/>
                              : <div style={{ height:'100%', background:projectGrads[i%3], display:'flex', alignItems:'center', justifyContent:'center' }}>
                                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:'rgba(255,255,255,0.15)', textTransform:'uppercase' }}>PREVIEW</span>
                                </div>
                            }
                          </div>
                          <div style={{ padding:20 }}>
                            <h3 style={{ fontSize:15, fontWeight:700, margin:'0 0 8px', color:'#fff' }}>{p.title}</h3>
                            <p style={{ color:'#888', fontSize:13, lineHeight:1.6, margin:'0 0 14px' }}>{p.description}</p>
                            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
                              {tags.map(tag => (
                                <span key={tag} style={{ background:`rgba(255,255,255,0.08)`, border:`1px solid rgba(255,255,255,0.25)`, color:GOLD, fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:4 }}>{tag}</span>
                              ))}
                            </div>
                            {p.link && (
                              <a href={p.link} target="_blank" rel="noreferrer"
                                style={{ color:GOLD, fontSize:13, textDecoration:'none', fontWeight:600, display:'inline-flex', alignItems:'center', gap:4 }}
                                onMouseEnter={e=>{ const s=e.currentTarget.querySelector<HTMLSpanElement>('.arrow'); if(s) s.style.transform='translateX(5px)'; }}
                                onMouseLeave={e=>{ const s=e.currentTarget.querySelector<HTMLSpanElement>('.arrow'); if(s) s.style.transform='translateX(0)'; }}
                              >
                                {t('view_project')} <span className="arrow" style={{ display:'inline-block', transition:'transform 0.2s' }}>→</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
            }
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ background:'rgba(0,0,0,0.04)' }}>
          <div style={{ maxWidth:840, margin:'0 auto', padding:'48px 32px' }}>
            {sectionHead(t('nav_contact'))}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:40 }}>
              <Reveal>
                <p style={{ color:'#6A6A7A', lineHeight:1.8, marginBottom:24, fontSize:14 }}>{t('contact_intro')}</p>
                <a href="mailto:yan.oleksuyk7@gmail.com" style={{ display:'inline-flex', alignItems:'center', gap:8, background:`rgba(139,94,60,0.08)`, border:`1px solid rgba(139,94,60,0.3)`, color:GOLD, textDecoration:'none', fontSize:13, fontWeight:600, padding:'10px 18px', borderRadius:10 }}>
                  ✉ yan.oleksuyk7@gmail.com
                </a>
              </Reveal>
              <Reveal delay={120}>
                <form onSubmit={handleContact} style={{ display:'flex', flexDirection:'column', gap:20 }}>
                  {(['name','email'] as const).map(field => (
                    <input key={field} type={field==='email'?'email':'text'} placeholder={t(`form_${field}`)} required value={form[field]}
                      onChange={e=>setForm(f=>({...f,[field]:e.target.value}))}
                      style={inputStyle}
                      onFocus={e=>e.currentTarget.style.borderBottomColor=GOLD}
                      onBlur={e=>e.currentTarget.style.borderBottomColor='rgba(0,0,0,0.15)'}
                    />
                  ))}
                  <textarea placeholder={t('form_message')} required rows={4} value={form.message}
                    onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                    style={{ ...inputStyle, resize:'vertical' }}
                    onFocus={e=>e.currentTarget.style.borderBottomColor=GOLD}
                    onBlur={e=>e.currentTarget.style.borderBottomColor='rgba(0,0,0,0.15)'}
                  />
                  <button type="submit" disabled={formStatus==='sending'}
                    style={{ background:'#1A1A1A', color:'#ffffff', border:'none', borderRadius:10, padding:'13px', fontWeight:700, fontSize:14, cursor:'pointer', boxShadow:'0 4px 18px rgba(26,26,26,0.2)', transition:'box-shadow 0.2s' }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='0 6px 28px rgba(26,26,26,0.35)'; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.boxShadow='0 4px 18px rgba(26,26,26,0.2)'; }}
                  >
                    {formStatus==='sending' ? t('form_sending') : t('form_send')}
                  </button>
                  {formStatus==='ok'    && <p style={{ color:'#4ade80', margin:0, fontSize:13 }}>{t('form_success')}</p>}
                  {formStatus==='error' && <p style={{ color:'#f87171', margin:0, fontSize:13 }}>{t('form_error')}</p>}
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        <footer style={{ background:'#D4D0CB', borderTop:`1px solid ${BORDER}`, textAlign:'center', padding:'28px 20px' }}>
          <div style={{ fontSize:16, fontWeight:800, color:GOLD, marginBottom:6 }}>{profile?.name ?? 'Yan Oleksiuk'}</div>
          <p style={{ fontSize:12, color:'#888', margin:0 }}>{t('footer')}</p>
        </footer>
      </div>

      <style>{`
        @keyframes ticker     { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes blobFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(4%,6%) scale(1.06)} }
        @keyframes blobFloat2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-4%,-6%) scale(1.06)} }
        @keyframes spin1      { to{transform:rotate(360deg)} }
        @keyframes spin2      { from{transform:rotateX(72deg) rotateZ(0deg)} to{transform:rotateX(72deg) rotateZ(360deg)} }
        @keyframes spin3      { from{transform:rotateX(72deg) rotateZ(55deg)} to{transform:rotateX(72deg) rotateZ(415deg)} }
        @keyframes floatDot   { from{transform:translateY(0) scale(1)} to{transform:translateY(-12px) scale(1.3)} }
        @media (max-width:640px) { .hero-visual{display:none!important} }
        * { box-sizing:border-box; }
      `}</style>
    </div>
  );
}

export default App;
