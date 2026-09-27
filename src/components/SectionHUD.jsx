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
      <div className="fixed top-0 left-0 right-0 z-[120] h-[2px] bg-[#FFFFFF]/60 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#C75D35] via-[#D09B65] to-[#73675E] shadow-[0_0_10px_#C75D35] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </>
  );
}
