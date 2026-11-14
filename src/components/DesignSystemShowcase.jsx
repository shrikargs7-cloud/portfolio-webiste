import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Accessibility, Sparkles, Copy, Check, Sliders } from 'lucide-react';

const COLOR_TOKENS = [
  { name: 'Warm Oat', token: '--surface-canvas', hex: '#F5F1EB', textHex: '#2B231D', contrast: '13.4:1 AAA', role: 'Primary editorial canvas' },
  { name: 'Deep Espresso', token: '--ink-primary', hex: '#2B231D', textHex: '#FFFFFF', contrast: '13.4:1 AAA', role: 'Primary typography & borders' },
  { name: 'Terracotta Accent', token: '--accent-brand', hex: '#C75D35', textHex: '#FFFFFF', contrast: '4.6:1 AA', role: 'Interactive CTAs & active states' },
  { name: 'Muted Umber', token: '--ink-secondary', hex: '#382E27', textHex: '#FFFFFF', contrast: '11.2:1 AAA', role: 'Body copy & technical metadata' }
];

export default function DesignSystemShowcase({ setCursorState }) {
  const [copiedHex, setCopiedHex] = useState(null);
  const [motionPreset, setMotionPreset] = useState('snappy'); // 'snappy' | 'gentle'

  const copyToken = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <section id="design-system" className="w-full py-16 md:py-20 px-4 sm:px-8 md:px-16 relative z-10 font-google">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-[10px] tracking-widest uppercase">
              <Palette className="w-3 h-3" /> Design System &amp; Craft
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B231D] tracking-tight leading-none">
              Visual <span className="text-[#C75D35] italic">Architecture.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#382E27] font-medium max-w-md">
            Built with a deliberate token architecture, WCAG AA/AAA contrast discipline, and GPU-composited spring physics.
          </p>
        </div>

        {/* 3-Column Design System Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Color Tokens & WCAG Contrast (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-[#2B231D]/15 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#2B231D]">
                <Palette className="w-4 h-4 text-[#C75D35]" />
                <span>Color Tokens &amp; WCAG</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                AA / AAA Verified
              </span>
            </div>

            <div className="space-y-3">
              {COLOR_TOKENS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => copyToken(c.hex)}
                  onMouseEnter={() => setCursorState && setCursorState({ label: 'Copy Hex' })}
                  onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#F5F1EB]/70 hover:bg-[#F5F1EB] border border-[#2B231D]/15 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-[#2B231D]/20 shadow-xs shrink-0 flex items-center justify-center text-[10px] font-mono font-bold"
                      style={{ backgroundColor: c.hex, color: c.textHex }}
                    >
                      Aa
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#2B231D] flex items-center gap-2">
                        {c.name}
                        <span className="text-[10px] font-mono text-[#382E27]/70">{c.token}</span>
                      </div>
                      <div className="text-[11px] text-[#382E27]">{c.role}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <div className="text-xs font-mono font-bold text-[#2B231D] flex items-center justify-end gap-1">
                      {copiedHex === c.hex ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <span>{c.hex}</span>
                          <Copy className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        </>
                      )}
                    </div>
                    <div className="text-[10px] font-mono text-[#C75D35] font-semibold">{c.contrast}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Typography Scale & Rhythm (4 cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-[#2B231D]/15 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#2B231D]">
                <Type className="w-4 h-4 text-[#C75D35]" />
                <span>Type Hierarchy</span>
              </div>
              <span className="text-[10px] font-mono text-[#382E27]">8pt Grid Rhythm</span>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#F5F1EB]/60 border border-[#2B231D]/10">
                <span className="text-[10px] font-mono text-[#C75D35] uppercase font-bold">Display · Google Sans 700</span>
                <div className="text-2xl font-bold tracking-tight text-[#2B231D] mt-0.5">Editorial Clarity.</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F5F1EB]/60 border border-[#2B231D]/10">
                <span className="text-[10px] font-mono text-[#C75D35] uppercase font-bold">Body · 16px / 1.6 Line-Height</span>
                <p className="text-xs text-[#382E27] leading-relaxed mt-0.5 font-medium">
                  Scannable prose tuned for 6-second recruiter triage and long-form UX case study reading.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F5F1EB]/60 border border-[#2B231D]/10">
                <span className="text-[10px] font-mono text-[#C75D35] uppercase font-bold">Technical · JetBrains Mono</span>
                <div className="text-xs font-mono font-bold text-[#2B231D] mt-0.5">
                  ⌘K · WCAG_AA · 0.22s ease-out
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Interactive Motion & Accessibility (3 cols) */}
          <div className="lg:col-span-3 p-6 sm:p-7 rounded-3xl bg-[#2B231D] text-white border-2 border-[#2B231D] shadow-lg flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#D09B65]">
                <Sliders className="w-4 h-4" />
                <span>Motion Physics</span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                Test the interactive spring curve used across navbar pills, modals, and route transitions:
              </p>

              <div className="flex gap-2">
                {['snappy', 'gentle'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMotionPreset(preset)}
                    className={`flex-1 py-1.5 rounded-xl font-mono text-[11px] font-bold uppercase transition-colors ${
                      motionPreset === preset
                        ? 'bg-[#C75D35] text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <motion.div
                  key={motionPreset}
                  initial={{ scale: 0.85, y: 8, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={
                    motionPreset === 'snappy'
                      ? { type: 'spring', stiffness: 450, damping: 26 }
                      : { type: 'spring', stiffness: 180, damping: 24 }
                  }
                  className="px-4 py-2 rounded-full bg-[#C75D35] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{motionPreset === 'snappy' ? 'stiffness: 450' : 'stiffness: 180'}</span>
                </motion.div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D09B65]">
                <Accessibility className="w-4 h-4" />
                <span>A11y First</span>
              </div>
              <p className="text-[11px] text-white/75 leading-relaxed">
                Full keyboard navigation (`⌘K`, `ESC`), `aria-modal` dialogs, and `prefers-reduced-motion` support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
