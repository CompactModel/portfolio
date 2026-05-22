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
import { Wallpaper } from './components/Wallpaper/Wallpaper';

function App() {
  return (
    <ProfileProvider>
      <div style={{ fontFamily: '"Inter",system-ui,sans-serif', background: 'transparent', minHeight: '100vh', color: '#0A0A0A' }}>
        <Wallpaper />

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
