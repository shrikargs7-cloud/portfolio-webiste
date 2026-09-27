import React, { useState } from 'react';
import { UserCheck, Briefcase, Code, Sparkles, Layers, Video } from 'lucide-react';
import BackgroundVideo, { VIDEO_SOURCES } from './BackgroundVideo';

export default function AboutPersona({ setCursorState }) {
  const [activePersona, setActivePersona] = useState('anyone');

  const personas = [
    {
      id: 'anyone',
      title: 'For anyone',
      icon: UserCheck,
      quote: "I'm Shrikar GS — product designer who blends creativity, technology, and a little vibe-coding into experiences that feel genuinely human.",
      highlights: ['Human-Centered Design', 'Rapid Prototyping', 'Creative Direction'],
      details: 'Passionate about crafting intuitive software that connects physical spaces with digital intelligence.'
    },
    {
      id: 'recruiters',
      title: 'Recruiters',
      icon: Briefcase,
      quote: " design systems and product UX across AI platforms, Web3 protocols, and mobile health apps. Experienced in cross-functional team scaling.",
      highlights: ['Full Product Lifecycle', 'Figma & Design Systems', 'Cross-Functional Leadership'],
      details: 'Proven track record of taking complex zero-to-one concepts into polished, production-ready design deliverables.'
    },
    {
      id: 'designers',
      title: 'Product Designers',
      icon: Layers,
      quote: "Obsessed with micro-interactions, spatial interfaces, typography, and building cohesive design language systems that empower product engineering.",
      highlights: ['Micro-Animations', 'Design System Architecture', 'User Research & Testing'],
      details: 'I love pairing clean, expressive layout hierarchies with tactile motion design that feels satisfying to use.'
    },
    {
      id: 'engineers',
      title: 'Engineers',
      icon: Code,
      quote: "I speak fluent code. I prototype directly in React, Tailwind, Canvas, and Framer Motion so handoffs are frictionless and component code is clean.",
      highlights: ['React / Vite', 'TailwindCSS / Shader FX', 'Git & Design Tokens'],
      details: 'No pixel-pushing disconnect — I ship production-ready UI components and collaborate tightly with frontend teams.'
    },
    {
      id: 'founders',
      title: 'Founders',
      icon: Sparkles,
      quote: "Partnering with early-stage founders to translate ambitious vision into viral, investor-ready UI prototypes and web experiences within days.",
      highlights: ['0 to 1 MVP Design', 'Brand Architecture', 'Conversion & Pitch Decks'],
      details: 'Fast, high-velocity execution tailored for early product-market fit validation and high visual impact.'
    },
  ];

  const current = personas.find((p) => p.id === activePersona) || personas[0];

  return (
    <section id="about" className="relative flex min-h-[90vh] items-center bg-[#050505] px-6 py-24 md:px-12  overflow-hidden">
      
      {/* Background Video - View 02: Particle Mesh */}
      <BackgroundVideo
        src={VIDEO_SOURCES.about}
        transform="scale-150 rotate-6 translate-y-6"
        opacity="opacity-25"
        blendMode="mix-blend-overlay"
        overlayColor="bg-[#FFFFFF]/70"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        
        {/* Sidebar Nav */}
        <div className="flex shrink-0 flex-col items-start lg:w-72">
          
          {/* Video View Badge */}
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF]/60 border border-white/15 backdrop-blur-md font-mono text-[10px] text-[#2B231D]/70">
            <Video className="w-3 h-3 text-accent" />
            <span>View 02: Particle Mesh (Rotated 6°)</span>
          </div>

          <h2 className="font-google text-[clamp(40px,7vw,76px)] font-bold leading-none tracking-tight text-[#2B231D]">
            Intro
          </h2>

          <nav className="mt-8 flex flex-col items-start gap-2 w-full">
            {personas.map((p) => {
              const isActive = activePersona === p.id;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePersona(p.id)}
                  onMouseEnter={() => setCursorState({ label: 'Switch' })}
                  onMouseLeave={() => setCursorState({ label: null })}
                  className={`group flex w-full items-center gap-3 py-2.5 px-3 text-left font-google text-lg transition-all duration-300 rounded-xl ${
                    isActive
                      ? 'text-[#2B231D] bg-white/10 border border-white/15 backdrop-blur-xl'
                      : 'text-[#2B231D]/40 hover:text-[#2B231D]/80 hover:bg-white/5'
                  }`}
                >
                  <span className={`block h-px bg-current transition-all duration-300 ${isActive ? 'w-6 opacity-100 bg-accent' : 'w-3 opacity-40'}`} />
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'opacity-50'}`} />
                  <span>{p.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dynamic Card */}
        <div className="w-full lg:max-w-2xl lg:flex-1">
          <div className="glass-card relative min-h-[420px] rounded-3xl p-8 md:p-12 flex flex-col justify-between border border-[#2B231D]/10 shadow-2xl transition-all duration-500 bg-[#FFFFFF]/50 backdrop-blur-2xl">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs tracking-wider">
                <span>{current.title} Perspective</span>
              </div>

              <p className="font-sulphur text-[clamp(26px,3.8vw,46px)] font-normal leading-[1.25] tracking-tight text-[#2B231D] transition-opacity duration-300">
                "{current.quote}"
              </p>

              <p className="font-google text-[#2B231D]/80 text-base md:text-lg leading-relaxed font-light">
                {current.details}
              </p>
            </div>

            {/* Highlights Tag Pills */}
            <div className="mt-10 pt-6  flex flex-wrap gap-2">
              {current.highlights.map((tag) => (
                <span
                  key={tag}
                  className="font-google text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/5 text-[#2B231D]/90 border border-[#2B231D]/10 backdrop-blur-md"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
