import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import TechBackground from '../components/TechBackground';
import GlobalNavbar from '../components/GlobalNavbar';
import HeroCinematic from '../components/HeroCinematic';
import AboutRvUniversity from '../components/AboutRvUniversity';
import PortfolioPagesPortal from '../components/PortfolioPagesPortal';
import FeaturedCaseStudies from '../components/FeaturedCaseStudies';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ContactFooter from '../components/ContactFooter';
import SectionTransition from '../components/SectionTransition';
import { SonarGrid } from '../components/ui/sonar-grid';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [cursorState, setCursorState] = useState({ label: null });
  const lenisRef = useRef(null);
  const navigate = useNavigate();

  // Snappy, smooth Lenis scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
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

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    // Route handling if passed a route id
    if (id === 'experience' || id === 'experience-pro') {
      navigate('/experience');
      return;
    }
    if (id === 'opensource') {
      navigate('/opensource');
      return;
    }
    if (id === 'skills') {
      navigate('/skills');
      return;
    }
    if (id === 'hackathons') {
      navigate('/hackathons');
      return;
    }
    if (id === 'projects') {
      navigate('/projects');
      return;
    }

    if (!lenisRef.current) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const target = id === 'top' ? 0 : `#${id}`;
    lenisRef.current.scrollTo(target, {
      duration: 0.7,
      offset: -40,
    });
  };

  return (
    <SonarGrid
      color="#C75D35"
      interactive={true}
      amplitude={1.1}
      speed={240}
      baseOpacity={0.06}
      className="relative min-h-screen w-full bg-[#F5F1EB] text-[#2B231D] selection:bg-[#C75D35] selection:text-white font-sans antialiased"
    >
      {/* Dynamic Cyber Tech Canvas */}
      <TechBackground />

      {/* Follower Cursor */}
      <CustomCursor cursorState={cursorState} />

      {/* Unified Global Top Navbar with Instant Routing */}
      <GlobalNavbar setCursorState={setCursorState} />

      {/* Clean, Executive Page Flow */}
      <main className="relative z-10 w-full flex flex-col pt-16">
        {/* 1. Cinematic Hero */}
        <HeroCinematic setCursorState={setCursorState} onNavigate={scrollToSection} />

        {/* 2. Academic Foundation & Orbit Radar (Image 1) */}
        <SectionTransition>
          <AboutRvUniversity setCursorState={setCursorState} />
        </SectionTransition>

        {/* 3. Dedicated Portfolio Sections Gateway */}
        <SectionTransition>
          <PortfolioPagesPortal setCursorState={setCursorState} />
        </SectionTransition>

        {/* 4. Flagship Case Studies Spotlight */}
        <SectionTransition>
          <FeaturedCaseStudies setCursorState={setCursorState} />
        </SectionTransition>

        {/* 5. Interactive Terminal */}
        <SectionTransition>
          <InteractiveTerminal setCursorState={setCursorState} />
        </SectionTransition>

        {/* 6. Contact & Footer */}
        <ContactFooter setCursorState={setCursorState} onNavigate={scrollToSection} />
      </main>
    </SonarGrid>
  );
}
