import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from '../components/CustomCursor';
import FloatingDoc from '../components/FloatingDoc';
import TechBackground from '../components/TechBackground';
import SectionHUD from '../components/SectionHUD';
import HeroCinematic from '../components/HeroCinematic';
import Marquee from '../components/Marquee';
import AboutRvUniversity from '../components/AboutRvUniversity';
import FeaturedCaseStudies from '../components/FeaturedCaseStudies';
import CodingDashboard from '../components/CodingDashboard';
import SkillsCategoryGrid from '../components/SkillsCategoryGrid';
import CertificatesGallery from '../components/CertificatesGallery';
import PlaygroundGrid from '../components/PlaygroundGrid';
import WebDesignList from '../components/WebDesignList';
import PerformanceDeck from '../components/PerformanceDeck';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ContactFooter from '../components/ContactFooter';
import SectionTransition from '../components/SectionTransition';
import { SonarGrid } from '../components/ui/sonar-grid';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [cursorState, setCursorState] = useState({ label: null });
  const [activeSection, setActiveSection] = useState(0);
  const lenisRef = useRef(null);
  const navigate = useNavigate();

  const sections = [
    { id: 'top', label: 'Hero', tag: '01' },
    { id: 'about', label: 'About', tag: '02' },
    { id: 'projects', label: 'Projects', tag: '03' },
    { id: 'dashboard', label: 'Metrics', tag: '04' },
    { id: 'skills', label: 'Skills', tag: '05' },
    { id: 'certificates', label: 'Certificates', tag: '06' },
    { id: 'playground', label: 'Playground', tag: '07' },
    { id: 'web-design', label: 'Designs', tag: '08' },
    { id: 'performance', label: 'Performance', tag: '09' },
    { id: 'vibe-terminal', label: 'Terminal', tag: '10' },
    { id: 'contact', label: 'Contact', tag: '11' },
  ];

  // Initialize Lenis with gentle, responsive momentum smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Balanced smooth deceleration without sluggish lag
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Natural responsive speed
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis and GSAP Ticker for zero-jitter 60fps/120fps scrolling
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Track active section as user scrolls
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    lenis.on('scroll', handleScroll);
    lenis.on('scroll', ScrollTrigger.update);

    // Refresh ScrollTrigger once DOM settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateTicker);
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    if (id === 'experience_page') {
      navigate('/experience');
      return;
    }
    
    if (!lenisRef.current) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const target = id === 'top' ? 0 : `#${id}`;
    lenisRef.current.scrollTo(target, {
      duration: 1.4,
      offset: -40,
    });
  };

  const handleSelectSection = (index) => {
    if (sections[index]) {
      scrollToSection(sections[index].id);
    }
  };

  const handleNext = () => {
    const nextIdx = Math.min(activeSection + 1, sections.length - 1);
    handleSelectSection(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(activeSection - 1, 0);
    handleSelectSection(prevIdx);
  };

  return (
    <SonarGrid
      color="#C75D35"
      interactive={true}
      amplitude={2.5}
      speed={300}
      baseOpacity={0.15}
      className="relative min-h-screen w-full bg-[#F5F1EB] text-[#2B231D] selection:bg-lime-400 selection:text-black font-sans antialiased"
    >
      {/* Dynamic Interactive Cyber Tech Canvas Background */}
      <TechBackground />

      {/* Custom Follower Cursor */}
      <CustomCursor cursorState={cursorState} />

      {/* Floating Cyber Command Dock (Hover to Reveal Everything) */}
      <FloatingDoc 
        setCursorState={setCursorState} 
        onNavigate={scrollToSection} 
        activeSection={activeSection}
        sections={sections}
      />

      {/* Section Progress Bar, Vertical Rail, & Bottom Controller HUD */}
      <SectionHUD
        sections={sections}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onNext={handleNext}
        onPrev={handlePrev}
        setCursorState={setCursorState}
      />

      {/* Continuous Page Sections Flow with Smooth Scroll and Strict Snapping */}
      <main className="relative z-10 w-full flex flex-col ">
        <HeroCinematic setCursorState={setCursorState} onNavigate={scrollToSection} />
        <SectionTransition><AboutRvUniversity setCursorState={setCursorState} /></SectionTransition>
        <FeaturedCaseStudies setCursorState={setCursorState} />
        <SectionTransition><CodingDashboard setCursorState={setCursorState} /></SectionTransition>
        <SectionTransition><SkillsCategoryGrid setCursorState={setCursorState} /></SectionTransition>
        <SectionTransition><CertificatesGallery setCursorState={setCursorState} /></SectionTransition>
        <SectionTransition><PlaygroundGrid setCursorState={setCursorState} /></SectionTransition>
        <SectionTransition><WebDesignList setCursorState={setCursorState} /></SectionTransition>
        <SectionTransition><PerformanceDeck setCursorState={setCursorState} /></SectionTransition>
        <SectionTransition><InteractiveTerminal setCursorState={setCursorState} /></SectionTransition>
        <ContactFooter setCursorState={setCursorState} onNavigate={scrollToSection} />
      </main>
    </SonarGrid>
  );
}