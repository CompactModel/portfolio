import { useEffect, useRef } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import { DARK, SUBTLE } from '../../data/config';
import './Navbar.css';

export default function Navbar() {
  const { profile } = useProfile();
  const { currentLang, changeLanguage } = useLanguage();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      navRef.current?.style.setProperty('--x', String(e.clientX));
      navRef.current?.style.setProperty('--y', String(e.clientY));
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

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

        <div className="lang-btns" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {langs.map(lang => (
            <button key={lang} className="lang-btn" onClick={() => changeLanguage(lang)} style={langBtnStyle(lang)}>
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
