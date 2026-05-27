import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, MessageSquare, TrendingUp, Target, Video, Share2, ChevronRight, Check, X, Calculator, ShieldCheck } from 'lucide-react';
import { useLanguage, SERVICES_EN, SERVICES_VI } from '../context/LanguageContext';
import { Service } from '../types';

interface ServicesProps {
  isPlannerOpen: boolean;
  setIsPlannerOpen: (open: boolean) => void;
  onSelectServiceForPlanner: (serviceId: string) => void;
}

export default function Services({ isPlannerOpen, setIsPlannerOpen, onSelectServiceForPlanner }: ServicesProps) {
  const { language, t, servicesData } = useLanguage();
  const servicesList = servicesData;
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Cost Planner state
  const [selectedPlannerServices, setSelectedPlannerServices] = useState<string[]>([]);
  const [timelineFactor, setTimelineFactor] = useState<number>(1); // 1 = Standard, 1.35 = Priority, 1.6 = Warp Speed
  const [complexity, setComplexity] = useState<'standard' | 'premium' | 'award'>('premium');

  // Cost Estimate costs bases in USD scaled realistically
  const basePrices: Record<string, number> = {
    'branding': 10000,
    'media-communication': 14000,
    'digital-marketing': 9000,
    'creative-strategy': 12000,
    'content-production': 16000,
    'social-media': 8000
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Award': return <Award className="w-5 h-5 text-[#5C7FA3]" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-[#7BA7D9]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#1D2B3D]" />;
      case 'Target': return <Target className="w-5 h-5 text-[#5C7FA3]" />;
      case 'Video': return <Video className="w-5 h-5 text-[#7BA7D9]" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-[#1D2B3D]" />;
      default: return <Award className="w-5 h-5 text-[#5C7FA3]" />;
    }
  };

  // Toggle service in estimator
  const togglePlannerService = (id: string) => {
    if (selectedPlannerServices.includes(id)) {
      setSelectedPlannerServices(selectedPlannerServices.filter(item => item !== id));
    } else {
      setSelectedPlannerServices([...selectedPlannerServices, id]);
    }
  };

  // Compute estimate
  const calculateTotalEstimate = () => {
    let baseSum = selectedPlannerServices.reduce((sum, serviceId) => sum + (basePrices[serviceId] || 0), 0);
    
    // Complexity scale
    let complexityMultiplier = 1;
    if (complexity === 'standard') complexityMultiplier = 1.0;
    if (complexity === 'premium') complexityMultiplier = 1.35;
    if (complexity === 'award') complexityMultiplier = 1.8;

    // Timeline scale
    let timelineMultiplier = 1;
    if (timelineFactor === 1.35) timelineMultiplier = 1.25;
    if (timelineFactor === 1.6) timelineMultiplier = 1.5;

    return baseSum * complexityMultiplier * timelineMultiplier;
  };

  const estimateVal = calculateTotalEstimate();

  return (
    <section id="services" className="relative py-24 md:py-32 px-4 md:px-8 border-b border-[#7BA7D9]/10 bg-transparent">
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#5C7FA3]/40"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C7FA3]">
                {t('strategicCapabilities')}
              </span>
            </div>
            <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-5xl text-[#1D2B3D] tracking-tight leading-none uppercase">
              {t('ourServiceSuite')}
            </h2>
          </div>
          <div>
            <p className="font-sans text-[#2C3E50]/70 text-sm max-w-md font-light leading-relaxed">
              {t('servicesIntroText')}
            </p>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-white border border-[#7BA7D9]/15 p-8 rounded-3xl cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[250px] hover:border-[#7BA7D9]/40 hover:shadow-lg hover:shadow-[#7BA7D9]/5 transition-all duration-300 transform hover:-translate-y-1 text-left"
              whileHover={{ scale: 1.015 }}
            >
              {/* Subtle background color shift */}
              <div className="absolute inset-0 bg-[#E6EEF8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#E6EEF8]/60 flex items-center justify-center border border-[#7BA7D9]/15 mb-6 group-hover:bg-white transition-colors duration-300">
                  {getIcon(service.icon)}
                </div>
                <h3 className="font-sans text-[#1D2B3D] text-lg font-semibold tracking-wide uppercase">
                  {service.title}
                </h3>
                <p className="text-[#2C3E50]/70 text-xs mt-3 leading-relaxed font-light line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100 font-mono text-[9px] tracking-widest text-slate-400">
                <span>0{idx + 1} // {t('analyzeLabel')}</span>
                <ChevronRight className="w-4 h-4 text-slate-350 group-hover:text-[#5C7FA3] group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Project Estimator Banner */}
        <div className="mt-16 p-8 rounded-[32px] border border-[#7BA7D9]/15 bg-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-sm">
          <div className="absolute -right-12 top-0 w-48 h-48 bg-[#E6EEF8]/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex items-center gap-5 text-left z-10">
            <div className="w-12 h-12 rounded-full bg-[#E6EEF8] border border-[#7BA7D9]/25 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5 text-[#5C7FA3]" />
            </div>
            <div>
              <h3 className="font-sans text-[#1D2B3D] text-lg font-semibold leading-tight mb-1 uppercase tracking-tight">
                {t('haloEstimatorTitle')}
              </h3>
              <p className="text-[#2C3E50]/70 text-xs font-light">
                {t('estimatorIntroText')}
              </p>
            </div>
          </div>
          <button
            id="launch-estimator-btn"
            onClick={() => setIsPlannerOpen(true)}
            className="w-full md:w-auto px-6 py-3.5 rounded-full bg-[#7BA7D9] hover:bg-[#5C7FA3] text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-sm shrink-0"
          >
            {t('launchCalculatorBtn')}
          </button>
        </div>

        {/* DETAILS MODAL */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-[#1D2B3D]/30 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                className="relative w-full max-w-lg bg-white p-8 rounded-[28px] border border-[#7BA7D9]/20 shadow-2xl overflow-hidden z-10 text-left"
              >
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#E6EEF8]/40 rounded-full blur-2xl" />

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E6EEF8]/60 flex items-center justify-center border border-[#7BA7D9]/15">
                      {getIcon(selectedService.icon)}
                    </div>
                    <span className="font-mono text-[9px] text-[#5C7FA3] tracking-widest uppercase font-bold">
                      {t('deliverablesLabel')} // 0{servicesList.findIndex(s => s.id === selectedService.id) + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer border border-slate-100"
                  >
                    <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
                  </button>
                </div>

                <h3 className="font-sans text-[#1D2B3D] text-2xl font-semibold tracking-wide uppercase mb-3 text-left">
                  {selectedService.title}
                </h3>

                <p className="text-[#2C3E50]/80 text-sm font-light leading-relaxed mb-6 text-left">
                  {selectedService.details}
                </p>

                <div className="border-t border-slate-100 pt-5">
                  <h4 className="font-mono text-[9px] text-[#5C7FA3] tracking-widest uppercase mb-3 font-bold">
                    // {t('keyOutcomesLabel')}
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#E6EEF8] border border-[#7BA7D9]/25 flex items-center justify-center mt-0.5 shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#5C7FA3] stroke-[3]" />
                        </div>
                        <span className="text-[#2C3E50]/70 text-xs font-light leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-5 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onSelectServiceForPlanner(selectedService.id);
                      setSelectedService(null);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#7BA7D9] hover:bg-[#5C7FA3] text-white font-medium uppercase tracking-wider text-[10px] transition-all"
                  >
                    {t('addToEstimatorBtn')}
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-full py-3.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 font-medium text-[10px] tracking-wider uppercase transition-all"
                  >
                    {t('closeBtn')}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* COST PLANNER SLIDEOUT CONSOLE */}
        <AnimatePresence>
          {isPlannerOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPlannerOpen(false)}
                className="absolute inset-0 bg-[#1D2B3D]/40 backdrop-blur-sm"
              />

              {/* Console Container */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 180 }}
                className="relative w-full max-w-md bg-white border-l border-slate-100 h-full overflow-y-auto p-6 md:p-8 flex flex-col justify-between z-10 shadow-2xl text-left"
              >
                <div>
                  {/* Close Header */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-[#5C7FA3]" />
                      <span className="font-sans text-xs text-[#5C7FA3] tracking-wider font-bold uppercase">
                        {t('estimatorTitleVersion')}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsPlannerOpen(false)}
                      className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer border border-slate-100"
                    >
                      <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                    </button>
                  </div>

                  <p className="text-[#2C3E50]/70 text-xs font-light leading-relaxed mb-6">
                    {t('estimatorConfigureIntro')}
                  </p>

                  {/* 1. SELECT SERVICES */}
                  <div className="mb-8">
                    <h4 className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-3 font-bold">
                      // {t('chooseCoreCapabilities')}
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {servicesList.map((s) => {
                        const isSelected = selectedPlannerServices.includes(s.id);
                        return (
                          <div
                            key={s.id}
                            onClick={() => togglePlannerService(s.id)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#E6EEF8]/40 border-[#7BA7D9]/60 shadow-sm'
                                : 'bg-slate-50/50 border-slate-100 hover:border-[#7BA7D9]/25'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                                isSelected ? 'bg-[#5C7FA3] border-[#5C7FA3]' : 'border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 text-white stroke-[4]" />}
                              </div>
                              <span className="text-[#1D2B3D] text-xs font-semibold font-sans">{s.title}</span>
                            </div>
                            <span className="font-mono text-[9.5px] text-[#5C7FA3] font-semibold">
                              ${(basePrices[s.id] / 1000).toFixed(0)}K
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. CHOOSE TIMELINE */}
                  <div className="mb-8 p-4 rounded-2xl border border-slate-100 bg-slate-50/60">
                    <h4 className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-3.5 font-bold">
                      // {t('campaignSpeeds')}
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setTimelineFactor(1)}
                        className={`py-2 rounded-lg font-mono text-[8px] sm:text-[9px] tracking-wider border transition-all font-semibold ${
                          timelineFactor === 1 ? 'border-[#5C7FA3] bg-white text-[#5C7FA3]' : 'border-slate-100 bg-[#FFFFFF]/60 text-slate-450'
                        }`}
                      >
                        {t('regularSpeed')}
                      </button>
                      <button
                        onClick={() => setTimelineFactor(1.35)}
                        className={`py-2 rounded-lg font-mono text-[8px] sm:text-[9px] tracking-wider border transition-all font-semibold ${
                          timelineFactor === 1.35 ? 'border-[#7BA7D9] bg-white text-[#7BA7D9]' : 'border-slate-100 bg-[#FFFFFF]/60 text-slate-450'
                        }`}
                      >
                        {t('prioritySpeed')}
                      </button>
                      <button
                        onClick={() => setTimelineFactor(1.6)}
                        className={`py-2 rounded-lg font-mono text-[8px] sm:text-[9px] tracking-wider border transition-all font-semibold ${
                          timelineFactor === 1.6 ? 'border-slate-500 bg-white text-slate-700' : 'border-slate-100 bg-[#FFFFFF]/60 text-slate-450'
                        }`}
                      >
                        {t('expressSpeed')}
                      </button>
                    </div>
                  </div>

                  {/* 3. COMPLEXITY SCALES */}
                  <div className="mb-8">
                    <h4 className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-3 font-bold">
                      // {t('creativeComplexity')}
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setComplexity('standard')}
                        className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center text-center ${
                          complexity === 'standard' ? 'border-[#7BA7D9] bg-[#E6EEF8]/20 text-[#1D2B3D] font-bold' : 'border-slate-100 text-slate-450'
                        }`}
                      >
                        <span className="font-sans text-[10px] font-bold uppercase">{t('coreLevel')}</span>
                        <span className="font-mono text-[8px] mt-0.5 text-slate-400">1.0x Standard</span>
                      </button>
                      <button
                        onClick={() => setComplexity('premium')}
                        className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center text-center ${
                          complexity === 'premium' ? 'border-[#5C7FA3] bg-[#E6EEF8]/20 text-[#1D2B3D] font-bold' : 'border-slate-100 text-slate-450'
                        }`}
                      >
                        <span className="font-sans text-[10px] font-bold uppercase">{t('avantGarde')}</span>
                        <span className="font-mono text-[8px] mt-0.5 text-slate-400">1.35x Advanced</span>
                      </button>
                      <button
                        onClick={() => setComplexity('award')}
                        className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center text-center ${
                          complexity === 'award' ? 'border-slate-400 bg-slate-50 text-[#1D2B3D] font-bold' : 'border-slate-100 text-slate-450'
                        }`}
                      >
                        <span className="font-sans text-[10px] font-bold uppercase">{t('nationwide')}</span>
                        <span className="font-mono text-[8px] mt-0.5 text-slate-400">1.8x Flagship</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* CALCULATIONS SUM AND LOCK */}
                <div className="border-t border-slate-100 pt-6 mt-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-slate-450 font-bold uppercase">{t('estimatedInvestment')}</span>
                    <span className="font-sans font-semibold text-[#1D2B3D] text-2xl tracking-tight">
                      {selectedPlannerServices.length === 0 ? '$0.00' : `$${estimateVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    </span>
                  </div>

                  {selectedPlannerServices.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-[#E6EEF8]/40 border border-[#7BA7D9]/15 text-[#2C3E50]/70 text-[11px] font-light leading-relaxed flex gap-2 mb-6">
                      <ShieldCheck className="w-5 h-5 text-[#5C7FA3] shrink-0 mt-0.5" />
                      <div>
                        {t('estimatorComputedSubtext')}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setIsPlannerOpen(false);
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    disabled={selectedPlannerServices.length === 0}
                    className="w-full py-4 rounded-full bg-[#7BA7D9] hover:bg-[#5C7FA3] disabled:bg-slate-100 text-white disabled:text-slate-400 font-semibold tracking-wider font-sans text-xs transition-colors duration-300 cursor-pointer text-center flex items-center justify-center gap-2 uppercase shadow-sm"
                  >
                    {t('lockProposalBtn')}
                  </button>
                  <p className="text-center text-slate-400 text-[9px] mt-2 italic font-light">
                    {t('estimatorDisclaimer')}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
