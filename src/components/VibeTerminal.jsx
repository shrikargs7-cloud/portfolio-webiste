import React, { useState } from 'react';
import { Terminal, Sparkles, Check, RefreshCw, Video } from 'lucide-react';
import BackgroundVideo, { VIDEO_SOURCES } from './BackgroundVideo';

export default function VibeTerminal({ setCursorState }) {
  const [activeVibe, setActiveVibe] = useState('lime');
  const [customPrompt, setCustomPrompt] = useState('');
  const [statusMsg, setStatusMsg] = useState('System ready. Pick a vibe palette or code custom styling.');

  const vibes = [
    {
      id: 'lime',
      name: 'Lime Cyberpunk',
      accent: '#a3e635',
      bg: '#050505',
      secondary: '#8b5cf6',
      desc: 'Default sleek dark mode with vibrant high-energy lime accent.'
    },
    {
      id: 'violet',
      name: 'Electric Violet',
      accent: '#a855f7',
      bg: '#07050f',
      secondary: '#38bdf8',
      desc: 'Synthwave midnight aesthetic with neon violet & cyan highlights.'
    },
    {
      id: 'cyan',
      name: 'Neon Horizon',
      accent: '#06b6d4',
      bg: '#030a0f',
      secondary: '#f43f5e',
      desc: 'Deep marine dark mode with vibrant cyan glow.'
    },
    {
      id: 'zen',
      name: 'Monochrome Zen',
      accent: '#ffffff',
      bg: '#090909',
      secondary: '#a3a3a3',
      desc: 'Minimalist high-contrast pure black and white styling.'
    }
  ];

  const applyVibe = (vibe) => {
    setActiveVibe(vibe.id);
    document.documentElement.style.setProperty('--accent-color', vibe.accent);
    document.documentElement.style.setProperty('--hero-bg', vibe.bg);
    setStatusMsg(`Vibe switched to [${vibe.name}]. CSS variables updated live.`);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    let hash = 0;
    for (let i = 0; i < customPrompt.length; i++) {
      hash = customPrompt.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `#${((hash & 0x00ffffff) | 0x808080).toString(16).padStart(6, '0')}`;
    
    document.documentElement.style.setProperty('--accent-color', color);
    setActiveVibe('custom');
    setStatusMsg(`Vibe-coded custom prompt "${customPrompt}" -> Applied color ${color}`);
    setCustomPrompt('');
  };

  return (
    <section id="vibe-terminal" className="relative bg-[#050505] px-6 py-24 md:px-12  select-none overflow-hidden">
      
      {/* Background Video - View 07: Live Code Matrix Shader */}
      <BackgroundVideo
        src={VIDEO_SOURCES.vibe}
        transform="scale-125"
        opacity="opacity-30"
        blendMode="mix-blend-screen"
        overlayColor="bg-[#FFFFFF]/75"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF]/60 border border-white/15 text-[#2B231D]/80 font-mono text-xs mb-4 backdrop-blur-md">
            <Video className="w-3.5 h-3.5 text-accent" />
            <span>View 07: Live Code Matrix Shader</span>
          </div>
          <h2 className="font-google text-4xl md:text-6xl font-bold text-[#2B231D] tracking-tight">
            Vibe Terminal
          </h2>
          <p className="font-google text-[#2B231D]/80 text-sm md:text-base mt-3">
            Real-time theme engine. Select a preset vibe or prompt custom styles to mutate the website UI dynamically.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="glass-card rounded-3xl border border-white/15 overflow-hidden shadow-2xl bg-[#FFFFFF]/60 backdrop-blur-2xl">
          
          {/* Top Bar */}
          <div className="bg-[#FFFFFF]/80 px-6 py-3  flex items-center justify-between font-mono text-xs text-[#2B231D]/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 text-[#2B231D]/40">vibe-engine.js</span>
            </div>
            <span>PORT: 3000</span>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-8 font-mono text-xs">
            
            {/* Presets Grid */}
            <div>
              <span className="text-[#2B231D]/40 block mb-3">// SELECT PRESET VIBE PALETTE</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {vibes.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => applyVibe(v)}
                    onMouseEnter={() => setCursorState({ label: 'Apply' })}
                    onMouseLeave={() => setCursorState({ label: null })}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-28 ${
                      activeVibe === v.id
                        ? 'border-accent bg-white/10 shadow-lg scale-105 backdrop-blur-md'
                        : 'border-[#2B231D]/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#2B231D] text-xs">{v.name}</span>
                      <span
                        className="w-3.5 h-3.5 rounded-full inline-block border border-white/30"
                        style={{ backgroundColor: v.accent }}
                      />
                    </div>
                    <span className="text-[10px] text-[#2B231D]/60 leading-tight">{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Prompt */}
            <div>
              <span className="text-[#2B231D]/40 block mb-3">// OR TYPE A VIBE PROMPT TO CODE LIVE</span>
              <form onSubmit={handleCustomSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. 'Warm Sunset Orange' or 'Tokyo Midnight'..."
                  className="flex-1 bg-[#FFFFFF]/60 border border-white/15 rounded-xl px-4 py-3 text-[#2B231D] text-xs focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-accent text-black font-bold text-xs tracking-wider hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Run Prompt
                </button>
              </form>
            </div>

            {/* Terminal Status Output */}
            <div className="p-4 rounded-xl bg-[#FFFFFF]/90 border border-[#2B231D]/10 text-[#2B231D]/90 font-mono text-[11px] flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>{statusMsg}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
