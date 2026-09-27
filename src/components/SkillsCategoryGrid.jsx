import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Cpu, Sparkles, Flame, Workflow, GitMerge, Cloud, 
  Layout, Database, Eye, Bot, Code2, Layers 
} from 'lucide-react';



export const TECHNICAL_SKILLS_CATEGORIES = [
  {
    id: 'programming',
    title: 'Programming & Languages',
    icon: Terminal,
    description: 'Foundational and modern languages for high-performance systems, ML prototyping, backend APIs, and frontend applications.',
    skills: ['Python 3', 'C', 'C++', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SQL', 'Bash / Shell Scripting', 'MATLAB']
  },
  {
    id: 'ai-ml',
    title: 'Machine Learning & AI',
    icon: Cpu,
    description: 'Comprehensive machine learning and deep learning methodologies from dataset engineering to model evaluation.',
    skills: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision', 'Natural Language Processing', 'Generative AI', 'Large Language Models (LLMs)', 'Multimodal AI', 'Model evaluation', 'Dataset preparation', 'Data preprocessing', 'Feature engineering', 'Model experimentation', 'Model optimization']
  },
  {
    id: 'genai',
    title: 'Generative AI & RAG',
    icon: Sparkles,
    description: 'RAG architecture, vector search, document ingestion, context retrieval, and intelligent LLM-powered applications.',
    skills: ['LLM application development', 'Prompt Engineering', 'Retrieval-Augmented Generation (RAG)', 'RAG pipelines', 'Document ingestion', 'Chunking strategies', 'Vector embeddings', 'Vector databases', 'Semantic search', 'Context retrieval', 'LLM APIs (OpenAI, Anthropic)', 'Local LLMs', 'AI agents', 'Agentic workflows', 'Tool-using agents', 'AI automation']
  },
  {
    id: 'fine-tuning',
    title: 'Model Training & Fine-Tuning',
    icon: Flame,
    description: 'Modern LLM adaptation, parameter-efficient fine-tuning (PEFT), quantization, and GPU-driven training pipelines.',
    skills: ['Model training', 'Transfer learning', 'Fine-tuning', 'Supervised fine-tuning (SFT)', 'Parameter-efficient fine-tuning (PEFT)', 'LoRA', 'QLoRA', 'Quantization', 'Model adaptation', 'Training pipelines', 'Evaluation pipelines', 'Checkpoint management', 'Inference optimization', 'GPU experimentation']
  },
  {
    id: 'pipelines',
    title: 'AI / ML Pipelines',
    icon: Workflow,
    description: 'End-to-end automated workflows from data ingestion to batch inference and real-time model evaluation.',
    skills: ['Data pipelines', 'Training pipelines', 'Inference pipelines', 'AI processing pipelines', 'ETL concepts', 'Automated workflows', 'Batch processing', 'API-based inference']
  },
  {
    id: 'mlops-devops',
    title: 'MLOps / DevOps / CI-CD',
    icon: GitMerge,
    description: 'Bridging the transition from experimentation to production deployment with robust containerization and CI/CD.',
    skills: ['CI/CD pipelines', 'Git', 'GitHub', 'GitHub Actions', 'Automated testing', 'Version control', 'Environment management', 'Docker', 'Containerization', 'REST API deployment', 'Backend deployment', 'Cloud deployment']
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    description: 'Scalable cloud infrastructure, serverless deployments, API gateways, and distributed system architectures.',
    skills: ['Google Cloud Platform (GCP)', 'Cloud Run', 'Cloud Functions', 'Cloud Storage', 'Cloud APIs', 'Serverless architecture', 'Microservices', 'Distributed systems']
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Layout,
    description: 'Modern, responsive, and highly interactive user interfaces crafted with component-based architectures.',
    skills: ['React.js', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Responsive Design', 'State Management', 'UI/UX Implementation', 'Component Architecture']
  },
  {
    id: 'backend',
    title: 'Backend & Databases',
    icon: Database,
    description: 'Robust server-side applications, REST APIs, and efficient database architectures for high-throughput systems.',
    skills: ['Node.js', 'Express.js', 'Python FastAPI', 'Python Flask', 'RESTful APIs', 'API Design', 'Database Design', 'MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Redis', 'Vector DBs (FAISS, Pinecone)']
  }
];


export default function SkillsCategoryGrid({ setCursorState }) {
  const [activeIdx, setActiveIdx] = useState(0);
  
  const activeCategory = TECHNICAL_SKILLS_CATEGORIES[activeIdx];

  return (
    <section id="skills" className="w-full flex flex-col py-8 md:py-12 px-4 sm:px-10 md:px-16 overflow-visible select-none relative z-10">
      
      {/* Premium Header */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl mx-auto mb-6 flex flex-col items-center justify-center shrink-0"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-[10px] tracking-widest uppercase mb-3">
          <Sparkles className="w-3 h-3" /> Technical Expertise
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-google font-semibold text-[#2B231D] tracking-tight text-center">
          Engineered for scale.
        </h2>
      </motion.div>

      {/* Interactive E-commerce Style Showcase */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row gap-6 lg:gap-12 min-h-0">
        
        {/* Left: Category Navigation (Horizontal pill bar on mobile, vertical sidebar on desktop) */}
        <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto no-scrollbar shrink-0 pb-2 lg:pb-10 snap-x">
          {TECHNICAL_SKILLS_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon || Code2;
            const isActive = activeIdx === idx;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setCursorState && setCursorState({ label: 'Select' })}
                onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                className={`flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-6 sm:py-5 rounded-2xl transition-all duration-300 text-left shrink-0 snap-start ${
                  isActive 
                    ? 'bg-[#FFFFFF] shadow-[0_15px_30px_rgba(43,35,29,0.06)] border border-[#2B231D]/10 text-[#2B231D]' 
                    : 'hover:bg-[#FFFFFF]/50 border border-transparent text-[#73675E]'
                }`}
              >
                <div className={`p-2 sm:p-2.5 rounded-xl transition-colors ${
                  isActive ? 'bg-[#C75D35]/10 text-[#C75D35]' : 'bg-[#EAE2D6] text-[#73675E]'
                }`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="whitespace-nowrap lg:whitespace-normal">
                  <h3 className={`font-google text-xs sm:text-sm font-medium transition-colors ${
                    isActive ? 'text-[#2B231D] font-semibold' : 'text-[#73675E]'
                  }`}>
                    {cat.title}
                  </h3>
                  <p className="hidden lg:block text-[11px] font-mono text-[#73675E] mt-0.5 opacity-70">
                    {cat.skills.length} Competencies
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Dynamic Skills Canvas */}
        <div className="lg:w-2/3 flex-1 bg-[#FFFFFF] rounded-[2rem] border border-[#2B231D]/5 shadow-[0_20px_60px_rgba(43,35,29,0.05)] p-8 lg:p-12 relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-google font-semibold text-[#2B231D] mb-4">
                  {activeCategory.title}
                </h3>
                <p className="text-lg text-[#73675E] leading-relaxed max-w-2xl">
                  {activeCategory.description}
                </p>
              </div>

              {/* Creative Skills Layout: Assymetrical Flow */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3 overflow-visible md:overflow-y-auto no-scrollbar content-start flex-1 pb-4">
                {activeCategory.skills.map((skill, sIdx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: sIdx * 0.025, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#F5F1EB] border border-[#2B231D]/5 text-xs sm:text-sm font-mono text-[#2B231D] hover:bg-[#C75D35] hover:text-[#FFFFFF] transition-colors duration-200 cursor-default shadow-sm hover:shadow-md"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle Background Accent */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C75D35]/5 rounded-full blur-[80px] pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
