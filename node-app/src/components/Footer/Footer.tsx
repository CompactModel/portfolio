import { useProfile } from '../../hooks/useProfile';
import { useLanguage } from '../../hooks/useLanguage';
import { DARK } from '../../data/config';

export default function Footer() {
  const { profile } = useProfile();
  const { t } = useLanguage();

  return (
    <footer style={{ background: 'transparent', textAlign: 'center', padding: '28px 20px' }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: DARK, marginBottom: 6 }}>
        {profile?.name ?? 'Yan Oleksiuk'}
      </div>
      <p style={{ fontSize: 12, fontWeight: 800, color: DARK, margin: 0 }}>
        {t('footer')}
      </p>
    </footer>
  );
}
