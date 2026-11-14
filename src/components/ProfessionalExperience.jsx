import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Plus, 
  Sparkles, 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Trash2, 
  Edit3,
  ExternalLink,
  Code2,
  FileCheck
} from 'lucide-react';

export default function ProfessionalExperience({ setCursorState }) {
  // Empty array as requested: user will add their internship details
  const [internships, setInternships] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form state for adding an internship
  const [newRole, setNewRole] = useState({
    company: '',
    role: '',
    period: '',
    location: 'Bengaluru, India / Remote',
    type: 'Software Engineering / AI Systems',
    summary: '',
    responsibilities: '',
    techStack: '',
  });

  const handleAddInternship = (e) => {
    e.preventDefault();
    if (!newRole.company || !newRole.role) return;

    const respArray = newRole.responsibilities
      ? newRole.responsibilities.split('\n').filter(r => r.trim().length > 0)
      : ['Contributed to core architecture, distributed system optimization, and API performance.'];

    const techArray = newRole.techStack
      ? newRole.techStack.split(',').map(t => t.trim()).filter(Boolean)
      : ['Python', 'Cloud', 'Distributed Systems'];

    const newEntry = {
      id: Date.now().toString(),
      company: newRole.company,
      role: newRole.role,
      period: newRole.period || '2025 — Present',
      location: newRole.location,
      type: newRole.type,
      summary: newRole.summary || 'Engineered production systems with focus on scalability, cloud infrastructure, and low latency.',
      responsibilities: respArray,
      techStack: techArray
    };

    setInternships([...internships, newEntry]);
    setNewRole({
      company: '',
      role: '',
      period: '',
      location: 'Bengaluru, India / Remote',
      type: 'Software Engineering / AI Systems',
      summary: '',
      responsibilities: '',
      techStack: '',
    });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setInternships(internships.filter(item => item.id !== id));
  };

  return (
    <section id="experience-pro" className="w-full py-16 md:py-24 px-4 sm:px-8 md:px-16 overflow-hidden relative z-10 font-google">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C75D35]/2 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
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
              <Briefcase className="w-3 h-3" /> Career Experience
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B231D] tracking-tight leading-none">
              Professional & <span className="text-[#C75D35] italic">Internships.</span>
            </h2>
          </motion.div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdding(!isAdding)}
              onMouseEnter={() => setCursorState && setCursorState({ label: 'Add Entry' })}
              onMouseLeave={() => setCursorState && setCursorState({ label: null })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#C75D35] text-white hover:bg-[#A84A28] font-bold text-sm shadow-md transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              {isAdding ? 'Close Form' : 'Add Internship Experience'}
            </button>
          </div>
        </div>

        {/* Form Modal / Inline Editor */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleAddInternship} className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#2B231D]/15 pb-4">
                  <h3 className="text-xl font-bold text-[#2B231D] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C75D35]" />
                    Add Internship Details
                  </h3>
                  <span className="text-xs font-mono text-[#382E27]">Ready for your input</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#2B231D] mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Google Cloud, Microsoft, Startup Lab"
                      value={newRole.company}
                      onChange={(e) => setNewRole({ ...newRole, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F1EB] border-2 border-[#2B231D]/20 text-[#2B231D] placeholder:text-[#382E27]/50 focus:border-[#C75D35] focus:outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#2B231D] mb-1">Role / Designation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Software Engineering Intern, AI Systems Intern"
                      value={newRole.role}
                      onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F1EB] border-2 border-[#2B231D]/20 text-[#2B231D] placeholder:text-[#382E27]/50 focus:border-[#C75D35] focus:outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#2B231D] mb-1">Duration / Period</label>
                    <input
                      type="text"
                      placeholder="e.g. Jun 2025 — Aug 2025"
                      value={newRole.period}
                      onChange={(e) => setNewRole({ ...newRole, period: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F1EB] border-2 border-[#2B231D]/20 text-[#2B231D] placeholder:text-[#382E27]/50 focus:border-[#C75D35] focus:outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-[#2B231D] mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, India / Remote"
                      value={newRole.location}
                      onChange={(e) => setNewRole({ ...newRole, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5F1EB] border-2 border-[#2B231D]/20 text-[#2B231D] placeholder:text-[#382E27]/50 focus:border-[#C75D35] focus:outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#2B231D] mb-1">Overview / Summary</label>
                  <textarea
                    rows={2}
                    placeholder="Brief summary of your internship mandate and team..."
                    value={newRole.summary}
                    onChange={(e) => setNewRole({ ...newRole, summary: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[#F5F1EB] border-2 border-[#2B231D]/20 text-[#2B231D] placeholder:text-[#382E27]/50 focus:border-[#C75D35] focus:outline-none text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#2B231D] mb-1">Key Responsibilities / Deliverables (One per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Built high-throughput backend APIs&#10;Integrated distributed cache with Redis&#10;Reduced cloud compute costs by 25%"
                    value={newRole.responsibilities}
                    onChange={(e) => setNewRole({ ...newRole, responsibilities: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[#F5F1EB] border-2 border-[#2B231D]/20 text-[#2B231D] placeholder:text-[#382E27]/50 focus:border-[#C75D35] focus:outline-none text-sm font-medium font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-[#2B231D] mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Python, FastAPI, Docker, AWS, React"
                    value={newRole.techStack}
                    onChange={(e) => setNewRole({ ...newRole, techStack: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F5F1EB] border-2 border-[#2B231D]/20 text-[#2B231D] placeholder:text-[#382E27]/50 focus:border-[#C75D35] focus:outline-none text-sm font-medium"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-5 py-2.5 rounded-xl border-2 border-[#2B231D]/25 font-bold text-sm text-[#382E27] hover:bg-[#F5F1EB]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C75D35] text-white font-bold text-sm hover:bg-[#A84A28] shadow-md"
                  >
                    Save Internship
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State vs Added Internships */}
        {internships.length === 0 ? (
          <div className="p-10 sm:p-14 rounded-3xl bg-[#FFFFFF]/90 border-2 border-dashed border-[#2B231D]/30 shadow-md backdrop-blur-xl text-center flex flex-col items-center justify-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[#C75D35]/10 border-2 border-[#C75D35]/30 flex items-center justify-center text-[#C75D35]">
              <Briefcase className="w-8 h-8" />
            </div>

            <div className="max-w-xl space-y-2">
              <h3 className="text-2xl font-bold text-[#2B231D]">
                Internship Experience Section Ready
              </h3>
              <p className="text-sm sm:text-base text-[#382E27] font-medium leading-relaxed">
                This space is reserved for your internship details. Click the button above to add your company, role, responsibilities, and technologies whenever you're ready!
              </p>
            </div>

            {/* Template Preview Card */}
            <div className="w-full max-w-2xl text-left p-6 rounded-2xl bg-[#F5F1EB] border-2 border-[#2B231D]/20 mt-4 space-y-4">
              <div className="flex items-center justify-between border-b border-[#2B231D]/15 pb-3">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase text-[#C75D35]">Example Template</span>
                  <h4 className="text-lg font-bold text-[#2B231D]">Software Engineering Intern</h4>
                  <p className="text-xs text-[#382E27] font-medium">Your Company / Organization • Bengaluru / Remote</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#2B231D]/20 text-xs font-mono font-bold text-[#2B231D]">
                  Upcoming
                </span>
              </div>
              <p className="text-xs text-[#382E27]">
                Your overview will appear here. Detail the microservices, systems, or machine learning pipelines you architected during your tenure.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Python', 'Go', 'Docker', 'GCP', 'PostgreSQL'].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] border border-[#2B231D]/15 text-[10px] font-mono font-semibold text-[#2B231D]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 px-6 py-3 rounded-2xl bg-[#2B231D] text-white hover:bg-[#C75D35] font-bold text-sm transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Internship Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {internships.map((internship) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#2B231D]/25 shadow-xl space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2B231D]/15 pb-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C75D35] uppercase">
                      <span>{internship.type}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#382E27]"><MapPin className="w-3 h-3" /> {internship.location}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2B231D]">{internship.role}</h3>
                    <p className="text-sm font-semibold text-[#382E27] flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#C75D35]" /> {internship.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#F5F1EB] border border-[#2B231D]/20 text-xs font-mono font-bold text-[#2B231D]">
                      {internship.period}
                    </span>
                    <button
                      onClick={() => handleDelete(internship.id)}
                      className="p-2 rounded-xl text-red-500 hover:bg-red-50 border border-red-200 transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-[#382E27] leading-relaxed">
                  {internship.summary}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#2B231D] font-bold">Key Deliverables</h4>
                  <ul className="space-y-1.5">
                    {internship.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#382E27]">
                        <CheckCircle2 className="w-4 h-4 text-[#C75D35] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {internship.techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl bg-[#F5F1EB] border border-[#2B231D]/20 text-xs font-mono font-semibold text-[#2B231D]">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
