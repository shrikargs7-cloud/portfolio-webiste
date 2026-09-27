import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Video } from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';
import BackgroundVideo, { VIDEO_SOURCES } from './BackgroundVideo';

export default function FeaturedWork({ setCursorState, images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'AI Learning Platform',
      category: 'EdTech & AI',
      subtitle: 'First Movers',
      description: 'Designed personalized learning journeys and AI-powered skill analytics for professional education environments.',
      image: images.aiLearn,
      tags: ['Product Design', 'AI Engine', 'Design System'],
      role: 'Lead UX & UI Designer',
      timeline: '4 Months',
      platform: 'Web Desktop App',
      impact: '240k+ Active Students',
    },
    {
      id: 2,
      title: 'FosterHealth AI',
      category: 'Healthcare & Intelligence',
      subtitle: 'FosterHealth',
      description: 'A mobile-first vital tracking app and biometric analysis companion optimizing patient-doctor communication.',
      image: images.health,
      tags: ['Mobile UX', 'Health Tech', 'Data Visuals'],
      role: 'Principal Mobile Architect',
      timeline: '3 Months',
      platform: 'iOS & Android',
      impact: '98.4% User Satisfaction',
    },
    {
      id: 3,
      title: 'CryptoVault Protocol',
      category: 'Web3 & Financial',
      subtitle: 'Sourcing Crypto',
      description: 'Streamlined non-custodial crypto asset management dashboard tailored for high-speed cross-chain trading.',
      image: images.crypto,
      tags: ['Web3', 'DeFi Dashboard', 'Dark Mode'],
      role: 'Lead Product Designer',
      timeline: '5 Months',
      platform: 'Web App & Browser Ext',
      impact: '$1.4M Daily Volume',
    },
    {
      id: 4,
      title: 'Salona Creative Studio',
      category: 'Spatial Design & Web',
      subtitle: 'Salona',
      description: 'Immersive digital portfolio and online gallery platform for site-specific performance artists.',
      image: images.nook,
      tags: ['Creative Web', '3D Motion', 'Brand System'],
      role: 'Creative Technologist',
      timeline: '2 Months',
      platform: 'Web Experience',
      impact: 'Awwwards Site of the Day',
    },
  ];

  const current = projects[currentIndex];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="work" className="relative flex min-h-screen flex-col justify-center bg-[#050505] px-6 py-24 md:px-12 md:py-32  overflow-hidden">
      
      {/* Background Video - View 03: Spatial Grid Horizon */}
      <BackgroundVideo
        src={VIDEO_SOURCES.work}
        transform="scale-125 translate-x-10"
        opacity="opacity-30"
        blendMode="mix-blend-screen"
        overlayColor="bg-transparent/65"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        
        {/* Section Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-google flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#2B231D]/50">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Selected Case Studies
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF]/60 border border-white/15 backdrop-blur-md font-mono text-[10px] text-[#2B231D]/70">
              <Video className="w-3 h-3 text-accent" />
              <span>View 03: Spatial Grid Horizon</span>
            </div>
          </div>

          <h2 className="font-google text-[clamp(40px,7vw,84px)] font-bold leading-none tracking-tight text-[#2B231D]">
            Featured Work
          </h2>
          <p className="font-sulphur mt-6 max-w-2xl text-[clamp(18px,2.2vw,26px)] leading-relaxed text-[#2B231D]/80">
            Blending technology, human empathy, and fine-tuned design systems to bridge people, spaces, and digital products.
          </p>
        </div>

        {/* Interactive Main Showcase Card */}
        <div className="mt-14 flex items-center justify-center gap-4 md:gap-8">
          
          {/* Prev Arrow Button */}
          <button
            type="button"
            onClick={prevProject}
            onMouseEnter={() => setCursorState({ label: 'Prev' })}
            onMouseLeave={() => setCursorState({ label: null })}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-[#2B231D] transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110 bg-[#FFFFFF]/40 backdrop-blur-md z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Project Viewport Card */}
          <div
            onClick={() => setSelectedProject(current)}
            onMouseEnter={() => setCursorState({ label: 'View Case' })}
            onMouseLeave={() => setCursorState({ label: null })}
            className="relative block shrink overflow-hidden rounded-3xl bg-neutral-900 border border-white/15 shadow-2xl group cursor-pointer w-full max-w-4xl aspect-[16/10]"
          >
            {/* Background Screenshot Image */}
            <img
              src={current.image}
              alt={current.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            {/* Index Counter Pill */}
            <span className="absolute left-6 top-6 z-20 rounded-full border border-white/20 bg-[#FFFFFF]/60 px-4 py-1.5 font-mono text-xs tracking-widest text-[#2B231D] backdrop-blur-md">
              0{currentIndex + 1} / 0{projects.length}
            </span>

            {/* Content Bottom Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {current.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/10 text-[#2B231D]/90 border border-[#2B231D]/10 backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-google text-[clamp(28px,3.5vw,46px)] font-bold leading-tight text-[#2B231D] group-hover:text-accent transition-colors flex items-center gap-3">
                  {current.title}
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent" />
                </h3>
                <p className="font-google mt-2 max-w-xl text-sm md:text-base leading-relaxed text-[#2B231D]/80 font-light">
                  {current.description}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full bg-accent text-black font-bold text-xs tracking-wider shadow-lg group-hover:scale-105 transition-transform"
                >
                  Read Case Study
                </button>
              </div>
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={nextProject}
            onMouseEnter={() => setCursorState({ label: 'Next' })}
            onMouseLeave={() => setCursorState({ label: null })}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-[#2B231D] transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110 bg-[#FFFFFF]/40 backdrop-blur-md z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Project Tab Quick Selectors */}
        <div className="mt-8 flex flex-wrap justify-center gap-3  pt-6">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`font-google text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'bg-white text-black font-bold shadow-lg scale-105'
                  : 'text-[#2B231D]/50 hover:text-[#2B231D] hover:bg-white/10 backdrop-blur-md'
              }`}
            >
              {p.subtitle}
            </button>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
