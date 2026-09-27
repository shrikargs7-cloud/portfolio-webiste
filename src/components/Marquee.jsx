import React from 'react';

export default function Marquee() {
  const items = [
    'Full-Stack Development',
    'AI / ML Engineering',
    'Agentic AI Systems',
    'Generative AI & RAG',
    'Computer Vision & OpenCV',
    'Model Fine-Tuning (LoRA / QLoRA)',
    'Google Cloud Platform',
    'Docker & MLOps CI/CD',
  ];

  return (
    <div className="overflow-hidden bg-[#C75D35] py-4 text-[#FFFFFF] font-google border-y border-[#2B231D]/10 select-none">
      <div className="flex w-max animate-marquee">
        <div className="flex shrink-0 items-center gap-8 pr-8">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="text-xl md:text-3xl font-bold tracking-tight">
                {item}
              </span>
              <span className="text-xl font-bold text-[#FFFFFF]">✦</span>
            </React.Fragment>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-8 pr-8">
          {items.map((item, idx) => (
            <React.Fragment key={`dup-${idx}`}>
              <span className="text-xl md:text-3xl font-bold tracking-tight">
                {item}
              </span>
              <span className="text-xl font-bold text-[#FFFFFF]">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}