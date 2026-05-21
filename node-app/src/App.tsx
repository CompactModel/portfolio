import { useEffect, useState, useRef, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

interface Profile    { id:number; name:string; title:string; bio:string; avatar:string|null; email:string|null; telegram:string|null; github:string|null; }
interface Project    { id:number; title:string; description:string; link:string|null; image:string|null; }
interface Skill      { id:number; name:string; level:string|null; category:string|null; }
interface Education  { id:number; institution:string; degree:string; startDate:string; endDate:string|null; description:string|null; }

const API = process.env.REACT_APP_API_URL || `http://${window.location.hostname}:8080/api`;
const DARK   = '#0A0A0A';
const MID    = '#333333';
const SUBTLE = '#777777';
const PINK   = '#6366F1';

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

/* ─── Hero visual (glassmorphism code card) ─────────────────────── */
function HeroVisual() {
  return (
    <div className="hero-visual-card" style={{
      background: 'rgba(255,255,255,0.45)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.7)',
      borderRadius: 20,
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      padding: '28px 32px',
      width: 320,
      flexShrink: 0,
      animation: 'floatCard 4s ease-in-out infinite alternate',
      fontFamily: '"Fira Code","Courier New",monospace',
      fontSize: 13,
      lineHeight: 1.9,
    }}>
      <div style={{ color:'#7B8794', marginBottom:14, fontSize:11, letterSpacing:0.5 }}>{'// tech stack'}</div>
      <div><span style={{ color:'#8B5CF6' }}>const</span> <span style={{ color:'#1F2937' }}>stack</span> <span style={{ color:'#6B7280' }}>=</span> {'{'}</div>
      <div style={{ paddingLeft:20 }}><span style={{ color:'#10B981' }}>frontend</span><span style={{ color:'#6B7280' }}>:</span> <span style={{ color:'#F59E0B' }}>'React + TypeScript'</span><span style={{ color:'#6B7280' }}>,</span></div>
      <div style={{ paddingLeft:20 }}><span style={{ color:'#10B981' }}>backend</span><span style={{ color:'#6B7280' }}>:</span> <span style={{ color:'#F59E0B' }}>'PHP + Symfony'</span><span style={{ color:'#6B7280' }}>,</span></div>
      <div style={{ paddingLeft:20 }}><span style={{ color:'#10B981' }}>database</span><span style={{ color:'#6B7280' }}>:</span> <span style={{ color:'#F59E0B' }}>'MySQL'</span><span style={{ color:'#6B7280' }}>,</span></div>
      <div style={{ paddingLeft:20 }}><span style={{ color:'#10B981' }}>infra</span><span style={{ color:'#6B7280' }}>:</span> <span style={{ color:'#F59E0B' }}>'Docker + Nginx'</span><span style={{ color:'#6B7280' }}>,</span></div>
      <div style={{ color:'#6B7280' }}>{'}'}</div>
      <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ color:'#8B5CF6' }}>const</span>
        <span style={{ color:'#1F2937' }}>available</span>
        <span style={{ color:'#6B7280' }}>=</span>
        <span style={{ color:'#10B981' }}>true</span>
        <span style={{ width:8, height:8, background:'#4ade80', borderRadius:'50%', display:'inline-block', animation:'pulse 2s ease-in-out infinite' }}/>
      </div>
    </div>
  );
}

/* ─── Ticker ────────────────────────────────────────────────────── */
function Ticker() {
  const items = ['• FULL STACK DEVELOPER', '• PHP & SYMFONY', '• REACT & TYPESCRIPT', '• DOCKER & DEVOPS', '• REST API'];
  const track = [...items, ...items, ...items];
  return (
    <div style={{ overflow:'hidden', background:'rgba(0,0,0,0.85)', borderTop:'1px solid rgba(0,0,0,0.1)', borderBottom:'1px solid rgba(0,0,0,0.1)', padding:'12px 0' }}>
      <div style={{ display:'flex', gap:56, animation:'ticker 22s linear infinite', whiteSpace:'nowrap', width:'max-content' }}>
        {track.map((item, i) => (
          <span key={i} style={{ fontSize:13, fontWeight:700, color:'#ffffff', letterSpacing:2, flexShrink:0, opacity:0.85 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Tech color map ────────────────────────────────────────────── */
const TECH_COLORS: Record<string, string> = {
  react:'#61DAFB', typescript:'#3178C6', javascript:'#F7DF1E', php:'#8892BF',
  symfony:'#6366F1', docker:'#2496ED', mysql:'#4479A1', nginx:'#009639',
  git:'#F05032', github:'#24292F', easyadmin:'#6366F1', tailwind:'#06B6D4',
  node:'#339933', css:'#1572B6', html:'#E34F26', linux:'#FCC624',
  api:'#6366F1', devops:'#ff80bf', rest:'#6366F1',
};
function techColor(name: string): string {
  const low = name.toLowerCase();
  for (const k of Object.keys(TECH_COLORS)) if (low.includes(k)) return TECH_COLORS[k];
  return PINK;
}

/* ─── Static fallback data ──────────────────────────────────────── */
const BASE = process.env.PUBLIC_URL || '';

const STATIC_PROFILE: Profile = {
  id: 1,
  name: 'Yan Oleksiuk',
  title: 'Full Stack Developer',
  bio: 'Building modern web applications with PHP, Symfony, React and Docker.',
  avatar: null,
  email: 'yan.oleksuyk7@gmail.com',
  telegram: null,
  github: 'https://github.com/CompactModel',
};

const STATIC_SKILLS: Skill[] = [
  { id:1,  name:'React',      level:'advanced',      category:'Frontend' },
  { id:2,  name:'TypeScript', level:'advanced',      category:'Frontend' },
  { id:3,  name:'JavaScript', level:'advanced',      category:'Frontend' },
  { id:4,  name:'HTML',       level:'advanced',      category:'Frontend' },
  { id:5,  name:'CSS',        level:'advanced',      category:'Frontend' },
  { id:6,  name:'PHP',        level:'advanced',      category:'Backend'  },
  { id:7,  name:'Symfony',    level:'advanced',      category:'Backend'  },
  { id:8,  name:'Node.js',    level:'intermediate',  category:'Backend'  },
  { id:9,  name:'MySQL',      level:'advanced',      category:'Database' },
  { id:10, name:'Docker',     level:'advanced',      category:'Tools'    },
  { id:11, name:'Git',        level:'advanced',      category:'Tools'    },
  { id:12, name:'Nginx',      level:'intermediate',  category:'Tools'    },
  { id:13, name:'Linux',      level:'intermediate',  category:'Tools'    },
];


const STATIC_PROJECTS: Project[] = [
  { id:1, title:'APEX MOTOR',   description:'Elite performance auto service — booking, services, team showcase. Dark UI with red accents.', link:`${BASE}/demo-sites/autoservice/`, image:`${BASE}/screenshots/autoservice.png` },
  { id:2, title:'BarberKing',   description:'Premium barbershop landing page — services, pricing, gallery, online booking form.',           link:`${BASE}/demo-sites/barbershop/`,  image:`${BASE}/screenshots/barbershop.png`  },
  { id:3, title:'La Bella',     description:'Fine dining restaurant site — menu, reservations, chef story, atmosphere gallery.',           link:`${BASE}/demo-sites/restaurant/`,  image:`${BASE}/screenshots/restaurant.png`  },
  { id:4, title:'Brew & Soul',  description:'Demo café website with warm amber design, steam animations, drawer menu and multilingual support (EN/DE/UK).', link:'http://localhost:8084', image:`${BASE}/screenshots/cafe.png` },
  { id:5, title:'Sultan Döner', description:'Demo kebab restaurant with dark green & orange design, fire animations, fullscreen menu and multilingual support.',  link:'https://compactmodel.github.io/demo-kebab', image:`${BASE}/screenshots/kebab.png` },
  { id:6, title:'VoltGarage',   description:'Demo auto service with tech dark design, glitch effects, animated stats, reviews and online booking.',              link:'http://localhost:8086', image:`${BASE}/screenshots/voltgarage.png` },
];

/* ─── Map project to screenshot ─────────────────────────────────── */
function projectImage(title: string, fallback: string): string {
  const t = title.toLowerCase();
  if (t.includes('volt') || t.includes('garage'))                                                                                           return `${BASE}/screenshots/voltgarage.png`;
  if (t.includes('auto') || t.includes('apex') || t.includes('motor') || t.includes('car'))                                               return `${BASE}/screenshots/autoservice.png`;
  if (t.includes('barber') || t.includes('hair') || t.includes('cut'))                                                                     return `${BASE}/screenshots/barbershop.png`;
  if (t.includes('restaurant') || t.includes('bella'))                                                                                     return `${BASE}/screenshots/restaurant.png`;
  if (t.includes('brew') || t.includes('soul') || t.includes('coffee') || t.includes('café') || t.includes('cafe'))                       return `${BASE}/screenshots/cafe.png`;
  if (t.includes('sultan') || t.includes('döner') || t.includes('kebab'))                                                                  return `${BASE}/screenshots/kebab.png`;
  return fallback;
}

/* ─── Infer tags ─────────────────────────────────────────────────── */
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
  const [education,  setEducation]  = useState<Education[]>([]);
  const [form,       setForm]       = useState({ name:'', email:'', message:'' });
  const [formStatus, setFormStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle');
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [tgCopied,   setTgCopied]   = useState(false);
  const [activeTab,  setActiveTab]  = useState<'services'|'skills'>('services');
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${y * 0.08}px, ${y * -0.12}px)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${y * -0.06}px, ${y * 0.1}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const staticJson = `${process.env.PUBLIC_URL}/static-data.json`;

    const loadStatic = () =>
      fetch(staticJson)
        .then(r => r.json())
        .then(d => {
          if (d.profile)              setProfile(d.profile);
          if (d.projects?.length)     setProjects(d.projects);
          if (d.skills?.length)       setSkills(d.skills);
          if (d.education?.length)    setEducation(d.education);
        })
        .catch(() => {
          setProfile(STATIC_PROFILE);
          setProjects(STATIC_PROJECTS);
          setSkills(STATIC_SKILLS);
        });

    Promise.all([
      fetch(`${API}/profile`).then(r => r.json()),
      fetch(`${API}/projects`).then(r => r.json()),
      fetch(`${API}/skills`).then(r => r.json()),
      fetch(`${API}/education`).then(r => r.json()),
    ]).then(([profile, projects, skills, education]) => {
      setProfile(profile);
      setProjects(projects as Project[]);
      setSkills(skills);
      setEducation(education);
    }).catch(loadStatic);
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
    {href:'#skills',     label:t('nav_skills')},
    {href:'#projects',   label:t('nav_projects')},
    {href:'#contact',    label:t('nav_contact')},
  ];

  const sectionHead = (label: string) => (
    <div className="section-head" style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
      <div style={{ width:3, height:24, background:DARK, borderRadius:2 }}/>
      <h2 style={{ fontSize:20, fontWeight:700, color:DARK, margin:0 }}>{label}</h2>
    </div>
  );

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: 8,
    padding: '12px 16px',
    color: DARK,
    fontSize: 14,
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
    fontFamily: '"Inter",system-ui,sans-serif',
  };

  const glassCard: React.CSSProperties = {
    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.8)',
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0,0,0,0.07)',
    transition: 'transform 0.22s, box-shadow 0.22s, border 0.22s',
  };

  return (
    <div style={{ fontFamily:'"Inter",system-ui,sans-serif', background:'#EBEBEB', minHeight:'100vh', color:DARK }}>

      {/* BLOBS WITH PARALLAX */}
      <div ref={blob1Ref} className="blob-1" style={{ position:'fixed', top:'-100px', right:'-100px', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle, rgba(220,100,100,0.55) 0%, transparent 70%)', filter:'blur(80px)', zIndex:0, pointerEvents:'none' }}/>
      <div ref={blob2Ref} className="blob-2" style={{ position:'fixed', bottom:'-150px', left:'-150px', width:750, height:750, borderRadius:'50%', background:'radial-gradient(circle, rgba(30,30,30,0.45) 0%, transparent 70%)', filter:'blur(90px)', zIndex:0, pointerEvents:'none' }}/>

      {/* NAV */}
      <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(235,235,235,0.75)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid rgba(0,0,0,0.08)' }}>
        <div className="nav-inner" style={{ display:'flex', alignItems:'center', padding:'0 32px', height:60, maxWidth:1200, margin:'0 auto' }}>
          <span className="nav-logo" style={{ fontWeight:800, fontSize:17, color:DARK, flex:1 }}>{profile?.name ?? 'Yan Oleksiuk'}</span>
          <div className="nav-links" style={{ display:'flex', gap:4 }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{ color:SUBTLE, textDecoration:'none', padding:'6px 14px', borderRadius:8, fontSize:12, fontWeight:500, transition:'color 0.2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.color=DARK; }}
                onMouseLeave={e=>{ e.currentTarget.style.color=SUBTLE; }}
              >{l.label}</a>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, flex:1, justifyContent:'flex-end' }}>
            <div className="lang-btns" style={{ display:'flex', alignItems:'center', gap:6 }}>
              {['en','de','uk'].map(lang => (
                <button key={lang} className="lang-btn" onClick={()=>i18n.changeLanguage(lang)}
                  style={{ background:i18n.language===lang?DARK:'rgba(0,0,0,0.06)', color:i18n.language===lang?'#fff':SUBTLE, border:`1px solid ${i18n.language===lang?DARK:'rgba(0,0,0,0.12)'}`, padding:'3px 10px', borderRadius:6, cursor:'pointer', fontWeight:600, fontSize:11, transition:'all 0.2s' }}
                >{lang.toUpperCase()}</button>
              ))}
            </div>
            <button className="mob-hamburger" onClick={()=>setMenuOpen(!menuOpen)}
              style={{ background:'transparent', border:'1px solid rgba(0,0,0,0.12)', color:SUBTLE, padding:'6px 10px', borderRadius:8, cursor:'pointer', fontSize:16 }}
            >☰</button>
          </div>
        </div>
        {menuOpen && (
          <div className="mob-menu" style={{ background:'rgba(235,235,235,0.95)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderTop:'1px solid rgba(0,0,0,0.08)', padding:'8px 20px 20px' }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setMenuOpen(false)} style={{ display:'block', color:MID, textDecoration:'none', padding:'12px 0', fontSize:15, fontWeight:500, borderBottom:'1px solid rgba(0,0,0,0.06)' }}>{l.label}</a>
            ))}
            <div style={{ display:'flex', gap:8, marginTop:16 }}>
              {['en','de','uk'].map(lang => (
                <button key={lang} onClick={()=>{ i18n.changeLanguage(lang); setMenuOpen(false); }}
                  style={{ background:i18n.language===lang?DARK:'rgba(0,0,0,0.06)', color:i18n.language===lang?'#fff':SUBTLE, border:`1px solid ${i18n.language===lang?DARK:'rgba(0,0,0,0.12)'}`, padding:'5px 14px', borderRadius:6, cursor:'pointer', fontWeight:600, fontSize:12 }}
                >{lang.toUpperCase()}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div style={{ position:'relative', zIndex:1 }}>

        {/* HERO */}
        <header className="hero-pad" style={{ maxWidth:1200, margin:'0 auto', padding:'70px 32px 56px', position:'relative' }}>
          <div className="hero-layout" style={{ display:'flex', alignItems:'center', gap:40 }}>
            <div style={{ flex:1, minWidth:0 }}>
              <Reveal>
                <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#ffffff', border:'1px solid rgba(0,0,0,0.12)', color:DARK, padding:'6px 16px', borderRadius:20, fontSize:12, fontWeight:600, marginBottom:20, letterSpacing:0.4 }}>
                  <span style={{ width:7, height:7, background:'#4ade80', borderRadius:'50%', display:'inline-block' }}/>
                  {t('available')}
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="hero-h1" style={{ fontSize:'clamp(34px,6vw,68px)', fontWeight:900, lineHeight:1.05, margin:'0 0 10px', color:DARK, letterSpacing:'-0.5px' }}>
                  {t('hero_title')} <span style={{ color:DARK }}>{profile?.name?.split(' ')[0] ?? 'Yan'}</span>
                </h1>
                <div className="hero-subtitle" style={{ fontSize:'clamp(15px,2.5vw,21px)', fontWeight:600, color:MID, margin:'0 0 18px', letterSpacing:'-0.2px' }}>
                  {profile?.title ?? t('hero_subtitle')}
                </div>
              </Reveal>
              <Reveal delay={160}>
                {profile?.bio && <p className="hero-bio" style={{ fontSize:16, color:DARK, maxWidth:520, lineHeight:1.8, margin:'0 0 12px', fontWeight:400, opacity:0.82 }}>{profile.bio}</p>}
                <div className="hero-tags" style={{ display:'flex', flexWrap:'wrap', gap:'6px 10px', maxWidth:520 }}>
                  {['React','TypeScript','Symfony','MySQL','Docker'].map(tag => (
                    <span className="hero-tag" key={tag} style={{ fontSize:12, color:DARK, fontWeight:600, background:'rgba(0,0,0,0.07)', padding:'3px 10px', borderRadius:6 }}>{tag}</span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="cta-wrap" style={{ marginTop:28, display:'flex', gap:12, flexWrap:'wrap' }}>
                  <a href="#projects"
                    style={{ background:DARK, color:'#ffffff', padding:'14px 34px', borderRadius:8, textDecoration:'none', fontWeight:700, fontSize:14, transition:'opacity 0.2s' }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.opacity='0.85'; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.opacity='1'; }}
                  >{t('view_projects')}</a>
                  <a href="#contact"
                    style={{ background:'#ffffff', color:DARK, border:'1px solid rgba(0,0,0,0.15)', padding:'14px 34px', borderRadius:8, textDecoration:'none', fontWeight:600, fontSize:14, transition:'border-color 0.2s' }}
                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=DARK; }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='rgba(0,0,0,0.15)'; }}
                  >{t('contact_me')}</a>
                </div>
              </Reveal>
            </div>
            <div className="hero-visual"><HeroVisual /></div>
          </div>
        </header>

        <Ticker />

        {/* SERVICES + SKILLS TABS */}
        <section id="skills" style={{ background:'transparent' }}>
          <div className="section-pad" style={{ maxWidth:1200, margin:'0 auto', padding:'48px 32px' }}>
            {/* Tab switcher */}
            <div style={{ display:'flex', gap:8, marginBottom:28 }}>
              {(['services','skills'] as const).map(tab => (
                <button key={tab} onClick={()=>setActiveTab(tab)}
                  style={{
                    padding:'8px 22px', borderRadius:10, border:'none', cursor:'pointer', fontWeight:600, fontSize:13,
                    background: activeTab===tab ? DARK : 'rgba(255,255,255,0.55)',
                    color: activeTab===tab ? '#ffffff' : SUBTLE,
                    backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
                    boxShadow: activeTab===tab ? '0 4px 16px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
                    outline: activeTab===tab ? `2px solid ${DARK}` : '1px solid rgba(255,255,255,0.8)',
                    transition:'all 0.2s',
                  }}
                >
                  {tab === 'services' ? t('tab_services') : t('tab_skills')}
                </button>
              ))}
            </div>

            {/* What I Build */}
            {activeTab === 'services' && (
              <div className="services-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
                {([
                  t('service_1'), t('service_2'), t('service_3'),
                  t('service_4'), t('service_5'), t('service_6'),
                ] as string[]).map((name, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div style={{
                      background:'rgba(255,255,255,0.55)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
                      border:'1px solid rgba(255,255,255,0.8)', borderRadius:12, boxShadow:'0 4px 16px rgba(0,0,0,0.06)',
                      padding:'14px 20px', display:'flex', alignItems:'center', gap:12,
                    }}>
                      <span style={{ color:'#22c55e', fontSize:16, fontWeight:700, flexShrink:0 }}>✓</span>
                      <span style={{ fontSize:14, fontWeight:500, color:DARK }}>{name}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Skills */}
            {activeTab === 'skills' && (
              skills.length === 0
                ? <p style={{ color:SUBTLE }}>{t('no_skills')}</p>
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
                              <div style={{ fontSize:10, fontWeight:700, letterSpacing:2.5, color:SUBTLE, textTransform:'uppercase', marginBottom:12 }}>{cat}</div>
                              <div className="skill-cards" style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                                {items.map(s => {
                                  const color = techColor(s.name);
                                  return (
                                    <div key={s.id} className="skill-card"
                                      style={{ background:'rgba(255,255,255,0.55)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.8)', borderRadius:12, boxShadow:'0 4px 16px rgba(0,0,0,0.06)', padding:'16px 10px', textAlign:'center', cursor:'default', transition:'transform 0.2s, box-shadow 0.2s', width:100, flexShrink:0 }}
                                      onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'; }}
                                      onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform='translateY(0)'; el.style.boxShadow='0 4px 16px rgba(0,0,0,0.06)'; }}
                                    >
                                      <div className="skill-icon" style={{ width:34, height:34, borderRadius:'50%', background:'#ffffff', border:`1.5px solid ${color}55`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 8px', color, fontWeight:800, fontSize:10 }}>
                                        {s.name.slice(0,3).toUpperCase()}
                                      </div>
                                      <div className="skill-name" style={{ fontSize:11, fontWeight:500, color:'#1A1A1A', lineHeight:1.3 }}>{s.name}</div>
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
            )}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="section-pad" style={{ maxWidth:1200, margin:'0 auto', padding:'48px 32px' }}>
            {sectionHead(t('nav_projects'))}
            {projects.length === 0
              ? <p style={{ color:SUBTLE }}>{t('no_projects')}</p>
              : <div className="proj-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
                  {projects.map((p, i) => {
                    const tags   = inferTags(p.title, p.description);
                    const imgSrc = p.image ?? projectImage(p.title, '');
                    return (
                      <Reveal key={p.id} delay={i*100}>
                        <div
                          className="proj-card"
                          style={{ ...glassCard, overflow:'hidden' }}
                          onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform='translateY(-5px)'; el.style.boxShadow='0 20px 44px rgba(0,0,0,0.13), 0 0 0 2px rgba(0,0,0,0.22)'; el.style.border='1px solid rgba(0,0,0,0.28)'; }}
                          onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform='translateY(0)'; el.style.boxShadow='0 8px 24px rgba(0,0,0,0.07)'; el.style.border='1px solid rgba(255,255,255,0.8)'; }}
                        >
                          <div style={{ background:'rgba(255,255,255,0.4)', padding:'7px 12px', display:'flex', alignItems:'center', gap:5, borderBottom:'1px solid rgba(0,0,0,0.06)' }}>
                            {['#ff5f57','#febc2e','#28c840'].map((c,j) => <div key={j} style={{ width:8, height:8, borderRadius:'50%', background:c }}/>)}
                            <div style={{ flex:1, height:13, background:'rgba(0,0,0,0.05)', borderRadius:3, marginLeft:6, border:'1px solid rgba(0,0,0,0.06)' }}/>
                          </div>
                          <div style={{ height:150, overflow:'hidden' }}>
                            {imgSrc
                              ? <img src={imgSrc} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block' }}/>
                              : <div style={{ height:'100%', background:'rgba(0,0,0,0.04)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:3, color:'rgba(0,0,0,0.2)', textTransform:'uppercase' }}>PREVIEW</span>
                                </div>
                            }
                          </div>
                          <div style={{ padding:20 }}>
                            <h3 style={{ fontSize:15, fontWeight:700, margin:'0 0 8px', color:DARK }}>{p.title}</h3>
                            <p style={{ color:'#555555', fontSize:13, lineHeight:1.6, margin:'0 0 14px' }}>{p.description}</p>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:8 }}>
                              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                                {tags.map(tag => (
                                  <span key={tag} style={{ background:'rgba(0,0,0,0.07)', color:'#333333', fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:6 }}>{tag}</span>
                                ))}
                              </div>
                              {p.link && (
                                <a href={p.link} target="_blank" rel="noreferrer"
                                  style={{ color:'#ffffff', background:DARK, fontSize:13, textDecoration:'none', fontWeight:700, display:'inline-flex', alignItems:'center', gap:5, padding:'5px 13px', borderRadius:6, flexShrink:0, whiteSpace:'nowrap', transition:'opacity 0.2s' }}
                                  onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.opacity='0.8'; const s=e.currentTarget.querySelector<HTMLSpanElement>('.arrow'); if(s) s.style.transform='translateX(4px)'; }}
                                  onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.opacity='1'; const s=e.currentTarget.querySelector<HTMLSpanElement>('.arrow'); if(s) s.style.transform='translateX(0)'; }}
                                >
                                  {t('view_project')}<span className="arrow" style={{ display:'inline-block', transition:'transform 0.2s', marginLeft:4 }}>→</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
            }
          </div>
        </section>

        {/* EXPERIENCE */}
        {/* EDUCATION */}
        {education.length > 0 && (
          <section id="education">
            <div className="section-pad" style={{ maxWidth:1200, margin:'0 auto', padding:'48px 32px' }}>
              {sectionHead(t('nav_education'))}
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {education.map((edu, i) => (
                  <Reveal key={edu.id} delay={i*80}>
                    <div
                      style={{ ...glassCard, padding:24 }}
                      onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 16px 40px rgba(0,0,0,0.12)'; }}
                      onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform='translateY(0)'; el.style.boxShadow='0 8px 24px rgba(0,0,0,0.08)'; }}
                    >
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:8, marginBottom: edu.description ? 12 : 0 }}>
                        <div>
                          <div style={{ fontSize:16, fontWeight:700, color:DARK, marginBottom:4 }}>{edu.degree}</div>
                          <div style={{ fontSize:13, fontWeight:600, color:MID }}>{edu.institution}</div>
                        </div>
                        <div style={{ fontSize:12, color:SUBTLE, background:'rgba(0,0,0,0.05)', border:'1px solid rgba(0,0,0,0.08)', padding:'4px 12px', borderRadius:20, whiteSpace:'nowrap' }}>
                          {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                        </div>
                      </div>
                      {edu.description && <p style={{ color:SUBTLE, fontSize:13, lineHeight:1.7, margin:0 }}>{edu.description}</p>}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section id="contact" style={{ background:'transparent' }}>
          <div className="section-pad" style={{ maxWidth:840, margin:'0 auto', padding:'48px 32px' }}>
            {sectionHead(t('nav_contact'))}
            <div className="contact-card" style={{ background:'rgba(255,255,255,0.55)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.8)', borderRadius:20, padding:48, boxShadow:'0 8px 32px rgba(0,0,0,0.07)' }}>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:40 }}>
                <Reveal>
                  <p style={{ color:SUBTLE, lineHeight:1.8, marginBottom:24, fontSize:14 }}>{t('contact_intro')}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {profile?.email && (
                      <a href={`mailto:${profile.email}`}
                        style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.6)', border:'1px solid rgba(0,0,0,0.12)', color:DARK, textDecoration:'none', fontSize:13, fontWeight:600, padding:'10px 18px', borderRadius:10, transition:'border-color 0.2s' }}
                        onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=DARK; }}
                        onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='rgba(0,0,0,0.12)'; }}
                      >
                        ✉ {profile.email}
                      </a>
                    )}
                    {profile?.telegram && (
                      <div style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
                        <button
                          onClick={() => { const u = profile.telegram!.replace('https://t.me/','@'); navigator.clipboard.writeText(u); setTgCopied(true); setTimeout(()=>setTgCopied(false), 2000); }}
                          style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,136,204,0.08)', border:'1px solid rgba(0,136,204,0.3)', color:'#0088CC', cursor:'pointer', fontSize:13, fontWeight:600, padding:'10px 18px', borderRadius:10, transition:'all 0.2s', fontFamily:'inherit' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
                          {tgCopied ? '✓ Copied!' : 'Telegram'}
                        </button>
                        <a href={profile.telegram} target="_blank" rel="noreferrer" title="Open in Telegram"
                          style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:38, height:38, background:'rgba(0,136,204,0.08)', border:'1px solid rgba(0,136,204,0.3)', color:'#0088CC', borderRadius:10, textDecoration:'none', flexShrink:0 }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                      </div>
                    )}
                    {profile?.github && (
                      <a href={profile.github} target="_blank" rel="noreferrer"
                        style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.6)', border:'1px solid rgba(0,0,0,0.12)', color:DARK, textDecoration:'none', fontSize:13, fontWeight:600, padding:'10px 18px', borderRadius:10, transition:'border-color 0.2s' }}
                        onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor=DARK; }}
                        onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor='rgba(0,0,0,0.12)'; }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <form onSubmit={handleContact} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                    {(['name','email'] as const).map(field => (
                      <input key={field} type={field==='email'?'email':'text'} placeholder={t(`form_${field}`)} required value={form[field]}
                        onChange={e=>setForm(f=>({...f,[field]:e.target.value}))}
                        style={inputStyle}
                        onFocus={e=>{ e.currentTarget.style.borderColor=DARK; }}
                        onBlur={e=>{ e.currentTarget.style.borderColor='rgba(0,0,0,0.12)'; }}
                      />
                    ))}
                    <textarea placeholder={t('form_message')} required rows={4} value={form.message}
                      onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                      style={{ ...inputStyle, resize:'vertical' }}
                      onFocus={e=>{ e.currentTarget.style.borderColor=DARK; }}
                      onBlur={e=>{ e.currentTarget.style.borderColor='rgba(0,0,0,0.12)'; }}
                    />
                    <button type="submit" disabled={formStatus==='sending'}
                      style={{ background:DARK, color:'#ffffff', border:'none', borderRadius:8, padding:'13px', fontWeight:700, fontSize:14, cursor:'pointer', width:'100%', transition:'opacity 0.2s' }}
                      onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.opacity='0.85'; }}
                      onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.opacity='1'; }}
                    >
                      {formStatus==='sending' ? t('form_sending') : t('form_send')}
                    </button>
                    {formStatus==='ok'    && <p style={{ color:'#16a34a', margin:0, fontSize:13 }}>{t('form_success')}</p>}
                    {formStatus==='error' && <p style={{ color:'#dc2626', margin:0, fontSize:13 }}>{t('form_error')}</p>}
                  </form>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <footer style={{ background:'rgba(235,235,235,0.8)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)', borderTop:'1px solid rgba(0,0,0,0.08)', textAlign:'center', padding:'28px 20px' }}>
          <div style={{ fontSize:16, fontWeight:800, color:DARK, marginBottom:6 }}>{profile?.name ?? 'Yan Oleksiuk'}</div>
          <p style={{ fontSize:12, color:SUBTLE, margin:0 }}>{t('footer')}</p>
        </footer>
      </div>

      <style>{`
        @keyframes ticker    { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
        @keyframes floatCard { from{transform:translateY(0)} to{transform:translateY(-12px)} }
        @keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.75)} }
        html, body { overflow-x:hidden; }
        * { box-sizing:border-box; }
        .mob-hamburger { display:none!important }

        @media (max-width:768px) {
          /* BLOBS */
          .blob-1, .blob-2 { display:none!important }

          /* BACKGROUND */
          body {
            background: linear-gradient(160deg, #F5F5F5 0%, #ECEAEA 40%, #E8E8E8 100%)!important;
            min-height: 100vh;
          }

          /* NAV */
          .mob-hamburger { display:flex!important }
          .nav-links     { display:none!important }
          .nav-inner     { padding:0 16px!important }
          .nav-logo      { font-size:18px!important }
          .lang-btn      { padding:4px 9px!important; font-size:13px!important }
          .lang-btns     { gap:4px!important }
          .mob-menu a    { font-size:16px!important; padding:14px 0!important }

          /* HERO */
          .hero-pad      { padding:36px 20px 28px!important }
          .hero-layout   { flex-direction:column!important; gap:0!important }
          .hero-visual   { display:none!important }
          .hero-h1       { font-size:clamp(2rem,8vw,2.8rem)!important }
          .hero-subtitle { font-size:18px!important; font-weight:500!important }
          .hero-bio      { font-size:15px!important; line-height:1.6!important }
          .hero-tags     { display:flex!important; flex-wrap:wrap!important; gap:8px!important }
          .hero-tag      { font-size:13px!important; padding:6px 12px!important; border-radius:20px!important; width:auto!important }

          /* CTA BUTTONS */
          .cta-wrap   { display:flex!important; gap:12px!important; flex-wrap:wrap!important }
          .cta-wrap a { flex:1!important; max-width:180px!important; width:auto!important; text-align:center!important; padding:12px 24px!important; border-radius:8px!important; font-size:14px!important }

          /* SKILLS */
          .skill-cards { display:grid!important; grid-template-columns:repeat(3,1fr)!important; gap:8px!important }
          .skill-card  { width:auto!important; padding:12px 8px!important; flex-shrink:unset!important }
          .skill-icon  { width:36px!important; height:36px!important; font-size:10px!important }
          .skill-name  { font-size:11px!important }

          /* PROJECTS */
          .proj-grid { grid-template-columns:1fr!important }
          .proj-card { padding:0!important; touch-action:manipulation }

          /* SERVICES */
          .services-grid { grid-template-columns:repeat(2,1fr)!important; font-size:14px!important }

          /* CONTACT */
          .contact-card { padding:20px!important }

          /* GENERAL */
          .section-pad  { padding:60px 20px!important }
          .section-head { margin-bottom:20px!important }
          .section-head h2 { font-size:clamp(1.6rem,6vw,2.2rem)!important }
        }

        @media (max-width:400px) {
          .lang-btns { display:none!important }
        }
      `}</style>
    </div>
  );
}

export default App;
