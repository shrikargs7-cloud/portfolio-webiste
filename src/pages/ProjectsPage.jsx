import React from 'react';
import { Layers } from 'lucide-react';
import FeaturedCaseStudies from '../components/FeaturedCaseStudies';
import PlaygroundGrid from '../components/PlaygroundGrid';
import WebDesignList from '../components/WebDesignList';
import CertificatesGallery from '../components/CertificatesGallery';
import ContactFooter from '../components/ContactFooter';
import { NextPageBanner } from '../components/PageTransitionWrapper';

export default function ProjectsPage({ setCursorState }) {
  return (
    <main className="relative z-10 w-full flex flex-col pt-28 sm:pt-32">
      {/* Page Hero Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-xs uppercase tracking-wider mb-4">
          <Layers className="w-3.5 h-3.5" /> Systems & Deployments
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-google text-[#2B231D] tracking-tight mb-4">
          Crafted <span className="text-[#C75D35] italic">Projects.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#382E27] font-medium max-w-2xl mx-auto">
          Deep dive into flagship production applications, embedded IoT experiments, digital surfaces, and verified credentials.
        </p>
      </div>

      {/* Featured Case Studies */}
      <FeaturedCaseStudies setCursorState={setCursorState} />

      {/* Playground Grid (IoT, R&D) */}
      <PlaygroundGrid setCursorState={setCursorState} />

      {/* Web Design Works */}
      <WebDesignList setCursorState={setCursorState} />

      {/* Certificates & Credentials */}
      <CertificatesGallery setCursorState={setCursorState} />

      {/* Loop Back to Home */}
      <NextPageBanner
        label="Back to Start"
        title="Return to Executive Overview"
        description="Head back to the Hero, RV University Orbit, and interactive developer terminal."
        to="/"
        setCursorState={setCursorState}
      />

      <ContactFooter setCursorState={setCursorState} />
    </main>
  );
}
