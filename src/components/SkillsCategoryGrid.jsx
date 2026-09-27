import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Terminal, Cpu, Sparkles, Flame, Workflow, GitMerge, Cloud, 
  Layout, Database
} from 'lucide-react';

export const TECHNICAL_SKILLS_CATEGORIES = [
  {
    id: 'ai-ml',
    title: 'Machine Learning & AI',
    icon: Cpu,
    colSpan: 'md:col-span-2 lg:col-span-2',
    rowSpan: 'md:row-span-2',
    theme: 'bg-[#1A1511] text-[#F5F1EB]',
    iconColor: 'text-[#C75D35]',
    skills: ['Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP', 'Model evaluation', 'Feature engineering'],
    image: '/assets/skills/ml_ai.jpg'
  },
  {
    id: 'genai',
    title: 'Generative AI & RAG',
    icon: Sparkles,
    colSpan: 'md:col-span-2 lg:col-span-2',
    rowSpan: 'md:row-span-1',
    theme: 'bg-[#C75D35] text-[#FFFFFF]',
    iconColor: 'text-[#FFFFFF]',
    skills: ['LLM Apps', 'Prompt Engineering', 'Vector DBs', 'Semantic Search', 'Agentic Workflows'],
    image: '/assets/skills/genai.jpg'
  },
  {
    id: 'programming',
    title: 'Languages',
    icon: Terminal,
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1',
    theme: 'bg-[#F5F1EB] text-[#2B231D] border border-[#2B231D]/5',
    iconColor: 'text-[#C75D35]',
    skills: ['Python 3', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Bash']
  },
  {
    id: 'cloud',
    title: 'Cloud & Infra',
    icon: Cloud,
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1',
    theme: 'bg-[#FFFFFF] text-[#2B231D] border border-[#2B231D]/5',
    iconColor: 'text-[#73675E]',
    skills: ['GCP', 'Cloud Run', 'Serverless', 'Microservices']
  },
  {
    id: 'fine-tuning',
    title: 'Model Training',
    icon: Flame,
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-2',
    theme: 'bg-[#1A1511] text-[#F5F1EB] border border-[#C75D35]/20',
    iconColor: 'text-orange-400',
    skills: ['Transfer Learning', 'PEFT / LoRA', 'QLoRA', 'Quantization', 'GPU Pipelines']
  },
  {
    id: 'backend',
    title: 'Backend & DBs',
    icon: Database,
    colSpan: 'md:col-span-2 lg:col-span-2',
    rowSpan: 'md:row-span-1',
    theme: 'bg-[#F5F1EB] text-[#2B231D] border border-[#2B231D]/5',
    iconColor: 'text-[#2B231D]',
    skills: ['Node.js', 'FastAPI', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Redis', 'Pinecone'],
    image: '/assets/skills/backend.jpg'
  },
  {
    id: 'pipelines',
    title: 'AI Pipelines',
    icon: Workflow,
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1',
    theme: 'bg-[#FFFFFF] text-[#2B231D] border border-[#2B231D]/5',
    iconColor: 'text-[#C75D35]',
    skills: ['ETL', 'Batch Inference', 'Automated Workflows']
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Layout,
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1',
    theme: 'bg-[#2B231D] text-[#F5F1EB]',
    iconColor: 'text-[#F5F1EB]',
    skills: ['React', 'Next.js', 'Tailwind', 'Framer Motion']
  },
  {
    id: 'mlops-devops',
    title: 'MLOps & CI/CD',
    icon: GitMerge,
    colSpan: 'md:col-span-1 lg:col-span-1',
    rowSpan: 'md:row-span-1',
    theme: 'bg-[#F5F1EB] text-[#2B231D] border border-[#2B231D]/5',
    iconColor: 'text-[#73675E]',
    skills: ['Docker', 'GitHub Actions', 'Automated Testing']
  }
];

function BentoCard({ cat, idx, setCursorState }) {
  const Icon = cat.icon;
  const isDark = cat.theme.includes('bg-[#2B231D]') || cat.theme.includes('bg-[#1A1511]') || cat.theme.includes('bg-[#C75D35]');

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.5 });

  // Moderate 3D tilt
  const rotateX = useTransform(smoothY, [0, 1], ["4deg", "-4deg"]);
  const rotateY = useTransform(smoothX, [0, 1], ["-4deg", "4deg"]);
  
  // Interactive Glare position
  const glareX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setCursorState && setCursorState({ label: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: idx * 0.05, type: "spring", stiffness: 200, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorState && setCursorState({ label: 'Tech Stack' })}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl p-6 md:p-8 overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-[0_20px_50px_rgba(43,35,29,0.12)] transition-shadow duration-500 perspective-1000 ${cat.colSpan} ${cat.rowSpan} ${cat.theme}`}
    >
      {/* Glare Overlay */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.6)'}, transparent 60%)`,
        }}
      />

      {/* Image Background for specific cards */}
      {cat.image && (
        <div className="absolute inset-0 w-full h-full transform-style-3d" style={{ transform: 'translateZ(-10px)' }}>
          <img src={cat.image} alt={cat.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-110 transform" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
      )}
      
      {/* Background ambient accents for dark cards without images */}
      {isDark && !cat.image && (
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FFFFFF]/10 blur-[40px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-700" style={{ transform: 'translateZ(-5px)' }} />
      )}
      
      <div className="flex justify-between items-start relative z-10" style={{ transform: 'translateZ(10px)' }}>
        <div className={`p-3 rounded-2xl ${isDark || cat.image ? 'bg-[#FFFFFF]/10 backdrop-blur-md shadow-inner' : 'bg-[#2B231D]/5'}`}>
          <Icon className={`w-6 h-6 ${cat.image ? 'text-[#FFFFFF]' : cat.iconColor}`} />
        </div>
      </div>

      <div className="relative z-10 mt-auto" style={{ transform: 'translateZ(20px)' }}>
        <h3 className={`text-xl md:text-2xl font-google font-bold mb-4 tracking-tight ${cat.image ? 'text-[#FFFFFF]' : ''}`}>
          {cat.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {cat.skills.map((skill, sIdx) => (
            <motion.span 
              key={skill}
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`font-mono text-[10px] md:text-xs px-2.5 py-1.5 rounded-md cursor-default ${
                isDark || cat.image
                  ? 'bg-[#FFFFFF]/10 border border-[#FFFFFF]/20 text-[#FFFFFF] shadow-lg' 
                  : 'bg-[#FFFFFF] border border-[#2B231D]/10 text-[#73675E] shadow-sm'
              } backdrop-blur-sm transition-colors`}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsCategoryGrid({ setCursorState }) {
  return (
    <section id="skills" className="w-full flex flex-col py-12 md:py-20 px-4 sm:px-10 md:px-16 overflow-hidden select-none relative z-10 bg-transparent">
      
      {/* Premium Header */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto mb-10 md:mb-16 flex flex-col items-start justify-center shrink-0"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-[10px] tracking-widest uppercase mb-4">
          <Sparkles className="w-3 h-3" /> Technical Arsenal
        </span>
        <h2 className="text-[clamp(40px,7vw,84px)] font-google font-semibold text-[#2B231D] tracking-tight leading-none mb-4">
          Engineered for <br/> <span className="text-[#C75D35] italic pr-4">scale.</span>
        </h2>
        <p className="text-lg md:text-xl text-[#73675E] font-google max-w-2xl font-light">
          A comprehensive breakdown of the languages, frameworks, and architectures I use to build robust AI and web systems.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[160px] md:auto-rows-[180px]">
        {TECHNICAL_SKILLS_CATEGORIES.map((cat, idx) => (
          <BentoCard key={cat.id} cat={cat} idx={idx} setCursorState={setCursorState} />
        ))}
      </div>
    </section>
  );
}
