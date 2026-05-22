import { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import { Reveal } from '../Reveal';
import { techColor } from '../../utils/techColor';
import { DARK, SUBTLE } from '../../data/config';
import './Skills.css';

export default function Skills() {
  const { skills } = useProfile();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'services' | 'skills'>('services');

  const tabStyle = (tab: string): React.CSSProperties => ({
    padding: '8px 22px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
    background:    activeTab === tab ? DARK : 'rgba(255,255,255,0.55)',
    color:         activeTab === tab ? '#ffffff' : SUBTLE,
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    boxShadow:     activeTab === tab ? '0 4px 16px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
    outline:       activeTab === tab ? `2px solid ${DARK}` : '1px solid rgba(255,255,255,0.8)',
    transition:    'all 0.2s',
  });

  const serviceKeys = ['service_1', 'service_2', 'service_3', 'service_4', 'service_5', 'service_6'] as const;

  const order = ['Frontend', 'Backend', 'Database', 'Tools'];
  const grouped = order.reduce<Record<string, typeof skills>>((acc, cat) => {
    const items = skills.filter(s => s.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});
  const uncategorized = skills.filter(s => !s.category || !order.includes(s.category));
  if (uncategorized.length) grouped['Other'] = uncategorized;

  return (
    <section id="skills" style={{ background: 'transparent' }}>
      <div className="section-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {(['services', 'skills'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
              {tab === 'services' ? t('tab_services') : t('tab_skills')}
            </button>
          ))}
        </div>

        {/* Services */}
        {activeTab === 'services' && (
          <div className="services-grid">
            {serviceKeys.map((key, i) => (
              <Reveal key={key} delay={i * 60}>
                <div style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.06)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#22c55e', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: DARK }}>{t(key)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Skills */}
        {activeTab === 'skills' && (
          skills.length === 0
            ? <p style={{ color: SUBTLE }}>{t('no_skills')}</p>
            : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
                {Object.entries(grouped).map(([cat, items]) => (
                  <Reveal key={cat}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: SUBTLE, textTransform: 'uppercase', marginBottom: 12 }}>{cat}</div>
                      <div className="skill-cards">
                        {items.map(s => {
                          const color = techColor(s.name);
                          return (
                            <div key={s.id} className="skill-card"
                              style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.06)', padding: '16px 10px', textAlign: 'center', cursor: 'default', transition: 'transform 0.2s, box-shadow 0.2s', width: 100, flexShrink: 0 }}
                              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
                              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
                            >
                              <div className="skill-icon" style={{ width: 34, height: 34, borderRadius: '50%', background: '#ffffff', border: `1.5px solid ${color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', color, fontWeight: 800, fontSize: 10 }}>
                                {s.name.slice(0, 3).toUpperCase()}
                              </div>
                              <div className="skill-name" style={{ fontSize: 11, fontWeight: 500, color: '#1A1A1A', lineHeight: 1.3 }}>{s.name}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )
        )}
      </div>
    </section>
  );
}
