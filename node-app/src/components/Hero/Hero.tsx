import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import { Reveal } from '../Reveal';
import { DARK, MID } from '../../data/config';
import { HeroCard } from './HeroCard';
import './Hero.css';

function Ticker() {
  const items = ['• FULL STACK DEVELOPER', '• PHP & SYMFONY', '• REACT & TYPESCRIPT', '• DOCKER & DEVOPS', '• REST API'];
  const track = [...items, ...items, ...items];
  return (
    <div style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.85)', borderTop: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '12px 0' }}>
      <div style={{ display: 'flex', gap: 56, animation: 'ticker 22s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
        {track.map((item, i) => (
          <span key={i} style={{ fontSize: 13, fontWeight: 700, color: '#ffffff', letterSpacing: 2, flexShrink: 0, opacity: 0.85 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { profile } = useProfile();
  const { t } = useLanguage();

  return (
    <>
      <header className="hero-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 32px 56px', position: 'relative' }}>
        <div className="hero-layout" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Reveal>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ffffff', border: '1px solid rgba(0,0,0,0.12)', color: DARK, padding: '6px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 20, letterSpacing: 0.4 }}>
                <span style={{ width: 7, height: 7, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
                {t('available')}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="hero-h1" style={{ fontSize: 'clamp(34px,6vw,68px)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 10px', color: DARK, letterSpacing: '-0.5px' }}>
                {t('hero_title')} <span style={{ color: DARK }}>{profile?.name?.split(' ')[0] ?? 'Yan'}</span>
              </h1>
              <div className="hero-subtitle" style={{ fontSize: 'clamp(15px,2.5vw,21px)', fontWeight: 600, color: MID, margin: '0 0 18px', letterSpacing: '-0.2px' }}>
                {profile?.title ?? t('hero_subtitle')}
              </div>
            </Reveal>
            <Reveal delay={160}>
              {profile?.bio && (
                <p className="hero-bio" style={{ fontSize: 16, color: DARK, maxWidth: 520, lineHeight: 1.8, margin: '0 0 12px', fontWeight: 400, opacity: 0.82 }}>
                  {profile.bio}
                </p>
              )}
              <div className="hero-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', maxWidth: 520 }}>
                {['React', 'TypeScript', 'Symfony', 'MySQL', 'Docker'].map(tag => (
                  <span className="hero-tag" key={tag} style={{ fontSize: 12, color: DARK, fontWeight: 600, background: 'rgba(0,0,0,0.07)', padding: '3px 10px', borderRadius: 6 }}>{tag}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="cta-wrap" style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#projects"
                  style={{ background: DARK, color: '#ffffff', padding: '14px 34px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >{t('view_projects')}</a>
                <a href="#contact"
                  style={{ background: '#ffffff', color: DARK, border: '1px solid rgba(0,0,0,0.15)', padding: '14px 34px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14, transition: 'border-color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = DARK; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.15)'; }}
                >{t('contact_me')}</a>
              </div>
            </Reveal>
          </div>
          <div className="hero-visual"><HeroCard /></div>
        </div>
      </header>
      <Ticker />
    </>
  );
}
