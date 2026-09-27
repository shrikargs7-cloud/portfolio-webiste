import React from 'react';

export default function TechBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-transparent">
      
      {/* Soft organic blur gradients mimicking Pépite Boisson's warm tones */}
      <div className="absolute top-0 left-[-10%] w-[50vw] h-[50vw] bg-[#EAE2D6] rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-[#F9EAD9] rounded-full blur-[120px] opacity-50" />
      
      {/* Subtle grain overlay for organic texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      {/* Elegant Swiss-style indicators */}
      <div className="absolute top-6 left-6 font-google text-xs text-[#73675E] font-medium tracking-wide hidden sm:flex items-center gap-2 z-20 uppercase">
        GS Shrikar 
        <span className="px-1.5 py-0.5 rounded-sm bg-[#FFFFFF] text-[9px] text-[#2B231D] border border-[#2B231D]/10">Portfolio</span>
      </div>
      <div className="absolute top-6 right-6 font-google text-xs text-[#73675E] font-medium tracking-wide hidden sm:flex items-center gap-2 z-20 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C75D35]" />
        Available
      </div>
    </div>
  );
}
