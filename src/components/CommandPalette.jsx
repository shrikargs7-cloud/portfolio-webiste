import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  Briefcase,
  Github,
  Cpu,
  Trophy,
  Layers,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Command,
  CornerDownLeft,
  X
} from 'lucide-react';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const actions = [
    { id: 'home', label: 'Go to Home', category: 'Navigation', icon: Home, shortcut: 'G H', action: () => navigate('/') },
    { id: 'experience', label: 'Go to Experience & Internships', category: 'Navigation', icon: Briefcase, shortcut: 'G E', action: () => navigate('/experience') },
    { id: 'opensource', label: 'Go to Open Source Contributions (6 PRs)', category: 'Navigation', icon: Github, shortcut: 'G O', action: () => navigate('/opensource') },
    { id: 'skills', label: 'Go to Skills & Architecture Bento', category: 'Navigation', icon: Cpu, shortcut: 'G S', action: () => navigate('/skills') },
    { id: 'hackathons', label: 'Go to Hackathons & Sprints', category: 'Navigation', icon: Trophy, shortcut: 'G K', action: () => navigate('/hackathons') },
    { id: 'projects', label: 'Go to Crafted Projects & Labs', category: 'Navigation', icon: Layers, shortcut: 'G P', action: () => navigate('/projects') },
    {
      id: 'copy-email',
      label: copiedEmail ? 'Copied: shrikar.gs.design@gmail.com' : 'Copy Email Address',
      category: 'Quick Actions',
      icon: copiedEmail ? Check : Copy,
      shortcut: 'C E',
      action: () => {
        navigator.clipboard.writeText('shrikar.gs.design@gmail.com');
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 1800);
      }
    },
    {
      id: 'open-github',
      label: 'Open GitHub Profile (@shrikargs7-cloud)',
      category: 'External',
      icon: ExternalLink,
      shortcut: '↗',
      action: () => window.open('https://github.com/shrikargs7-cloud', '_blank', 'noreferrer')
    },
    {
      id: 'send-email',
      label: 'Compose Email to Shrikar',
      category: 'External',
      icon: Mail,
      shortcut: '↗',
      action: () => {
        window.location.href = 'mailto:shrikar.gs.design@gmail.com';
      }
    }
  ];

  const filtered = actions.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
        if (filtered[selectedIndex].id !== 'copy-email') {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-[#2B231D]/45 backdrop-blur-sm flex items-start justify-center pt-[14vh] px-4 font-google"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 shadow-2xl overflow-hidden"
          >
            {/* Search Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2B231D]/15 bg-[#F5F1EB]/50">
              <Search className="w-4 h-4 text-[#C75D35] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search pages (e.g. Open Source, Skills)..."
                className="w-full bg-transparent text-sm text-[#2B231D] placeholder:text-[#382E27]/50 focus:outline-none font-medium"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-[#2B231D]/10 text-[#382E27]"
                aria-label="Close Command Palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-10 text-center text-xs font-mono text-[#382E27]/70">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const active = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => {
                        item.action();
                        if (item.id !== 'copy-email') onClose();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-colors ${
                        active ? 'bg-[#2B231D] text-white' : 'text-[#2B231D] hover:bg-[#F5F1EB]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${active ? 'text-[#C75D35]' : 'text-[#382E27]'}`} />
                        <div>
                          <div className="text-sm font-semibold">{item.label}</div>
                          <div className={`text-[10px] font-mono uppercase ${active ? 'text-white/70' : 'text-[#382E27]/60'}`}>
                            {item.category}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                          active
                            ? 'bg-white/10 border-white/20 text-white'
                            : 'bg-[#F5F1EB] border-[#2B231D]/15 text-[#382E27]'
                        }`}
                      >
                        {item.shortcut}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-5 py-2.5 border-t border-[#2B231D]/15 bg-[#F5F1EB]/60 flex items-center justify-between text-[11px] font-mono text-[#382E27]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="w-3 h-3 text-[#C75D35]" /> Select
                </span>
                <span>↑↓ Navigate</span>
                <span>ESC Close</span>
              </div>
              <span className="flex items-center gap-1 text-[#C75D35] font-bold">
                <Command className="w-3 h-3" /> Quick Jump
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
