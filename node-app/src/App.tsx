import { useEffect, useState, FormEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

interface Profile { id:number; name:string; title:string; bio:string; avatar:string|null; }
interface Project { id:number; title:string; description:string; link:string|null; image:string|null; }
interface Skill { id:number; name:string; level:string|null; category:string|null; }
interface Experience { id:number; company:string; position:string; startDate:string; endDate:string|null; description:string|null; }
interface Education { id:number; institution:string; degree:string; startDate:string; endDate:string|null; description:string|null; }

const API = `http://${window.location.hostname}:8080/api`;

function Robot() {
  const [eyeX, setEyeX] = useState(0);
  const [eyeY, setEyeY] = useState(0);
  const [legAngle, setLegAngle] = useState(0);
  const robotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let raf: number;
    const swing = () => {
      frame += 0.04;
      setLegAngle(Math.sin(frame) * 20);
      raf = requestAnimationFrame(swing);
    };
    raf = requestAnimationFrame(swing);

    const onMove = (e: MouseEvent) => {
      if (!robotRef.current) return;
      const rect = robotRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx*dx + dy*dy);
      setEyeX(Math.max(-2.5, Math.min(2.5, (dx/dist)*2.5)));
      setEyeY(Math.max(-2, Math.min(2, (dy/dist)*2)));
    };
    window.addEventListener('mousemove', onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);

  const neon = '#b44fff';
  const neonDark = '#7c22cc';
  const neonGlow = 'rgba(180,79,255,0.6)';

  return (
    <div ref={robotRef} style={{display:'inline-flex', flexDirection:'column', alignItems:'center', marginLeft:10, position:'relative', top:6, cursor:'default'}}>
      {/* Antenna */}
      <div style={{width:3, height:10, background:neon, borderRadius:2, boxShadow:`0 0 6px ${neonGlow}`, marginBottom:0, position:'relative'}}>
        <div style={{width:8, height:8, background:neon, borderRadius:'50%', position:'absolute', top:-8, left:-2.5, boxShadow:`0 0 8px ${neonGlow}, 0 0 16px ${neonGlow}`}}/>
      </div>
      {/* Head */}
      <div style={{
        width:42, height:36, background:`linear-gradient(135deg,#3a006f,#5c00a8)`,
        borderRadius:10, border:`2px solid ${neon}`,
        boxShadow:`0 0 12px ${neonGlow}, 0 0 24px rgba(180,79,255,0.2), inset 0 0 8px rgba(180,79,255,0.1)`,
        position:'relative', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
      }}>
        {/* Screen face */}
        <div style={{
          position:'absolute', inset:4, background:'#1a0030',
          borderRadius:6, border:`1px solid ${neonDark}`,
          display:'flex', alignItems:'center', justifyContent:'center', gap:5,
        }}>
          {[0,1].map(i => (
            <div key={i} style={{
              width:10, height:10, background:'#1a0030',
              border:`2px solid ${neon}`, borderRadius:'50%',
              boxShadow:`0 0 6px ${neonGlow}`, position:'relative', overflow:'hidden',
            }}>
              <div style={{
                width:5, height:5, background:neon, borderRadius:'50%',
                position:'absolute',
                left: 2 + eyeX,
                top: 2 + eyeY,
                transition:'left 0.08s, top 0.08s',
                boxShadow:`0 0 4px ${neonGlow}`,
              }}/>
            </div>
          ))}
        </div>
        {/* Ears */}
        <div style={{position:'absolute', left:-7, top:10, width:5, height:14, background:`linear-gradient(#5c00a8,#3a006f)`, borderRadius:'3px 0 0 3px', border:`1px solid ${neon}`, boxShadow:`0 0 6px ${neonGlow}`}}/>
        <div style={{position:'absolute', right:-7, top:10, width:5, height:14, background:`linear-gradient(#5c00a8,#3a006f)`, borderRadius:'0 3px 3px 0', border:`1px solid ${neon}`, boxShadow:`0 0 6px ${neonGlow}`}}/>
      </div>
      {/* Neck */}
      <div style={{width:6, height:5, background:neonDark, boxShadow:`0 0 4px ${neonGlow}`}}/>
      {/* Body */}
      <div style={{
        width:38, height:28, background:`linear-gradient(135deg,#3a006f,#5c00a8)`,
        borderRadius:8, border:`2px solid ${neon}`,
        boxShadow:`0 0 10px ${neonGlow}, inset 0 0 6px rgba(180,79,255,0.1)`,
        position:'relative', display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        {/* Chest light */}
        <div style={{width:10, height:10, background:neon, borderRadius:'50%', boxShadow:`0 0 8px ${neonGlow}, 0 0 16px ${neonGlow}`}}/>
        {/* Body side lines */}
        <div style={{position:'absolute', left:4, top:4, width:2, height:8, background:neonDark, borderRadius:1, boxShadow:`0 0 4px ${neonGlow}`}}/>
        <div style={{position:'absolute', right:4, top:4, width:2, height:8, background:neonDark, borderRadius:1, boxShadow:`0 0 4px ${neonGlow}`}}/>
        {/* Arms */}
        <div style={{position:'absolute', left:-10, top:4, width:8, height:6, background:`linear-gradient(#5c00a8,#3a006f)`, borderRadius:3, border:`1px solid ${neon}`, boxShadow:`0 0 6px ${neonGlow}`}}/>
        <div style={{position:'absolute', right:-10, top:4, width:8, height:6, background:`linear-gradient(#5c00a8,#3a006f)`, borderRadius:3, border:`1px solid ${neon}`, boxShadow:`0 0 6px ${neonGlow}`}}/>
      </div>
      {/* Legs */}
      <div style={{display:'flex', gap:6, marginTop:2}}>
        {[1,-1].map((dir,i) => (
          <div key={i} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{
              width:8, height:18, background:`linear-gradient(#5c00a8,#3a006f)`,
              borderRadius:'3px 3px 4px 4px', border:`1.5px solid ${neon}`,
              boxShadow:`0 0 6px ${neonGlow}`,
              transformOrigin:'top center',
              transform:`rotate(${dir * legAngle}deg)`,
            }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function Ticker() {
  const items = [
    '⚡ Full Stack Development',
    '🎨 UI/UX Design',
    '🐘 PHP & Symfony',
    '⚛️ React & TypeScript',
    '🐬 MySQL & Doctrine',
    '🐳 Docker & DevOps',
    '🌐 REST API',
    '🎯 Responsive Design',
    '🔒 Authentication & Security',
    '📱 Mobile-First',
    '🚀 Git & GitHub Pages',
    '🛠️ EasyAdmin',
  ];
  const all = [...items, ...items];
  return (
    <div style={{overflow:'hidden', background:'rgba(99,102,241,0.08)', borderTop:'1px solid #1e293b', borderBottom:'1px solid #1e293b', padding:'12px 0'}}>
      <div style={{
        display:'flex', gap:48,
        animation:'ticker 30s linear infinite',
        whiteSpace:'nowrap',
      }}>
        {all.map((item, i) => (
          <span key={i} style={{fontSize:13, fontWeight:600, color:'#818cf8', letterSpacing:0.5, flexShrink:0}}>
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState<Profile|null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [formStatus, setFormStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${API}/profile`).then(r=>r.json()).then(setProfile).catch(()=>{});
    fetch(`${API}/projects`).then(r=>r.json()).then(setProjects).catch(()=>{});
    fetch(`${API}/skills`).then(r=>r.json()).then(setSkills).catch(()=>{});
    fetch(`${API}/experience`).then(r=>r.json()).then(setExperience).catch(()=>{});
    fetch(`${API}/education`).then(r=>r.json()).then(setEducation).catch(()=>{});
  }, []);

  const handleContact = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch(`${API}/contact`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form),
      });
      if (res.ok) { setFormStatus('ok'); setForm({name:'',email:'',message:''}); }
      else setFormStatus('error');
    } catch { setFormStatus('error'); }
  };

  const formatDate = (date:string|null) => {
    if (!date) return t('present');
    return new Date(date).toLocaleDateString(i18n.language, {year:'numeric',month:'short'});
  };

  const navLinks = [
    {href:'#skills', label:t('nav_skills')},
    {href:'#experience', label:t('nav_experience')},
    {href:'#education', label:t('nav_education')},
    {href:'#projects', label:t('nav_projects')},
    {href:'#contact', label:t('nav_contact')},
  ];

  const card: React.CSSProperties = {
    background:'#0f172a', border:'1px solid #1e293b', borderRadius:16, padding:24,
  };

  return (
    <div style={{fontFamily:'"Inter",system-ui,sans-serif', background:'#020817', minHeight:'100vh', color:'#e2e8f0'}}>
      <div style={{position:'fixed', inset:0, zIndex:0, pointerEvents:'none', background:'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 40%)'}}/>

      {/* NAV */}
      <nav style={{position:'sticky', top:0, zIndex:100, background:'rgba(2,8,23,0.92)', backdropFilter:'blur(16px)', borderBottom:'1px solid #1e293b'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:60, maxWidth:960, margin:'0 auto'}}>
          <div style={{display:'flex', alignItems:'flex-end'}}>
            <span style={{fontWeight:800, fontSize:17, color:'#6366f1'}}>{profile?.name ?? 'Yan Oleksiuk'}</span>
            <Robot />
          </div>
          <div style={{display:'flex', gap:2}}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{color:'#64748b', textDecoration:'none', padding:'6px 10px', borderRadius:8, fontSize:12, fontWeight:500}}
                onMouseEnter={e=>(e.currentTarget.style.color='#6366f1')}
                onMouseLeave={e=>(e.currentTarget.style.color='#64748b')}
              >{l.label}</a>
            ))}
          </div>
          <div style={{display:'flex', alignItems:'center', gap:6}}>
            {['en','de','uk'].map(lang => (
              <button key={lang} onClick={()=>i18n.changeLanguage(lang)} style={{
                background: i18n.language===lang ? '#6366f1' : 'transparent',
                color: i18n.language===lang ? '#fff' : '#64748b',
                border:'1px solid', borderColor: i18n.language===lang ? '#6366f1' : '#1e293b',
                padding:'3px 10px', borderRadius:6, cursor:'pointer', fontWeight:600, fontSize:11,
              }}>{lang.toUpperCase()}</button>
            ))}
            <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:'transparent', border:'1px solid #1e293b', color:'#64748b', padding:'6px 10px', borderRadius:8, cursor:'pointer', fontSize:16}}>☰</button>
          </div>
        </div>
        {menuOpen && (
          <div style={{background:'#020817', borderTop:'1px solid #1e293b', padding:'8px 20px 16px'}}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setMenuOpen(false)} style={{display:'block', color:'#64748b', textDecoration:'none', padding:'10px 0', fontSize:15, fontWeight:500, borderBottom:'1px solid #1e293b'}}>{l.label}</a>
            ))}
          </div>
        )}
      </nav>

      <div style={{position:'relative', zIndex:1}}>
        {/* HERO */}
        <header style={{maxWidth:960, margin:'0 auto', padding:'80px 20px 64px'}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:8, background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.3)', color:'#818cf8', padding:'6px 16px', borderRadius:24, fontSize:12, fontWeight:600, marginBottom:28, letterSpacing:0.5}}>
            <span style={{width:7, height:7, background:'#4ade80', borderRadius:'50%', display:'inline-block'}}/>
            {t('available')}
          </div>
          <h1 style={{fontSize:'clamp(32px,6vw,64px)', fontWeight:800, lineHeight:1.05, margin:'0 0 20px', background:'linear-gradient(135deg,#e2e8f0 0%,#94a3b8 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
            {t('hero_title')}{' '}
            <span style={{background:'linear-gradient(135deg,#6366f1,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}}>
              {profile?.title ?? t('hero_highlight')}
            </span>
          </h1>
          <p style={{fontSize:15, color:'#64748b', maxWidth:520, lineHeight:1.8, margin:'0 0 8px'}}>{profile?.bio ?? t('hero_description')}</p>
          <a href="mailto:yan.oleksuyk7@gmail.com" style={{color:'#6366f1', fontSize:13, textDecoration:'none', fontWeight:500}}>✉ yan.oleksuyk7@gmail.com</a>
          <div style={{marginTop:28, display:'flex', gap:12, flexWrap:'wrap'}}>
            <a href="#projects" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', padding:'12px 28px', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:13, boxShadow:'0 4px 20px rgba(99,102,241,0.4)'}}>{t('view_projects')}</a>
            <a href="#contact" style={{border:'1px solid #1e293b', color:'#94a3b8', padding:'12px 28px', borderRadius:12, textDecoration:'none', fontWeight:600, fontSize:13, background:'#0f172a'}}>{t('contact_me')}</a>
          </div>
        </header>

        {/* TICKER */}
        <Ticker />

        {/* SKILLS */}
        <section id="skills" style={{background:'#0a0f1e'}}>
          <div style={{maxWidth:960, margin:'0 auto', padding:'64px 20px'}}>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:32}}>
              <div style={{width:3, height:24, background:'linear-gradient(#6366f1,#8b5cf6)', borderRadius:2}}/>
              <h2 style={{fontSize:20, fontWeight:700, color:'#e2e8f0'}}>{t('nav_skills')}</h2>
            </div>
            {skills.length===0
              ? <p style={{color:'#334155'}}>{t('no_skills')}</p>
              : <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
                  {skills.map(s => (
                    <span key={s.id} style={{background:'#0f172a', border:'1px solid #1e293b', padding:'7px 16px', borderRadius:24, fontSize:13, color:'#94a3b8', fontWeight:500, cursor:'default'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#6366f1';(e.currentTarget as HTMLElement).style.color='#818cf8';}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='#1e293b';(e.currentTarget as HTMLElement).style.color='#94a3b8';}}
                    >{s.name}{s.level ? ` · ${s.level}` : ''}</span>
                  ))}
                </div>
            }
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{background:'#020817'}}>
          <div style={{maxWidth:960, margin:'0 auto', padding:'64px 20px'}}>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:32}}>
              <div style={{width:3, height:24, background:'linear-gradient(#6366f1,#8b5cf6)', borderRadius:2}}/>
              <h2 style={{fontSize:20, fontWeight:700, color:'#e2e8f0'}}>{t('nav_experience')}</h2>
            </div>
            {experience.length===0
              ? <p style={{color:'#334155'}}>{t('no_experience')}</p>
              : <div style={{display:'flex', flexDirection:'column', gap:16}}>
                  {experience.map(exp => (
                    <div key={exp.id} style={{...card, borderLeft:'3px solid #6366f1'}}>
                      <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8}}>
                        <div>
                          <h3 style={{margin:0, fontSize:16, fontWeight:700, color:'#e2e8f0'}}>{exp.position}</h3>
                          <p style={{margin:'4px 0 0', color:'#6366f1', fontWeight:600, fontSize:13}}>{exp.company}</p>
                        </div>
                        <span style={{background:'#0a0f1e', color:'#475569', fontSize:11, padding:'4px 12px', borderRadius:20}}>
                          {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && <p style={{margin:'12px 0 0', color:'#64748b', fontSize:13, lineHeight:1.7}}>{exp.description}</p>}
                    </div>
                  ))}
                </div>
            }
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" style={{background:'#0a0f1e'}}>
          <div style={{maxWidth:960, margin:'0 auto', padding:'64px 20px'}}>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:32}}>
              <div style={{width:3, height:24, background:'linear-gradient(#6366f1,#8b5cf6)', borderRadius:2}}/>
              <h2 style={{fontSize:20, fontWeight:700, color:'#e2e8f0'}}>{t('nav_education')}</h2>
            </div>
            {education.length===0
              ? <p style={{color:'#334155'}}>{t('no_education')}</p>
              : <div style={{display:'flex', flexDirection:'column', gap:16}}>
                  {education.map(edu => (
                    <div key={edu.id} style={{...card, borderLeft:'3px solid #8b5cf6'}}>
                      <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8}}>
                        <div>
                          <h3 style={{margin:0, fontSize:16, fontWeight:700, color:'#e2e8f0'}}>{edu.degree}</h3>
                          <p style={{margin:'4px 0 0', color:'#8b5cf6', fontWeight:600, fontSize:13}}>{edu.institution}</p>
                        </div>
                        <span style={{background:'#020817', color:'#475569', fontSize:11, padding:'4px 12px', borderRadius:20}}>
                          {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                        </span>
                      </div>
                      {edu.description && <p style={{margin:'12px 0 0', color:'#64748b', fontSize:13, lineHeight:1.7}}>{edu.description}</p>}
                    </div>
                  ))}
                </div>
            }
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{background:'#020817'}}>
          <div style={{maxWidth:960, margin:'0 auto', padding:'64px 20px'}}>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:32}}>
              <div style={{width:3, height:24, background:'linear-gradient(#6366f1,#8b5cf6)', borderRadius:2}}/>
              <h2 style={{fontSize:20, fontWeight:700, color:'#e2e8f0'}}>{t('nav_projects')}</h2>
            </div>
            {projects.length===0
              ? <p style={{color:'#334155'}}>{t('no_projects')}</p>
              : <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:20}}>
                  {projects.map((p,i) => (
                    <div key={p.id} style={{...card, background:'linear-gradient(135deg,#0f172a,#0a0f1e)', transition:'transform 0.2s, box-shadow 0.2s'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLDivElement).style.boxShadow='0 8px 32px rgba(99,102,241,0.2)';}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='translateY(0)';(e.currentTarget as HTMLDivElement).style.boxShadow='none';}}
                    >
                      <div style={{width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${['#6366f1','#8b5cf6','#ec4899'][i%3]},${['#8b5cf6','#a78bfa','#f472b6'][i%3]})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:16}}>
                        {['🍽️','✂️','🔧'][i%3]}
                      </div>
                      <h3 style={{fontSize:15, fontWeight:700, marginBottom:8, color:'#e2e8f0'}}>{p.title}</h3>
                      <p style={{color:'#64748b', fontSize:13, lineHeight:1.6, marginBottom:16}}>{p.description}</p>
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{color:'#818cf8', fontSize:13, textDecoration:'none', fontWeight:600}}>{t('view_project')} →</a>}
                    </div>
                  ))}
                </div>
            }
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{background:'#0a0f1e'}}>
          <div style={{maxWidth:960, margin:'0 auto', padding:'64px 20px'}}>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:32}}>
              <div style={{width:3, height:24, background:'linear-gradient(#6366f1,#8b5cf6)', borderRadius:2}}/>
              <h2 style={{fontSize:20, fontWeight:700, color:'#e2e8f0'}}>{t('nav_contact')}</h2>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:32}}>
              <div>
                <p style={{color:'#64748b', lineHeight:1.8, marginBottom:24, fontSize:14}}>{t('contact_intro')}</p>
                <a href="mailto:yan.oleksuyk7@gmail.com" style={{display:'inline-flex', alignItems:'center', gap:8, background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.3)', color:'#818cf8', textDecoration:'none', fontSize:13, fontWeight:600, padding:'10px 18px', borderRadius:10}}>
                  ✉ yan.oleksuyk7@gmail.com
                </a>
              </div>
              <form onSubmit={handleContact} style={{display:'flex', flexDirection:'column', gap:12}}>
                {(['name','email'] as const).map(field => (
                  <input key={field} type={field==='email'?'email':'text'} placeholder={t(`form_${field}`)} required value={form[field]}
                    onChange={e=>setForm(f=>({...f,[field]:e.target.value}))}
                    style={{background:'#0f172a', border:'1px solid #1e293b', borderRadius:10, padding:'11px 14px', color:'#e2e8f0', fontSize:14, outline:'none'}}
                    onFocus={e=>(e.currentTarget.style.borderColor='#6366f1')}
                    onBlur={e=>(e.currentTarget.style.borderColor='#1e293b')}
                  />
                ))}
                <textarea placeholder={t('form_message')} required rows={4} value={form.message}
                  onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                  style={{background:'#0f172a', border:'1px solid #1e293b', borderRadius:10, padding:'11px 14px', color:'#e2e8f0', fontSize:14, resize:'vertical', outline:'none'}}
                  onFocus={e=>(e.currentTarget.style.borderColor='#6366f1')}
                  onBlur={e=>(e.currentTarget.style.borderColor='#1e293b')}
                />
                <button type="submit" disabled={formStatus==='sending'} style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', border:'none', borderRadius:10, padding:'12px', fontWeight:700, fontSize:14, cursor:'pointer', boxShadow:'0 4px 16px rgba(99,102,241,0.4)'}}>
                  {formStatus==='sending' ? t('form_sending') : t('form_send')}
                </button>
                {formStatus==='ok' && <p style={{color:'#4ade80', margin:0, fontSize:13}}>{t('form_success')}</p>}
                {formStatus==='error' && <p style={{color:'#f87171', margin:0, fontSize:13}}>{t('form_error')}</p>}
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{background:'#020817', borderTop:'1px solid #1e293b', textAlign:'center', padding:'32px 20px'}}>
          <div style={{fontSize:16, fontWeight:800, color:'#6366f1', marginBottom:8}}>{profile?.name ?? 'Yan Oleksiuk'}</div>
          <p style={{fontSize:12, color:'#334155'}}>{t('footer')}</p>
        </footer>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

export default App;
