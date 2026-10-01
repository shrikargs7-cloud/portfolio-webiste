import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';
import TechBackground from '../components/TechBackground';
import ExperienceTimeline from '../components/ExperienceTimeline';
import HackathonShowcase from '../components/HackathonShowcase';
import ContactFooter from '../components/ContactFooter';
import { SonarGrid } from '../components/ui/sonar-grid';
import SectionTransition from '../components/SectionTransition';

export default function ExperiencePage() {
  const [cursorState, setCursorState] = useState({ label: null });
  const lenisRef = useRef(null);

  useEffect(() => {
    // Reset scroll on mount
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
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

  return (
    <SonarGrid
      color="#C75D35"
      interactive={true}
      amplitude={2.5}
      speed={300}
      baseOpacity={0.15}
      className="relative min-h-screen w-full bg-[#F5F1EB] text-[#2B231D] selection:bg-lime-400 selection:text-black font-sans antialiased"
    >
      <TechBackground />
      <CustomCursor cursorState={cursorState} />

      {/* Floating Back Button */}
      <Link 
        to="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF]/80 backdrop-blur-xl border border-[#2B231D]/10 text-[#2B231D] hover:bg-[#C75D35] hover:text-white transition-all shadow-lg hover:shadow-xl font-google text-sm font-medium"
        onMouseEnter={() => setCursorState({ label: 'Back' })}
        onMouseLeave={() => setCursorState({ label: null })}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <main className="relative z-10 w-full flex flex-col pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold font-google text-[#2B231D] tracking-tight mb-6">
            Detailed <span className="text-[#C75D35] italic">Experience.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#73675E] font-light max-w-3xl mx-auto">
            A comprehensive overview of my professional internships, GitHub open-source contributions, and intense 48-hour hackathon ventures.
          </p>
        </div>

        <SectionTransition><ExperienceTimeline setCursorState={setCursorState} /></SectionTransition>
        <SectionTransition><HackathonShowcase setCursorState={setCursorState} /></SectionTransition>
        
        {/* Placeholder for GitHub Contribution Docx - user can add later */}
        <section className="w-full py-16 px-4 max-w-7xl mx-auto font-google">
          <div className="p-8 rounded-3xl bg-[#FFFFFF]/60 border border-[#2B231D]/10 border-dashed text-center">
            <h3 className="text-2xl font-bold text-[#2B231D] mb-2">GitHub Contribution Docx</h3>
            <p className="text-[#73675E]">Placeholder for your detailed GitHub contributions document.</p>
          </div>
        </section>

        <ContactFooter setCursorState={setCursorState} />
      </main>
    </SonarGrid>
  );
}
