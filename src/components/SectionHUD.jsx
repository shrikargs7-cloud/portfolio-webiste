import React from 'react';
import { ChevronUp, ChevronDown, Compass } from 'lucide-react';

export default function SectionHUD({
  sections,
  activeSection,
  onSelectSection,
  onNext,
  onPrev,
  setCursorState,
}) {
  const current = sections[activeSection] || sections[0];
  const progressPercent = ((activeSection + 1) / sections.length) * 100;

  return (
    <>
      {/* Top Cybernetic Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[120] h-[3px] bg-[#2B231D]/10 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#C75D35] via-[#D09B65] to-[#C75D35] shadow-[0_0_10px_#C75D35] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Floating Bottom Quick Navigator HUD with Zero Latency */}
      <div className="fixed bottom-6 left-6 z-[120] hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-2xl border-2 border-[#2B231D]/25 shadow-xl font-mono text-xs select-none">
        <button
          onClick={onPrev}
          onMouseEnter={() => setCursorState && setCursorState({ label: 'Prev' })}
          onMouseLeave={() => setCursorState && setCursorState({ label: null })}
          className="p-2 rounded-full hover:bg-[#F5F1EB] text-[#2B231D] transition-colors"
          title="Previous Section (Zero Latency)"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>

        <div className="px-3 py-1 rounded-full bg-[#F5F1EB] text-[#2B231D] font-bold text-[11px] flex items-center gap-2 border border-[#2B231D]/15">
          <span className="text-[#C75D35]">{current.tag}</span>
          <span className="font-google font-semibold">{current.label}</span>
          <span className="text-[#382E27]/60 text-[10px]">({activeSection + 1}/{sections.length})</span>
        </div>

        <button
          onClick={onNext}
          onMouseEnter={() => setCursorState && setCursorState({ label: 'Next' })}
          onMouseLeave={() => setCursorState && setCursorState({ label: null })}
          className="p-2 rounded-full hover:bg-[#F5F1EB] text-[#2B231D] transition-colors"
          title="Next Section (Zero Latency)"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );
}
