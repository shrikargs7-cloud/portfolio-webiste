import React from 'react';
import { GitPullRequest } from 'lucide-react';
import OpenSourceContributions from '../components/OpenSourceContributions';
import ContactFooter from '../components/ContactFooter';
import { NextPageBanner } from '../components/PageTransitionWrapper';

export default function OpenSourcePage({ setCursorState }) {
  return (
    <main className="relative z-10 w-full flex flex-col pt-28 sm:pt-32">
      {/* Page Hero Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-xs uppercase tracking-wider mb-4">
          <GitPullRequest className="w-3.5 h-3.5" /> 6 Upstream Pull Requests
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-google text-[#2B231D] tracking-tight mb-4">
          Open Source <span className="text-[#C75D35] italic">Contributions.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#382E27] font-medium max-w-2xl mx-auto">
          Direct production contributions to upstream Microsoft repositories (Windows Terminal & WinGet), Backlot SaaS emulator, Nextcloud, and Element Synapse.
        </p>
      </div>

      {/* Real GitHub Contributions */}
      <OpenSourceContributions setCursorState={setCursorState} />

      {/* Seamless Next Page Flow */}
      <NextPageBanner
        label="Next Chapter"
        title="Skills & System Architecture"
        description="Explore the full technical bento stack across ML/AI, GenAI & RAG, Distributed Backends, and Cloud Infra."
        to="/skills"
        setCursorState={setCursorState}
      />

      <ContactFooter setCursorState={setCursorState} />
    </main>
  );
}
