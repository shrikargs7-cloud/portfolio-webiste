import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroCinematic from '../components/HeroCinematic';
import AboutRvUniversity from '../components/AboutRvUniversity';
import DesignSystemShowcase from '../components/DesignSystemShowcase';
import PortfolioPagesPortal from '../components/PortfolioPagesPortal';
import FeaturedCaseStudies from '../components/FeaturedCaseStudies';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ContactFooter from '../components/ContactFooter';
import SectionTransition from '../components/SectionTransition';

export default function Home({ setCursorState, scrollToId }) {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
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
    if (scrollToId) {
      scrollToId(id);
    }
  };

  return (
    <main className="relative z-10 w-full flex flex-col pt-16">
      {/* 1. Cinematic Hero */}
      <HeroCinematic setCursorState={setCursorState} onNavigate={handleNavigate} />

      {/* 2. Academic Foundation & Orbit Radar */}
      <SectionTransition>
        <AboutRvUniversity setCursorState={setCursorState} />
      </SectionTransition>

      {/* 3. Design System & Accessibility Showcase */}
      <SectionTransition>
        <DesignSystemShowcase setCursorState={setCursorState} />
      </SectionTransition>

      {/* 4. Dedicated Portfolio Sections Gateway */}
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
      <ContactFooter setCursorState={setCursorState} onNavigate={handleNavigate} />
    </main>
  );
}
