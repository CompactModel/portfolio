import { DARK } from '../data/config';

interface SectionHeadProps {
  label: string;
}

export function SectionHead({ label }: SectionHeadProps) {
  return (
    <div className="section-head" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
      <div style={{ width: 3, height: 24, background: DARK, borderRadius: 2 }} />
      <h2 style={{ fontSize: 20, fontWeight: 700, color: DARK, margin: 0 }}>{label}</h2>
    </div>
  );
}
