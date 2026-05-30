import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { getProjects, getStaticData } from '../services/api';
import { STATIC_PROJECTS } from '../data/projects';

function mergeWithStatic(apiProjects: Project[], staticProjects: Project[]): Project[] {
  const links = new Set(apiProjects.map(p => p.link));
  const missing = staticProjects.filter(p => !links.has(p.link));
  return [...apiProjects, ...missing];
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadStatic = () =>
      getStaticData()
        .then(d => { if (d.projects?.length) setProjects(d.projects); })
        .catch(() => setProjects(STATIC_PROJECTS));

    getStaticData()
      .then(d => {
        const staticList = d.projects?.length ? d.projects : STATIC_PROJECTS;
        getProjects()
          .then(p => setProjects(mergeWithStatic(p, staticList)))
          .catch(() => setProjects(staticList));
      })
      .catch(loadStatic);
  }, []);

  return { projects };
}
