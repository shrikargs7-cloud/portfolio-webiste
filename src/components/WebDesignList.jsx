import React, { useState } from 'react';
import { ArrowUpRight, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import BackgroundVideo, { VIDEO_SOURCES } from './BackgroundVideo';

export default function WebDesignList({ setCursorState }) {
  const [hoveredWeb, setHoveredWeb] = useState(null);

  const webProjects = [
    {
      id: 'ocupulse-web',
      title: 'OcuPulse Screening Interface',
      year: '2026',
      desc: 'Retinal fundus image analysis, vessel segmentation, and structured diagnostic reports.',
      link: 'https://github.com/shrikargs7-cloud/ocupulse-dr'
    },
    {
      id: 'weathercast-web',
      title: 'WeatherCast Pro Dashboard',
      year: '2025',
      desc: 'Interactive 5-day forecast dashboard with Leaflet map overlays and authentication.',
      link: 'https://github.com/shrikargs7-cloud'
    },
    {
      id: 'stock-web',
      title: 'Stock Analytics Platform',
      year: '2025',
      desc: 'OHLCV financial market data processor with MySQL persistence and interactive charts.',
      link: 'https://github.com/shrikargs7-cloud'
    },
    {
      id: 'product-web',
      title: 'Commercial Product Website',
      year: '2025',
      desc: 'Responsive product showcase with polished UI/UX and modular interactive components.',
      link: 'https://github.com/shrikargs7-cloud'
    },
    {
      id: '3d-portfolio-web',
      title: '3D Interactive Portfolio',
      year: '2025',
      desc: 'Immersive 3D Fibonacci sphere distribution and modern kinetic web experience.',
      link: 'https://github.com/shrikargs7-cloud'
    },
  ];

  return (
    <section
      id="web-design"
      className="relative w-full py-8 md:py-12 flex flex-col justify-center overflow-hidden bg-transparent px-4 sm:px-8 md:px-12 select-none transition-all duration-700 ease-in-out"
    >
      <BackgroundVideo
        src={VIDEO_SOURCES.web}
        transform="scale-140 translate-y-12"
        opacity="opacity-20"
        blendMode="mix-blend-lighten"
        overlayColor="bg-[#FFFFFF]/80"
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        
        <div className="mb-6 md:mb-8 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-google flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#73675E]">
                <span className="h-2 w-2 rounded-full bg-[#C75D35] animate-pulse" />
                Digital Surfaces
              </span>
            </div>

            <h2 className="font-google text-[clamp(40px,7vw,84px)] font-semibold leading-none tracking-tight text-[#2B231D]">
              Web Architecture
            </h2>
          </motion.div>
          
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-sm tracking-widest text-[#515154] hidden md:block"
          >
            ({webProjects.length} Web Platforms)
          </motion.span>
        </div>

        {/* List */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="rounded-3xl overflow-hidden bg-[#FFFFFF]/30 backdrop-blur-xl border border-[#2B231D]/10 p-2 md:p-4 shadow-xl"
        >
          {webProjects.map((item, index) => (
            <a href={item.link} target="_blank" rel="noreferrer" key={item.id} className="block group">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                onMouseEnter={() => {
                  setHoveredWeb(item);
                  setCursorState && setCursorState({ label: 'GitHub' });
                }}
                onMouseLeave={() => {
                  setHoveredWeb(null);
                  setCursorState && setCursorState({ label: null });
                }}
                className={`flex items-center justify-between gap-6 py-8 md:py-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer hover:bg-[#FFFFFF]/70 hover:shadow-lg rounded-2xl px-6 border border-transparent hover:border-[#2B231D]/5`}
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-mono text-xs text-[#C75D35]/80 font-bold transition-colors duration-500 group-hover:text-[#C75D35]">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="text-[#2B231D]/80 font-google text-[clamp(24px,4.5vw,64px)] font-bold leading-tight tracking-tight group-hover:translate-x-3 transition-all duration-500 group-hover:text-[#2B231D]">
                      {item.title}
                    </h3>
                    <p className="font-google text-xs md:text-sm text-[#73675E] mt-2 opacity-80 group-hover:opacity-100 transition-all duration-300 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-full border border-[#2B231D]/5 text-[#73675E] group-hover:border-[#C75D35] group-hover:bg-[#C75D35] group-hover:text-[#FFFFFF] group-hover:scale-110 transition-all duration-500 bg-[#FFFFFF]/60 backdrop-blur-sm shadow-sm flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest hidden group-hover:inline-block font-mono pl-2">View Source</span>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </motion.div>
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}