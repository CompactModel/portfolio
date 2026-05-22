import { useRef, useEffect } from 'react';
import './i18n';
import './styles/global.css';

import { ProfileProvider } from './context/ProfileContext';
import Navbar    from './components/Navbar/Navbar';
import Hero      from './components/Hero/Hero';
import Skills    from './components/Skills/Skills';
import Projects  from './components/Projects/Projects';
import Education from './components/Education/Education';
import Contact   from './components/Contact/Contact';
import Footer    from './components/Footer/Footer';

function App() {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate(${y * 0.08}px, ${y * -0.12}px)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate(${y * -0.06}px, ${y * 0.1}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ProfileProvider>
      <div style={{ fontFamily: '"Inter",system-ui,sans-serif', background: '#EBEBEB', minHeight: '100vh', color: '#0A0A0A' }}>
        <div ref={blob1Ref} className="blob-1" style={{ position: 'fixed', top: '-100px', right: '-100px', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,100,100,0.55) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />
        <div ref={blob2Ref} className="blob-2" style={{ position: 'fixed', bottom: '-150px', left: '-150px', width: 750, height: 750, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,30,30,0.45) 0%, transparent 70%)', filter: 'blur(90px)', zIndex: 0, pointerEvents: 'none' }} />

        <Navbar />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <Skills />
          <Projects />
          <Education />
          <Contact />
          <Footer />
        </div>
      </div>
    </ProfileProvider>
  );
}

export default App;
