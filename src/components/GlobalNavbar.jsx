import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Github, 
  Cpu, 
  Trophy, 
  Layers, 
  Menu, 
  X,
  Mail,
  ExternalLink
} from 'lucide-react';

export default function GlobalNavbar({ setCursorState }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Experience', path: '/experience', icon: Briefcase },
    { name: 'Open Source', path: '/opensource', icon: Github },
    { name: 'Skills', path: '/skills', icon: Cpu },
    { name: 'Hackathons', path: '/hackathons', icon: Trophy },
    { name: 'Projects', path: '/projects', icon: Layers },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-3 sm:pt-4 transition-all duration-300">
      <div 
        className={`flex w-full max-w-6xl items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300 backdrop-blur-xl border-2 ${
          scrolled 
            ? 'shadow-xl bg-[#FFFFFF]/95 border-[#2B231D]/25' 
            : 'bg-[#FFFFFF]/85 border-[#2B231D]/20 shadow-md'
        }`}
      >
        {/* Brand Logo */}
        <Link 
          to="/"
          className="group flex items-center gap-2.5"
          onMouseEnter={() => setCursorState && setCursorState({ label: 'Home' })}
          onMouseLeave={() => setCursorState && setCursorState({ label: null })}
        >
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-[#C75D35] text-white flex items-center justify-center font-bold font-mono text-xs shadow-md">
              SG
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
          </div>
          <span className="font-google text-base font-bold tracking-tight text-[#2B231D] group-hover:text-[#C75D35] transition-colors">
            Shrikar G S<span className="text-[#C75D35]">.</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 font-google text-xs font-semibold text-[#382E27]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onMouseEnter={() => setCursorState && setCursorState({ label: item.name })}
                onMouseLeave={() => setCursorState && setCursorState({ label: null })}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#2B231D] text-white shadow-xs'
                    : 'hover:bg-[#F5F1EB] hover:text-[#2B231D]'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Pill */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="https://github.com/shrikargs7-cloud"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-full bg-[#F5F1EB] border border-[#2B231D]/15 hover:border-[#C75D35] text-[#2B231D] hover:text-[#C75D35] transition-all hover:scale-105"
            onMouseEnter={() => setCursorState && setCursorState({ label: 'GitHub' })}
            onMouseLeave={() => setCursorState && setCursorState({ label: null })}
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="mailto:shrikar.gs.design@gmail.com"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C75D35] text-white text-xs font-bold font-mono hover:bg-[#A84A28] transition-colors shadow-xs"
            onMouseEnter={() => setCursorState && setCursorState({ label: 'Contact' })}
            onMouseLeave={() => setCursorState && setCursorState({ label: null })}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </a>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#2B231D] hover:bg-[#F5F1EB]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 bg-[#FFFFFF]/98 backdrop-blur-2xl border-2 border-[#2B231D]/25 rounded-3xl p-5 shadow-2xl space-y-3 font-google">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl flex items-center gap-3 text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#2B231D] text-white'
                      : 'hover:bg-[#F5F1EB] text-[#2B231D]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#2B231D]/15 flex items-center justify-between">
            <a
              href="https://github.com/shrikargs7-cloud"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-mono font-bold text-[#2B231D]"
            >
              <Github className="w-4 h-4 text-[#C75D35]" />
              <span>@shrikargs7-cloud</span>
            </a>

            <a
              href="mailto:shrikar.gs.design@gmail.com"
              className="px-3.5 py-1.5 rounded-xl bg-[#C75D35] text-white text-xs font-bold"
            >
              Email Shrikar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
