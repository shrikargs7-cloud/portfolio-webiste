import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  FolderGit2,
  Sparkles,
  Star,
  Globe
} from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';

export const TOP_10_PROJECTS = [
  {
    id: 'briefiq-agent',
    rank: '01',
    title: 'BriefIQ — Pre-Meeting Intelligence & AI Sparring Arena',
    shortDesc: 'Autonomous pre-meeting research & AI sparring arena built for the Tavily Track (Global AI Hackathon).',
    category: 'Agentic AI • Research • Hackathon',
    filterGroup: 'AGENTIC AI',
    language: 'Python',
    langColor: '#3572A5',
    stars: 0,
    github: 'https://github.com/shrikargs7-cloud/briefiq-agent',
    demo: null,
    desc: 'BriefIQ is an autonomous pre-meeting intelligence and AI sparring arena engineered for the Global AI Hackathon (Tavily Track). It synthesizes live web intelligence, stakeholder dossiers, and interactive adversarial sparring simulations.',
    technologies: ['Python', 'Tavily Search API', 'Agentic AI', 'LLM Orchestration', 'FastAPI'],
    keyConcepts: [
      'Autonomous live-web research & stakeholder synthesis',
      'Interactive AI sparring arena for objection handling',
      'Structured executive brief generation prior to calls'
    ]
  },
  {
    id: 'aegis-pentest-agent',
    rank: '02',
    title: 'AegisAgent — Scope-Enforced Pentest SOC & Threat Center',
    shortDesc: 'Autonomous scope-enforced penetration testing SOC and threat center (Bifrost by Maxim AI).',
    category: 'Security • Agentic AI • SOC',
    filterGroup: 'AGENTIC AI',
    language: 'Python',
    langColor: '#3572A5',
    stars: 0,
    github: 'https://github.com/shrikargs7-cloud/aegis-pentest-agent',
    demo: null,
    desc: 'AegisAgent is an autonomous scope-enforced Pentest SOC & Threat Center built around Problem Statement 03 (Bifrost by Maxim AI). Ensures strict target-scope guardrails while automating vulnerability reconnaissance and threat triage.',
    technologies: ['Python', 'Security Automation', 'Scope Guardrails', 'Maxim AI / Bifrost', 'Threat Modeling'],
    keyConcepts: [
      'Hard-enforced target scope boundaries for autonomous agents',
      'Automated vulnerability reconnaissance and triage reports',
      'Real-time SOC threat center dashboard'
    ]
  },
  {
    id: 'ocupulse-dr',
    rank: '03',
    title: 'OcuPulse — Diabetic Retinopathy Screening System',
    shortDesc: 'AI-driven retinal fundus screening pipeline with vessel segmentation, lesion grading, and explainability.',
    category: 'AI & Vision • Healthcare • Full Stack',
    filterGroup: 'AI & VISION',
    language: 'Python / TypeScript',
    langColor: '#EE4C2C',
    stars: 2,
    github: 'https://github.com/shrikargs7-cloud/ocupulse-dr',
    demo: 'https://github.com/shrikargs7-cloud/Ocupulse',
    desc: 'OcuPulse is an AI-assisted diabetic retinopathy screening platform analyzing retinal fundus images with CLAHE enhancement, blood-vessel segmentation, lesion analysis, and explainable clinical reporting across 5 global datasets.',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'TypeScript', 'FastAPI', 'Medical Imaging'],
    validationDatasets: ['APTOS 2019', 'IDRiD', 'DRIVE', 'Messidor-2'],
    keyConcepts: [
      'Green-channel extraction & adaptive CLAHE contrast enhancement',
      'Blood-vessel segmentation & lesion localization overlays',
      'Explainable diabetic retinopathy grading & automated reporting'
    ]
  },
  {
    id: 'medpass-ai',
    rank: '04',
    title: 'MedPass AI — Healthcare Intelligence Platform',
    shortDesc: 'Verified medical credentials and intelligent patient record workflows deployed live on Vercel.',
    category: 'Healthcare • Full Stack • TypeScript',
    filterGroup: 'FULL STACK',
    language: 'TypeScript',
    langColor: '#3178C6',
    stars: 6,
    github: 'https://github.com/shrikargs7-cloud/medpass-AI',
    demo: 'https://medpass-ai.vercel.app',
    desc: 'MedPass AI streamlines patient record verification and clinical onboarding through an accessible TypeScript/React interface paired with intelligent document workflows.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Healthcare UX'],
    keyConcepts: [
      'Streamlined clinical credential & patient record verification',
      'Accessible, high-contrast medical dashboard UI',
      'Production deployment on Vercel Edge Network'
    ]
  },
  {
    id: 'finops-swarm',
    rank: '05',
    title: 'FinOps Multi-Agent Swarm Optimizer',
    shortDesc: 'Autonomous multi-agent swarm collaboration for cloud cost & latency optimization (World Cup Winner).',
    category: 'Agentic AI • Cloud FinOps • Infrastructure',
    filterGroup: 'CLOUD & FINOPS',
    language: 'HCL / Python',
    langColor: '#844FBA',
    stars: 1,
    achievement: 'Agentic AI World Cup Winner',
    github: 'https://github.com/shrikargs7-cloud/finops-multi-agent-swarm-optimizer',
    demo: null,
    desc: 'Global winning multi-agent system designed around autonomous collaboration between specialized FinOps agents for cloud cost reduction, workload placement, and latency optimization.',
    technologies: ['Multi-Agent Systems', 'HCL / Terraform', 'Python', 'Cloud FinOps', 'LLM Orchestration'],
    keyConcepts: [
      'Dynamic task decomposition across specialized FinOps agents',
      'Infrastructure-as-Code (HCL) rightsizing recommendations',
      'Human-in-the-loop approval guardrails for cloud changes'
    ]
  },
  {
    id: 'alc-opt',
    rank: '06',
    title: 'ALC-OPT — AWS Cloud Latency & Cost Optimiser',
    shortDesc: 'Multi-agent telemetry analytics and automated rightsizing engine specifically tuned for AWS workloads.',
    category: 'Cloud & FinOps • Python • AWS',
    filterGroup: 'CLOUD & FINOPS',
    language: 'Python',
    langColor: '#3572A5',
    stars: 0,
    github: 'https://github.com/shrikargs7-cloud/alc-opt',
    demo: null,
    desc: 'ALC-OPT continuously evaluates AWS compute, region latency, and spend telemetry using coordinated optimization agents to recommend high-ROI infrastructure adjustments.',
    technologies: ['Python', 'AWS Architecture', 'Multi-Agent AI', 'Latency Telemetry', 'Cost Modeling'],
    keyConcepts: [
      'Multi-region AWS latency vs. cost Pareto optimization',
      'Automated anomaly detection for idle compute clusters',
      'Actionable rightsizing diffs for platform teams'
    ]
  },
  {
    id: 'vega-ai',
    rank: '07',
    title: 'Vega AI — Document & Report Analyzer',
    shortDesc: 'Generative AI document intelligence platform converting dense reports into structured executive insights.',
    category: 'Generative AI • NLP • Document UI',
    filterGroup: 'AI & VISION',
    language: 'Python / HTML',
    langColor: '#E34C26',
    stars: 1,
    github: 'https://github.com/shrikargs7-cloud/vega-ai',
    demo: null,
    desc: 'Vega AI processes long-form technical and financial reports, extracting structured JSON entities, key risks, and scannable executive summaries.',
    technologies: ['Generative AI', 'NLP', 'LLM Integration', 'Structured JSON', 'Document UI'],
    keyConcepts: [
      'Typed executive insight cards replacing flat chat walls',
      'Automated semantic extraction & prompt pipelines',
      'High-clarity typography for rapid report triage'
    ]
  },
  {
    id: 'trade-analysis-dashboard',
    rank: '08',
    title: 'Trade Analysis Dashboard',
    shortDesc: 'Full-stack stock market analytics platform with real-time trend visualization and performance metrics.',
    category: 'Full Stack • Data Viz • FinTech',
    filterGroup: 'FULL STACK',
    language: 'Python',
    langColor: '#3572A5',
    stars: 1,
    github: 'https://github.com/shrikargs7-cloud/trade-analysis-dashboard',
    demo: 'https://trade-analysis-dashboard-tau.vercel.app',
    desc: 'Full-stack stock market analysis platform providing real-time market insights, historical price movement charts, and performance analytics via an interactive dashboard.',
    technologies: ['Python', 'Market APIs', 'Data Visualization', 'Interactive Charts', 'Vercel'],
    keyConcepts: [
      'Real-time equity trend visualization & historical backtesting',
      'Clean financial telemetry cards & responsive grid',
      'Live production deployment on Vercel'
    ]
  },
  {
    id: 'dual-optimization-sandbox',
    rank: '09',
    title: 'Dual Optimization Sandbox',
    shortDesc: 'First-principles interactive simulation demonstrating Gradient Descent vs. Gradient Ascent in pure NumPy.',
    category: 'ML & Math • Simulation • Streamlit',
    filterGroup: 'AI & VISION',
    language: 'Python',
    langColor: '#3572A5',
    stars: 0,
    github: 'https://github.com/shrikargs7-cloud/dual-optimization-sandbox',
    demo: null,
    desc: 'Interactive educational dashboard and simulation engine demonstrating Gradient Descent vs. Gradient Ascent from first principles using pure NumPy and Streamlit.',
    technologies: ['Python', 'Pure NumPy', 'Streamlit', 'Optimization Math', 'Interactive Sim'],
    keyConcepts: [
      'Zero-framework gradient computation from first principles',
      'Interactive learning-rate & convergence trajectory plotting',
      'Dual minimization vs. maximization surface exploration'
    ]
  },
  {
    id: 'smart-shopping-trolley-iot',
    rank: '10',
    title: 'Smart Shopping Trolley IoT',
    shortDesc: 'Embedded IoT smart retail cart with automated item tracking and live web telemetry dashboard.',
    category: 'IoT • Embedded • Full Stack',
    filterGroup: 'FULL STACK',
    language: 'JavaScript',
    langColor: '#F1E05A',
    stars: 0,
    github: 'https://github.com/shrikargs7-cloud/smart-shopping-trolley-iot',
    demo: 'https://smart-shopping-one.vercel.app',
    desc: 'IoT-enabled smart retail trolley pairing embedded hardware sensors with a real-time web checkout and inventory telemetry interface.',
    technologies: ['JavaScript', 'IoT Sensors', 'Embedded Systems', 'Web Telemetry', 'Vercel'],
    keyConcepts: [
      'Real-time cart item tracking & checkout state sync',
      'Hardware-to-web telemetry bridge',
      'Live web interface deployed on Vercel'
    ]
  }
];

const FILTERS = ['ALL', 'AGENTIC AI', 'AI & VISION', 'CLOUD & FINOPS', 'FULL STACK'];

export default function TopTenProjectsGrid({ setCursorState }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects = TOP_10_PROJECTS.filter((p) =>
    activeFilter === 'ALL' ? true : p.filterGroup === activeFilter
  );

  return (
    <section id="top-10-projects" className="w-full py-12 md:py-16 px-4 sm:px-8 md:px-16 relative z-10 font-google">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header + Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-[10px] tracking-widest uppercase">
              <Sparkles className="w-3 h-3" /> Top 10 Repositories
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#2B231D] tracking-tight leading-none">
              Selected <span className="text-[#C75D35] italic">Repositories.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#382E27] font-medium max-w-2xl">
              My top 10 engineering &amp; design builds—each linked directly to its source repository and live deployment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#FFFFFF]/90 border-2 border-[#2B231D]/20 shadow-sm backdrop-blur-xl self-start lg:self-end">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all ${
                  activeFilter === f
                    ? 'bg-[#2B231D] text-white shadow-xs'
                    : 'text-[#382E27] hover:text-[#2B231D] hover:bg-[#F5F1EB]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 10-Project Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.3 }}
              className="group p-6 sm:p-7 rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 hover:border-[#C75D35] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Top Meta Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F5F1EB] border border-[#2B231D]/20 font-mono text-[11px] font-bold text-[#C75D35]">
                      #{project.rank}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-[#382E27] uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.stars > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#2B231D]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {project.stars}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#2B231D]">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: project.langColor }} />
                      {project.language}
                    </span>
                  </div>
                </div>

                {/* Title & Repo Link */}
                <div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl sm:text-2xl font-bold text-[#2B231D] group-hover:text-[#C75D35] transition-colors inline-flex items-center gap-1.5 leading-snug"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <p className="text-xs sm:text-sm text-[#382E27] font-medium leading-relaxed mt-1.5">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#F5F1EB] border border-[#2B231D]/15 text-[11px] font-mono font-semibold text-[#2B231D]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Row: Direct Repo Link + Live Demo + Case Study */}
              <div className="pt-4 border-t border-[#2B231D]/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setCursorState && setCursorState({ label: 'GitHub' })}
                    onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2B231D] text-white hover:bg-[#C75D35] font-mono text-xs font-bold transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => setCursorState && setCursorState({ label: 'Live' })}
                      onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-600 hover:text-white font-mono text-xs font-bold transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setCursorState && setCursorState({ label: 'Specs' })}
                  onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#C75D35] hover:underline"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
