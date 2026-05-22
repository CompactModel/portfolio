import { useProjects } from '../../hooks/useProjects';
import { useLanguage } from '../../hooks/useLanguage';
import { SectionHead } from '../SectionHead';
import { ProjectCard } from './ProjectCard';
import { SUBTLE } from '../../data/config';
import './Projects.css';

export default function Projects() {
  const { projects } = useProjects();
  const { t } = useLanguage();

  return (
    <section id="projects">
      <div className="section-pad" style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
        <SectionHead label={t('nav_projects')} />
        {projects.length === 0
          ? <p style={{ color: SUBTLE }}>{t('no_projects')}</p>
          : (
            <div className="proj-grid">
              {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          )
        }
      </div>
    </section>
  );
}
