import React from 'react';
import { Cpu } from 'lucide-react';
import SkillsCategoryGrid from '../components/SkillsCategoryGrid';
import CodingDashboard from '../components/CodingDashboard';
import ContactFooter from '../components/ContactFooter';
import { NextPageBanner } from '../components/PageTransitionWrapper';

export default function SkillsPage({ setCursorState }) {
  return (
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

      {/* Bento Grid */}
      <SkillsCategoryGrid setCursorState={setCursorState} />

      {/* Real Coding Dashboard */}
      <CodingDashboard setCursorState={setCursorState} />

      {/* Seamless Next Page Flow */}
      <NextPageBanner
        label="Next Chapter"
        title="Hackathons & High-Velocity Sprints"
        description="See rapid 48-hour builds and autonomous agent architectures including the Agentic AI World Cup."
        to="/hackathons"
        setCursorState={setCursorState}
      />

      <ContactFooter setCursorState={setCursorState} />
    </main>
  );
}
