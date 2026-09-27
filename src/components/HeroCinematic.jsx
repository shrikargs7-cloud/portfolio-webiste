import React from 'react';
import { Terminal, Github, Linkedin, FileText, ArrowDown } from 'lucide-react';
import Marquee from './Marquee';
import { motion } from 'framer-motion';
import WavingPortfolioLanding from './ui/waving-portfolio-landing';

export default function HeroCinematic({ setCursorState, onNavigate }) {
  // Stagger configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="top" className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden select-none snap-section">
      
      {/* Full-Screen Interactive Waving Poster */}
      <div className="absolute inset-0 w-full h-full z-0">
        <WavingPortfolioLanding 
          name="Shrikar GS"
          year="2026"
          roles={["Software Engineer", "Full Stack"]}
          lettersLeft={["P", "F"]}
          giantLetter="O"
          lettersRight={["RT", "LIO"]}
          greeting="Hello!"
          paper="#F5F1EB"
          ink="#2B231D"
          accent="#C75D35"
          height="100vh"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-28 z-10 w-full px-6 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <a
            href="https://github.com/shrikargs7-cloud"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursorState && setCursorState({ label: 'GitHub' })}
            onMouseLeave={() => setCursorState && setCursorState({ label: null })}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#2B231D]/5 text-[#2B231D] hover:bg-[#EAE2D6] hover:scale-105 transition-all duration-300 font-google text-xs sm:text-sm font-medium shadow-lg"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursorState && setCursorState({ label: 'LinkedIn' })}
            onMouseLeave={() => setCursorState && setCursorState({ label: null })}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md border border-[#2B231D]/5 text-[#2B231D] hover:bg-[#EAE2D6] hover:scale-105 transition-all duration-300 font-google text-xs sm:text-sm font-medium shadow-lg"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('contact');
            }}
            onMouseEnter={() => setCursorState && setCursorState({ label: 'Resume' })}
            onMouseLeave={() => setCursorState && setCursorState({ label: null })}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C75D35] text-[#FFFFFF] font-medium hover:bg-[#D09B65] hover:scale-105 transition-all font-google text-xs sm:text-sm shadow-lg shadow-[#C75D35]/20"
          >
            <FileText className="w-4 h-4" /> Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator (Bottom Right to avoid Floating Dock overlap) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        type="button"
        onClick={() => onNavigate && onNavigate('about')}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-1.5 text-[#73675E] hover:text-[#C75D35] transition-colors font-google text-[11px] tracking-wide cursor-pointer z-20 outline-none group"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll Down</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C75D35]" />
      </motion.button>
    </section>
  );
}