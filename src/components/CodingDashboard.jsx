import React, { useState, useEffect, useRef } from 'react';
import { GitCommit, Trophy, Flame, Code2, Cpu, GitPullRequest, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const INJECTED_STYLES = `
  .glass-card-metrics {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(43, 35, 29, 0.08);
    box-shadow: 0 24px 60px -12px rgba(43, 35, 29, 0.08);
  }
  
  .glass-card-dark {
    background: #2B231D;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.3);
  }

  .heatmap-node {
    border-radius: 3px;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);
  }
`;

function AnimatedCounter({ value, duration = 1.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        setCount(Math.floor(ease * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function CodingDashboard({ setCursorState }) {
  const containerRef = useRef(null);
  
  // Parallax effects
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct * 15);
    mouseY.set(-yPct * 15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="dashboard" 
      className="py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-16 bg-transparent select-none w-full relative overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C75D35]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/80 border border-[#2B231D]/10 text-xs font-mono shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C75D35] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C75D35]" />
              </span>
              <span className="font-semibold text-[#2B231D]">LIVE METRICS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#2B231D] font-google tracking-tighter leading-tight">
              Engineering <span className="italic font-serif-pepite text-[#C75D35]">Velocity.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#73675E] text-sm md:text-base font-light max-w-sm"
          >
            A quantitative look at my problem-solving bandwidth, code output, and systemic consistency over time.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1200px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          
          {/* ========================================= */}
          {/* GITHUB CARD (Left / Span 7)               */}
          {/* ========================================= */}
          <motion.div 
            style={{ rotateX: mouseY, rotateY: mouseX }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-[2rem] glass-card-metrics p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[420px]"
          >
            {/* Ambient Github Sheen */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/50 blur-[60px] rounded-full pointer-events-none -z-10" />

            <div className="flex justify-between items-start mb-8 z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#2B231D] text-white flex items-center justify-center shadow-lg">
                    <GitCommit className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2B231D] font-google">GitHub Activity</h3>
                </div>
                <a 
                  href="https://github.com/shrikargs7-cloud" 
                  target="_blank" 
                  rel="noreferrer"
                  onMouseEnter={() => setCursorState && setCursorState({ label: 'GitHub' })}
                  onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                  className="inline-flex items-center gap-1.5 text-sm font-mono text-[#73675E] hover:text-[#C75D35] transition-colors"
                >
                  @shrikargs7-cloud <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="text-right">
                <div className="text-4xl md:text-5xl font-bold text-[#2B231D] font-mono tracking-tighter">
                  <AnimatedCounter value={200} />+
                </div>
                <div className="text-xs font-mono text-[#73675E] uppercase tracking-wider mt-1">Total Commits</div>
              </div>
            </div>

            {/* Simulated Contribution Graph */}
            <div className="space-y-4 z-10">
              <div className="flex justify-between items-center text-xs font-mono text-[#73675E]">
                <span>Contribution Density</span>
                <span className="flex items-center gap-1.5">
                  Less <span className="w-3 h-3 rounded-sm bg-[#F5F1EB] border border-[#2B231D]/10"></span>
                  <span className="w-3 h-3 rounded-sm bg-[#C75D35]/30"></span>
                  <span className="w-3 h-3 rounded-sm bg-[#C75D35]/70"></span>
                  <span className="w-3 h-3 rounded-sm bg-[#C75D35]"></span> More
                </span>
              </div>
              
              <div className="w-full bg-[#FFFFFF]/60 p-4 rounded-2xl border border-[#2B231D]/5">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(12px,1fr))] gap-1.5">
                  {Array.from({ length: 96 }).map((_, i) => {
                    const intensity = Math.random();
                    let colorClass = 'bg-[#F5F1EB]';
                    if (intensity > 0.85) colorClass = 'bg-[#C75D35]';
                    else if (intensity > 0.6) colorClass = 'bg-[#C75D35]/70';
                    else if (intensity > 0.4) colorClass = 'bg-[#C75D35]/30';

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.005, duration: 0.4 }}
                        whileHover={{ scale: 1.5, zIndex: 10 }}
                        className={`aspect-square rounded-[3px] heatmap-node transition-colors cursor-crosshair ${colorClass}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8 z-10">
              <div className="p-4 bg-[#FFFFFF]/60 rounded-2xl border border-[#2B231D]/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#2B231D] font-mono"><AnimatedCounter value={18} /></div>
                  <div className="text-[10px] uppercase tracking-widest text-[#73675E] font-mono">Repositories</div>
                </div>
              </div>
              <div className="p-4 bg-[#FFFFFF]/60 rounded-2xl border border-[#2B231D]/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <GitPullRequest className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[#2B231D] font-mono"><AnimatedCounter value={100} />%</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#73675E] font-mono">Open Source</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================= */}
          {/* LEETCODE CARD (Right / Span 5)            */}
          {/* ========================================= */}
          <motion.div 
            style={{ rotateX: mouseY, rotateY: mouseX }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-[2rem] glass-card-dark p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[420px] text-white"
          >
            {/* Decorative Glow */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#C75D35]/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex justify-between items-start z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFFFFF]/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-google">LeetCode & DSA</h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 mt-0.5">
                    <Flame className="w-3.5 h-3.5 fill-amber-400 animate-pulse" /> Daily Streak Active
                  </div>
                </div>
              </div>
            </div>

            {/* Central Radial Progress */}
            <div className="relative flex items-center justify-center my-8 z-10">
              <svg className="w-48 h-48 -rotate-90" aria-hidden="true">
                {/* Background Ring */}
                <circle cx="96" cy="96" r="76" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                
                {/* Foreground Ring */}
                <motion.circle 
                  cx="96" 
                  cy="96" 
                  r="76" 
                  fill="none" 
                  stroke="url(#gradient-orange)" 
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 477.5 }} // 2 * PI * 76 = 477.5
                  whileInView={{ strokeDashoffset: 477.5 * 0.2 }} // 80% full
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
                  style={{ strokeDasharray: 477.5 }}
                />
                
                <defs>
                  <linearGradient id="gradient-orange" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C75D35" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl md:text-5xl font-bold font-mono tracking-tighter">
                  <AnimatedCounter value={150} />+
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 mt-1">
                  Problems Solved
                </span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 z-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                <div className="text-lg font-bold font-mono text-emerald-400">Top 15%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-mono mt-1">Contest Rank</div>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                <div className="text-lg font-bold font-mono text-purple-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Winner
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/50 font-mono mt-1">Agentic AI Cup</div>
              </div>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}