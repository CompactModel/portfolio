import { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { getProjects, getStaticData } from '../services/api';
import { STATIC_PROJECTS } from '../data/projects';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadStatic = () =>
      getStaticData()
        .then(d => { if (d.projects?.length) setProjects(d.projects); })
        .catch(() => setProjects(STATIC_PROJECTS));

    getProjects()
      .then(p => setProjects(p))
      .catch(loadStatic);
  }, []);

  return { projects };
}
