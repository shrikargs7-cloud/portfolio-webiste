import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function PageTransitionWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="w-full will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export function NextPageBanner({ label, title, to, description, setCursorState }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-12 font-google">
      <Link
        to={to}
        onMouseEnter={() => setCursorState && setCursorState({ label: 'Next Page' })}
        onMouseLeave={() => setCursorState && setCursorState({ label: null })}
        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 hover:border-[#C75D35] shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C75D35]">
            {label || 'Continue Exploring'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#2B231D] group-hover:text-[#C75D35] transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-[#382E27] font-medium">
              {description}
            </p>
          )}
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#2B231D] text-white group-hover:bg-[#C75D35] font-mono text-xs font-bold transition-colors self-start sm:self-center shrink-0">
          <span>Next Section</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </section>
  );
}
