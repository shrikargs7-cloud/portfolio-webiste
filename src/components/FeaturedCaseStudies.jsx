import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, LayoutGrid, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '@/data/projectsData';
import CaseStudyModal from './CaseStudyModal';

export default function FeaturedCaseStudies({ setCursorState }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // Take top 4 flagship projects for the cinematic sticky stack
  const flagshipProjects = PROJECTS_DATA.slice(0, 4);

  return (
    <section id="projects" className="relative w-full bg-transparent py-8 md:py-12 z-20">
      
      <div className="max-w-7xl mx-auto px-6 mb-6 md:mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-6xl font-google font-semibold text-[#2B231D] tracking-tight mb-2 md:mb-3"
        >
          Crafted Projects
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-base md:text-xl text-[#73675E] font-google max-w-2xl"
        >
          A curated selection of bespoke digital systems, built with precision and care.
        </motion.p>
      </div>

      <div className="relative w-full">
        {flagshipProjects.map((project, idx) => (
          <div
            key={project.id}
            className="sticky w-full h-[82vh] md:h-[80vh] flex items-center justify-center p-3 sm:p-6 mb-8"
            style={{ 
              zIndex: 10 + idx, 
              top: `calc(3.5rem + ${idx * 24}px)`
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ margin: "-30px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="w-full h-full max-h-[78vh] overflow-hidden max-w-7xl bg-[#FFFFFF]/95 backdrop-blur-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 shadow-[0_-12px_36px_rgba(43,35,29,0.1)] hover:shadow-[0_20px_50px_rgba(199,93,53,0.15)] border border-[#2B231D]/10 hover:border-[#C75D35]/30 rounded-3xl transition-all duration-300 group relative"
            >
              
              <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-5 flex flex-col justify-center min-w-0">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-google text-xs md:text-sm font-medium text-[#C75D35] tracking-wide uppercase"
                >
                  0{idx + 1} — {project.category.split('•')[0].trim()}
                </motion.span>
                
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-google font-semibold text-[#2B231D] tracking-tight leading-[1.15]"
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs sm:text-sm md:text-base text-[#73675E] font-google max-w-lg leading-relaxed line-clamp-3 md:line-clamp-4"
                >
                  {project.desc}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-1.5 md:gap-2 pt-1 md:pt-2"
                >
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-[#F5F1EB] border border-[#2B231D]/5 text-[#2B231D] font-google text-[10px] md:text-xs font-medium hover:bg-[#FFFFFF] transition-colors">
                      {tech}
                    </span>
                  ))}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4"
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    onMouseEnter={() => setCursorState && setCursorState({ label: 'Details' })}
                    onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                    className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-full bg-[#C75D35] text-[#FFFFFF] font-google text-xs md:text-sm font-semibold flex items-center gap-2 hover:bg-[#D09B65] hover:scale-105 transition-all shadow-md shadow-[#C75D35]/20"
                  >
                    View Details <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => setCursorState && setCursorState({ label: 'GitHub' })}
                      onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                      className="p-2.5 md:p-3.5 rounded-full bg-[#F5F1EB] hover:bg-[#FFFFFF] text-[#2B231D] transition-colors border border-[#2B231D]/5 hover:scale-105"
                    >
                      <Github className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Animated Floating Data UI / Image */}
              <motion.div 
                whileHover={{ scale: 1.02, rotateY: -5, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex-1 w-full h-[220px] sm:h-[260px] md:h-full md:max-h-[380px] relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-[#2B231D]/10 bg-[#1A1511] shadow-xl perspective-1000 shrink-0 group/img"
              >
                {project.image ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 transition-all duration-700 group-hover/img:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F5F1EB] to-[#FFFFFF]" />
                )}

                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#C75D35]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#C75D35]/20 transition-colors duration-1000" />
                
                {/* Mock UI Overlay */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className={`absolute inset-4 md:inset-8 border border-[#FFFFFF]/10 ${project.image ? 'bg-[#1A1511]/40 text-white' : 'bg-[#FFFFFF]/60 text-[#2B231D] border-[#2B231D]/5'} backdrop-blur-xl rounded-2xl flex flex-col p-4 md:p-6 font-google shadow-2xl`}
                >
                  <div className={`flex justify-between items-center mb-8 border-b ${project.image ? 'border-[#FFFFFF]/10' : 'border-[#2B231D]/5'} pb-4`}>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className={`${project.image ? 'text-[#FFFFFF]/70' : 'text-[#C75D35]'} text-xs font-mono font-medium tracking-wider`}>system.process({project.shortName})</span>
                  </div>
                  
                  {/* Staggered Animated Lines */}
                  <div className="space-y-6 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "75%" }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                        className={`h-3 ${project.image ? 'bg-[#FFFFFF]/20' : 'bg-[#EAE2D6]'} rounded-full overflow-hidden relative`}
                      >
                         <motion.div 
                           animate={{ x: ["-100%", "200%"] }}
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                           className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent ${project.image ? 'via-[#FFFFFF]/30' : 'via-[#FFFFFF]/80'} to-transparent`}
                         />
                      </motion.div>
                      <Sparkles className={`w-4 h-4 ${project.image ? 'text-[#FFFFFF]' : 'text-[#C75D35]'} opacity-50`} />
                    </div>
                    
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "50%" }}
                      transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                      className={`h-3 ${project.image ? 'bg-[#FFFFFF]/10' : 'bg-[#2B231D]/10'} rounded-full`} 
                    />
                    
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
                      className={`h-3 ${project.image ? 'bg-[#FFFFFF]/10' : 'bg-[#2B231D]/10'} rounded-full`} 
                    />

                    <div className="pt-8 flex justify-between items-end opacity-50">
                       <div className={`w-16 h-16 rounded-xl border-2 border-dashed ${project.image ? 'border-[#FFFFFF]/20' : 'border-[#2B231D]/20'} animate-[spin_10s_linear_infinite]`} />
                       <div className={`w-1/3 h-2 ${project.image ? 'bg-[#FFFFFF]/10' : 'bg-[#2B231D]/10'} rounded-full`} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </motion.div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center mt-10 md:mt-12 relative z-50">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setSelectedProject(PROJECTS_DATA[4])}
          className="btn-apple-dark px-8 py-4 rounded-full font-google text-sm sm:text-base font-semibold flex items-center gap-3 shadow-xl hover:shadow-[#C75D35]/20 transition-shadow"
        >
          <LayoutGrid className="w-5 h-5 text-[#C75D35]" />
          View All 14 Projects
        </motion.button>
      </div>

      {selectedProject && (
        <CaseStudyModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}