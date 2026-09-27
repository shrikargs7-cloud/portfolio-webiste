import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Maximize2, Minimize2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import BackgroundVideo, { VIDEO_SOURCES } from './BackgroundVideo';

export default function PerformanceDeck({ setCursorState }) {
  const sectionRef = useRef(null);
  const [docOpenedOnScroll, setDocOpenedOnScroll] = useState(false);
  const [isUnfolded, setIsUnfolded] = useState(false);

  const deck = [
    {
      id: 'ocupulse-doc',
      title: 'OcuPulse Screening Pipeline Architecture',
      year: '2026',
      type: 'Medical Vision Specification',
      desc: 'Technical pipeline detailing retinal fundus image acquisition, CLAHE enhancement, vessel segmentation, and DR grading.',
      specs: 'Datasets: APTOS 2019, IDRiD, DRIVE, Messidor-2',
      stack: ['Python', 'OpenCV', 'PyTorch', 'SciPy', 'MATLAB'],
      highlights: 'Green-channel extraction, binary mask generation, vessel skeletonization, and automated structured diagnostic reports.'
    },
    {
      id: 'agent-swarm-doc',
      title: 'Agent Swarm Optimization Architecture',
      year: '2025',
      type: 'Agentic AI Architecture',
      desc: 'System design doc for autonomous multi-agent cloud optimization. Recognized as Agentic AI World Cup Winner.',
      specs: 'Agentic AI World Cup Winner System',
      stack: ['Agentic AI', 'Multi-Agent', 'Python', 'Cloud Optimization'],
      highlights: 'Autonomous collaboration between specialized agents for cloud cost and latency optimization.'
    },
    {
      id: 'vega-doc',
      title: 'Vega AI Report Intelligence Specs',
      year: '2025',
      type: 'Generative AI Specification',
      desc: 'Document intelligence and report analysis system extracting structured information and automated insights.',
      specs: 'LLM Ingestion / Information Extraction',
      stack: ['Generative AI', 'NLP', 'LLM APIs', 'Python'],
      highlights: 'Automated report understanding, document analysis, and structured JSON output generation.'
    },
    {
      id: 'prior-auth-doc',
      title: 'Prior Auth Healthcare Automation',
      year: '2025',
      type: 'Automation Architecture',
      desc: 'Workflow automation system assisting medical insurance prior-authorization through intelligent document processing.',
      specs: 'Healthcare Automation / Rule-Based Reasoning',
      stack: ['AI Automation', 'Rule-Based Reasoning', 'Agentic Workflows'],
      highlights: 'Rule-based and AI reasoning integration minimizing manual administrative overhead in medical insurance workflows.'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDocOpenedOnScroll(true);
          setIsUnfolded(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="performance" 
      className="relative bg-transparent w-full py-8 md:py-12 px-4 sm:px-8 md:px-12 select-none overflow-hidden"
    >
      <BackgroundVideo
        src={VIDEO_SOURCES.performance}
        transform="scale-120 rotate-6"
        opacity="opacity-20"
        blendMode="mix-blend-screen"
        overlayColor="bg-[#FFFFFF]/75"
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-google flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#73675E]">
                <span className="h-2 w-2 rounded-full bg-[#C75D35] animate-pulse" />
                Technical Documentation
              </span>
              
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border backdrop-blur-md font-mono text-[10px] transition-all duration-700 ${
                docOpenedOnScroll 
                  ? 'bg-[#C75D35]/15 border-[#D09B65] text-[#C75D35] animate-pulse' 
                  : 'bg-[#FFFFFF]/80 border-[#2B231D]/5 text-[#73675E]'
              }`}>
                <BookOpen className="w-3 h-3 text-[#C75D35]" />
                <span>{docOpenedOnScroll ? '✓ Documentation Unfolded' : 'Scroll to inspect'}</span>
              </div>
            </div>

            <h2 className="font-google text-[clamp(40px,7vw,80px)] font-semibold leading-none tracking-tight text-[#2B231D]">
              System Architecture Docs
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            type="button"
            onClick={() => setIsUnfolded(!isUnfolded)}
            onMouseEnter={() => setCursorState && setCursorState({ label: isUnfolded ? 'Fold' : 'Unfold' })}
            onMouseLeave={() => setCursorState && setCursorState({ label: null })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#2B231D]/5 text-xs font-mono font-semibold tracking-wider text-[#2B231D] hover:border-[#D09B65]/60 hover:text-[#C75D35] transition-all bg-[#FFFFFF]/60 backdrop-blur-md shadow-xl"
          >
            {isUnfolded ? <Minimize2 className="w-4 h-4 text-[#C75D35]" /> : <Maximize2 className="w-4 h-4 text-[#C75D35]" />}
            <span>{isUnfolded ? 'Fold Stack' : 'Unfold Specs'}</span>
          </motion.button>
        </div>

        {/* Document Display Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-doc-unfold"
        >
          {deck.map((card, idx) => (
            <motion.div
              key={card.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
              }}
              onMouseEnter={() => setCursorState && setCursorState({ label: 'Inspect' })}
              onMouseLeave={() => setCursorState && setCursorState({ label: null })}
              className="group relative rounded-3xl overflow-hidden border border-[#2B231D]/5 p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#D09B65]/50 bg-[#FFFFFF]/60 backdrop-blur-xl flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(43,35,29,0.06)]"
            >
              {/* Tech Reticles */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#2B231D]/20 group-hover:border-[#D09B65]/80 transition-colors pointer-events-none" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#2B231D]/20 group-hover:border-[#D09B65]/80 transition-colors pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#2B231D]/20 group-hover:border-[#D09B65]/80 transition-colors pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#2B231D]/20 group-hover:border-[#D09B65]/80 transition-colors pointer-events-none" />

              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="font-mono text-xs text-[#C75D35] font-bold tracking-wider">Doc 0{idx + 1}</span>
                  <span className="font-mono text-xs text-[#515154] font-bold">{card.year}</span>
                </div>

                <h3 className="font-google text-2xl font-bold text-[#2B231D] group-hover:text-[#C75D35] transition-colors mb-2">
                  {card.title}
                </h3>

                <p className="font-google text-xs text-[#73675E] leading-relaxed font-light mb-3">
                  {card.desc}
                </p>

                {/* Hover-Revealed Full Details */}
                <div className="space-y-3 pt-2 max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 overflow-hidden transition-all duration-500">
                  <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#2B231D]/5 text-[11px] font-google text-[#C75D35] leading-relaxed shadow-sm">
                    <span className="font-mono text-[9px] text-[#73675E] tracking-wider block mb-1">Architecture Highlights</span>
                    {card.highlights}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {card.stack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-[#F5F1EB] border border-[#2B231D]/5 text-[#73675E] text-[10px] font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2B231D]/5 flex items-center justify-between font-mono text-[10px] text-[#73675E] mt-4">
                <span className="truncate pr-2 group-hover:text-[#2B231D] transition-colors">{card.specs}</span>
                <FileText className="w-3.5 h-3.5 text-[#C75D35] flex-shrink-0 group-hover:scale-125 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}