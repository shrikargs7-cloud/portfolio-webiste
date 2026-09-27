import React, { useState } from 'react';
import { Award, Target, Rocket, GraduationCap, Code2, Orbit, Sparkles, Layers, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function ExperienceTimeline({ setCursorState }) {
  const [viewMode, setViewMode] = useState('ORBIT'); // 'ORBIT' | 'ROADMAP'

  // Retaining the complete text content and milestones from Shrikar G S
  const timelineData = [
    {
      id: 1,
      title: "RV University (B.Tech CS)",
      date: "2023 - Present",
      content: "Specializing in Distributed Systems, Algorithms, Full Stack Web Architecture, and Machine Learning at RV University.",
      category: "Academic Foundation",
      icon: GraduationCap,
      relatedIds: [2, 3],
      status: "in-progress",
      energy: 95,
    },
    {
      id: 2,
      title: "Cloud Computing & GCP Systems",
      date: "2024 - 2025",
      content: "Hands-on engineering in Google Cloud Platform (GCP), Cloud Run, Serverless Microservices, Docker containerization, and IAM security.",
      category: "Cloud Architecture",
      icon: Award,
      relatedIds: [1, 3],
      status: "completed",
      energy: 90,
    },
    {
      id: 3,
      title: "Agentic AI & System Optimization",
      date: "2025",
      content: "Architected autonomous multi-agent cloud optimization system featuring task decomposition and intelligent decision-making. Recognized as Agentic AI World Cup Winner.",
      category: "Agentic AI Innovation",
      icon: Code2,
      relatedIds: [2, 4],
      status: "completed",
      energy: 90,
    },
    {
      id: 4,
      title: "OcuPulse & Medical Computer Vision",
      date: "2025 - 2026",
      content: "Engineered automated diabetic retinopathy screening pipeline combining OpenCV, PyTorch, CLAHE enhancement, vessel segmentation, and multi-dataset validation (APTOS 2019, IDRiD, DRIVE, Messidor-2).",
      category: "Computer Vision & ML",
      icon: Rocket,
      relatedIds: [3, 5],
      status: "in-progress",
      energy: 85,
    },
    {
      id: 5,
      title: "Full-Stack & Production AI Systems",
      date: "Horizon 2026+",
      content: "Developing scalable production-oriented software, fine-tuning LLMs with PEFT/LoRA, deploying cloud APIs, and architecting end-to-end intelligent systems.",
      category: "Future Horizon",
      icon: Target,
      relatedIds: [4],
      status: "pending",
      energy: 80,
    },
  ];

  return (
    <section 
      id="experience" 
      className="py-8 md:py-12 px-4 sm:px-6 md:px-12 bg-transparent w-full relative select-none"
    >
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#D09B65]/30 text-[#C75D35] font-mono text-xs shadow-sm">
              <Orbit className="w-3.5 h-3.5 animate-spin text-[#C75D35]" style={{ animationDuration: '6s' }} />
              <span>// Milestones &amp; Horizons</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#2B231D] font-google tracking-tighter">
              Experience Milestones
            </h2>

            <p className="font-google text-[#73675E] text-xs sm:text-base font-light leading-relaxed">
              Chronological horizon tracking academic foundations, cloud computing systems, agentic AI innovation, medical computer vision, and scalable production software.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'ORBIT' ? 'ROADMAP' : 'ORBIT')}
              className="px-4 py-2 rounded-2xl border border-[#2B231D]/10 bg-[#FFFFFF]/90 hover:bg-[#F5F1EB] text-[#2B231D] text-xs font-mono flex items-center gap-2 transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Layers className="w-4 h-4 text-[#C75D35]" />
              <span>{viewMode === 'ORBIT' ? 'Roadmap Flow' : 'Orbital Radar'}</span>
            </button>
          </div>
        </div>

        {/* View 1: 3D Radial Orbital Radar */}
        {viewMode === 'ORBIT' ? (
          <div 
            className="relative w-full rounded-3xl bg-[#FFFFFF]/50 border border-[#2B231D]/5 backdrop-blur-2xl shadow-2xl overflow-hidden p-3 sm:p-6"
            onMouseEnter={() => setCursorState && setCursorState({ label: 'Orbit' })}
            onMouseLeave={() => setCursorState && setCursorState({ label: null })}
          >
            {/* Corner Cyber Reticles */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#D09B65]/50 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#D09B65]/50 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#D09B65]/50 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#D09B65]/50 pointer-events-none" />

            <RadialOrbitalTimeline 
              timelineData={timelineData} 
            />
          </div>
        ) : (
          /* View 2: High-Clarity Chronological Roadmap Flow */
          <div className="space-y-4 max-w-4xl mx-auto py-4">
            {timelineData.map((item, idx) => {
              const Icon = item.icon;
              const isLast = idx === timelineData.length - 1;

              return (
                <div 
                  key={item.id}
                  className="relative flex items-start gap-4 sm:gap-6 group"
                >
                  {/* Vertical Track Line */}
                  {!isLast && (
                    <div className="absolute top-12 left-5 sm:left-6 w-0.5 h-[calc(100%+16px)] bg-gradient-to-b from-[#C75D35]/50 via-[#D09B65]/30 to-transparent pointer-events-none" />
                  )}

                  {/* Milestone Orb Icon */}
                  <div className="relative z-10 w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/5 text-[#C75D35] flex items-center justify-center shadow-lg group-hover:border-[#D09B65] group-hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Milestone Card Content */}
                  <div className="flex-1 p-5 sm:p-6 rounded-3xl bg-[#FFFFFF]/70 border border-[#2B231D]/5 group-hover:border-[#D09B65]/40 backdrop-blur-xl transition-all duration-300 shadow-xl space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs text-sky-400 tracking-wider font-semibold">
                        {item.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#C75D35] bg-[#FFFFFF] px-3 py-1 rounded-full border border-[#2B231D]/5">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="font-google text-xl sm:text-2xl font-bold text-[#2B231D]">
                      {item.title}
                    </h3>

                    <p className="font-google text-sm sm:text-base text-[#73675E] font-light leading-relaxed">
                      {item.content}
                    </p>

                    {/* Progress Bar */}
                    <div className="pt-2">
                      <div className="flex justify-between items-center text-xs font-mono mb-1.5 text-[#73675E]">
                        <span>Milestone Energy</span>
                        <span className="text-[#C75D35] font-bold">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#F5F1EB] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#C75D35] to-[#D09B65] rounded-full"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}