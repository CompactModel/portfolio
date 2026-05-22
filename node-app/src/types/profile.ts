export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string | null;
  email: string | null;
  telegram: string | null;
  github: string | null;
}

export interface Skill {
  id: number;
  name: string;
  level: string | null;
  category: string | null;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
}
