import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Layers, 
  Activity, 
  Cpu, 
  Award, 
  Orbit, 
  Terminal, 
  Mail, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronLeft, 
  ArrowUpRight,
  FlaskConical,
  FileText,
  Palette,
  Command,
  X
} from 'lucide-react';

const DOCK_SECTIONS = [
  { id: 'top', label: 'Hero', icon: Home, tag: '01', desc: 'Kinetic typography & greeting' },
  { id: 'about', label: 'About', icon: User, tag: '02', desc: 'RV University & 4 core pillars' },
  { id: 'projects', label: 'Projects', icon: Layers, tag: '03', desc: 'OcuPulse, Agent Swarm & Vega AI' },
  { id: 'dashboard', label: 'Metrics', icon: Activity, tag: '04', desc: '480+ commits, LeetCode analytics' },
  { id: 'skills', label: 'Skills', icon: Cpu, tag: '05', desc: 'AI/ML, RAG, Full-Stack, Cloud' },
  { id: 'certificates', label: 'Credentials', icon: Award, tag: '06', desc: 'Verified certifications & degrees' },
  { id: 'experience', label: 'Milestones', icon: Orbit, tag: '07', desc: 'Radial radar & orbital milestones' },
  { id: 'playground', label: 'R&D', icon: FlaskConical, tag: '08', desc: 'ContextLens, Hermes ESP32 & IoT' },
  { id: 'web-design', label: 'Web Design', icon: Palette, tag: '09', desc: 'Digital surfaces & UI architectures' },
  { id: 'performance', label: 'System Docs', icon: FileText, tag: '10', desc: 'Architecture specs & whitepapers' },
  { id: 'vibe-terminal', label: 'Terminal', icon: Terminal, tag: '11', desc: 'Interactive bash CLI shell' },
  { id: 'contact', label: 'Contact', icon: Mail, tag: '12', desc: 'Direct mail & engineering roles' },
];

/**
 * Individual vertical macOS dock icon with vertical continuous magnification wave
 */
function VerticalDockIcon({
  item,
  mouseY,
  isActive,
  onNavigate,
  setCursorState
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  // Continuous vertical distance calculation
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - (bounds.y + bounds.height / 2);
  });

  // Parabolic vertical magnification
  const sizeSync = useTransform(distance, [-90, 0, 90], [36, 48, 36]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 240, damping: 16 });

  const iconScaleSync = useTransform(distance, [-90, 0, 90], [16, 22, 16]);
  const iconScale = useSpring(iconScaleSync, { mass: 0.1, stiffness: 240, damping: 16 });

  const xSync = useTransform(distance, [-90, 0, 90], [0, -6, 0]);
  const x = useSpring(xSync, { mass: 0.1, stiffness: 240, damping: 16 });

  return (
    <div className="relative flex items-center justify-center">
      {/* Tooltip popping to the LEFT */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none absolute right-full mr-3 z-50 whitespace-nowrap flex items-center"
          >
            <div className="px-3 py-1.5 rounded-xl bg-[#FFFFFF]/95 border border-[#2B231D]/10 shadow-[0_10px_25px_rgba(43,35,29,0.15)] backdrop-blur-md flex items-center gap-2 font-google text-xs text-[#2B231D]">
              <span className="font-mono text-[10px] text-[#C75D35] font-bold">{item.tag}</span>
              <span className="font-semibold">{item.label}</span>
            </div>
            <div className="w-2 h-2 bg-[#FFFFFF] border-r border-t border-[#2B231D]/10 rotate-45 -ml-1 shadow-xs" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        ref={ref}
        style={{ width: size, height: size, x }}
        whileTap={{ scale: 0.88 }}
        onClick={() => onNavigate(item.id)}
        onMouseEnter={() => {
          setIsHovered(true);
          if (setCursorState) setCursorState({ label: item.label });
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (setCursorState) setCursorState({ label: null });
        }}
        aria-label={item.label}
        className={`relative rounded-xl flex items-center justify-center transition-colors duration-200 outline-none ${
          isActive 
            ? 'text-[#C75D35]' 
            : 'text-[#73675E] hover:text-[#2B231D] hover:bg-[#FFFFFF]/80'
        }`}
      >
        {/* Active Gliding Pill Indicator */}
        {isActive && (
          <motion.span
            layoutId="activeSideDockGlow"
            className="absolute inset-0 rounded-xl bg-[#C75D35]/15 border border-[#C75D35]/30 shadow-[0_0_12px_rgba(199,93,53,0.25)]"
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}

        <motion.div style={{ width: iconScale, height: iconScale }} className="relative z-10 flex items-center justify-center">
          <Icon className="w-full h-full" />
        </motion.div>

        {/* Active Dot on Right Edge */}
        {isActive && (
          <motion.span
            layoutId="activeSideDockDot"
            className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C75D35] shadow-[0_0_6px_#C75D35]"
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
      </motion.button>
    </div>
  );
}

export default function FloatingDoc({ 
  setCursorState, 
  onNavigate, 
  activeSection = 0, 
  sections = [] 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeTimeoutRef = useRef(null);
  const mouseY = useMotionValue(Infinity);
  const email = "shrikar.gs.design@gmail.com";

  // Determine current active section id
  const currentActiveId = sections[activeSection]?.id || 'top';
  const currentItem = DOCK_SECTIONS.find(s => s.id === currentActiveId) || DOCK_SECTIONS[0];

  const handleCopy = (e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavigate = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseY.set(Infinity);
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 350);
  };

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsExpanded(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* ========================================================================= */}
      {/* COMMAND CENTER OVERLAY MODAL (Cmd + K / Click Hub)                       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="absolute inset-0 bg-[#2B231D]/25 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-[#FFFFFF]/95 backdrop-blur-3xl border border-[#2B231D]/10 rounded-3xl shadow-[0_25px_60px_rgba(43,35,29,0.18)] overflow-hidden z-10"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#2B231D]/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C75D35] to-[#D09B65] text-[#FFFFFF] font-mono font-bold text-xs flex items-center justify-center shadow-md">
                      SG
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-google text-sm sm:text-base font-bold text-[#2B231D]">
                        G S Shrikar
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C75D35]/10 text-[#C75D35] font-mono text-[9px] font-semibold">
                        India · SWE &amp; AI/ML
                      </span>
                    </div>
                    <p className="font-google text-xs text-[#73675E] font-light truncate">
                      Full-Stack &bull; Agentic AI &bull; Computer Vision
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-full bg-[#F5F1EB] hover:bg-[#EAE2D6] text-[#2B231D] font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#C75D35]" /> : <Copy className="w-3.5 h-3.5 text-[#73675E]" />}
                    <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    className="p-1.5 rounded-full hover:bg-[#F5F1EB] text-[#73675E] hover:text-[#2B231D] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Direct Teleport Section Matrix */}
              <div className="p-4 sm:p-5 overflow-y-auto max-h-[50vh] space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#73675E]">
                  <span className="flex items-center gap-1.5 text-[#C75D35] font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Direct Teleport Matrix
                  </span>
                  <span className="flex items-center gap-1 bg-[#F5F1EB] px-2 py-0.5 rounded-md text-[10px]">
                    <Command className="w-3 h-3" /> K to toggle
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                  {DOCK_SECTIONS.map((sec) => {
                    const Icon = sec.icon;
                    const isActive = sec.id === currentActiveId;
                    return (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => handleNavigate(sec.id)}
                        className={`group flex items-start gap-2.5 p-2.5 rounded-2xl text-left transition-all duration-200 border ${
                          isActive
                            ? 'bg-[#C75D35]/10 border-[#C75D35]/40 text-[#2B231D] shadow-sm'
                            : 'bg-[#FFFFFF]/70 hover:bg-[#F5F1EB] border-[#2B231D]/5 hover:border-[#D09B65]/40 text-[#73675E]'
                        }`}
                      >
                        <div className={`p-2 rounded-xl transition-colors ${
                          isActive ? 'bg-[#C75D35] text-white' : 'bg-[#F5F1EB] text-[#73675E] group-hover:text-[#2B231D]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-google text-xs font-bold text-[#2B231D] truncate group-hover:text-[#C75D35] transition-colors">
                              {sec.label}
                            </span>
                            <span className="font-mono text-[9px] text-[#73675E] font-semibold">{sec.tag}</span>
                          </div>
                          <p className="font-google text-[10px] text-[#73675E] truncate mt-0.5">
                            {sec.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Channels & Direct Links Footer */}
              <div className="p-3.5 px-5 bg-[#F5F1EB]/60 border-t border-[#2B231D]/5 flex items-center justify-between text-xs font-mono text-[#73675E]">
                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/shrikargs7-cloud" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-[#C75D35] transition-colors flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-[#C75D35] transition-colors flex items-center gap-1"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="mailto:shrikar.gs.design@gmail.com" 
                    className="hover:text-[#C75D35] transition-colors flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Direct Mail</span>
                  </a>
                </div>

                <span className="text-[10px] text-[#73675E]">
                  Press <kbd className="bg-white px-1.5 py-0.5 rounded border border-[#2B231D]/10">Esc</kbd>
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* AUTO-HIDING RIGHT SIDE DOCK (Appears ONLY Upon Hovering)                  */}
      {/* ========================================================================= */}
      <div 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[140] hidden md:flex items-center pointer-events-auto select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle Right Edge Trigger Handle (Always subtly resting on the edge) */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1, x: isHovered ? 20 : 0 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer py-3.5 px-1.5 rounded-l-2xl bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border-l border-t border-b border-[#2B231D]/10 backdrop-blur-xl shadow-[-5px_0_20px_rgba(43,35,29,0.08)] flex flex-col items-center gap-2 group transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-[#C75D35] shadow-[0_0_8px_#C75D35] animate-pulse" />
          <span className="font-mono text-[9px] font-bold text-[#2B231D] tracking-tighter">
            {currentItem.tag}
          </span>
          <ChevronLeft className="w-3.5 h-3.5 text-[#73675E] group-hover:text-[#C75D35] group-hover:-translate-x-0.5 transition-transform" />
        </motion.div>

        {/* Revealed Animated Vertical Dock (Slides out smoothly upon hover) */}
        <motion.div
          initial={{ x: "120%", opacity: 0 }}
          animate={{ 
            x: isHovered ? 0 : "120%", 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onMouseMove={(e) => mouseY.set(e.pageY)}
          className="mr-3 py-3 px-2 rounded-3xl bg-[#FFFFFF]/90 backdrop-blur-2xl border border-[#2B231D]/10 shadow-[0_15px_45px_rgba(43,35,29,0.16)] flex flex-col items-center gap-1.5"
        >
          {/* Top Avatar & Command Hub Trigger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            onMouseEnter={() => setCursorState && setCursorState({ label: 'Command Hub' })}
            onMouseLeave={() => setCursorState && setCursorState({ label: null })}
            className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#C75D35] to-[#D09B65] text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-sm hover:scale-105 transition-transform relative group"
            title="Open Command Center (Cmd+K)"
          >
            SG
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white animate-pulse" />
          </motion.button>

          {/* Micro Divider */}
          <div className="w-5 h-[1px] bg-[#2B231D]/10 my-0.5" />

          {/* Vertical Magnified Navigation Icons */}
          <div className="flex flex-col items-center gap-1">
            {DOCK_SECTIONS.map((item) => (
              <VerticalDockIcon
                key={item.id}
                item={item}
                mouseY={mouseY}
                isActive={item.id === currentActiveId}
                onNavigate={handleNavigate}
                setCursorState={setCursorState}
              />
            ))}
          </div>

          {/* Micro Divider */}
          <div className="w-5 h-[1px] bg-[#2B231D]/10 my-0.5" />

          {/* Quick Outbound Utilities */}
          <div className="flex flex-col items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="p-2 rounded-xl text-[#73675E] hover:text-[#C75D35] hover:bg-[#F5F1EB] transition-colors"
              title="Copy Email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#C75D35]" /> : <Copy className="w-3.5 h-3.5" />}
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/shrikargs7-cloud"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl text-[#73675E] hover:text-[#C75D35] hover:bg-[#F5F1EB] transition-colors"
              title="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl text-[#73675E] hover:text-[#C75D35] hover:bg-[#F5F1EB] transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE TRIGGER BADGE (< md:)                                              */}
      {/* ========================================================================= */}
      <div className="md:hidden fixed bottom-5 right-5 z-[140] pointer-events-auto select-none">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#FFFFFF]/95 backdrop-blur-xl border border-[#2B231D]/10 shadow-[0_10px_25px_rgba(43,35,29,0.15)] text-[#2B231D]"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C75D35] to-[#D09B65] text-white font-mono font-bold text-[9px] flex items-center justify-center shadow-xs">
            SG
          </div>
          <span className="font-mono text-[10px] text-[#C75D35] font-bold">
            {currentItem.tag}
          </span>
          <span className="font-google text-xs font-semibold text-[#2B231D] max-w-[80px] truncate">
            {currentItem.label}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#C75D35] animate-pulse" />
        </motion.button>
      </div>
    </>
  );
}
