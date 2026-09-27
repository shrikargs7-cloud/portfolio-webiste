import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useInView } from "framer-motion";
import { 
  Mail, 
  Github, 
  Linkedin, 
  Terminal, 
  Copy, 
  Check, 
  ArrowUpRight, 
  ArrowUp, 
  Sparkles, 
  Clock, 
  MapPin, 
  Send, 
  CheckCircle2
} from "lucide-react";

const INJECTED_STYLES = `
  .iphone-bezel {
      background-color: #121214;
      box-shadow: 
          inset 0 0 0 2px #3a3a3c, 
          inset 0 0 0 6px #000000, 
          0 40px 90px -15px rgba(43, 35, 29, 0.45),
          0 10px 30px rgba(0, 0, 0, 0.3);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: #3a3a3c;
      box-shadow: -1px 0 2px rgba(0,0,0,0.5);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: rgba(26, 26, 28, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .floating-ui-badge {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(43, 35, 29, 0.08),
          0 20px 40px -10px rgba(43, 35, 29, 0.15);
      border-radius: 18px;
  }
`;

const SITEMAP_COLUMNS = [
  {
    title: "Navigation",
    links: [
      { label: "01 // Hero Overview", id: "top" },
      { label: "02 // About & Pillars", id: "about" },
      { label: "03 // Featured Projects", id: "projects" },
      { label: "04 // Metrics & Commits", id: "dashboard" },
      { label: "05 // Skills & Stack", id: "skills" },
    ]
  },
  {
    title: "Deep Dive",
    links: [
      { label: "06 // Verified Credentials", id: "certificates" },
      { label: "07 // Milestones & Radar", id: "experience" },
      { label: "08 // R&D Playground", id: "playground" },
      { label: "09 // Web Architectures", id: "web-design" },
      { label: "10 // System Whitepapers", id: "performance" },
      { label: "11 // Interactive Shell", id: "vibe-terminal" },
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub Profile", href: "https://github.com/shrikargs7-cloud", external: true },
      { label: "LinkedIn Network", href: "https://linkedin.com", external: true },
      { label: "LeetCode Practice", href: "https://leetcode.com", external: true },
      { label: "Direct Email", href: "mailto:shrikar.gs.design@gmail.com", external: true },
    ]
  },
  {
    title: "Engineering Specs",
    specs: [
      { key: "Role Focus", value: "SWE & AI/ML Engineer" },
      { key: "University", value: "RV University (B.Tech)" },
      { key: "Location", value: "Bengaluru, India" },
      { key: "Status", value: "Available for Roles" },
    ]
  }
];

export default function ContactFooter({ setCursorState, onNavigate }) {
  const cardRef = useRef(null);
  const ringRef = useRef(null);
  const isInView = useInView(ringRef, { once: false, amount: 0.5 });
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [commitsCount, setCommitsCount] = useState(0);
  
  // Interactive 3D tilt motion values
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  const email = "shrikar.gs.design@gmail.com";
  const signatureLetters = "G S Shrikar".split("");

  // Live India Standard Time (IST: UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate the Commit Counter
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 480;
      const duration = 1500;
      const startTime = performance.now();

      const animateCounter = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        setCommitsCount(Math.floor(ease * end));
        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        }
      };
      requestAnimationFrame(animateCounter);
    } else {
      setCommitsCount(0);
    }
  }, [isInView]);

  // Handle 3D Parallax Tilt on Mouse Move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct * 20); // Tilt amount
    mouseY.set(-yPct * 20);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCopy = (e) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleScrollToTop = () => {
    if (onNavigate) {
      onNavigate('top');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-transparent text-[#2B231D] font-google pt-20 pb-10 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      
      {/* Ambient Atmospheric Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[500px] bg-gradient-to-b from-[#C75D35]/10 via-[#D09B65]/5 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        
        {/* ========================================================================= */}
        {/* HERO ACTION CARD & 3D MOBILE MOCKUP                                       */}
        {/* ========================================================================= */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2.5rem] bg-[#FFFFFF]/90 backdrop-blur-2xl border border-[#2B231D]/10 shadow-[0_30px_90px_rgba(43,35,29,0.08)] p-6 sm:p-10 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
        >
          {/* Card Ambient Sheen */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C75D35]/5 blur-[80px] rounded-full pointer-events-none" />

          {/* LEFT COLUMN: Call to Action */}
          <div className="flex-1 w-full space-y-8 z-20">
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F5F1EB] border border-[#2B231D]/5 text-xs font-mono shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold text-[#2B231D]">AVAILABLE FOR ROLES</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5F1EB] border border-[#2B231D]/5 text-[#73675E] text-xs font-mono shadow-sm">
                <Clock className="w-3.5 h-3.5 text-[#C75D35]" />
                <span>{currentTime || "10:00 AM IST"}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#2B231D] leading-[1.05] font-google">
                Let's engineer{" "}
                <span className="font-serif-pepite italic font-normal text-[#C75D35] bg-gradient-to-r from-[#C75D35] to-[#D09B65] bg-clip-text text-transparent">
                  what's next.
                </span>
              </h2>
              <p className="text-[#73675E] text-sm sm:text-base md:text-lg max-w-lg font-light leading-relaxed">
                Open to Software Engineering (SWE), Agentic AI, Computer Vision, and full-stack distributed systems roles. Whether you have an ambitious vacancy or a challenging problem to solve, I'm ready to ship impact.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <a
                href={`mailto:${email}`}
                onMouseEnter={() => setCursorState && setCursorState({ label: "Email" })}
                onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#C75D35] hover:bg-[#D09B65] text-[#FFFFFF] font-semibold text-sm flex items-center gap-2.5 transition-all shadow-lg shadow-[#C75D35]/25 hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopy}
                onMouseEnter={() => setCursorState && setCursorState({ label: copied ? "Copied" : "Copy" })}
                onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-[#F5F1EB] hover:bg-[#EAE2D6] text-[#2B231D] font-mono text-sm font-medium flex items-center gap-2.5 border border-[#2B231D]/10 transition-all hover:scale-105 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#73675E]" />
                    <span>{email}</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 text-[#73675E] pt-2">
              <a href="https://github.com/shrikargs7-cloud" target="_blank" rel="noreferrer" className="p-3.5 rounded-2xl bg-[#F5F1EB] hover:bg-[#FFFFFF] border border-[#2B231D]/5 hover:border-[#2B231D]/10 hover:text-[#C75D35] transition-all hover:scale-110 shadow-sm text-[#2B231D]">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3.5 rounded-2xl bg-[#F5F1EB] hover:bg-[#FFFFFF] border border-[#2B231D]/5 hover:border-[#2B231D]/10 hover:text-[#C75D35] transition-all hover:scale-110 shadow-sm text-[#2B231D]">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="p-3.5 rounded-2xl bg-[#F5F1EB] hover:bg-[#FFFFFF] border border-[#2B231D]/5 hover:border-[#2B231D]/10 hover:text-[#C75D35] transition-all hover:scale-110 shadow-sm text-[#2B231D]">
                <Terminal className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Mobile Device Mockup */}
          <div className="flex-1 w-full flex items-center justify-center min-h-[460px] lg:min-h-[600px] z-10" style={{ perspective: "1200px" }}>
            <motion.div
              style={{ rotateX: mouseY, rotateY: mouseX }}
              className="relative w-full h-full flex items-center justify-center transform scale-[0.8] sm:scale-95 lg:scale-100 will-change-transform transform-style-3d cursor-grab active:cursor-grabbing"
            >
              
              {/* Physical iPhone Bezel Frame */}
              <div className="relative w-[280px] h-[570px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d">
                {/* Hardware Buttons */}
                <div className="absolute top-[120px] -left-[2px] w-[2px] h-[25px] hardware-btn rounded-l-sm z-0" aria-hidden="true" />
                <div className="absolute top-[160px] -left-[2px] w-[2px] h-[45px] hardware-btn rounded-l-sm z-0" aria-hidden="true" />
                <div className="absolute top-[220px] -left-[2px] w-[2px] h-[45px] hardware-btn rounded-l-sm z-0" aria-hidden="true" />
                <div className="absolute top-[170px] -right-[2px] w-[2px] h-[70px] hardware-btn rounded-r-sm z-0 scale-x-[-1]" aria-hidden="true" />

                {/* Inner OLED Screen */}
                <div className="absolute inset-[6px] bg-[#0c0c0e] rounded-[2.5rem] overflow-hidden text-white z-10 border border-[#222226]">
                  <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                  {/* Dynamic Island */}
                  <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-50 flex items-center justify-between px-3 border border-white/5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                  </div>

                  {/* App Interface */}
                  <div className="relative w-full h-full pt-14 px-5 pb-8 flex flex-col justify-between font-google">
                    
                    {/* Top App Bar */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-400 font-medium mb-0.5 uppercase tracking-wider">Status</span>
                        <span className="text-base font-semibold tracking-tight text-white font-mono">shrikar.dev</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#C75D35] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[#C75D35]/30">
                        GS
                      </div>
                    </div>

                    {/* Circular Progress Metric Ring */}
                    <div className="relative w-40 h-40 mx-auto flex items-center justify-center my-auto" ref={ringRef}>
                      <svg className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
                        <circle cx="80" cy="80" r="62" fill="none" stroke="#222226" strokeWidth="10" />
                        <motion.circle 
                          cx="80" 
                          cy="80" 
                          r="62" 
                          fill="none" 
                          stroke="#C75D35" 
                          strokeWidth="10"
                          strokeLinecap="round"
                          initial={{ strokeDashoffset: 402 }}
                          whileInView={{ strokeDashoffset: 60 }}
                          viewport={{ once: false }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          style={{ strokeDasharray: 402 }}
                        />
                      </svg>
                      <div className="text-center z-10 flex flex-col items-center">
                        <span className="text-4xl font-bold tracking-tight text-white font-mono">
                          {commitsCount}+
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium mt-1 tracking-wide">
                          GitHub Commits
                        </span>
                      </div>
                    </div>

                    {/* App Widgets */}
                    <div className="space-y-3">
                      <div className="widget-depth rounded-[20px] p-3 flex items-center">
                        <div className="w-10 h-10 rounded-[14px] bg-[#C75D35]/20 flex items-center justify-center mr-3 text-[#C75D35]">
                          <Terminal className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-white truncate">OcuPulse Core</div>
                          <div className="text-[10px] text-zinc-400">Retinal Vision AI</div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>

                      <div className="widget-depth rounded-[20px] p-3 flex items-center">
                        <div className="w-10 h-10 rounded-[14px] bg-[#D09B65]/20 flex items-center justify-center mr-3 text-[#D09B65]">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-white truncate">Vega Swarm</div>
                          <div className="text-[10px] text-zinc-400">Diagnostic Agent</div>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Active</span>
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute flex top-10 sm:top-14 left-[-10px] sm:left-[-50px] floating-ui-badge p-3 items-center gap-3 z-30"
              >
                <div className="w-9 h-9 rounded-full bg-[#C75D35]/10 flex items-center justify-center text-[#C75D35]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[#2B231D] text-xs font-semibold tracking-tight font-google">480+ Commits</p>
                  <p className="text-[#73675E] text-[10px] font-google">Verified Activity</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute flex bottom-14 sm:bottom-20 right-[-10px] sm:right-[-50px] floating-ui-badge p-3 items-center gap-3 z-30"
              >
                <div className="w-9 h-9 rounded-full bg-[#C75D35] flex items-center justify-center text-[#FFFFFF]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#2B231D] text-xs font-semibold tracking-tight font-google">SWE Roles</p>
                  <p className="text-[#73675E] text-[10px] font-google">Available Now</p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SIGNATURE & SITEMAP                                                       */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
          <div 
            className="cursor-pointer group select-none inline-flex flex-col items-center"
            onMouseEnter={() => setCursorState && setCursorState({ label: "Sign" })}
            onMouseLeave={() => setCursorState && setCursorState({ label: null })}
          >
            <span className="font-signature text-5xl sm:text-6xl text-[#73675E] group-hover:text-[#2B231D] transition-colors -rotate-2">
              {signatureLetters.map((char, idx) => (
                <span key={idx} className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <svg className="w-48 sm:w-60 h-4 text-[#D09B65] mt-0.5" viewBox="0 0 240 20" fill="none">
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                d="M10 12 Q 60 2, 120 12 T 230 8" 
                stroke="#C75D35" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
          <p className="font-google text-xs sm:text-sm text-[#73675E] max-w-md font-light italic">
            &ldquo;Crafted with obsessive precision, engineered for scale, and designed to move human progress forward.&rdquo;
          </p>
        </div>

        <div className="pt-10 border-t border-[#2B231D]/10 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {SITEMAP_COLUMNS.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-[#C75D35] uppercase tracking-wider">
                {col.title}
              </h4>
              {col.links && (
                <ul className="space-y-2">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-google text-xs text-[#73675E] hover:text-[#2B231D] transition-colors inline-flex items-center gap-1.5"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-60" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onNavigate && onNavigate(link.id)}
                          className="font-google text-xs text-[#73675E] hover:text-[#2B231D] transition-colors text-left"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {col.specs && (
                <ul className="space-y-2">
                  {col.specs.map((item, sIdx) => (
                    <li key={sIdx} className="font-mono text-[11px] leading-tight">
                      <span className="text-[#73675E]">{item.key}: </span>
                      <span className="text-[#2B231D] font-medium">{item.value}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-[#2B231D]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-google text-[#73675E]">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} G S Shrikar.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Bengaluru, India (IST: {currentTime || "Active"})</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToTop}
              onMouseEnter={() => setCursorState && setCursorState({ label: "Top" })}
              onMouseLeave={() => setCursorState && setCursorState({ label: null })}
              className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#2B231D]/10 hover:border-[#C75D35] text-[#2B231D] hover:text-[#C75D35] flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}