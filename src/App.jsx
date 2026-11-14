import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import TechBackground from './components/TechBackground';
import GlobalNavbar from './components/GlobalNavbar';
import CommandPalette from './components/CommandPalette';
import { SonarGrid } from './components/ui/sonar-grid';
import { PageTransitionWrapper } from './components/PageTransitionWrapper';

import Home from './pages/Home';
import ExperiencePage from './pages/ExperiencePage';
import OpenSourcePage from './pages/OpenSourcePage';
import SkillsPage from './pages/SkillsPage';
import HackathonsPage from './pages/HackathonsPage';
import ProjectsPage from './pages/ProjectsPage';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function AppShell() {
  const [cursorState, setCursorState] = useState({ label: null });
  const [commandOpen, setCommandOpen] = useState(false);
  const [routePulse, setRoutePulse] = useState(false);
  const location = useLocation();
  const lenisRef = useRef(null);

  // Single persistent Lenis smooth-scroll instance across all routes (eliminates mount/unmount lag)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.2,
      infinite: false,
    });
    lenisRef.current = lenis;

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Instant scroll reset + crisp route bar pulse on page switch
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    setRoutePulse(true);
    const pulseTimer = setTimeout(() => setRoutePulse(false), 320);
    const stTimer = setTimeout(() => ScrollTrigger.refresh(), 180);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(stTimer);
    };
  }, [location.pathname]);

  // Global Cmd+K / Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const scrollToId = (id) => {
    if (!lenisRef.current) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const target = id === 'top' ? 0 : `#${id}`;
    lenisRef.current.scrollTo(target, { duration: 0.7, offset: -40 });
  };

  return (
    <SonarGrid
      color="#C75D35"
      interactive={true}
      amplitude={1.1}
      speed={240}
      baseOpacity={0.05}
      className="relative min-h-screen w-full bg-[#F5F1EB] text-[#2B231D] selection:bg-[#C75D35] selection:text-white font-sans antialiased"
    >
      {/* Top Route Transition Progress Pulse */}
      <AnimatePresence>
        {routePulse && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C75D35] via-[#D09B65] to-[#C75D35] z-[150] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Persistent Background, Cursor, Navbar, & Command Palette */}
      <TechBackground />
      <CustomCursor cursorState={cursorState} />
      <GlobalNavbar setCursorState={setCursorState} onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Animated Page Content */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransitionWrapper>
                <Home setCursorState={setCursorState} scrollToId={scrollToId} />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/experience"
            element={
              <PageTransitionWrapper>
                <ExperiencePage setCursorState={setCursorState} />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/opensource"
            element={
              <PageTransitionWrapper>
                <OpenSourcePage setCursorState={setCursorState} />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/skills"
            element={
              <PageTransitionWrapper>
                <SkillsPage setCursorState={setCursorState} />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/hackathons"
            element={
              <PageTransitionWrapper>
                <HackathonsPage setCursorState={setCursorState} />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransitionWrapper>
                <ProjectsPage setCursorState={setCursorState} />
              </PageTransitionWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </SonarGrid>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
