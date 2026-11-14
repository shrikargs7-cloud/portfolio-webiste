import React from 'react';

export default function TechBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-transparent">
      {/* Lightweight GPU-friendly radial gradients (replaces heavy blur-[160px] & SVG feTurbulence) */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 10% 10%, rgba(234, 226, 214, 0.7) 0%, transparent 45%), radial-gradient(circle at 90% 85%, rgba(249, 234, 217, 0.6) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
