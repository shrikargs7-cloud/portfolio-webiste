import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Terminal, ArrowUpRight, Sparkles } from 'lucide-react';
import { HACKATHONS_DATA } from '../data/hackathonData';

export default function HackathonShowcase({ setCursorState }) {
  return (
    <section id="hackathons" className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-16 overflow-hidden relative z-10 font-google">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#C75D35]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-[10px] tracking-widest uppercase mb-4">
          <Trophy className="w-3 h-3" /> Innovation Sprints
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#2B231D] tracking-tight leading-none mb-6">
          Hackathon <span className="text-[#C75D35] italic pr-4">Ventures.</span>
        </h2>
        <p className="text-lg md:text-xl text-[#73675E] font-light max-w-2xl">
          Intense 24-48 hour prototyping sprints. Building MVPs, pushing technical boundaries, and competing at a global scale.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {HACKATHONS_DATA.map((hackathon, idx) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, type: "spring", stiffness: 100 }}
              onMouseEnter={() => setCursorState && setCursorState({ label: 'Explore' })}
              onMouseLeave={() => setCursorState && setCursorState({ label: null })}
              className={`relative rounded-3xl p-6 md:p-8 bg-[#FFFFFF]/80 backdrop-blur-xl border ${hackathon.borderColor} overflow-hidden group shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}
            >
              {/* Internal Gradient Glow */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${hackathon.color} blur-[60px] opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3`} />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1511] text-white text-xs font-mono font-medium shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    {hackathon.award}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#73675E] font-mono text-[10px] bg-[#F5F1EB] px-2.5 py-1 rounded-md border border-[#2B231D]/10">
                    <Calendar className="w-3 h-3" /> {hackathon.date}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold text-[#2B231D] mb-2 leading-tight">
                  {hackathon.title}
                </h3>
                <div className="text-[#C75D35] font-mono text-xs mb-4 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" /> Project: {hackathon.project}
                </div>
                
                <p className="text-[#73675E] text-sm leading-relaxed mb-8 flex-grow">
                  {hackathon.description}
                </p>

                {/* Footer Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-[#2B231D]/10">
                  {hackathon.technologies.map(tech => (
                    <span 
                      key={tech}
                      className="px-2.5 py-1 text-[10px] md:text-xs font-mono font-medium rounded-md bg-[#2B231D]/5 text-[#2B231D] border border-[#2B231D]/10 group-hover:bg-[#2B231D] group-hover:text-white transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
