import React from 'react';
import { X, CheckCircle2, ArrowRight, Layers, Database, Cpu, Award, Sparkles, ExternalLink, GitBranch, Github } from 'lucide-react';

export default function CaseStudyModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-transparent/85 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-transparent border border-[#2B231D]/5 p-6 md:p-10 text-[#2B231D] shadow-2xl my-auto space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-[#FFFFFF] border border-[#2B231D]/5 text-[#73675E] hover:bg-[#C75D35] hover:text-slate-950 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Area */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#C75D35]/10 border border-[#D09B65]/30 text-[#C75D35] font-mono text-xs tracking-widest font-semibold">
              {project.category}
            </span>
            {project.achievement && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 font-mono text-xs font-bold animate-pulse">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                {project.achievement}
              </span>
            )}
          </div>

          <h2 className="font-google text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2B231D] leading-tight">
            {project.title}
          </h2>

          <p className="font-google text-base sm:text-lg text-[#73675E] leading-relaxed font-light">
            {project.desc}
          </p>

          {project.evolutionNote && (
            <div className="p-3.5 rounded-2xl bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] text-xs font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 flex-shrink-0 text-[#C75D35]" />
              <span>{project.evolutionNote}</span>
            </div>
          )}
        </div>

        {/* Technologies Grid */}
        <div className="space-y-3 pt-2 border-t border-[#2B231D]/5">
          <span className="text-xs font-mono tracking-widest text-[#73675E] block">
            // Technologies &amp; Frameworks
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#2B231D]/5 text-xs font-mono text-[#2B231D]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Pipeline Stages (For OcuPulse) */}
        {project.pipelineStages && project.pipelineStages.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-[#2B231D]/5 font-google">
            <h3 className="text-lg sm:text-xl font-bold text-[#2B231D] font-google flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>Full Processing Pipeline Architecture</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.pipelineStages.map((stage, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FFFFFF]/60 border border-[#2B231D]/5 text-xs text-[#73675E]"
                >
                  <span className="font-mono text-[10px] font-bold text-emerald-400 bg-transparent px-1.5 py-0.5 rounded border border-[#2B231D]/5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{stage}</span>
                </div>
              ))}
            </div>

            {project.validationDatasets && (
              <div className="mt-3 p-4 rounded-2xl bg-[#FFFFFF]/40 border border-[#2B231D]/5 text-xs font-mono text-[#73675E]">
                <span className="text-emerald-400 font-bold mr-2">Validation Datasets:</span>
                <span className="text-[#2B231D]">{project.validationDatasets.join(' · ')}</span>
              </div>
            )}

            {project.architectureNote && (
              <p className="text-xs text-[#73675E] font-google italic leading-relaxed">
                {project.architectureNote}
              </p>
            )}
          </div>
        )}

        {/* Key Concepts (For other projects) */}
        {project.keyConcepts && project.keyConcepts.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-[#2B231D]/5 font-google">
            <h3 className="text-lg sm:text-xl font-bold text-[#2B231D] font-google flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#C75D35]" />
              <span>Key Engineering Concepts</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#73675E] text-xs sm:text-sm">
              {project.keyConcepts.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-[#FFFFFF]/40 p-3.5 rounded-2xl border border-[#2B231D]/5">
                  <CheckCircle2 className="w-4 h-4 text-[#C75D35] flex-shrink-0 mt-0.5" />
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-6 border-t border-[#2B231D]/5 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F5F1EB] border border-[#2B231D]/5 hover:border-[#D09B65] text-[#2B231D] font-mono text-xs font-semibold transition-all shadow-md hover:scale-105"
              >
                <Github className="w-4 h-4 text-[#C75D35]" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3 text-[#73675E]" />
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F5F1EB] border border-[#2B231D]/5 hover:border-sky-400 text-[#2B231D] font-mono text-xs font-semibold transition-all shadow-md hover:scale-105"
              >
                <ExternalLink className="w-4 h-4 text-sky-400" />
                <span>Secondary Repo / Demo</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#2B231D]/5 text-[#73675E] hover:text-[#2B231D] hover:bg-[#FFFFFF] text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Close Breakdown
            </button>
          </div>
          
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C75D35] text-slate-950 font-bold font-mono text-xs hover:bg-lime-300 hover:scale-105 transition-all shadow-lg cursor-pointer"
          >
            Discuss Engineering <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}