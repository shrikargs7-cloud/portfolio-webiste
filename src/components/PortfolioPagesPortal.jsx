import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Github, 
  Cpu, 
  Trophy, 
  Layers, 
  ArrowUpRight, 
  Sparkles,
  GitPullRequest,
  CheckCircle2
} from 'lucide-react';

const DEDICATED_PAGES = [
  {
    title: 'Professional Experience',
    subtitle: 'Internships & Career Workspace',
    description: 'Clean workspace reserved for current and upcoming internship details, engineering roles, and academic foundations.',
    route: '/experience',
    icon: Briefcase,
    tag: 'Workspace',
    highlight: 'Ready for user updates',
    color: '#C75D35',
    bullets: ['Empty Internship Card Template', 'Academic Milestones & Radar', 'Role & Technology Specs']
  },
  {
    title: 'Open Source Contributions',
    subtitle: 'Upstream Merged PRs & Docs',
    description: 'Direct production commits merged into Microsoft Terminal, WinGet Package Manager, Backlot SaaS API emulator, and more.',
    route: '/opensource',
    icon: GitPullRequest,
    tag: '6 Merged PRs',
    highlight: 'Verified on GitHub',
    color: '#8957E5',
    bullets: ['Microsoft Terminal (#20800)', 'Microsoft WinGet OpenJDK 17', 'Backlot SaaS API Emulator (#394)']
  },
  {
    title: 'Skills & Architecture',
    subtitle: 'Technical Bento Arsenal',
    description: 'Deep dive into Machine Learning, Generative AI & RAG, Model Training, Distributed Microservices, and Cloud Infrastructure.',
    route: '/skills',
    icon: Cpu,
    tag: 'Tech Stack',
    highlight: 'Comprehensive Bento',
    color: '#D09B65',
    bullets: ['PyTorch, CUDA & LLMs', 'FastAPI, Node.js & PostgreSQL', 'LeetCode Metrics & Commits']
  },
  {
    title: 'Hackathons & Sprints',
    subtitle: 'High-Velocity Rapid Builds',
    description: 'Global championship ventures including the Agentic AI World Cup, autonomous agents, and 48-hour continuous sprints.',
    route: '/hackathons',
    icon: Trophy,
    tag: 'Championship',
    highlight: 'World Cup Winner',
    color: '#E06C75',
    bullets: ['Agentic AI World Cup #1', 'Autonomous Swarm Orchestrator', 'Rapid Prototype Engineering']
  },
  {
    title: 'Crafted Projects & Labs',
    subtitle: 'Case Studies & R&D Grid',
    description: 'End-to-end production systems, OcuPulse clinical vision, Vega AI, IoT embedded hardware, and verified credentials.',
    route: '/projects',
    icon: Layers,
    tag: 'Production',
    highlight: 'Full Deep-Dives',
    color: '#2B231D',
    bullets: ['OcuPulse Medical Diagnostics', 'Vega AI Engineering Copilot', 'IoT Hardware & Certificates']
  }
];

export default function PortfolioPagesPortal({ setCursorState }) {
  return (
    <section className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-16 overflow-hidden relative z-10 font-google">
      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C75D35]/10 border border-[#C75D35]/20 text-[#C75D35] font-mono text-[10px] tracking-widest uppercase">
              <Sparkles className="w-3 h-3" /> Dedicated Portfolios
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B231D] tracking-tight leading-none">
              Explore <span className="text-[#C75D35] italic">Sections.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#382E27] font-medium max-w-md">
            Every section now resides on its own dedicated, clutter-free page for instant, zero-latency exploration.
          </p>
        </div>

        {/* Portal Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEDICATED_PAGES.map((page, idx) => (
            <Link
              key={page.title}
              to={page.route}
              onMouseEnter={() => setCursorState && setCursorState({ label: 'Open' })}
              onMouseLeave={() => setCursorState && setCursorState({ label: null })}
              className={`group relative p-7 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1 hover:border-[#C75D35] ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: page.color }}
                    >
                      <page.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C75D35]">
                        {page.tag}
                      </span>
                      <h4 className="text-xs font-mono font-semibold text-[#382E27]">
                        {page.subtitle}
                      </h4>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#F5F1EB] border border-[#2B231D]/15 text-[11px] font-mono font-bold text-[#2B231D] group-hover:bg-[#C75D35] group-hover:text-white transition-colors">
                    {page.highlight}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2B231D] group-hover:text-[#C75D35] transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#382E27] font-medium leading-relaxed">
                    {page.description}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-2">
                  {page.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2 text-xs font-mono text-[#382E27]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C75D35] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#2B231D]/15 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#2B231D] group-hover:text-[#C75D35] transition-colors">
                  Navigate to {page.title} →
                </span>
                <div className="w-8 h-8 rounded-full bg-[#F5F1EB] flex items-center justify-center text-[#2B231D] group-hover:bg-[#C75D35] group-hover:text-white transition-all group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
