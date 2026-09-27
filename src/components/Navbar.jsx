import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Mail, Code } from 'lucide-react';

export default function Navbar({ setCursorState, onNavigate, activeSectionId }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Spread', href: '#stack-spread' },
    { name: 'Skills', href: '#skills' },
    { name: 'Playground', href: '#playground' },
    { name: 'Terminal', href: '#vibe-terminal' },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4 transition-all duration-300">
      <div className={`flex w-full max-w-[1300px] items-center justify-between rounded-full px-5 py-3 transition-all duration-500 glass-pill ${scrolled ? 'shadow-2xl bg-[#FFFFFF]/90 border-[#2B231D]/5' : 'bg-[#FFFFFF]/50 border-[#2B231D]/5'}`}>
        
        {/* Brand / Logo */}
        <a 
          href="#top" 
          onClick={(e) => handleClick(e, '#top')}
          className="group flex items-center gap-3"
          onMouseEnter={() => setCursorState && setCursorState({ label: 'Home' })}
          onMouseLeave={() => setCursorState && setCursorState({ label: null })}
        >
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-[#C75D35] text-slate-950 flex items-center justify-center font-bold font-mono text-sm shadow-md">
              SG
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 animate-pulse ring-2 ring-slate-950" />
          </div>
          <span className="font-google text-lg font-bold tracking-wide text-[#2B231D] group-hover:text-[#C75D35] transition-colors">
            Shrikar G S<span className="text-[#C75D35]">.</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-google text-sm font-medium text-[#73675E]">
          {navLinks.map((link) => {
            const isActive = activeSectionId === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative py-1 transition-colors hover:text-[#2B231D] group ${isActive ? 'text-[#C75D35] font-semibold' : ''}`}
                onMouseEnter={() => setCursorState && setCursorState({ label: 'Navigate' })}
                onMouseLeave={() => setCursorState && setCursorState({ label: null })}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#C75D35] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            );
          })}
        </nav>

        {/* Right Status Pill */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#2B231D]/5 rounded-full px-3.5 py-1 text-xs font-mono text-[#73675E]">
            <span className="h-2 w-2 rounded-full bg-[#C75D35] animate-ping" />
            <span>RV University '27</span>
          </div>

          <a
            href="mailto:shrikar.gs.design@gmail.com"
            aria-label="Email"
            className="p-2 rounded-full bg-[#FFFFFF] border border-[#2B231D]/5 hover:border-[#D09B65] text-[#73675E] hover:text-[#C75D35] transition-all duration-300 hover:scale-110"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-full bg-[#FFFFFF] border border-[#2B231D]/5 text-[#2B231D] md:hidden hover:bg-[#F5F1EB]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-transparent/95 backdrop-blur-2xl border border-[#2B231D]/5 rounded-3xl p-6 md:hidden shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-3 font-google text-lg font-medium text-[#2B231D]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="py-2.5 px-3 rounded-xl hover:bg-[#FFFFFF] hover:text-[#C75D35] transition-colors flex items-center justify-between"
              >
                {link.name}
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-[#2B231D]/5 flex items-center justify-between">
            <span className="text-xs font-mono text-[#73675E]">Full-Stack &amp; AI/ML Engineer</span>
            <a 
              href="mailto:shrikar.gs.design@gmail.com"
              className="px-4 py-2 bg-[#C75D35] text-slate-950 rounded-full font-bold text-xs font-mono"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}