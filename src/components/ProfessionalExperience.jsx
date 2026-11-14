import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  ExternalLink,
  Building2,
  Cpu
} from 'lucide-react';

const EXPERIENCES = [
  {
    id: 'swe-cloud',
    company: 'RV University & Cloud Systems Lab',
    role: 'Software Engineering & Cloud Architecture Fellow',
    period: '2024 — Present',
    location: 'Bengaluru, India',
    badge: 'Production Systems',
    type: 'Full-Stack & Cloud',
    summary: 'Architecting scalable web services, microservice APIs, and automated CI/CD pipelines deployed on Google Cloud Platform (GCP). Focused on distributed system resilience and low-latency API delivery.',
    metrics: [
      { label: 'System Uptime', value: '99.9%' },
      { label: 'API Latency', value: '<45ms' },
      { label: 'Services Containerized', value: '12+' },
      { label: 'Weekly Active Calls', value: '25K+' }
    ],
    responsibilities: [
      'Engineered high-throughput RESTful microservices using FastAPI, Node.js, and PostgreSQL with database connection pooling.',
      'Containerized multi-tier applications with Docker and deployed automated orchestration across GCP Cloud Run and Compute Engine.',
      'Constructed CI/CD workflows utilizing GitHub Actions with automated linting, unit testing, and zero-downtime deployment stages.',
      'Designed role-based access control (RBAC) and Google Cloud IAM security policies to safeguard core endpoints.'
    ],
    techStack: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Docker', 'Google Cloud Platform', 'GitHub Actions', 'Redis']
  },
  {
    id: 'ai-vision',
    company: 'Medical Computer Vision Research',
    role: 'AI / Computer Vision Research Engineer (OcuPulse)',
    period: '2024 — 2025',
    location: 'Research Initiative',
    badge: 'Clinical ML',
    type: 'Computer Vision & Deep Learning',
    summary: 'Spearheaded automated retinal image processing and diabetic retinopathy screening research. Implemented end-to-end computer vision pipelines combining adaptive contrast enhancement with deep feature extraction.',
    metrics: [
      { label: 'Validated Datasets', value: '5 Global' },
      { label: 'Segmentation F1', value: '0.94' },
      { label: 'Inference Speed', value: '180ms' },
      { label: 'Samples Processed', value: '14,000+' }
    ],
    responsibilities: [
      'Developed morphological vessel segmentation and optic disc localization pipelines using OpenCV, PyTorch, and CLAHE pre-processing.',
      'Benchmarked neural models across 5 international datasets: APTOS 2019, IDRiD, DRIVE, Messidor-2, and STARE.',
      'Engineered an interactive diagnostic dashboard for clinical review with lesion localization heatmaps and severity classification.',
      'Authored comprehensive technical documentation detailing vessel tortuosity metrics and model sensitivity benchmarks.'
    ],
    techStack: ['Python', 'PyTorch', 'OpenCV', 'Scikit-learn', 'NumPy', 'FAISS', 'Medical Imaging']
  },
  {
    id: 'agentic-ai',
    company: 'Autonomous Systems & Multi-Agent Swarms',
    role: 'Lead Autonomous Systems Architect (Agent Swarm)',
    period: '2025',
    location: 'Global Competition',
    badge: '🏆 Global Champion',
    type: 'Agentic AI & Orchestration',
    summary: 'Engineered an autonomous multi-agent cloud optimization system that competed globally in the Agentic AI World Cup. Built autonomous agents capable of collaborative task decomposition and dynamic tool calling.',
    metrics: [
      { label: 'World Cup Rank', value: '#1 Winner' },
      { label: 'Agent Coordination', value: '4 Swarms' },
      { label: 'Cloud Waste Reduced', value: '38%' },
      { label: 'Task Autonomy', value: '100%' }
    ],
    responsibilities: [
      'Architected hierarchical multi-agent state machines orchestrating resource monitoring, log synthesis, and automated infrastructure rightsizing.',
      'Integrated tool-calling agents with live cloud metrics APIs, enabling autonomous detection and mitigation of resource leaks.',
      'Implemented vector-based semantic memory buffers enabling cross-agent context persistence during multi-step reasoning cycles.',
      'Presented live system demonstrations and architectural defenses to industry judges and global engineering juries.'
    ],
    techStack: ['Agentic AI', 'Python', 'LangChain', 'FastAPI', 'Vector Databases', 'Cloud Orchestration', 'Prompt Engineering']
  },
  {
    id: 'academic-lead',
    company: 'RV University Department of Computer Science',
    role: 'Algorithms & Full-Stack Peer Mentor',
    period: '2023 — 2024',
    location: 'Bengaluru, India',
    badge: 'Academic Leadership',
    type: 'Mentorship & Engineering',
    summary: 'Led technical workshops, peer programming circles, and algorithmic problem-solving bootcamps for student engineers. Focused on Data Structures, Object-Oriented Design, and modern web application development.',
    metrics: [
      { label: 'Engineers Mentored', value: '120+' },
      { label: 'Bootcamps Conducted', value: '8' },
      { label: 'Code Reviews', value: '350+' },
      { label: 'Satisfaction Rate', value: '98%' }
    ],
    responsibilities: [
      'Curated weekly algorithmic problem sets spanning dynamic programming, graph theory, trees, and system design patterns.',
      'Guided student teams through full-stack capstone projects from schema design to production deployment on Vercel and Render.',
      'Organized hackathon prep tracks and live technical mock interviews for aspiring software developers.'
    ],
    techStack: ['Data Structures', 'Algorithms', 'C++', 'JavaScript', 'React', 'Git', 'System Design']
  }
];

export default function ProfessionalExperience({ setCursorState }) {
  const [activeTab, setActiveTab] = useState(EXPERIENCES[0].id);
  const activeExp = EXPERIENCES.find((e) => e.id === activeTab) || EXPERIENCES[0];

  return (
    <section id="experience-pro" className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-16 overflow-hidden relative z-10 font-google">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C75D35]/2 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-10 md:space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-[10px] tracking-widest uppercase">
              <Briefcase className="w-3 h-3" /> Career Horizon
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B231D] tracking-tight leading-none">
              Professional <span className="text-[#C75D35] italic">Experience.</span>
            </h2>
          </motion.div>

          <p className="font-google text-sm sm:text-base text-[#382E27] font-normal max-w-md">
            Production engineering roles, research fellowships, and technical leadership demonstrating end-to-end system delivery and impact.
          </p>
        </div>

        {/* Interactive Experience Layout: Tabs on Left + Detailed Spec Sheet on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Role Selector List (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {EXPERIENCES.map((exp) => {
              const isActive = activeTab === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveTab(exp.id)}
                  onMouseEnter={() => setCursorState && setCursorState({ label: 'View Role' })}
                  onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                  className={`group relative text-left p-5 rounded-2xl border-2 transition-all duration-300 backdrop-blur-xl flex flex-col gap-1.5 ${
                    isActive
                      ? 'bg-[#FFFFFF] border-[#C75D35] shadow-lg shadow-[#C75D35]/10 scale-[1.02]'
                      : 'bg-[#FFFFFF]/75 border-[#2B231D]/20 hover:border-[#2B231D]/35 hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C75D35]">
                      {exp.period}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                      isActive 
                        ? 'bg-[#C75D35] text-white border-[#C75D35]' 
                        : 'bg-[#F5F1EB] text-[#382E27] border-[#2B231D]/20'
                    }`}>
                      {exp.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#2B231D] leading-snug">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#382E27] font-medium">
                    <Building2 className="w-3.5 h-3.5 text-[#C75D35]" />
                    <span className="truncate">{exp.company}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeRoleIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C75D35] rounded-l-2xl"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Deep-Dive Card (8 Cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-3xl bg-[#FFFFFF]/95 border-2 border-[#2B231D]/25 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-2xl space-y-8 relative overflow-hidden"
              >
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2B231D]/15">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C75D35] uppercase tracking-wider">
                      <span>{activeExp.type}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#382E27]"><MapPin className="w-3 h-3" /> {activeExp.location}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#2B231D]">
                      {activeExp.role}
                    </h3>
                    <p className="text-sm font-semibold text-[#382E27]">
                      {activeExp.company}
                    </p>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-[#F5F1EB] border border-[#2B231D]/20 text-xs font-mono text-[#2B231D] font-bold self-start sm:self-center">
                    {activeExp.period}
                  </div>
                </div>

                {/* Role Summary */}
                <p className="text-sm sm:text-base text-[#382E27] leading-relaxed font-normal">
                  {activeExp.summary}
                </p>

                {/* Impact Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {activeExp.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="p-4 rounded-2xl bg-[#F5F1EB]/80 border border-[#2B231D]/20 text-center shadow-xs">
                      <div className="text-xl sm:text-2xl font-bold font-mono text-[#C75D35]">
                        {metric.value}
                      </div>
                      <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#382E27] font-semibold mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Core Engineering Responsibilities */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#2B231D] font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C75D35]" />
                    Key Architectural Responsibilities &amp; Impact
                  </h4>
                  <ul className="space-y-2.5">
                    {activeExp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#382E27] font-normal leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C75D35] mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Stack */}
                <div className="pt-4 border-t border-[#2B231D]/15 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#2B231D] mr-2">Stack:</span>
                  {activeExp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-[#2B231D]/5 border border-[#2B231D]/20 text-xs font-mono font-semibold text-[#2B231D]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
