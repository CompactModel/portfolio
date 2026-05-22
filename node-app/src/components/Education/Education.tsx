import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import { Reveal } from '../Reveal';
import { SectionHead } from '../SectionHead';
import { formatDate } from '../../utils/formatDate';
import { DARK, MID, SUBTLE } from '../../data/config';

const glassCard: React.CSSProperties = {
  background:           'rgba(255,255,255,0.55)',
  backdropFilter:       'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border:               '1px solid rgba(255,255,255,0.8)',
  borderRadius:         16,
  boxShadow:            '0 8px 24px rgba(0,0,0,0.07)',
  transition:           'transform 0.22s, box-shadow 0.22s',
};

export default function Education() {
  const { education } = useProfile();
  const { t, currentLang } = useLanguage();

  if (education.length === 0) return null;

  return (
    <section id="education">
      <div className="section-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
        <SectionHead label={t('nav_education')} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {education.map((edu, i) => (
            <Reveal key={edu.id} delay={i * 80}>
              <div
                style={{ ...glassCard, padding: 24 }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: edu.description ? 12 : 0 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 4 }}>{edu.degree}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: MID }}>{edu.institution}</div>
                  </div>
                  <div style={{ fontSize: 12, color: SUBTLE, background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)', padding: '4px 12px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                    {formatDate(edu.startDate, currentLang, t('present'))} — {formatDate(edu.endDate, currentLang, t('present'))}
                  </div>
                </div>
                {edu.description && <p style={{ color: SUBTLE, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{edu.description}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
