import { useState, useEffect, useRef } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import { DARK, MID, SUBTLE } from '../../data/config';
import './Navbar.css';

export default function Navbar() {
  const { profile } = useProfile();
  const { t, currentLang, changeLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      navRef.current?.style.setProperty('--x', String(e.clientX));
      navRef.current?.style.setProperty('--y', String(e.clientY));
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const navLinks = [
    { href: '#skills',   label: t('nav_skills')   },
    { href: '#projects', label: t('nav_projects')  },
    { href: '#contact',  label: t('nav_contact')   },
  ];

  const langs = ['en', 'de', 'uk'] as const;

  const langBtnStyle = (lang: string): React.CSSProperties => ({
    background:   currentLang === lang ? DARK : 'rgba(0,0,0,0.06)',
    color:        currentLang === lang ? '#fff' : SUBTLE,
    border:       `1px solid ${currentLang === lang ? DARK : 'rgba(0,0,0,0.12)'}`,
    padding:      '3px 10px',
    borderRadius: 6,
    cursor:       'pointer',
    fontWeight:   600,
    fontSize:     11,
    transition:   'all 0.2s',
  });

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-inner" style={{ display: 'flex', alignItems: 'center', padding: '0 32px', height: 60, maxWidth: 1200, margin: '0 auto' }}>
        <span className="nav-logo" style={{ fontWeight: 800, fontSize: 17, color: DARK, flex: 1 }}>
          {profile?.name ?? 'Yan Oleksiuk'}
        </span>

        <div className="nav-links" style={{ display: 'flex', gap: 4 }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="nav-glow-link">{l.label}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' }}>
          <div className="lang-btns" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {langs.map(lang => (
              <button key={lang} className="lang-btn" onClick={() => changeLanguage(lang)} style={langBtnStyle(lang)}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="mob-hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.12)', color: SUBTLE, padding: '6px 10px', borderRadius: 8, cursor: 'pointer', fontSize: 16 }}
          >☰</button>
        </div>
      </div>

      {menuOpen && (
        <div className="mob-menu" style={{ background: 'rgba(235,235,235,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.08)', padding: '8px 20px 20px' }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', color: MID, textDecoration: 'none', padding: '12px 0', fontSize: 15, fontWeight: 500, borderBottom: '1px solid rgba(0,0,0,0.06)' }}
            >{l.label}</a>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {langs.map(lang => (
              <button key={lang} onClick={() => { changeLanguage(lang); setMenuOpen(false); }}
                style={{ ...langBtnStyle(lang), padding: '5px 14px', fontSize: 12 }}
              >{lang.toUpperCase()}</button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
