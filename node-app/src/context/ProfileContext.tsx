import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, Skill, Education } from '../types/profile';
import { getProfile, getSkills, getEducation, getStaticData } from '../services/api';
import { STATIC_PROFILE, STATIC_SKILLS } from '../data/fallback';

interface ProfileContextValue {
  profile:   Profile | null;
  skills:    Skill[];
  education: Education[];
}

const ProfileContext = createContext<ProfileContextValue>({
  profile:   null,
  skills:    [],
  education: [],
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile,   setProfile]   = useState<Profile | null>(null);
  const [skills,    setSkills]    = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    const loadStatic = () =>
      getStaticData()
        .then(d => {
          if (d.profile)           setProfile(d.profile);
          if (d.skills?.length)    setSkills(d.skills);
          if (d.education?.length) setEducation(d.education);
        })
        .catch(() => {
          setProfile(STATIC_PROFILE);
          setSkills(STATIC_SKILLS);
        });

    Promise.all([getProfile(), getSkills(), getEducation()])
      .then(([p, s, e]) => {
        setProfile(p);
        setSkills(s);
        setEducation(e);
      })
      .catch(loadStatic);
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, skills, education }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  return useContext(ProfileContext);
}
