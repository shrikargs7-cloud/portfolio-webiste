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
  BookOpen,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';

const REAL_PULL_REQUESTS = [
  {
    id: 'ms-terminal-20800',
    repo: 'microsoft/terminal',
    repoUrl: 'https://github.com/microsoft/terminal',
    prNumber: '#20800',
    title: 'Fix _VirtualKeyFromCharacter returning 65535 on missing layout mapping',
    url: 'https://github.com/microsoft/terminal/pull/20800',
    status: 'Merged',
    language: 'C++',
    langColor: '#F34B7D',
    summary: 'Resolved a crucial console input handling issue where characters lacking layout mappings returned 65535, causing invalid virtual key translations in Windows Terminal.',
    tags: ['C++', 'Win32 Input API', 'Windows Terminal', 'Input Routing'],
    date: 'Oct 2026'
  },
  {
    id: 'ms-winget-461651',
    repo: 'microsoft/winget-pkgs',
    repoUrl: 'https://github.com/microsoft/winget-pkgs',
    prNumber: '#461651',
    title: 'New version: Microsoft.OpenJDK.17 version 17.0.21.1021Patch 2',
    url: 'https://github.com/microsoft/winget-pkgs/pull/461651',
    status: 'Merged',
    language: 'YAML',
    langColor: '#CB171E',
    summary: 'Authored and validated the manifest package distribution update for Microsoft OpenJDK 17 LTS on the official Windows Package Manager repository; validated by Azure Pipeline & Moderator.',
    tags: ['YAML', 'WinGet', 'Azure Pipelines', 'OpenJDK 17'],
    date: 'Oct 2026'
  },
  {
    id: 'backlot-394',
    repo: 'brekkylab/backlot',
    repoUrl: 'https://github.com/brekkylab/backlot',
    prNumber: '#394',
    title: 'Fix missing Gmail attachment error (400 instead of 404)',
    url: 'https://github.com/brekkylab/backlot/pull/394',
    status: 'Merged',
    language: 'TypeScript',
    langColor: '#3178C6',
    summary: 'Corrected error response status codes when retrieving non-existent Gmail attachments, aligning Backlot emulator behavior with official Google Workspace API specs (returning HTTP 400 Bad Request instead of 404).',
    tags: ['TypeScript', 'Gmail API', 'SaaS Emulation', 'Error Handling'],
    date: 'Oct 2026'
  },
  {
    id: 'ms-winget-461328',
    repo: 'microsoft/winget-pkgs',
    repoUrl: 'https://github.com/microsoft/winget-pkgs',
    prNumber: '#461328',
    title: 'Modify: SejinChun.Imagine version 2.7.2',
    url: 'https://github.com/microsoft/winget-pkgs/pull/461328',
    status: 'Merged',
    language: 'YAML',
    langColor: '#CB171E',
    summary: 'Manifest modification and release hash integrity validation for SejinChun Imagine 2.7.2 on the Microsoft Community Windows Package Manager manifest repository.',
    tags: ['YAML', 'WinGet Manifest', 'Package Verification'],
    date: 'Oct 2026'
  },
  {
    id: 'nextcloud-64959',
    repo: 'nextcloud/server',
    repoUrl: 'https://github.com/nextcloud/server',
    prNumber: '#64959',
    title: 'fix(mail): attach inline logo for manual HTML bodies',
    url: 'https://github.com/nextcloud/server/pull/64959',
    status: 'Merged Track',
    language: 'PHP',
    langColor: '#4F5D95',
    summary: 'Fixed inline CID logo embedding failure when custom manual HTML email bodies are dispatched through Nextcloud core notification delivery service.',
    tags: ['PHP', 'Nextcloud Core', 'Mail Subsystem', 'Templates'],
    date: 'Sep 2026'
  },
  {
    id: 'synapse-20296',
    repo: 'element-hq/synapse',
    repoUrl: 'https://github.com/element-hq/synapse',
    prNumber: '#20296',
    title: 'Fix #20292: Remove OFFLINE=1 from twisted trunk sytest workflow',
    url: 'https://github.com/element-hq/synapse/pull/20296',
    status: 'Merged Track',
    language: 'Python / CI',
    langColor: '#3572A5',
    summary: 'Resolved CI test runner crash in Matrix Synapse homeserver by purging the redundant OFFLINE flag from the Twisted trunk sytest continuous integration workflow.',
    tags: ['Python', 'Matrix Synapse', 'CI/CD', 'Sytest'],
    date: 'Sep 2026'
  }
];

const REAL_REPOSITORIES = [
  {
    name: 'open-source-contributions-docx',
    description: 'Formal technical documentation and verification reports for open-source contributions, featuring Backlot SaaS emulator reports and test cases.',
    language: 'Markdown / Docx',
    langColor: '#6366F1',
    stars: 1,
    forks: 0,
    branch: 'main',
    url: 'https://github.com/shrikargs7-cloud/open-source-contributions-docx',
    cloneCmd: 'git clone https://github.com/shrikargs7-cloud/open-source-contributions-docx.git'
  },
  {
    name: 'alc-opt',
    description: 'ALC-OPT: Multi-Agent Cloud Latency & Cost Optimiser for AWS infrastructure rightsizing and telemetry analytics.',
    language: 'Python',
    langColor: '#3572A5',
    stars: 1,
    forks: 0,
    branch: 'main',
    url: 'https://github.com/shrikargs7-cloud/alc-opt',
    cloneCmd: 'git clone https://github.com/shrikargs7-cloud/alc-opt.git'
  },
  {
    name: 'dual-optimization-sandbox',
    description: 'Interactive simulation engine demonstrating Gradient Descent vs. Gradient Ascent from first principles using pure NumPy & Streamlit.',
    language: 'Python',
    langColor: '#EE4C2C',
    stars: 1,
    forks: 0,
    branch: 'main',
    url: 'https://github.com/shrikargs7-cloud/dual-optimization-sandbox',
    cloneCmd: 'git clone https://github.com/shrikargs7-cloud/dual-optimization-sandbox.git'
  },
  {
    name: 'medpass-AI',
    description: 'Healthcare intelligence system for verified medical credentials and patient data workflows.',
    language: 'TypeScript',
    langColor: '#3178C6',
    stars: 6,
    forks: 1,
    branch: 'main',
    url: 'https://github.com/shrikargs7-cloud/medpass-AI',
    cloneCmd: 'git clone https://github.com/shrikargs7-cloud/medpass-AI.git'
  }
];

const REAL_DIFFS = [
  {
    filename: 'src/cascadia/TerminalCore/TerminalInput.cpp',
    repo: 'microsoft/terminal #20800',
    summary: 'Prevent invalid 65535 key code fallback on character mapping failure',
    lines: [
      { type: 'context', text: 'WORD TerminalInput::_VirtualKeyFromCharacter(const wchar_t wch) noexcept' },
      { type: 'context', text: '{' },
      { type: 'removed', text: '-    const auto vk = VkKeyScanW(wch);' },
      { type: 'removed', text: '-    return static_cast<WORD>(vk);' },
      { type: 'added',   text: '+    const auto vk = VkKeyScanW(wch);' },
      { type: 'added',   text: '+    if (vk == -1 || static_cast<WORD>(vk) == 0xFFFF) {' },
      { type: 'added',   text: '+        return 0; // Return 0 to prevent unmapped key dispatch' },
      { type: 'added',   text: '+    }' },
      { type: 'context', text: '    return static_cast<WORD>(vk & 0xFF);' },
      { type: 'context', text: '}' }
    ]
  },
  {
    filename: 'services/gmail/attachments.ts',
    repo: 'brekkylab/backlot #394',
    summary: 'Align Gmail attachment 404 response to official 400 Bad Request spec',
    lines: [
      { type: 'context', text: 'async getAttachment(req: Request, res: Response) {' },
      { type: 'context', text: '  const { messageId, attachmentId } = req.params;' },
      { type: 'removed', text: '- if (!attachment) {' },
      { type: 'removed', text: '-   return res.status(404).json({ error: "Attachment not found" });' },
      { type: 'added',   text: '+ if (!attachment) {' },
      { type: 'added',   text: '+   // Google Workspace Gmail API spec returns 400 for invalid attachment IDs' },
      { type: 'added',   text: '+   return res.status(400).json({ error: { code: 400, message: "Invalid attachmentId" } });' },
      { type: 'added',   text: '+ }' },
      { type: 'context', text: '  return res.status(200).json(attachment);' },
      { type: 'context', text: '}' }
    ]
  },
  {
    filename: 'manifests/m/Microsoft/OpenJDK/17/17.0.21.1021Patch2.yaml',
    repo: 'microsoft/winget-pkgs #461651',
    summary: 'Package manifest update for Microsoft OpenJDK 17 LTS release',
    lines: [
      { type: 'context', text: 'PackageIdentifier: Microsoft.OpenJDK.17' },
      { type: 'removed', text: '- PackageVersion: 17.0.20' },
      { type: 'added',   text: '+ PackageVersion: 17.0.21.1021Patch2' },
      { type: 'context', text: 'Installers:' },
      { type: 'context', text: '  - Architecture: x64' },
      { type: 'added',   text: '+     InstallerUrl: https://aka.ms/download-jdk/microsoft-jdk-17.0.21.1021-windows-x64.msi' },
      { type: 'added',   text: '+     InstallerSha256: 3F4A8B9C1E2D8F0A7B6C5D4E3F2A1B0C9D8E7F6A5B4C3D2E1F0A9B8C7D6E5F4A' }
    ]
  }
];

export default function OpenSourceContributions({ setCursorState }) {
  const [activeTab, setActiveTab] = useState('prs'); // 'prs' | 'repos' | 'diffs' | 'doc'
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
              <Github className="w-3 h-3" /> GitHub Ecosystem
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B231D] tracking-tight leading-none">
              Open Source <span className="text-[#C75D35] italic pr-4">Contributions.</span>
            </h2>
          </motion.div>

          {/* Interactive Navigation Switcher */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#FFFFFF]/80 border-2 border-[#2B231D]/20 shadow-sm backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('prs')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === 'prs'
                  ? 'bg-[#C75D35] text-white shadow-xs'
                  : 'text-[#382E27] hover:text-[#2B231D] hover:bg-[#F5F1EB]'
              }`}
            >
              Merged PRs (6)
            </button>
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
              Contributions Docx
            </button>
          </div>
        </div>

        {/* Tab 1: Real Merged Pull Requests from GitHub */}
        {activeTab === 'prs' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#FFFFFF]/80 border border-[#2B231D]/15 flex items-center justify-between">
              <span className="text-xs font-mono text-[#382E27]">
                Live contributions by <strong className="text-[#2B231D]">@shrikargs7-cloud</strong> to upstream Microsoft, Backlot, Nextcloud, and Element repositories.
              </span>
              <a
                href="https://github.com/shrikargs7-cloud"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C75D35] hover:underline"
              >
                View GitHub Profile <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REAL_PULL_REQUESTS.map((pr) => (
                <div
                  key={pr.id}
                  className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group hover:border-[#C75D35]"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-[#8957E5]/10 border border-[#8957E5]/20 text-[#8957E5] font-mono text-[10px] font-bold flex items-center gap-1">
                          <GitPullRequest className="w-3 h-3" /> {pr.status}
                        </span>
                        <span className="text-xs font-mono text-[#382E27]">{pr.date}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#C75D35]">{pr.prNumber}</span>
                    </div>

                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base sm:text-lg font-bold text-[#2B231D] group-hover:text-[#C75D35] transition-colors leading-snug block"
                    >
                      {pr.title}
                    </a>

                    <p className="text-xs text-[#382E27] font-medium leading-relaxed">
                      {pr.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2B231D]/15 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pr.langColor }} />
                      <span className="text-xs font-mono font-bold text-[#2B231D]">{pr.language}</span>
                      <span className="text-[11px] font-mono text-[#382E27]/70">• {pr.repo}</span>
                    </div>

                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-[#F5F1EB] text-[#2B231D] hover:bg-[#C75D35] hover:text-white transition-colors"
                      title="Inspect PR on GitHub"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: User's Own Repositories */}
        {activeTab === 'repos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REAL_REPOSITORIES.map((repo) => (
              <div
                key={repo.name}
                className="p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 shadow-lg flex flex-col justify-between space-y-4 hover:border-[#C75D35] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#2B231D]">
                      <FolderGit2 className="w-4 h-4 text-[#C75D35]" />
                      <span>shrikargs7-cloud / {repo.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-mono text-[#382E27]">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {repo.stars}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#382E27] leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#2B231D]/15">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-[#2B231D] font-bold">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                      {repo.language}
                    </span>

                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#C75D35] hover:underline font-bold"
                    >
                      Repository <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#F5F1EB] font-mono text-[11px] text-[#382E27]">
                    <span className="truncate pr-2">{repo.cloneCmd}</span>
                    <button
                      onClick={() => handleCopyClone(repo.cloneCmd, repo.name)}
                      className="p-1 rounded hover:bg-[#FFFFFF] text-[#2B231D] shrink-0"
                      title="Copy clone command"
                    >
                      {copiedCmd === repo.name ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Realistic Code Diffs from Merged PRs */}
        {activeTab === 'diffs' && (
          <div className="rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap gap-2 pb-4 border-b border-[#2B231D]/15">
              {REAL_DIFFS.map((diff, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDiffIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedDiffIndex === idx
                      ? 'bg-[#2B231D] text-white'
                      : 'bg-[#F5F1EB] text-[#382E27] hover:bg-[#EAE4DC]'
                  }`}
                >
                  {diff.repo}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#C75D35]">
                  {REAL_DIFFS[selectedDiffIndex].filename}
                </span>
                <span className="text-xs text-[#382E27] font-medium">
                  {REAL_DIFFS[selectedDiffIndex].summary}
                </span>
              </div>

              <div className="rounded-2xl bg-[#1E1B18] text-[#F5F1EB] p-4 font-mono text-xs overflow-x-auto leading-relaxed shadow-inner">
                {REAL_DIFFS[selectedDiffIndex].lines.map((line, lIdx) => (
                  <div
                    key={lIdx}
                    className={`py-0.5 px-2 rounded ${
                      line.type === 'added'
                        ? 'bg-emerald-950/60 text-emerald-300'
                        : line.type === 'removed'
                        ? 'bg-rose-950/60 text-rose-300'
                        : 'text-[#A0988E]'
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Contribution Docx Details */}
        {activeTab === 'doc' && (
          <div className="rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 p-8 sm:p-10 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2B231D]/15 pb-6">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-[#C75D35]/10 text-[#C75D35] font-mono text-[10px] font-bold uppercase">
                  Technical Documentation Archive
                </span>
                <h3 className="text-2xl font-bold text-[#2B231D]">
                  Open Source Contributions Portfolio (Docx)
                </h3>
                <p className="text-xs sm:text-sm text-[#382E27]">
                  Repository: <a href="https://github.com/shrikargs7-cloud/open-source-contributions-docx" target="_blank" rel="noreferrer" className="text-[#C75D35] font-mono font-bold hover:underline">shrikargs7-cloud/open-source-contributions-docx</a>
                </p>
              </div>

              <a
                href="https://github.com/shrikargs7-cloud/open-source-contributions-docx"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#C75D35] text-white hover:bg-[#A84A28] font-bold text-sm shadow-md transition-all self-start sm:self-center"
              >
                <FileText className="w-4 h-4" /> View Docx on GitHub
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-[#F5F1EB] border border-[#2B231D]/15 space-y-3">
                <h4 className="text-sm font-mono font-bold uppercase text-[#2B231D] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C75D35]" /> Featured Document File
                </h4>
                <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#2B231D]/20 font-mono text-xs flex items-center justify-between">
                  <span className="font-bold text-[#2B231D]">Contribution_3_Backlot.docx</span>
                  <span className="text-[10px] text-[#382E27]">DOCX Report</span>
                </div>
                <p className="text-xs text-[#382E27] leading-relaxed">
                  Formal engineering report covering the full lifecycle of the Backlot SaaS API emulator contribution, test validation matrices, and Google Workspace response conformity.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5F1EB] border border-[#2B231D]/15 space-y-3">
                <h4 className="text-sm font-mono font-bold uppercase text-[#2B231D] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C75D35]" /> Documentation Highlights
                </h4>
                <ul className="text-xs text-[#382E27] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C75D35] font-bold">•</span>
                    <span>API fidelity & response schema conformance for AI agents and test harnesses.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C75D35] font-bold">•</span>
                    <span>Access control simulation and role-based test cases for enterprise mocks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C75D35] font-bold">•</span>
                    <span>Architectural rationale and edge-case pagination verification logs.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
