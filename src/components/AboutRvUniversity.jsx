import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Code, Cpu, Sparkles, GraduationCap } from 'lucide-react';

export default function AboutRvUniversity({ setCursorState }) {
  const [activePillar, setActivePillar] = useState('cloud');

  const pillars = [
    {
      id: 'fullstack',
      title: 'Full-Stack Web Development',
      icon: Code,
      tagline: 'Production-ready web applications from APIs to modern UIs.',
      details: 'Building robust frontend and backend architectures using React, Node.js, Python Flask, REST APIs, MySQL/SQLite, and Tailwind CSS with high responsiveness and modular design.',
      highlights: ['React & Next.js', 'Node.js & Python', 'REST API Design', 'Database Persistence']
    },
    {
      id: 'aiml',
      title: 'AI / Machine Learning & RAG',
      icon: Cpu,
      tagline: 'Practical ML, Generative AI, and RAG architectures.',
      details: 'Engineering retrieval-augmented generation (RAG) pipelines, semantic search with vector databases (FAISS), multimodal LLMs, prompt engineering, and fine-tuning pipelines.',
      highlights: ['LLMs & RAG Pipelines', 'Vector Databases & Embeddings', 'Model Evaluation & Inference', 'Dataset Preparation']
    },
    {
      id: 'agents',
      title: 'Agentic AI & Automation',
      icon: Sparkles,
      tagline: 'Autonomous workflows, tool-using agents, and multi-agent coordination.',
      details: 'Designing intelligent agent workflows, task decomposition, agent orchestration, and context-aware systems that automate complex analytical and cloud optimization processes.',
      highlights: ['Agentic AI Workflows', 'Tool-Using Agents', 'Multi-Agent Collaboration', 'Task Decomposition']
    },
    {
      id: 'cloud',
      title: 'Cloud, MLOps & CI/CD',
      icon: Cloud,
      tagline: 'Transitioning models and APIs from experimentation to deployment.',
      details: 'Deploying scalable services on Google Cloud Platform (GCP), containerizing environments with Docker, automating builds with GitHub Actions CI/CD, and managing production logging.',
      highlights: ['Google Cloud Platform', 'Docker Containerization', 'CI/CD & GitHub Actions', 'Model Deployment Pipelines']
    }
  ];

  const current = pillars.find((p) => p.id === activePillar) || pillars[0];

  return (
    <section id="about" className="w-full flex flex-col justify-center px-6 md:px-12 lg:px-16 relative z-10 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative w-full">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#2B231D]/5 font-mono text-xs text-[#C75D35] shadow-sm">
            <GraduationCap className="w-4 h-4" />
            <span>G S Shrikar · India · Full-Stack &amp; AI/ML Engineer</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold text-[#2B231D] font-google tracking-tight">
            Hi, I'm G S Shrikar
          </h2>

          <div className="font-google text-[#73675E] text-base md:text-lg max-w-4xl leading-relaxed font-light space-y-3">
            <p>
              I am a developer interested in building intelligent, scalable, and practical software systems. My work spans full-stack web development, AI/ML, generative AI, RAG systems, AI agents, model fine-tuning, cloud technologies, automation, computer vision, and data-driven applications.
            </p>
            <p className="text-[#73675E] text-sm md:text-base">
              I enjoy taking an idea from experimentation and model development all the way to APIs, web applications, deployment, and production-oriented systems.
            </p>
          </div>
        </motion.div>

        {/* Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 flex flex-col gap-3">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              const isActive = activePillar === p.id;
              return (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  onClick={() => setActivePillar(p.id)}
                  onMouseEnter={() => setCursorState && setCursorState({ label: 'Explore' })}
                  onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                  className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 backdrop-blur-md ${
                    isActive
                      ? 'bg-[#FFFFFF]/90 border-[#D09B65]/60 shadow-[0_15px_30px_rgba(43,35,29,0.06)] text-[#2B231D] scale-[1.02]'
                      : 'bg-[#FFFFFF]/50 border-[#2B231D]/5 text-[#73675E] hover:text-[#2B231D] hover:bg-[#FFFFFF]/60 hover:border-[#2B231D]/10'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl transition-colors duration-500 ${isActive ? 'bg-[#C75D35] text-white' : 'bg-[#F5F1EB] text-[#73675E]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-google text-lg font-bold">{p.title}</h3>
                    <p className="font-google text-xs text-[#73675E] mt-0.5">{p.tagline}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0 }}
              className="lg:col-span-7 p-8 md:p-10 rounded-3xl bg-[#FFFFFF]/70 border border-[#2B231D]/10 backdrop-blur-2xl space-y-8 flex flex-col justify-between min-h-[360px] shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C75D35]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <span className="font-mono text-xs tracking-widest text-[#C75D35] block">// Focus Area</span>
                <h3 className="text-3xl font-bold text-[#2B231D] font-google">{current.title}</h3>
                <p className="font-google text-[#73675E] text-base leading-relaxed font-medium">
                  {current.details}
                </p>
              </div>

              <div className="pt-6 border-t border-[#2B231D]/5 flex flex-wrap gap-2 relative z-10">
                {current.highlights.map((h, idx) => (
                  <motion.span 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    key={h} 
                    className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-white text-[#73675E] border border-[#2B231D]/5 shadow-sm"
                  >
                    ✓ {h}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}