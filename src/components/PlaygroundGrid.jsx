import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Video } from 'lucide-react';
import BackgroundVideo, { VIDEO_SOURCES } from './BackgroundVideo';

export default function PlaygroundGrid({ setCursorState }) {
  const experiments = [
    {
      id: 'contextlens',
      title: 'ContextLens',
      type: 'On-Device Mobile AI',
      tag: 'OCR & SLM',
      description: 'Understanding real-world visual & textual context using on-device ML, small language models (Gemma/Phi), SQLite, and local FAISS vector search.',
      link: 'https://github.com/shrikargs7-cloud/ContextLens'
    },
    {
      id: 'hermes',
      title: 'Hermes ESP32',
      type: 'Embedded Local Server',
      tag: 'Edge AI & IoT',
      description: 'An ESP32-based local web server and local AI-agent experimentation project exposing telemetry and status through responsive web interfaces.',
      link: 'https://github.com/shrikargs7-cloud/HermesESP32-WebServer'
    },
    {
      id: 'smart-trolley',
      title: 'Smart Shopping Trolley',
      type: 'Embedded Automation',
      tag: 'IoT Retail',
      description: 'Smart retail cart concept designed to automate item tracking and enhance the shopping experience through embedded intelligence and sensors.',
      link: 'https://github.com/shrikargs7-cloud/smart-shopping-trolley'
    },
    {
      id: 'smart-street-light',
      title: 'Smart Street Light',
      type: 'Autonomous IoT',
      tag: 'Sensors & Microcontrollers',
      description: 'Context-aware automated lighting concept optimizing energy consumption based on environmental threshold detection.',
      link: 'https://github.com/shrikargs7-cloud/smart-street-light-project'
    },
    {
      id: 'receipt-keeper',
      title: 'Receipt Keeper',
      type: 'Mobile Productivity',
      tag: 'Data Persistence',
      description: 'A personal receipt-management application designed to help users digitally organize, track, and manage receipts with local persistence.',
      link: 'https://github.com/shrikargs7-cloud/ReceiptKeeper'
    }
  ];

  return (
    <section 
      id="playground" 
      className="relative bg-transparent text-[#2B231D] w-full py-8 md:py-12 px-4 sm:px-8 md:px-12 overflow-hidden transition-all duration-700 ease-in-out"
    >
      <BackgroundVideo
        src={VIDEO_SOURCES.playground}
        transform="scale-135 -rotate-3"
        opacity="opacity-15"
        blendMode="mix-blend-color-dodge"
        overlayColor="bg-[#FFFFFF]/80"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-google flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#73675E]">
                <span className="h-2 w-2 rounded-full bg-[#C75D35] animate-ping" />
                R&amp;D Experiments
              </span>
            </div>

            <h2 className="font-google text-[clamp(40px,7vw,80px)] font-semibold leading-none tracking-tight">
              Playground
            </h2>
          </div>
          <p className="font-google max-w-md text-base text-[#73675E] font-light">
            A sandbox for self-initiated products, spatial prototypes, and vibe-coded creative tools driven by curiosity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiments.map((item, idx) => {
            const rotations = [-4, 3, -2];
            const rot = rotations[idx % rotations.length];
            return (
              <a href={item.link} target="_blank" rel="noreferrer" key={item.id} className="block group h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, y: 25, rotate: rot * 2 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.03, y: -8, rotate: rot * 0.5 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20, delay: idx * 0.1 }}
                  onMouseEnter={() => setCursorState && setCursorState({ label: 'GitHub' })}
                  onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                  className="relative h-full rounded-3xl p-7 border border-[#2B231D]/5 group-hover:border-[#D09B65]/50 transition-all duration-500 flex flex-col justify-between bg-[#FFFFFF]/40 backdrop-blur-xl shadow-2xl group-hover:shadow-[0_0_30px_rgba(163,230,53,0.15)] overflow-hidden"
                >
                  {/* Tech Reticle Corners */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#2B231D]/20 group-hover:border-[#D09B65]/80 transition-colors pointer-events-none" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#2B231D]/20 group-hover:border-[#D09B65]/80 transition-colors pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#2B231D]/20 group-hover:border-[#D09B65]/80 transition-colors pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#2B231D]/20 group-hover:border-[#D09B65]/80 transition-colors pointer-events-none" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-[#F5F1EB]/80 border border-[#2B231D]/5 font-mono text-[11px] text-[#73675E]">
                        {item.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#C75D35]/10 border border-[#D09B65]/20 font-mono text-[11px] text-[#C75D35]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-google text-2xl font-bold text-[#2B231D] group-hover:text-[#C75D35] transition-colors duration-500">
                      {item.title}
                    </h3>
                    <p className="font-google text-sm text-[#73675E] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-auto flex justify-end">
                    <div className="p-2 rounded-full bg-[#F5F1EB]/80 text-[#73675E] group-hover:bg-[#C75D35] group-hover:text-white transition-all duration-300 shadow-lg flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest hidden group-hover:inline-block font-mono pl-2">View Code</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}