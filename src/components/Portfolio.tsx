import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, PORTFOLIO_EN, PORTFOLIO_VI } from '../context/LanguageContext';
import { Project } from '../types';
import { X, ArrowRight, ShieldAlert, Award, Calendar, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const { language, t, portfolioData } = useLanguage();
  const portfolioList = portfolioData;
  const [filter, setFilter] = useState<string>(language === 'en' ? 'All' : 'Tất cả');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sync category filter fallback when language changes to prevent filter lock
  useEffect(() => {
    setFilter(language === 'en' ? 'All' : 'Tất cả');
  }, [language]);

  // Derive categories dynamically from localized dataset
  const categories: string[] = [
    language === 'en' ? 'All' : 'Tất cả',
    ...(Array.from(new Set(portfolioList.map(p => String(p.category || '')))) as string[])
  ];

  const filteredProjects = (filter === 'All' || filter === 'Tất cả')
    ? portfolioList
    : portfolioList.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-white/40 text-left">
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Header Title & Dynamic Filter Tabs */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 gap-8 text-left">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#5C7FA3]/40"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C7FA3]">
                {t('showcasePortfolio')}
              </span>
            </div>
            <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-5xl text-[#1D2B3D] tracking-tight leading-none uppercase">
              {t('selectedArtifacts')}
            </h2>
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex flex-wrap gap-2 text-left">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full font-mono text-[9px] uppercase font-bold tracking-widest transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#5C7FA3] text-white shadow-sm font-bold'
                    : 'bg-white hover:bg-slate-50 text-slate-500 border border-[#7BA7D9]/15'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="bg-white border border-[#7BA7D9]/15 rounded-[24px] overflow-hidden cursor-pointer hover:border-[#7BA7D9]/30 hover:shadow-lg transition-all duration-300 group flex flex-col text-left"
              >
                {/* Image Wrapper */}
                <div className="relative h-[240px] md:h-[280px] overflow-hidden bg-slate-150 shrink-0">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle soft white ambient gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Info block sitting cleanly beneath the image (Nordic Editorial architecture) */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between text-left">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-[9px] text-[#5C7FA3] border border-[#7BA7D9]/20 px-2.5 py-0.5 rounded-full bg-[#E6EEF8]/40 font-bold uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="font-mono text-[9px] text-slate-400 font-bold">
                        // {project.year}
                      </span>
                    </div>

                    <h3 className="font-sans text-xl text-[#1D2B3D] font-semibold tracking-wide uppercase leading-tight mb-2.5">
                      {project.title}
                    </h3>

                    <p className="text-[#2C3E50]/70 text-xs font-light line-clamp-2 mb-5">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#5C7FA3] font-mono text-[9px] tracking-widest font-bold uppercase">
                    <span>{t('exploreCaseStudy')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* DETAILED CASE STUDY MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-[#1D2B3D]/35 backdrop-blur-md"
              />

              {/* Case Study Window */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-4xl bg-white border border-[#7BA7D9]/15 rounded-[32px] shadow-2xl overflow-hidden z-10 my-8 text-left"
              >
                {/* Hero Header Area */}
                <div className="relative h-[220px] md:h-[300px] w-full">
                  <img
                    src={selectedProject.thumbnail}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                  
                  {/* Floating Exit Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-900/40 hover:bg-slate-900/60 flex items-center justify-center border border-white/20 transition-colors text-white cursor-pointer z-20"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-6 left-6 md:left-10 text-left">
                    <span className="font-mono text-xs text-[#5C7FA3] bg-white border border-[#7BA7D9]/20 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-3.5 inline-block font-bold">
                      {selectedProject.category}
                    </span>
                    <h1 className="font-sans font-semibold text-2xl md:text-3xl text-[#1D2B3D] uppercase tracking-tight leading-none mt-1">
                      {selectedProject.title}
                    </h1>
                  </div>
                </div>

                {/* Core Context Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8 border-b border-slate-100 bg-slate-50 font-mono text-xs font-semibold text-left">
                  <div className="pl-2">
                    <span className="text-slate-400 block text-[9px] tracking-widest uppercase mb-1 font-bold">
                      {language === 'en' ? 'PARTNER CLIENT' : 'ĐỐI TÁC THƯƠNG HIỆU'}
                    </span>
                    <span className="text-[#1D2B3D] font-bold">{selectedProject.client}</span>
                  </div>
                  <div className="pl-2">
                    <span className="text-slate-400 block text-[9px] tracking-widest uppercase mb-1 font-bold">
                      {language === 'en' ? 'TIMEFRAME' : 'KHOẢNG THỜI GIAN'}
                    </span>
                    <span className="text-[#1D2B3D] font-bold">
                      {language === 'en' ? 'Year' : 'Năm'} {selectedProject.year}
                    </span>
                  </div>
                  <div className="pl-2">
                    <span className="text-slate-400 block text-[9px] tracking-widest uppercase mb-1 font-bold">
                      {language === 'en' ? 'STAGING PERIOD' : 'THỜI GIAN TRIỂN KHAI'}
                    </span>
                    <span className="text-[#1D2B3D] font-bold">{selectedProject.duration}</span>
                  </div>
                  <div className="pl-2">
                    <span className="text-slate-400 block text-[9px] tracking-widest uppercase mb-1 font-bold">
                      {language === 'en' ? 'MAIN DELIVERABLE' : 'SẢN PHẨM BÀN GIAO CHÍNH'}
                    </span>
                    <span className="text-[#5C7FA3] font-bold truncate block">{selectedProject.tags[0]}</span>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">
                  
                  {/* LEFT: Context, Challenge, Solution, Outcome */}
                  <div className="lg:col-span-8 space-y-8 text-left">
                    <div>
                      <h3 className="font-mono text-[9px] text-[#5C7FA3] tracking-[0.25em] uppercase mb-2.5 font-bold">
                        // {t('pilotOverviewLabel') || 'PILOT OVERVIEW'}
                      </h3>
                      <p className="text-[#2C3E50]/80 text-sm leading-relaxed font-light">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 relative overflow-hidden text-left">
                      <div className="flex gap-3">
                        <ShieldAlert className="w-4 h-4 text-[#5C7FA3] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-sans text-[#1D2B3D] text-xs font-bold uppercase tracking-wider mb-2">
                            {t('contextChallengeTitle') || 'THE CONTEXT & CHALLENGE'}
                          </h4>
                          <ul className="space-y-2 list-disc pl-4 text-slate-500 text-xs font-light leading-relaxed">
                            {selectedProject.challenges.map((chal, i) => (
                              <li key={i}>{chal}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-[#7BA7D9]/15 bg-[#E6EEF8]/20 relative overflow-hidden text-left">
                      <div className="flex gap-3">
                        <Award className="w-4 h-4 text-[#5C7FA3] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-sans text-[#1D2B3D] text-xs font-bold uppercase tracking-wider mb-2">
                            {t('haloSolutionsTitle') || 'HALO INTEGRATED SOLUTIONS'}
                          </h4>
                          <ul className="space-y-2 list-disc pl-4 text-[#2C3E50]/80 text-xs font-light leading-relaxed text-left">
                            {selectedProject.solutions.map((sol, i) => (
                              <li key={i}>{sol}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-mono text-[9px] text-[#7BA7D9] tracking-[0.25em] uppercase mb-2.5 font-bold">
                        // {t('campaignOutcomeTitle') || 'CAMPAIGN OUTCOME & IMPACT'}
                      </h3>
                      <p className="text-[#2C3E50]/80 text-sm leading-relaxed font-light text-left">
                        {selectedProject.outcome}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT: Operational Stats & Tech Tags */}
                  <div className="lg:col-span-4 space-y-6 text-left">
                    {/* STATS */}
                    <div className="p-6 rounded-3xl bg-white border border-[#7BA7D9]/15">
                      <h4 className="font-mono text-[9px] text-[#5C7FA3] tracking-widest uppercase mb-4 font-bold">
                        // {t('measurablePerformanceTitle') || 'MEASURABLE PERFORMANCE'}
                      </h4>
                      <div className="space-y-5 text-left">
                        {selectedProject.stats.map((stat, i) => (
                          <div key={i} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0 text-left">
                            <span className="block font-sans text-xl md:text-2xl font-semibold text-[#1D2B3D]">
                              {stat.value}
                            </span>
                            <span className="block text-[9px] text-slate-400 font-bold mt-1 uppercase">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* TAGS */}
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-mono text-[9px] text-[#5C7FA3] tracking-widest uppercase mb-3 font-bold">
                        // {t('relevantTagsTitle') || 'RELEVANT TAGS'}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 text-left">
                        {selectedProject.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-white border border-slate-200 text-slate-500 text-[9px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        const contact = document.getElementById('contact');
                        if (contact) {
                          contact.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full py-3.5 rounded-full bg-[#7BA7D9] text-white hover:bg-[#5C7FA3] font-semibold uppercase tracking-wider text-[10px] flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                    >
                      {t('requestProposalBoardBtn')}
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
