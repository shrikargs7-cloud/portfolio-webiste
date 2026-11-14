import React from 'react';
import { Trophy } from 'lucide-react';
import HackathonShowcase from '../components/HackathonShowcase';
import ContactFooter from '../components/ContactFooter';
import { NextPageBanner } from '../components/PageTransitionWrapper';

export default function HackathonsPage({ setCursorState }) {
  return (
    <main className="relative z-10 w-full flex flex-col pt-28 sm:pt-32">
      {/* Page Hero Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-xs uppercase tracking-wider mb-4">
          <Trophy className="w-3.5 h-3.5" /> High-Intensity Builds
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-google text-[#2B231D] tracking-tight mb-4">
          Hackathons & <span className="text-[#C75D35] italic">Sprints.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#382E27] font-medium max-w-2xl mx-auto">
          48-hour sprints, global hackathons, and award-winning autonomous agent architectures built under extreme performance constraints.
        </p>
      </div>

      {/* Hackathon Showcase */}
      <HackathonShowcase setCursorState={setCursorState} />

      {/* Seamless Next Page Flow */}
      <NextPageBanner
        label="Next Chapter"
        title="Crafted Projects & R&D Labs"
        description="Deep dive into OcuPulse, Vega AI, embedded IoT systems, digital surfaces, and verified credentials."
        to="/projects"
        setCursorState={setCursorState}
      />

      <ContactFooter setCursorState={setCursorState} />
    </main>
  );
}
