import { Project } from '../../types/project';
import { Reveal } from '../Reveal';
import { inferTags } from '../../utils/inferTags';
import { projectImage } from '../../utils/projectImage';
import { DARK } from '../../data/config';
import { useLanguage } from '../../hooks/useLanguage';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const glassCard: React.CSSProperties = {
  background:          'rgba(255,255,255,0.55)',
  backdropFilter:      'blur(16px)',
  WebkitBackdropFilter:'blur(16px)',
  border:              '1px solid rgba(255,255,255,0.8)',
  borderRadius:        16,
  boxShadow:           '0 8px 24px rgba(0,0,0,0.07)',
  transition:          'transform 0.22s, box-shadow 0.22s, border 0.22s',
};

export function ProjectCard({ project: p, index: i }: ProjectCardProps) {
  const { t } = useLanguage();
  const tags   = inferTags(p.title, p.description);
  const imgSrc = p.image ?? projectImage(p.title, '');

  return (
    <Reveal delay={i * 100}>
      <div
        className="proj-card"
        style={{ ...glassCard, overflow: 'hidden' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = '0 20px 44px rgba(0,0,0,0.13), 0 0 0 2px rgba(0,0,0,0.22)'; el.style.border = '1px solid rgba(0,0,0,0.28)'; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.07)'; el.style.border = '1px solid rgba(255,255,255,0.8)'; }}
      >
        {/* Browser chrome bar */}
        <div style={{ background: 'rgba(255,255,255,0.4)', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, j) => <div key={j} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
          <div style={{ flex: 1, height: 13, background: 'rgba(0,0,0,0.05)', borderRadius: 3, marginLeft: 6, border: '1px solid rgba(0,0,0,0.06)' }} />
        </div>

        {/* Screenshot */}
        <div style={{ height: 150, overflow: 'hidden' }}>
          {imgSrc
            ? <img src={imgSrc} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            : <div style={{ height: '100%', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: 'rgba(0,0,0,0.2)', textTransform: 'uppercase' }}>PREVIEW</span>
              </div>
          }
        </div>

        {/* Content */}
        <div style={{ padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px', color: DARK }}>{p.title}</h3>
          <p style={{ color: '#555555', fontSize: 13, lineHeight: 1.6, margin: '0 0 14px' }}>{p.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <span key={tag} style={{ background: 'rgba(0,0,0,0.07)', color: '#333333', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6 }}>{tag}</span>
              ))}
            </div>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer"
                style={{ color: '#ffffff', background: DARK, fontSize: 13, textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 13px', borderRadius: 6, flexShrink: 0, whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.8'; const s = e.currentTarget.querySelector<HTMLSpanElement>('.arrow'); if (s) s.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; const s = e.currentTarget.querySelector<HTMLSpanElement>('.arrow'); if (s) s.style.transform = 'translateX(0)'; }}
              >
                {t('view_project')}<span className="arrow" style={{ display: 'inline-block', transition: 'transform 0.2s', marginLeft: 4 }}>→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
