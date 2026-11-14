import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Layers,
  Cpu,
  Award,
  Sparkles,
  ExternalLink,
  Github,
  Compass,
  Lightbulb,
  PenTool,
  BarChart3
} from 'lucide-react';

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [project, onClose]);

  if (!project) return null;
  const dp = project.designProcess;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-[#2B231D]/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
      data-lenis-prevent="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F5F1EB] border-2 border-[#2B231D]/25 p-6 md:p-10 text-[#2B231D] shadow-2xl my-auto space-y-8 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="sticky top-0 float-right z-10 p-2.5 rounded-full bg-[#FFFFFF] border-2 border-[#2B231D]/20 text-[#382E27] hover:bg-[#C75D35] hover:text-white transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Area */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/30 text-[#C75D35] font-mono text-xs tracking-wider font-semibold">
              {project.category}
            </span>
            {project.achievement && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B231D] text-white font-mono text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-[#D09B65]" />
                {project.achievement}
              </span>
            )}
          </div>

          <h2 className="font-google text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2B231D] leading-tight">
            {project.title}
          </h2>

          <p className="font-google text-base sm:text-lg text-[#382E27] leading-relaxed font-normal">
            {project.desc}
          </p>

          {/* Role / Timeline / Tools Meta Strip */}
          {dp && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C75D35] font-bold block">My Role</span>
                <span className="text-xs sm:text-sm font-bold text-[#2B231D]">{dp.role}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C75D35] font-bold block">Timeline & Scope</span>
                <span className="text-xs sm:text-sm font-bold text-[#2B231D]">{dp.timeline}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/20">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C75D35] font-bold block">Design & Build Stack</span>
                <span className="text-xs font-mono font-semibold text-[#382E27]">{dp.tools.join(' · ')}</span>
              </div>
            </div>
          )}

          {project.evolutionNote && (
            <div className="p-3.5 rounded-2xl bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] text-xs font-mono font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 flex-shrink-0 text-[#C75D35]" />
              <span>{project.evolutionNote}</span>
            </div>
          )}
        </div>

        {/* Structured Product Design Case Study Flow */}
        {dp && (
          <div className="space-y-6 pt-4 border-t border-[#2B231D]/20 font-google">
            {/* 01. Problem & 02. Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/20 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C75D35]">
                  <Compass className="w-4 h-4" />
                  <span>01 · User Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-[#382E27] leading-relaxed font-medium">
                  {dp.problem}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/20 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C75D35]">
                  <Lightbulb className="w-4 h-4" />
                  <span>02 · Research Insights</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#382E27] font-medium">
                  {dp.insights.map((ins, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C75D35] font-bold">•</span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 03. Design Decisions & Trade-offs */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/20 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C75D35]">
                <PenTool className="w-4 h-4" />
                <span>03 · Key Design Decisions & UX Trade-offs</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#382E27] font-medium">
                {dp.decisions.map((dec, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C75D35] shrink-0 mt-0.5" />
                    <span>{dec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 04. UX Impact Metrics */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#2B231D]">
                <BarChart3 className="w-4 h-4 text-[#C75D35]" />
                <span>04 · Measured UX & Product Outcomes</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {dp.impact.map((imp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#2B231D] text-white text-center shadow-sm">
                    <div className="text-lg sm:text-2xl font-bold font-mono text-[#D09B65]">{imp.metric}</div>
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/80 mt-0.5">{imp.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Technologies Grid */}
        <div className="space-y-3 pt-4 border-t border-[#2B231D]/20">
          <span className="text-xs font-mono tracking-widest text-[#382E27] font-bold block">
            // Technologies &amp; Architecture Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#2B231D]/20 text-xs font-mono text-[#2B231D] font-semibold shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Pipeline Stages (For OcuPulse) */}
        {project.pipelineStages && project.pipelineStages.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-[#2B231D]/15 font-google">
            <h3 className="text-lg sm:text-xl font-bold text-[#2B231D] font-google flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-600" />
              <span>End-to-End Diagnostic Pipeline</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.pipelineStages.map((stage, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/20 text-xs text-[#382E27] font-medium shadow-xs"
                >
                  <span className="font-mono text-[10px] font-bold text-emerald-700 px-1.5 py-0.5 rounded border border-[#2B231D]/20">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{stage}</span>
                </div>
              ))}
            </div>

            {project.validationDatasets && (
              <div className="mt-3 p-4 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/20 text-xs font-mono text-[#382E27] shadow-xs">
                <span className="text-emerald-700 font-bold mr-2">Validation Datasets:</span>
                <span className="text-[#2B231D] font-semibold">{project.validationDatasets.join(' · ')}</span>
              </div>
            )}
          </div>
        )}

        {/* Key Concepts (For other projects) */}
        {project.keyConcepts && project.keyConcepts.length > 0 && (
          <div className="space-y-4 pt-2 border-t border-[#2B231D]/20 font-google">
            <h3 className="text-lg sm:text-xl font-bold text-[#2B231D] font-google flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#C75D35]" />
              <span>System &amp; Interaction Highlights</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#382E27] text-xs sm:text-sm font-medium">
              {project.keyConcepts.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-[#FFFFFF] p-3.5 rounded-2xl border border-[#2B231D]/20 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#C75D35] flex-shrink-0 mt-0.5" />
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-6 border-t border-[#2B231D]/20 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F5F1EB] border-2 border-[#2B231D]/25 hover:border-[#C75D35] text-[#2B231D] font-mono text-xs font-semibold transition-all shadow-sm"
              >
                <Github className="w-4 h-4 text-[#C75D35]" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3 text-[#382E27]" />
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F5F1EB] border-2 border-[#2B231D]/20 hover:border-[#C75D35] text-[#2B231D] font-mono text-xs font-semibold transition-all shadow-sm"
              >
                <ExternalLink className="w-4 h-4 text-[#C75D35]" />
                <span>Secondary Repo / Demo</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#2B231D]/20 text-[#382E27] hover:text-[#2B231D] hover:bg-[#FFFFFF] text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Close (ESC)
            </button>
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C75D35] text-white font-bold font-mono text-xs hover:bg-[#A84A28] transition-all shadow-md cursor-pointer"
          >
            Discuss Design &amp; Architecture <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
