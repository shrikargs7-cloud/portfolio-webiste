import { motion } from "framer-motion";
import React, { useState } from 'react';
import { CornerDownLeft } from 'lucide-react';

export default function InteractiveTerminal({ setCursorState }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Shrikar G S Portfolio Shell v2.6.0' },
    { type: 'output', text: 'Type "help" to list available commands.' }
  ]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', text: cmd }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands: about, skills, projects, experience, resume, github, leetcode, contact, whoami, clear' });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', text: 'visitor@portfolio (Distinguished Engineer / Recruiter reviewing G S Shrikar\'s technical portfolio)' });
        break;
      case 'sudo':
        newHistory.push({ type: 'output', text: 'Access granted: Welcome to root. Ready to build world-class systems together.' });
        break;
      case 'resume':
        newHistory.push({ type: 'output', text: 'Resume: Available for download in Hero / Contact section, or email directly at shrikar.gs.design@gmail.com' });
        break;
      case 'experience':
        newHistory.push({ type: 'output', text: '1. Academic Foundation: RV University (B.Tech CS, 2023-Present) | 2. Cloud Architecture: GCP Systems (2024-2025) | 3. Agentic AI Innovation: World Cup Winner (2025) | 4. Computer Vision: OcuPulse (2025-2026)' });
        break;
      case 'about':
        newHistory.push({ type: 'output', text: 'G S Shrikar · Full-Stack Developer • AI/ML Engineer • Agentic AI Developer based in India.' });
        newHistory.push({ type: 'output', text: 'Building intelligent, scalable, and practical systems from model development to full-stack cloud deployment.' });
        break;
      case 'skills':
        newHistory.push({ type: 'output', text: 'Languages: Python, C, C++, JavaScript, SQL, Bash | AI/ML: PyTorch, OpenCV, RAG, LoRA, Agentic AI | Cloud & Web: GCP, Docker, Node.js, React' });
        break;
      case 'projects':
        newHistory.push({ type: 'output', text: '1. OcuPulse (Medical Vision)  2. Agent Swarm (World Cup Winner)  3. Vega AI  4. Prior Auth Bot  5. AI Visual Matching  6. ContextLens  7. Hermes ESP32' });
        break;
      case 'github':
        newHistory.push({ type: 'output', text: (
          <span>
            GitHub: <a href="https://github.com/shrikargs7-cloud" target="_blank" rel="noreferrer" className="text-[#C75D35] hover:underline">https://github.com/shrikargs7-cloud</a> — 14 public repositories across Agentic AI, Medical Vision, RAG & Full-Stack.
          </span>
        ) });
        break;
      case 'leetcode':
        newHistory.push({ type: 'output', text: 'LeetCode: 250+ Problems solved across Data Structures & Algorithms, dynamic programming, and graphs.' });
        break;
      case 'contact':
        newHistory.push({ type: 'output', text: 'Email: shrikar.gs.design@gmail.com | Location: India | Open for Full-Stack & AI/ML Engineering Roles' });
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        newHistory.push({ type: 'output', text: `Command not recognized: "${cmd}". Type "help" for valid commands.` });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <section id="vibe-terminal" className="w-full py-8 md:py-12 px-4 sm:px-8 md:px-12 bg-transparent font-mono text-xs relative">
      <div className="max-w-5xl mx-auto space-y-6 w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2"
        >
          <span className="text-[#C75D35] tracking-widest text-xs">// CLI Interface</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2B231D] font-google">visitor@portfolio Terminal</h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0 }}
          className="rounded-3xl border border-[#2B231D]/5 bg-[#FFFFFF]/40 shadow-2xl overflow-hidden backdrop-blur-xl hover:border-[#D09B65]/40 transition-colors"
        >
          <div className="bg-[#FFFFFF]/70 px-6 py-3.5 border-b border-[#2B231D]/5 flex items-center justify-between text-[#73675E]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-[#73675E] font-mono text-[11px]">gsshrikar@system:~</span>
            </div>
            <span className="text-[11px] text-[#515154] font-mono">bash --v2.6</span>
          </div>

          <div className="p-6 md:p-8 space-y-3 max-h-80 overflow-y-auto">
            {history.map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={h.type === 'input' ? 'text-[#C75D35] font-medium' : 'text-[#73675E] font-light flex items-center gap-2 flex-wrap'}
              >
                {h.type === 'input' ? `visitor@portfolio:~$ ${h.text}` : h.text}
              </motion.div>
            ))}

            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 ">
              <span className="text-[#C75D35]">visitor@portfolio:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'about', 'projects', 'skills'..."
                className="flex-1 bg-transparent text-[#2B231D] focus:outline-none placeholder:text-slate-600"
                autoFocus
                spellCheck="false"
              />
              <button type="submit" className="text-[#515154] hover:text-[#C75D35] transition-colors">
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}