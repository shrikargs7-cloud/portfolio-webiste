import React from 'react';
import { Briefcase } from 'lucide-react';
import ProfessionalExperience from '../components/ProfessionalExperience';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ContactFooter from '../components/ContactFooter';
import { NextPageBanner } from '../components/PageTransitionWrapper';

export default function ExperiencePage({ setCursorState }) {
  return (
    <main className="relative z-10 w-full flex flex-col pt-28 sm:pt-32">
      {/* Page Hero Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-xs uppercase tracking-wider mb-4">
          <Briefcase className="w-3.5 h-3.5" /> Experience & Milestones
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-google text-[#2B231D] tracking-tight mb-4">
          Professional <span className="text-[#C75D35] italic">Experience.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#382E27] font-medium max-w-2xl mx-auto">
          Dedicated workspace for current & upcoming internship details, engineering roles, and academic foundation milestones.
        </p>
      </div>

      {/* Emptied Professional Experience Section for User Input */}
      <ProfessionalExperience setCursorState={setCursorState} />

      {/* Academic Milestones Radar / Timeline */}
      <ExperienceTimeline setCursorState={setCursorState} />

      {/* Seamless Next Page Flow */}
      <NextPageBanner
        label="Next Chapter"
        title="Open Source Contributions (6 PRs)"
        description="Inspect verified upstream commits merged into Microsoft Terminal, WinGet, Backlot, Nextcloud, and Synapse."
        to="/opensource"
        setCursorState={setCursorState}
      />

      <ContactFooter setCursorState={setCursorState} />
    </main>
  );
}
