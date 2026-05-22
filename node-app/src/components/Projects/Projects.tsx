import { useProjects } from '../../hooks/useProjects';
import { useLanguage } from '../../hooks/useLanguage';
import { SectionHead } from '../SectionHead';
import { CircularProjects } from './CircularProjects';
import { SUBTLE } from '../../data/config';

export default function Projects() {
  const { projects } = useProjects();
  const { t } = useLanguage();

  return (
    <section id="projects">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
        <SectionHead label={t('nav_projects')} />
        {projects.length === 0
          ? <p style={{ color: SUBTLE }}>{t('no_projects')}</p>
          : <CircularProjects projects={projects} autoplay={true} t={t} />
        }
      </div>
    </section>
  );
}
