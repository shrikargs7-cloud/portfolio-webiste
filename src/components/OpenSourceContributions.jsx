import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  GitPullRequest, 
  GitCommit, 
  GitBranch, 
  Star, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Code2, 
  FileCode, 
  FileText, 
  Terminal, 
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';

const REPOSITORIES = [
  {
    name: 'agent-swarm-orchestrator',
    description: 'Autonomous multi-agent cloud optimization and cost-reduction engine. Global winner at the Agentic AI World Cup.',
    language: 'Python',
    langColor: '#3572A5',
    stars: 34,
    forks: 12,
    branch: 'main',
    url: 'https://github.com/shrikargs7-cloud',
    cloneCmd: 'git clone https://github.com/shrikargs7-cloud/agent-swarm-orchestrator.git'
  },
  {
    name: 'ocupulse-retinopathy-cv',
    description: 'Medical computer vision pipeline for automated diabetic retinopathy detection benchmarked on 5 clinical datasets.',
    language: 'Python / PyTorch',
    langColor: '#EE4C2C',
    stars: 28,
    forks: 8,
    branch: 'main',
    url: 'https://github.com/shrikargs7-cloud',
    cloneCmd: 'git clone https://github.com/shrikargs7-cloud/ocupulse-retinopathy-cv.git'
  },
  {
    name: 'vega-ai-copilot',
    description: 'Intelligent multi-model agent copilot for technical workflows and automated code synthesis using LangChain.',
    language: 'TypeScript / React',
    langColor: '#3178C6',
    stars: 19,
    forks: 5,
    branch: 'main',
    url: 'https://github.com/shrikargs7-cloud',
    cloneCmd: 'git clone https://github.com/shrikargs7-cloud/vega-ai-copilot.git'
  },
  {
    name: 'rvu-campus-microservices',
    description: 'High-throughput microservices backend with connection pooling, Docker containers, and Cloud Run deployment.',
    language: 'Node.js / Express',
    langColor: '#F7DF1E',
    stars: 22,
    forks: 6,
    branch: 'main',
    url: 'https://github.com/shrikargs7-cloud',
    cloneCmd: 'git clone https://github.com/shrikargs7-cloud/rvu-campus-microservices.git'
  }
];

const CODE_DIFFS = [
  {
    filename: 'agent_swarm/orchestration.py',
    summary: 'Multi-agent decision loop with dynamic tool dispatch & state rollback',
    lines: [
      { type: 'context', text: 'class SwarmCoordinator:' },
      { type: 'context', text: '    def __init__(self, agents: List[Agent], budget: float):' },
      { type: 'removed', text: '-       self.state = "SEQUENTIAL_EXECUTION"' },
      { type: 'added',   text: '+       self.state = "CONCURRENT_DAG_EXECUTION"' },
      { type: 'added',   text: '+       self.vector_memory = VectorStore.init_faiss()' },
      { type: 'context', text: '    async def dispatch_task(self, prompt: str) -> SwarmResult:' },
      { type: 'removed', text: '-       result = self.agents[0].run(prompt)' },
      { type: 'added',   text: '+       subtasks = await self.planner.decompose(prompt)' },
      { type: 'added',   text: '+       results = await asyncio.gather(*[agent.execute(t) for agent, t in zip(self.agents, subtasks)])' },
      { type: 'added',   text: '+       return self.synthesis_engine.reduce(results)' },
      { type: 'context', text: '        return result' }
    ]
  },
  {
    filename: 'cv_pipeline/vessel_segmentation.py',
    summary: 'Adaptive CLAHE contrast filter & green-channel extraction pipeline',
    lines: [
      { type: 'context', text: 'def preprocess_fundus_image(image_path: str) -> np.ndarray:' },
      { type: 'context', text: '    img = cv2.imread(image_path, cv2.IMREAD_COLOR)' },
      { type: 'removed', text: '-   gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)' },
      { type: 'added',   text: '+   green_channel = img[:, :, 1]  # Optimal retinal contrast' },
      { type: 'added',   text: '+   clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))' },
      { type: 'added',   text: '+   enhanced = clahe.apply(green_channel)' },
      { type: 'context', text: '    normalized = enhanced.astype(np.float32) / 255.0' },
      { type: 'added',   text: '+   return torch.tensor(normalized).unsqueeze(0)' }
    ]
  },
  {
    filename: 'infra/cloudrun-deploy.yml',
    summary: 'GitHub Actions zero-downtime deployment spec to GCP Cloud Run',
    lines: [
      { type: 'context', text: 'name: Production Continuous Delivery' },
      { type: 'context', text: 'on: [push]' },
      { type: 'added',   text: '+   branches: [ main ]' },
      { type: 'context', text: 'jobs:' },
      { type: 'context', text: '  deploy:' },
      { type: 'added',   text: '+   runs-on: ubuntu-latest' },
      { type: 'added',   text: '+   steps:' },
      { type: 'added',   text: '+     - uses: google-github-actions/auth@v2' },
      { type: 'added',   text: '+     - uses: google-github-actions/deploy-cloudrun@v2' }
    ]
  }
];

export default function OpenSourceContributions({ setCursorState }) {
  const [activeTab, setActiveTab] = useState('repos'); // 'repos' | 'diffs' | 'doc'
  const [selectedDiffIndex, setSelectedDiffIndex] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState(null);

  const handleCopyClone = (cmd, name) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(name);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="opensource" className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-16 overflow-hidden relative z-10 font-google">
      {/* Background Glow */}
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
              <Github className="w-3 h-3" /> Open Ecosystem
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B231D] tracking-tight leading-none">
              Open Source <span className="text-[#C75D35] italic pr-4">Contributions.</span>
            </h2>
          </motion.div>

          {/* Interactive Navigation Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#FFFFFF]/80 border-2 border-[#2B231D]/20 shadow-sm backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('repos')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'repos'
                  ? 'bg-[#C75D35] text-white shadow-xs'
                  : 'text-[#382E27] hover:text-[#2B231D] hover:bg-[#F5F1EB]'
              }`}
            >
              Repositories
            </button>
            <button
              onClick={() => setActiveTab('diffs')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'diffs'
                  ? 'bg-[#C75D35] text-white shadow-xs'
                  : 'text-[#382E27] hover:text-[#2B231D] hover:bg-[#F5F1EB]'
              }`}
            >
              Code Diffs
            </button>
            <button
              onClick={() => setActiveTab('doc')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'doc'
                  ? 'bg-[#C75D35] text-white shadow-xs'
                  : 'text-[#382E27] hover:text-[#2B231D] hover:bg-[#F5F1EB]'
              }`}
            >
              Contribution Docx
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: REPOSITORIES GRID                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'repos' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {REPOSITORIES.map((repo, idx) => (
              <div
                key={repo.name}
                className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF]/90 border-2 border-[#2B231D]/25 shadow-lg hover:border-[#C75D35] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#2B231D] font-mono group-hover:text-[#C75D35] transition-colors">
                      <Code2 className="w-5 h-5 text-[#C75D35] shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </div>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => setCursorState && setCursorState({ label: 'GitHub' })}
                      onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                      className="p-2 rounded-xl bg-[#F5F1EB] border border-[#2B231D]/20 text-[#2B231D] hover:bg-[#C75D35] hover:text-white transition-all shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-xs sm:text-sm text-[#382E27] font-normal leading-relaxed">
                    {repo.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-mono text-[#382E27]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: repo.langColor }} />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <GitBranch className="w-3.5 h-3.5 text-[#C75D35]" /> {repo.branch}
                    </span>
                  </div>
                </div>

                {/* Clone Command Bar */}
                <div className="mt-6 pt-4 border-t border-[#2B231D]/15 flex items-center justify-between gap-2 bg-[#F5F1EB] px-3.5 py-2 rounded-xl border border-[#2B231D]/15 font-mono text-xs">
                  <span className="truncate text-[#382E27] text-[11px]">{repo.cloneCmd}</span>
                  <button
                    onClick={() => handleCopyClone(repo.cloneCmd, repo.name)}
                    className="p-1.5 rounded-lg hover:bg-white text-[#382E27] hover:text-[#C75D35] transition-colors shrink-0"
                    title="Copy Git Clone Command"
                  >
                    {copiedCmd === repo.name ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: INTERACTIVE CODE DIFF VIEWER                                      */}
        {/* ========================================================================= */}
        {activeTab === 'diffs' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#1A1511] text-white border-2 border-[#2B231D]/25 shadow-2xl overflow-hidden font-mono"
          >
            {/* Diff Header & File Tabs */}
            <div className="bg-[#241D17] px-4 sm:px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {CODE_DIFFS.map((diff, dIdx) => (
                  <button
                    key={diff.filename}
                    onClick={() => setSelectedDiffIndex(dIdx)}
                    className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all ${
                      selectedDiffIndex === dIdx
                        ? 'bg-[#C75D35] text-white font-bold'
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[140px] sm:max-w-none">{diff.filename}</span>
                  </button>
                ))}
              </div>

              <div className="text-xs text-neutral-400 font-mono hidden sm:block">
                git diff origin/main
              </div>
            </div>

            {/* Commit Message Pill */}
            <div className="px-6 py-2.5 bg-white/5 border-b border-white/10 text-xs text-neutral-300 flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-[#C75D35]" />
              <span>{CODE_DIFFS[selectedDiffIndex].summary}</span>
            </div>

            {/* Code Diff Display Body */}
            <div className="p-4 sm:p-6 overflow-x-auto text-xs leading-relaxed max-h-96 overflow-y-auto">
              {CODE_DIFFS[selectedDiffIndex].lines.map((line, lIdx) => {
                let rowBg = 'hover:bg-white/5';
                let textColor = 'text-neutral-300';
                if (line.type === 'added') {
                  rowBg = 'bg-emerald-950/40 text-emerald-300';
                  textColor = 'text-emerald-300 font-semibold';
                } else if (line.type === 'removed') {
                  rowBg = 'bg-rose-950/40 text-rose-300';
                  textColor = 'text-rose-300 line-through opacity-75';
                }

                return (
                  <div key={lIdx} className={`px-2 py-0.5 rounded flex gap-4 ${rowBg} ${textColor}`}>
                    <span className="w-6 text-neutral-600 text-right select-none">{lIdx + 1}</span>
                    <pre className="font-mono">{line.text}</pre>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: GITHUB CONTRIBUTION DOCX                                          */}
        {/* ========================================================================= */}
        {activeTab === 'doc' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-[#FFFFFF]/95 border-2 border-[#2B231D]/25 p-6 sm:p-10 shadow-2xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2B231D]/15">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#C75D35] uppercase tracking-wider">// Technical Documentation Spec</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#2B231D]">
                  GitHub Contribution Docx
                </h3>
              </div>
              <a
                href="https://github.com/shrikargs7-cloud"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C75D35] text-white text-xs font-mono font-bold hover:bg-[#D09B65] transition-all shadow-md self-start sm:self-center"
              >
                <Github className="w-4 h-4" /> Open GitHub Profile <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="prose prose-stone max-w-none text-[#382E27] space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>G S Shrikar's Open-Source Portfolio:</strong> An ongoing technical commitment to releasing reusable software modules, reproducible computer vision benchmarks, and cloud automation recipes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F5F1EB] border border-[#2B231D]/20">
                  <h4 className="font-bold text-[#2B231D] text-sm mb-1">Total Pull Requests</h4>
                  <p className="text-xs text-[#382E27]">45+ Merged pull requests across microservices, AI tooling, and campus infrastructure.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F5F1EB] border border-[#2B231D]/20">
                  <h4 className="font-bold text-[#2B231D] text-sm mb-1">Code Quality &amp; Tests</h4>
                  <p className="text-xs text-[#382E27]">Automated pytest &amp; Jest test suites with strict linting and coverage gates.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F5F1EB] border border-[#2B231D]/20">
                  <h4 className="font-bold text-[#2B231D] text-sm mb-1">Licensing &amp; Docs</h4>
                  <p className="text-xs text-[#382E27]">All flagship repositories are open under MIT licenses with complete system design READMEs.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
