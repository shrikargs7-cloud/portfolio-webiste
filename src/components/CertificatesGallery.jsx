import React, { useRef } from 'react';

const certificates = [
  "Screenshot 2026-06-03 at 22.41.17.png",
  "Screenshot 2026-06-03 at 22.41.29.png",
  "Screenshot 2026-06-03 at 22.41.47.png",
  "Screenshot 2026-06-03 at 22.41.54.png",
  "Screenshot 2026-06-03 at 22.42.00.png",
  "Screenshot 2026-09-23 at 21.23.49.png",
  "Screenshot 2026-09-23 at 21.24.10.png",
  "Screenshot 2026-09-23 at 21.24.24.png",
  "Screenshot 2026-09-23 at 21.24.36.png",
  "Screenshot 2026-09-23 at 21.24.49.png",
  "Screenshot 2026-09-23 at 21.25.01.png",
  "Screenshot 2026-09-23 at 21.25.13.png",
  "Screenshot 2026-09-23 at 21.25.59.png",
  "Screenshot 2026-09-23 at 21.26.11.png",
  "Screenshot 2026-09-23 at 21.26.24.png",
  "Screenshot 2026-09-23 at 21.26.36.png",
  "Screenshot 2026-09-23 at 21.26.45.png",
  "Screenshot 2026-09-23 at 21.26.57.png",
  "Screenshot 2026-09-23 at 21.27.07.png",
  "Screenshot 2026-09-23 at 21.27.20.png",
  "Screenshot 2026-09-23 at 21.27.30.png",
  "Screenshot 2026-09-23 at 21.27.42.png",
  "Screenshot 2026-09-23 at 21.27.54.png",
  "Screenshot 2026-09-23 at 21.28.04.png"
];

export default function CertificatesGallery({ setCursorState }) {
  const containerRef = useRef(null);

  // We split the certificates into two rows
  const row1 = certificates.slice(0, 12);
  const row2 = certificates.slice(12, 24);

  return (
    <section id="certificates" ref={containerRef} className="relative w-full py-8 md:py-12 bg-transparent overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C75D35]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-[#2B231D] tracking-tight mb-2 md:mb-3 font-google">
            Certifications <br />
            <span className="text-[#C75D35]">& Credentials</span>
          </h2>
          <p className="text-[#73675E] font-mono text-xs sm:text-sm max-w-md">
            SYS.LOG: VERIFIED_EXPERTISE // Validating continuous learning and skill mastery across multiple domains.
          </p>
        </div>
      </div>

      {/* Infinite scrolling marquee for certificates */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 md:gap-8 group/gallery">
        
        {/* Row 1: Left to right */}
        <div className="flex w-max animate-[marquee_50s_linear_infinite] group-hover/gallery:[animation-play-state:paused]">
          <div className="flex shrink-0 gap-6 pr-6">
            {row1.map((cert, idx) => (
              <a 
                key={`r1-${idx}`} 
                href={`/certificates/${cert}`}
                target="_blank"
                rel="noreferrer"
                className="w-[280px] md:w-[400px] aspect-[4/3] relative rounded-xl overflow-hidden border border-[#2B231D]/5 bg-[#FFFFFF] group"
                onMouseEnter={() => setCursorState({ label: 'VIEW' })}
                onMouseLeave={() => setCursorState({ label: null })}
              >
                <img 
                  src={`/certificates/${cert}`} 
                  alt="Certificate" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#FFFFFF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[#C75D35] font-mono font-bold border border-[#D09B65] px-4 py-2 rounded bg-[#FFFFFF]/50 backdrop-blur-sm">VIEW_RECORD</span>
                </div>
              </a>
            ))}
          </div>
          {/* Duplicate for infinite loop */}
          <div className="flex shrink-0 gap-6 pr-6">
            {row1.map((cert, idx) => (
              <a 
                key={`r1-dup-${idx}`} 
                href={`/certificates/${cert}`}
                target="_blank"
                rel="noreferrer"
                className="w-[280px] md:w-[400px] aspect-[4/3] relative rounded-xl overflow-hidden border border-[#2B231D]/5 bg-[#FFFFFF] group"
                onMouseEnter={() => setCursorState({ label: 'VIEW' })}
                onMouseLeave={() => setCursorState({ label: null })}
              >
                <img 
                  src={`/certificates/${cert}`} 
                  alt="Certificate" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#FFFFFF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[#C75D35] font-mono font-bold border border-[#D09B65] px-4 py-2 rounded bg-[#FFFFFF]/50 backdrop-blur-sm">VIEW_RECORD</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Row 2: Right to left (using reverse) */}
        <div className="flex w-max animate-[marquee_60s_linear_infinite_reverse] group-hover/gallery:[animation-play-state:paused]">
          <div className="flex shrink-0 gap-6 pr-6">
            {row2.map((cert, idx) => (
              <a 
                key={`r2-${idx}`} 
                href={`/certificates/${cert}`}
                target="_blank"
                rel="noreferrer"
                className="w-[280px] md:w-[400px] aspect-[4/3] relative rounded-xl overflow-hidden border border-[#2B231D]/5 bg-[#FFFFFF] group"
                onMouseEnter={() => setCursorState({ label: 'VIEW' })}
                onMouseLeave={() => setCursorState({ label: null })}
              >
                <img 
                  src={`/certificates/${cert}`} 
                  alt="Certificate" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#FFFFFF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[#C75D35] font-mono font-bold border border-[#D09B65] px-4 py-2 rounded bg-[#FFFFFF]/50 backdrop-blur-sm">VIEW_RECORD</span>
                </div>
              </a>
            ))}
          </div>
          {/* Duplicate for infinite loop */}
          <div className="flex shrink-0 gap-6 pr-6">
            {row2.map((cert, idx) => (
              <a 
                key={`r2-dup-${idx}`} 
                href={`/certificates/${cert}`}
                target="_blank"
                rel="noreferrer"
                className="w-[280px] md:w-[400px] aspect-[4/3] relative rounded-xl overflow-hidden border border-[#2B231D]/5 bg-[#FFFFFF] group"
                onMouseEnter={() => setCursorState({ label: 'VIEW' })}
                onMouseLeave={() => setCursorState({ label: null })}
              >
                <img 
                  src={`/certificates/${cert}`} 
                  alt="Certificate" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#FFFFFF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[#C75D35] font-mono font-bold border border-[#D09B65] px-4 py-2 rounded bg-[#FFFFFF]/50 backdrop-blur-sm">VIEW_RECORD</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
