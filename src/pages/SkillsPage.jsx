import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Activity } from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import TechBackground from '../components/TechBackground';
import GlobalNavbar from '../components/GlobalNavbar';
import SkillsCategoryGrid from '../components/SkillsCategoryGrid';
import CodingDashboard from '../components/CodingDashboard';
import ContactFooter from '../components/ContactFooter';
import { SonarGrid } from '../components/ui/sonar-grid';

export default function SkillsPage() {
  const [cursorState, setCursorState] = useState({ label: null });
  const lenisRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
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
    }, 300);

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
      amplitude={1.1}
      speed={240}
      baseOpacity={0.06}
      className="relative min-h-screen w-full bg-[#F5F1EB] text-[#2B231D] selection:bg-[#C75D35] selection:text-white font-sans antialiased"
    >
      <TechBackground />
      <CustomCursor cursorState={cursorState} />
      <GlobalNavbar setCursorState={setCursorState} />

      <main className="relative z-10 w-full flex flex-col pt-28 sm:pt-32">
        {/* Page Hero Intro */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-xs uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" /> Technical Arsenal & Systems
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-google text-[#2B231D] tracking-tight mb-4">
            Skills & <span className="text-[#C75D35] italic">Architecture.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#382E27] font-medium max-w-2xl mx-auto">
            Comprehensive bento view across Machine Learning, Generative AI & RAG, Distributed Backends, Model Training, Cloud Infrastructure, and MLOps.
          </p>
        </div>

        {/* Bento Grid (Image 2) */}
        <SkillsCategoryGrid setCursorState={setCursorState} />

        {/* Real Coding Dashboard (LeetCode, Git Commits) */}
        <CodingDashboard setCursorState={setCursorState} />

        <ContactFooter setCursorState={setCursorState} />
      </main>
    </SonarGrid>
  );
}
