import { useState, FormEvent } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import { Reveal } from '../Reveal';
import { SectionHead } from '../SectionHead';
import { sendContact } from '../../services/api';
import { DARK, SUBTLE } from '../../data/config';
import './Contact.css';

const inputStyle: React.CSSProperties = {
  background:  'rgba(255,255,255,0.6)',
  border:      '1px solid rgba(0,0,0,0.12)',
  borderRadius: 8,
  padding:     '12px 16px',
  color:        DARK,
  fontSize:    14,
  outline:     'none',
  width:       '100%',
  transition:  'border-color 0.2s',
  fontFamily:  '"Inter",system-ui,sans-serif',
};

export default function Contact() {
  const { profile } = useProfile();
  const { t } = useLanguage();
  const [form,       setForm]       = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [tgCopied,   setTgCopied]   = useState(false);

  const handleContact = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await sendContact(form);
      if (res.ok) { setFormStatus('ok'); setForm({ name: '', email: '', message: '' }); }
      else setFormStatus('error');
    } catch { setFormStatus('error'); }
  };

  return (
    <section id="contact" style={{ background: 'transparent' }}>
      <div className="section-pad" style={{ maxWidth: 840, margin: '0 auto', padding: '48px 32px' }}>
        <SectionHead label={t('nav_contact')} />
        <div className="contact-card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 40 }}>
            <Reveal>
              <p style={{ color: SUBTLE, lineHeight: 1.8, marginBottom: 24, fontSize: 14 }}>{t('contact_intro')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile?.email && (
                  <a href={`mailto:${profile.email}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.12)', color: DARK, textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '10px 18px', borderRadius: 10, transition: 'border-color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = DARK; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.12)'; }}
                  >
                    ✉ {profile.email}
                  </a>
                )}
                {profile?.telegram && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <button
                      onClick={() => {
                        const u = profile.telegram!.replace('https://t.me/', '@');
                        navigator.clipboard.writeText(u);
                        setTgCopied(true);
                        setTimeout(() => setTgCopied(false), 2000);
                      }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,136,204,0.08)', border: '1px solid rgba(0,136,204,0.3)', color: '#0088CC', cursor: 'pointer', fontSize: 13, fontWeight: 600, padding: '10px 18px', borderRadius: 10, transition: 'all 0.2s', fontFamily: 'inherit' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" /></svg>
                      {tgCopied ? '✓ Copied!' : 'Telegram'}
                    </button>
                    <a href={profile.telegram} target="_blank" rel="noreferrer" title="Open in Telegram"
                      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, background: 'rgba(0,136,204,0.08)', border: '1px solid rgba(0,136,204,0.3)', color: '#0088CC', borderRadius: 10, textDecoration: 'none', flexShrink: 0 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </a>
                  </div>
                )}
                {profile?.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.12)', color: DARK, textDecoration: 'none', fontSize: 13, fontWeight: 600, padding: '10px 18px', borderRadius: 10, transition: 'border-color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = DARK; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.12)'; }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" /></svg>
                    GitHub
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {(['name', 'email'] as const).map(field => (
                  <input key={field} type={field === 'email' ? 'email' : 'text'} placeholder={t(`form_${field}`)} required value={form[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={inputStyle}
                    onFocus={e  => { e.currentTarget.style.borderColor = DARK; }}
                    onBlur={e   => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; }}
                  />
                ))}
                <textarea placeholder={t('form_message')} required rows={4} value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => { e.currentTarget.style.borderColor = DARK; }}
                  onBlur={e  => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; }}
                />
                <button type="submit" disabled={formStatus === 'sending'}
                  style={{ background: DARK, color: '#ffffff', border: 'none', borderRadius: 8, padding: '13px', fontWeight: 700, fontSize: 14, cursor: 'pointer', width: '100%', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  {formStatus === 'sending' ? t('form_sending') : t('form_send')}
                </button>
                {formStatus === 'ok'    && <p style={{ color: '#16a34a', margin: 0, fontSize: 13 }}>{t('form_success')}</p>}
                {formStatus === 'error' && <p style={{ color: '#dc2626', margin: 0, fontSize: 13 }}>{t('form_error')}</p>}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
