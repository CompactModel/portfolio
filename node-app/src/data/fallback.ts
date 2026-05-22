import { Profile, Skill } from '../types/profile';

export const STATIC_PROFILE: Profile = {
  id:       1,
  name:     'Yan Oleksiuk',
  title:    'Full Stack Developer',
  bio:      'Building modern web applications with PHP, Symfony, React and Docker.',
  avatar:   null,
  email:    'yan.oleksuyk7@gmail.com',
  telegram: null,
  github:   'https://github.com/CompactModel',
};

export const STATIC_SKILLS: Skill[] = [
  { id:  1, name: 'React',      level: 'advanced',     category: 'Frontend' },
  { id:  2, name: 'TypeScript', level: 'advanced',     category: 'Frontend' },
  { id:  3, name: 'JavaScript', level: 'advanced',     category: 'Frontend' },
  { id:  4, name: 'HTML',       level: 'advanced',     category: 'Frontend' },
  { id:  5, name: 'CSS',        level: 'advanced',     category: 'Frontend' },
  { id:  6, name: 'PHP',        level: 'advanced',     category: 'Backend'  },
  { id:  7, name: 'Symfony',    level: 'advanced',     category: 'Backend'  },
  { id:  8, name: 'Node.js',    level: 'intermediate', category: 'Backend'  },
  { id:  9, name: 'MySQL',      level: 'advanced',     category: 'Database' },
  { id: 10, name: 'Docker',     level: 'advanced',     category: 'Tools'    },
  { id: 11, name: 'Git',        level: 'advanced',     category: 'Tools'    },
  { id: 12, name: 'Nginx',      level: 'intermediate', category: 'Tools'    },
  { id: 13, name: 'Linux',      level: 'intermediate', category: 'Tools'    },
];
