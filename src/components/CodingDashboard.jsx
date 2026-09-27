import React from 'react';
import { GitCommit, Trophy, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CodingDashboard({ setCursorState }) {
  return (
    <section id="dashboard" className="py-8 md:py-12 px-4 sm:px-8 md:px-12 lg:px-16 bg-transparent select-none w-full relative">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-[#C75D35] tracking-widest block mb-2">// Live Developer Metrics</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#2B231D] font-google tracking-tighter">Coding Dashboard</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          
          {/* GitHub Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#FFFFFF]/80 border border-[#2B231D]/10 backdrop-blur-xl space-y-6 shadow-xl hover:shadow-[0_20px_40px_rgba(43,35,29,0.08)] hover:border-[#C75D35]/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-[#2B231D]/5 pb-4">
              <div className="flex items-center gap-3">
                <GitCommit className="w-5 h-5 text-[#C75D35]" />
                <span className="font-mono text-sm text-[#2B231D] font-bold">GitHub Performance</span>
              </div>
              <a 
                href="https://github.com/shrikargs7-cloud"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursorState && setCursorState({ label: 'GitHub' })}
                onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                className="text-xs font-mono text-[#73675E] hover:text-[#C75D35] transition-colors"
              >
                @shrikargs7-cloud
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center font-mono">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-2.5 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/5 shadow-sm"
              >
                <span className="block text-lg sm:text-2xl font-bold text-[#C75D35]">480+</span>
                <span className="text-[9px] sm:text-[10px] text-[#515154]">Commits / Yr</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-2.5 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/5 shadow-sm"
              >
                <span className="block text-lg sm:text-2xl font-bold text-sky-500">18</span>
                <span className="text-[9px] sm:text-[10px] text-[#515154]">Repositories</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-2.5 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/5 shadow-sm"
              >
                <span className="block text-lg sm:text-2xl font-bold text-purple-500">100%</span>
                <span className="text-[9px] sm:text-[10px] text-[#515154]">Open Source</span>
              </motion.div>
            </div>

            {/* Heatmap Grid */}
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#73675E] block">Contribution Density:</span>
              <div className="grid grid-cols-12 gap-1.5 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/5">
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.008 }}
                    whileHover={{ scale: 1.3 }}
                    className={`h-4 rounded-sm transition-colors cursor-pointer ${
                      i % 7 === 0 ? 'bg-[#C75D35]' : i % 3 === 0 ? 'bg-[#D09B65]/70' : 'bg-[#F5F1EB]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* LeetCode Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#FFFFFF]/80 border border-[#2B231D]/10 backdrop-blur-xl space-y-6 shadow-xl hover:shadow-[0_20px_40px_rgba(43,35,29,0.08)] hover:border-[#C75D35]/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between border-b border-[#2B231D]/5 pb-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-[#C75D35]" />
                <span className="font-mono text-sm text-[#2B231D] font-bold">LeetCode &amp; DSA Metrics</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-xs text-[#C75D35]">
                <Flame className="w-4 h-4 fill-[#C75D35] animate-pulse" />
                <span>Daily Streak</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center font-mono">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-2.5 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/5 shadow-sm"
              >
                <span className="block text-lg sm:text-2xl font-bold text-[#C75D35]">250+</span>
                <span className="text-[9px] sm:text-[10px] text-[#515154]">Solved</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-2.5 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/5 shadow-sm"
              >
                <span className="block text-lg sm:text-2xl font-bold text-emerald-600">Top 15%</span>
                <span className="text-[9px] sm:text-[10px] text-[#515154]">Contest Rank</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-2.5 sm:p-4 rounded-2xl bg-[#FFFFFF] border border-[#2B231D]/5 shadow-sm"
              >
                <span className="block text-base sm:text-xl font-bold text-purple-600">Winner</span>
                <span className="text-[9px] sm:text-[10px] text-[#515154]">Agentic AI Cup</span>
              </motion.div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between text-[#73675E]">
                <span>Data Structures &amp; Algorithms Proficiency</span>
                <span className="text-[#C75D35] font-bold">85%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#F5F1EB] overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#C75D35] to-[#D09B65] rounded-full" 
                />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}