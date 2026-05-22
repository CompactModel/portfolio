import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import { DARK, SUBTLE } from '../../data/config';

export default function Footer() {
  const { profile } = useProfile();
  const { t } = useLanguage();

  return (
    <footer style={{ background: 'rgba(235,235,235,0.8)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderTop: '1px solid rgba(0,0,0,0.08)', textAlign: 'center', padding: '28px 20px' }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: DARK, marginBottom: 6 }}>{profile?.name ?? 'Yan Oleksiuk'}</div>
      <p style={{ fontSize: 12, color: SUBTLE, margin: 0 }}>{t('footer')}</p>
    </footer>
  );
}
